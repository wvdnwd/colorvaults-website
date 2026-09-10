#!/usr/bin/env python3
"""Remote catalog image quality signals and reviewed rejection application."""

import argparse
import csv
import hashlib
import io
import ipaddress
import json
import os
import socket
import shutil
import sys
import tempfile
import urllib.error
import urllib.request
from urllib.parse import urljoin, urlsplit
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DATA_DIR = ROOT / "src" / "data"
COUNT_FIELDS = ("pageCount", "totalCount", "itemCount", "coloringPageCount")
AGE_GROUPS = frozenset({"toddlers", "kids", "teens", "adults"})
USER_AGENT = "ColorVaultsImageAudit/1.0 (+offline catalog quality tooling)"
ALLOWED_CDN_HOSTS = frozenset({"colorvaults.ams3.cdn.digitaloceanspaces.com"})


def load_pillow():
    try:
        from PIL import Image, ImageDraw, ImageFont, ImageOps, UnidentifiedImageError
    except ImportError as error:
        raise SystemExit(
            "Pillow is required for image auditing. Install it with: python -m pip install Pillow"
        ) from error
    return Image, ImageDraw, ImageFont, ImageOps, UnidentifiedImageError


def read_array(path):
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Cannot read JSON array {path}: {error}") from error
    if not isinstance(value, list):
        raise RuntimeError(f"Expected a JSON array in {path}")
    return value


def json_text(value):
    return json.dumps(value, ensure_ascii=False, indent=2) + "\n"


def discover_locales(data_dir):
    if not data_dir.is_dir():
        raise RuntimeError(f"Catalog data directory does not exist: {data_dir}")
    return sorted(
        child.name
        for child in data_dir.iterdir()
        if child.is_dir() and (child / "coloring-pages.json").is_file()
    )


def atomic_write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="") as handle:
            handle.write(content)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, path)
    except BaseException:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass
        raise


def collect_urls(data_dir, locales):
    urls = {}
    invalid = []
    for locale in locales:
        master = data_dir / locale / "coloring-pages.json"
        for page in read_array(master):
            page_id = page.get("id") if isinstance(page, dict) else None
            url = page.get("image") if isinstance(page, dict) else None
            if not isinstance(page_id, str) or not page_id:
                invalid.append({"locale": locale, "id": None, "issue": "missing_id"})
                continue
            try:
                validate_remote_url(url, resolve=False)
            except RuntimeError:
                invalid.append({"locale": locale, "id": page_id, "issue": "invalid_image_url"})
                continue
            record = urls.setdefault(url, {"url": url, "references": []})
            record["references"].append({"locale": locale, "id": page_id})
    for record in urls.values():
        record["references"].sort(key=lambda item: (item["locale"], item["id"]))
    invalid.sort(key=lambda item: (item["locale"], item.get("id") or "", item["issue"]))
    return urls, invalid


def cache_path(cache_dir, url):
    return cache_dir / f"{hashlib.sha256(url.encode('utf-8')).hexdigest()}.image"


def validate_remote_url(url, resolve=True):
    if not isinstance(url, str):
        raise RuntimeError("url_must_be_string")
    parsed = urlsplit(url)
    hostname = (parsed.hostname or "").lower().rstrip(".")
    try:
        port = parsed.port
    except ValueError as error:
        raise RuntimeError("invalid_url_port") from error
    if parsed.scheme != "https" or not hostname or parsed.username or parsed.password or port not in (None, 443):
        raise RuntimeError("url_must_be_https_without_credentials_or_custom_port")
    if hostname not in ALLOWED_CDN_HOSTS:
        raise RuntimeError(f"cdn_host_not_allowed:{hostname}")
    if resolve:
        try:
            addresses = {item[4][0] for item in socket.getaddrinfo(hostname, 443, type=socket.SOCK_STREAM)}
        except socket.gaierror as error:
            raise RuntimeError(f"dns_resolution_failed:{hostname}") from error
        if not addresses:
            raise RuntimeError(f"dns_resolution_empty:{hostname}")
        for address in addresses:
            ip = ipaddress.ip_address(address.split("%", 1)[0])
            if not ip.is_global:
                raise RuntimeError(f"private_or_non_global_destination:{address}")
    return url


class ValidatingRedirectHandler(urllib.request.HTTPRedirectHandler):
    max_redirections = 5

    def redirect_request(self, request, fp, code, msg, headers, newurl):
        target = urljoin(request.full_url, newurl)
        validate_remote_url(target, resolve=True)
        return super().redirect_request(request, fp, code, msg, headers, target)


def download(url, destination, max_bytes, timeout):
    validate_remote_url(url, resolve=True)
    if destination.is_file():
        size = destination.stat().st_size
        if 0 < size <= max_bytes:
            return destination.read_bytes(), True
        destination.unlink()
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "image/*"})
    try:
        opener = urllib.request.build_opener(ValidatingRedirectHandler())
        with opener.open(request, timeout=timeout) as response:
            validate_remote_url(response.geturl(), resolve=True)
            declared_size = response.headers.get("Content-Length")
            if declared_size and int(declared_size) > max_bytes:
                raise RuntimeError(f"content_length_exceeds_limit:{declared_size}")
            payload = response.read(max_bytes + 1)
    except (urllib.error.URLError, TimeoutError, ValueError, OSError) as error:
        raise RuntimeError(f"download_failed:{type(error).__name__}:{str(error)[:160]}") from error
    if len(payload) > max_bytes:
        raise RuntimeError(f"download_exceeds_limit:{max_bytes}")
    if not payload:
        raise RuntimeError("empty_download")
    destination.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=".download-", dir=destination.parent)
    try:
        with os.fdopen(descriptor, "wb") as handle:
            handle.write(payload)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, destination)
    except BaseException:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass
        raise
    return payload, False


def image_hashes(image, Image):
    grayscale = image.convert("L")
    average_sample = grayscale.resize((8, 8), Image.Resampling.LANCZOS)
    average_pixels = list(average_sample.getdata())
    average = sum(average_pixels) / len(average_pixels)
    average_hash = sum((1 << index) for index, pixel in enumerate(average_pixels) if pixel >= average)

    difference_sample = grayscale.resize((9, 8), Image.Resampling.LANCZOS)
    difference_pixels = list(difference_sample.getdata())
    difference_hash = 0
    bit = 0
    for row in range(8):
        offset = row * 9
        for column in range(8):
            if difference_pixels[offset + column] > difference_pixels[offset + column + 1]:
                difference_hash |= 1 << bit
            bit += 1
    return f"{average_hash:016x}", f"{difference_hash:016x}"


def analyze_payload(payload, thresholds, pillow):
    Image, _, _, ImageOps, UnidentifiedImageError = pillow
    try:
        with Image.open(io.BytesIO(payload)) as source:
            source.verify()
        with Image.open(io.BytesIO(payload)) as source:
            source.load()
            original_format = source.format
            width, height = source.size
            transposed = ImageOps.exif_transpose(source)
            if "A" in transposed.getbands():
                rgba = transposed.convert("RGBA")
                background = Image.new("RGBA", rgba.size, "white")
                background.alpha_composite(rgba)
                rgb = background.convert("RGB")
            else:
                rgb = transposed.convert("RGB")
            sample = rgb.copy()
            sample.thumbnail((thresholds["sample_size"], thresholds["sample_size"]), Image.Resampling.LANCZOS)
            pixels = list(sample.getdata())
            if not pixels:
                raise RuntimeError("image_has_no_pixels")
            total = len(pixels)
            channel_sums = [sum(pixel[channel] for pixel in pixels) for channel in range(3)]
            luminances = [(299 * red + 587 * green + 114 * blue) / 1000 for red, green, blue in pixels]
            dark_ratio = sum(value <= thresholds["dark_pixel"] for value in luminances) / total
            white_ratio = sum(
                red >= thresholds["white_pixel"]
                and green >= thresholds["white_pixel"]
                and blue >= thresholds["white_pixel"]
                for red, green, blue in pixels
            ) / total
            hsv_pixels = list(sample.convert("HSV").getdata())
            mean_saturation = sum(pixel[1] for pixel in hsv_pixels) / (255 * total)
            mean_value = sum(pixel[2] for pixel in hsv_pixels) / (255 * total)
            saturated_ratio = sum(pixel[1] / 255 >= thresholds["saturated_pixel"] for pixel in hsv_pixels) / total
            average_hash, difference_hash = image_hashes(rgb, Image)
    except (UnidentifiedImageError, OSError, SyntaxError, ValueError, RuntimeError) as error:
        return {
            "status": "corrupt",
            "error": f"{type(error).__name__}:{str(error)[:160]}",
            "manualReviewReasons": ["corruption_signal"],
        }

    reasons = []
    if dark_ratio >= thresholds["dark_ratio"]:
        reasons.append("dark_signal")
    if white_ratio >= thresholds["blank_ratio"]:
        reasons.append("blank_signal")
    if mean_saturation >= thresholds["mean_saturation"] or saturated_ratio >= thresholds["saturated_ratio"]:
        reasons.append("high_saturation_signal")
    if width < thresholds["min_dimension"] or height < thresholds["min_dimension"]:
        reasons.append("small_dimensions_signal")
    return {
        "status": "ok",
        "format": original_format,
        "width": width,
        "height": height,
        "bytes": len(payload),
        "sha256": hashlib.sha256(payload).hexdigest(),
        "averageHash": average_hash,
        "differenceHash": difference_hash,
        "meanRgb": [round(value / total, 4) for value in channel_sums],
        "meanHsv": {"saturation": round(mean_saturation, 6), "value": round(mean_value, 6)},
        "darkRatio": round(dark_ratio, 6),
        "whiteRatio": round(white_ratio, 6),
        "saturatedRatio": round(saturated_ratio, 6),
        "manualReviewReasons": reasons,
    }


def audit_one(record, args, pillow, thresholds):
    result = {"url": record["url"], "references": record["references"]}
    destination = cache_path(args.cache_dir, record["url"])
    try:
        payload, cached = download(record["url"], destination, args.max_bytes, args.timeout)
        result.update(analyze_payload(payload, thresholds, pillow))
        result["cached"] = cached
        result["cacheFile"] = destination.name
    except Exception as error:
        result.update({
            "status": "download_error",
            "error": f"{type(error).__name__}:{str(error)[:160]}",
            "cached": False,
            "manualReviewReasons": ["download_error_signal"],
        })
    return result


def hamming(left, right):
    return (left ^ right).bit_count()


class HashTree:
    def __init__(self):
        self.root = None

    def add(self, value, index):
        if self.root is None:
            self.root = [value, index, {}]
            return
        node = self.root
        while True:
            distance = hamming(value, node[0])
            child = node[2].get(distance)
            if child is None:
                node[2][distance] = [value, index, {}]
                return
            node = child

    def search(self, value, maximum):
        if self.root is None:
            return []
        found = []
        pending = [self.root]
        while pending:
            node = pending.pop()
            distance = hamming(value, node[0])
            if distance <= maximum:
                found.append((distance, node[1]))
            lower, upper = distance - maximum, distance + maximum
            pending.extend(child for edge, child in node[2].items() if lower <= edge <= upper)
        return sorted(found)


def duplicate_signals(results, distance_limit, pair_limit):
    exact_groups = {}
    tree = HashTree()
    near_pairs = []
    for index, result in enumerate(results):
        if result.get("status") != "ok":
            continue
        exact_groups.setdefault(result["sha256"], []).append(result["url"])
        hash_value = int(result["differenceHash"], 16)
        for distance, previous_index in tree.search(hash_value, distance_limit):
            previous = results[previous_index]
            if result["sha256"] != previous["sha256"] and len(near_pairs) < pair_limit:
                near_pairs.append({
                    "distance": distance,
                    "urlA": previous["url"],
                    "urlB": result["url"],
                    "averageHashDistance": hamming(int(previous["averageHash"], 16), int(result["averageHash"], 16)),
                })
        tree.add(hash_value, index)
    exact = [
        {"sha256": digest, "urls": sorted(urls)}
        for digest, urls in exact_groups.items()
        if len(urls) > 1
    ]
    exact.sort(key=lambda item: (item["sha256"], item["urls"]))
    near_pairs.sort(key=lambda item: (item["distance"], item["urlA"], item["urlB"]))
    return exact, near_pairs


def create_contact_sheet(path, candidates, cache_dir, columns, cell_size, pillow):
    Image, ImageDraw, ImageFont, ImageOps, _ = pillow
    if not candidates:
        return 0
    rows = (len(candidates) + columns - 1) // columns
    label_height = 58
    sheet = Image.new("RGB", (columns * cell_size, rows * (cell_size + label_height)), "white")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()
    for index, result in enumerate(candidates):
        left = (index % columns) * cell_size
        top = (index // columns) * (cell_size + label_height)
        try:
            with Image.open(cache_dir / result["cacheFile"]) as source:
                thumbnail = ImageOps.contain(ImageOps.exif_transpose(source).convert("RGB"), (cell_size - 8, cell_size - 8))
                sheet.paste(thumbnail, (left + (cell_size - thumbnail.width) // 2, top + (cell_size - thumbnail.height) // 2))
        except (OSError, ValueError):
            draw.rectangle((left + 4, top + 4, left + cell_size - 4, top + cell_size - 4), outline="black")
            draw.text((left + 8, top + 8), "Preview unavailable", fill="black", font=font)
        identifiers = sorted({reference["id"] for reference in result["references"]})
        reasons = result.get("manualReviewReasons", []) or [result["status"]]
        label = f"{','.join(identifiers[:2])[:36]}\n{','.join(reasons)[:42]}"
        draw.text((left + 5, top + cell_size + 4), label, fill="black", font=font)
    path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(path, format="JPEG", quality=88, optimize=True)
    return len(candidates)


def write_audit_csv(path, results):
    fields = [
        "status", "url", "ids", "locales", "cached", "bytes", "width", "height", "format",
        "mean_red", "mean_green", "mean_blue", "mean_saturation", "mean_value", "dark_ratio",
        "white_ratio", "saturated_ratio", "manual_review_reasons", "sha256", "average_hash",
        "difference_hash", "error",
    ]
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=fields)
            writer.writeheader()
            for result in results:
                references = result["references"]
                mean_rgb = result.get("meanRgb", [None, None, None])
                mean_hsv = result.get("meanHsv", {})
                writer.writerow({
                    "status": result["status"], "url": result["url"],
                    "ids": "|".join(sorted({item["id"] for item in references})),
                    "locales": "|".join(sorted({item["locale"] for item in references})),
                    "cached": result.get("cached"), "bytes": result.get("bytes"),
                    "width": result.get("width"), "height": result.get("height"), "format": result.get("format"),
                    "mean_red": mean_rgb[0], "mean_green": mean_rgb[1], "mean_blue": mean_rgb[2],
                    "mean_saturation": mean_hsv.get("saturation"), "mean_value": mean_hsv.get("value"),
                    "dark_ratio": result.get("darkRatio"), "white_ratio": result.get("whiteRatio"),
                    "saturated_ratio": result.get("saturatedRatio"),
                    "manual_review_reasons": "|".join(result.get("manualReviewReasons", [])),
                    "sha256": result.get("sha256"), "average_hash": result.get("averageHash"),
                    "difference_hash": result.get("differenceHash"), "error": result.get("error"),
                })
        os.replace(temporary, path)
    except BaseException:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass
        raise


def run_audit(args):
    pillow = load_pillow()
    locales = discover_locales(args.data_dir)
    if not locales:
        raise RuntimeError(f"No locale masters found under {args.data_dir}")
    url_records, invalid_references = collect_urls(args.data_dir, locales)
    thresholds = {
        "sample_size": args.sample_size,
        "dark_pixel": args.dark_pixel,
        "white_pixel": args.white_pixel,
        "dark_ratio": args.dark_ratio,
        "blank_ratio": args.blank_ratio,
        "saturated_pixel": args.saturated_pixel,
        "mean_saturation": args.mean_saturation,
        "saturated_ratio": args.saturated_ratio,
        "min_dimension": args.min_dimension,
    }
    args.cache_dir.mkdir(parents=True, exist_ok=True)
    results = []
    records = [url_records[url] for url in sorted(url_records)]
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(audit_one, record, args, pillow, thresholds): record["url"] for record in records}
        for future in as_completed(futures):
            results.append(future.result())
    results.sort(key=lambda item: item["url"])
    exact_duplicates, perceptual_candidates = duplicate_signals(results, args.hash_distance, args.max_duplicate_pairs)
    duplicate_urls = {url for group in exact_duplicates for url in group["urls"]}
    duplicate_urls.update(pair["urlA"] for pair in perceptual_candidates)
    duplicate_urls.update(pair["urlB"] for pair in perceptual_candidates)
    for result in results:
        if result["url"] in duplicate_urls and "duplicate_signal" not in result.get("manualReviewReasons", []):
            result.setdefault("manualReviewReasons", []).append("duplicate_signal")
    all_candidates = [
        result for result in results
        if result["status"] != "ok" or result.get("manualReviewReasons")
    ]
    all_candidates.sort(key=lambda item: (item["status"] == "ok", item["url"]))
    candidates = all_candidates[:args.contact_sheet_limit]
    contact_sheet_count = 0
    if args.contact_sheet:
        previewable = [result for result in candidates if result.get("cacheFile")]
        contact_sheet_count = create_contact_sheet(
            args.contact_sheet, previewable, args.cache_dir, args.contact_sheet_columns, args.contact_sheet_cell, pillow
        )
    status_counts = {}
    for result in results:
        status_counts[result["status"]] = status_counts.get(result["status"], 0) + 1
    report = {
        "schemaVersion": 1,
        "scope": {"dataDir": str(args.data_dir), "locales": locales},
        "thresholds": thresholds,
        "limits": {
            "maxBytes": args.max_bytes, "timeoutSeconds": args.timeout, "workers": args.workers,
            "hashDistance": args.hash_distance, "maxDuplicatePairs": args.max_duplicate_pairs,
        },
        "summary": {
            "catalogReferences": sum(len(record["references"]) for record in records),
            "deduplicatedUrls": len(records), "invalidReferences": len(invalid_references),
            "statusCounts": dict(sorted(status_counts.items())), "manualReviewCandidates": len(all_candidates),
            "exactDuplicateGroups": len(exact_duplicates), "perceptualDuplicatePairs": len(perceptual_candidates),
            "contactSheetItems": contact_sheet_count,
        },
        "limitations": [
            "Pixel statistics and perceptual hashes are triage signals, not rejection decisions.",
            "Semantic AI deformities such as duplicate heads, malformed anatomy, or incorrect characters are not automatically detected.",
            "Contact sheets and manualReviewReasons require human review before creating a rejection manifest.",
        ],
        "invalidReferences": invalid_references,
        "exactDuplicateSignals": exact_duplicates,
        "perceptualDuplicateSignals": perceptual_candidates,
        "images": results,
    }
    atomic_write(args.report_json, json_text(report))
    write_audit_csv(args.report_csv, results)
    print(json.dumps(report["summary"], indent=2, sort_keys=True))


def parse_review_manifest(path):
    try:
        manifest = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Cannot read rejection manifest {path}: {error}") from error
    if not isinstance(manifest, dict) or manifest.get("reviewed") is not True:
        raise RuntimeError("Rejection manifest must be an object with reviewed set to true")
    rejections = manifest.get("rejections")
    if not isinstance(rejections, list) or not rejections:
        raise RuntimeError("Rejection manifest must contain a non-empty rejections array")
    rejected = set()
    for index, rejection in enumerate(rejections):
        if not isinstance(rejection, dict) or rejection.get("reviewed") is not True:
            raise RuntimeError(f"rejections[{index}] must be an object with reviewed set to true")
        page_id = rejection.get("id")
        reason = rejection.get("reason")
        if not isinstance(page_id, str) or not page_id or not isinstance(reason, str) or not reason.strip():
            raise RuntimeError(f"rejections[{index}] requires non-empty id and reason strings")
        if page_id in rejected:
            raise RuntimeError(f"Duplicate rejected ID in manifest: {page_id}")
        rejected.add(page_id)
    return rejected


def read_array_with_overrides(path, overrides):
    if overrides and path in overrides:
        try:
            value = json.loads(overrides[path])
        except json.JSONDecodeError as error:
            raise RuntimeError(f"Invalid staged JSON for {path}: {error}") from error
        if not isinstance(value, list):
            raise RuntimeError(f"Expected a staged JSON array in {path}")
        return value
    return read_array(path)


def unique_object_map(values, field, source):
    indexed = {}
    for position, value in enumerate(values):
        key = value.get(field) if isinstance(value, dict) else None
        if not isinstance(key, str) or not key:
            raise RuntimeError(f"Catalog topology drift: missing {field} in {source} at index {position}")
        if key in indexed:
            raise RuntimeError(f"Catalog topology drift: duplicate {field} {key} in {source}")
        indexed[key] = value
    return indexed


def validate_catalog_topology(data_dir, locales, overrides=None):
    masters = {}
    reference_ids = None
    for locale in locales:
        locale_dir = data_dir / locale
        master_path = locale_dir / "coloring-pages.json"
        pages = read_array_with_overrides(master_path, overrides)
        master = unique_object_map(pages, "id", master_path)
        ids = set(master)
        if reference_ids is None:
            reference_ids = ids
        elif ids != reference_ids:
            missing = sorted(reference_ids - ids)[:10]
            extra = sorted(ids - reference_ids)[:10]
            raise RuntimeError(f"Pre-existing locale ID drift in {locale}; missing={missing}, extra={extra}")

        themes_path = locale_dir / "themes.json"
        hubs_path = locale_dir / "main-hubs.json"
        themes = read_array_with_overrides(themes_path, overrides)
        hubs = read_array_with_overrides(hubs_path, overrides)
        theme_by_slug = unique_object_map(themes, "slug", themes_path)
        hub_by_slug = unique_object_map(hubs, "slug", hubs_path)
        theme_counts = dict.fromkeys(theme_by_slug, 0)
        hub_page_counts = dict.fromkeys(hub_by_slug, 0)
        hub_theme_counts = dict.fromkeys(hub_by_slug, 0)

        for theme_slug, theme in theme_by_slug.items():
            parent_hub = theme.get("parentHub")
            if parent_hub not in hub_by_slug:
                raise RuntimeError(
                    f"Catalog topology drift: theme {locale}/{theme_slug} has unknown parent hub {parent_hub}"
                )

        for page_id, page in master.items():
            parent_theme = page.get("parentTheme")
            theme = theme_by_slug.get(parent_theme)
            if theme is None:
                raise RuntimeError(
                    f"Catalog topology drift: page {locale}/{page_id} has unknown parent theme {parent_theme}"
                )
            if page.get("parentHub") != theme.get("parentHub"):
                raise RuntimeError(f"Catalog topology drift: page/theme parent hub mismatch for {locale}/{page_id}")
            theme_counts[parent_theme] += 1

        for theme_slug, theme in theme_by_slug.items():
            expected = theme_counts[theme_slug]
            for field in COUNT_FIELDS:
                if (field == "pageCount" or field in theme) and (
                    type(theme.get(field)) is not int or theme[field] != expected
                ):
                    raise RuntimeError(
                        f"Catalog topology drift: {locale}/{theme_slug}.{field} is {theme.get(field)!r}, expected {expected}"
                    )
            parent_hub = theme["parentHub"]
            hub_page_counts[parent_hub] += expected
            hub_theme_counts[parent_hub] += 1

        for hub_slug, hub in hub_by_slug.items():
            expected_pages = hub_page_counts[hub_slug]
            expected_themes = hub_theme_counts[hub_slug]
            if type(hub.get("pageCount")) is not int or hub["pageCount"] != expected_pages:
                raise RuntimeError(
                    f"Catalog topology drift: {locale}/{hub_slug}.pageCount is {hub.get('pageCount')!r}, expected {expected_pages}"
                )
            if type(hub.get("themeCount")) is not int or hub["themeCount"] != expected_themes:
                raise RuntimeError(
                    f"Catalog topology drift: {locale}/{hub_slug}.themeCount is {hub.get('themeCount')!r}, expected {expected_themes}"
                )

        shard_occurrences = {}
        shard_dir = locale_dir / "themes-data"
        if not shard_dir.is_dir():
            raise RuntimeError(f"Pre-existing drift: missing shard directory {shard_dir}")
        shard_slugs = set()
        for shard_path in sorted(shard_dir.glob("*.json")):
            shard = read_array_with_overrides(shard_path, overrides)
            shard_map = unique_object_map(shard, "id", shard_path)
            shard_slug = shard_path.stem
            if shard_slug not in theme_by_slug:
                raise RuntimeError(f"Catalog topology drift: orphan theme shard {shard_path}")
            shard_slugs.add(shard_slug)
            for page_id, page in shard_map.items():
                if page_id in shard_occurrences:
                    raise RuntimeError(f"Pre-existing drift: ID {page_id} occurs in multiple {locale} shards")
                shard_occurrences[page_id] = shard_path
                if page.get("parentTheme") != shard_slug or page_id not in master or page != master[page_id]:
                    raise RuntimeError(f"Pre-existing drift: shard projection is not exact for {locale}/{page_id}")
        if set(shard_occurrences) != ids:
            missing = sorted(ids - set(shard_occurrences))[:10]
            extra = sorted(set(shard_occurrences) - ids)[:10]
            raise RuntimeError(f"Pre-existing shard ID drift in {locale}; missing={missing}, extra={extra}")
        if shard_slugs != set(theme_by_slug):
            missing = sorted(set(theme_by_slug) - shard_slugs)[:10]
            raise RuntimeError(f"Catalog topology drift: missing theme shards in {locale}: {missing}")

        featured_path = locale_dir / "featured-pages.json"
        if featured_path.is_file() or (overrides and featured_path in overrides):
            featured = read_array_with_overrides(featured_path, overrides)
            featured_map = unique_object_map(featured, "id", featured_path)
            for page_id, page in featured_map.items():
                if page_id not in master or page != master[page_id]:
                    raise RuntimeError(f"Pre-existing drift: featured projection is not exact for {locale}/{page_id}")

        age_path = locale_dir / "age-pages.json"
        if age_path.is_file() or (overrides and age_path in overrides):
            seen_age = set()
            for position, age_page in enumerate(read_array_with_overrides(age_path, overrides)):
                if not isinstance(age_page, dict):
                    raise RuntimeError(f"Pre-existing age-page projection drift in {age_path} at index {position}")
                parent_theme = age_page.get("parentTheme")
                age_group = age_page.get("ageGroup")
                key = (parent_theme, age_group)
                theme = theme_by_slug.get(parent_theme)
                if theme is None:
                    raise RuntimeError(f"Catalog topology drift: age page has unknown theme at {age_path} index {position}")
                if age_group not in AGE_GROUPS or age_page.get("slug") != age_group:
                    raise RuntimeError(f"Catalog topology drift: invalid age-page projection at {age_path} index {position}")
                if key in seen_age:
                    raise RuntimeError(f"Catalog topology drift: duplicate age-page projection {key} in {age_path}")
                if age_page.get("language") != locale:
                    raise RuntimeError(f"Catalog topology drift: age-page language mismatch for {locale}/{parent_theme}/{age_group}")
                if age_page.get("parentHub") != theme.get("parentHub"):
                    raise RuntimeError(f"Catalog topology drift: age-page parent hub mismatch for {locale}/{parent_theme}/{age_group}")
                seen_age.add(key)
            for page_id, page in master.items():
                age_group = page.get("ageGroup")
                key = (page.get("parentTheme"), age_group)
                if age_group in AGE_GROUPS and key not in seen_age:
                    raise RuntimeError(
                        f"Catalog topology drift: missing age-page projection for {locale}/{page_id}: {key[0]}/{key[1]}"
                    )
        masters[locale] = master
    return masters


def update_catalog_counts(locale_dir, pages, writes):
    themes_path = locale_dir / "themes.json"
    hubs_path = locale_dir / "main-hubs.json"
    themes = read_array(themes_path)
    hubs = read_array(hubs_path)
    theme_counts = {}
    hub_page_counts = {}
    hub_theme_counts = {}
    for page in pages:
        theme = page.get("parentTheme")
        theme_counts[theme] = theme_counts.get(theme, 0) + 1
    for theme in themes:
        expected = theme_counts.get(theme.get("slug"), 0)
        for field in COUNT_FIELDS:
            if field == "pageCount" or field in theme:
                theme[field] = expected
        hub = theme.get("parentHub")
        hub_page_counts[hub] = hub_page_counts.get(hub, 0) + expected
        hub_theme_counts[hub] = hub_theme_counts.get(hub, 0) + 1
    for hub in hubs:
        slug = hub.get("slug")
        hub["pageCount"] = hub_page_counts.get(slug, 0)
        hub["themeCount"] = hub_theme_counts.get(slug, 0)
    writes[themes_path] = json_text(themes)
    writes[hubs_path] = json_text(hubs)


def file_sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def durable_json_write(path, value):
    descriptor, temporary = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="") as handle:
            handle.write(json_text(value))
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, path)
        descriptor = os.open(path.parent, os.O_RDONLY)
        try:
            os.fsync(descriptor)
        finally:
            os.close(descriptor)
    except BaseException:
        try:
            os.unlink(temporary)
        except FileNotFoundError:
            pass
        raise


def commit_transaction(writes, data_dir, validate_staged):
    changed = {path: content for path, content in writes.items() if not path.exists() or path.read_text(encoding="utf-8") != content}
    if not changed:
        return 0
    transaction_dir = Path(tempfile.mkdtemp(prefix=".catalog-rejections-", dir=data_dir))
    backups = transaction_dir / "backups"
    staged = transaction_dir / "staged"
    backups.mkdir()
    staged.mkdir()
    entries = []
    manifest_path = transaction_dir / "manifest.json"
    transaction_succeeded = False
    committed = []

    def write_manifest(state, error=None):
        durable_json_write(manifest_path, {
            "schemaVersion": 1,
            "state": state,
            "error": error,
            "entries": [{
                "target": str(entry["target"]), "staged": str(entry["staged"]),
                "backup": str(entry["backup"]), "existed": entry["existed"],
                "beforeSha256": entry["before_sha256"], "afterSha256": entry["after_sha256"],
                "committed": entry in committed,
            } for entry in entries],
        })
    try:
        for index, (target, content) in enumerate(sorted(changed.items(), key=lambda item: str(item[0]))):
            staged_file = staged / f"{index}.json"
            with staged_file.open("w", encoding="utf-8", newline="") as handle:
                handle.write(content)
                handle.flush()
                os.fsync(handle.fileno())
            json.loads(staged_file.read_text(encoding="utf-8"))
            entries.append({
                "target": target, "staged": staged_file, "backup": backups / f"{index}.json",
                "existed": target.exists(),
                "before_sha256": file_sha256(target) if target.exists() else None,
                "after_sha256": hashlib.sha256(content.encode("utf-8")).hexdigest(),
            })
        validate_staged({entry["target"]: entry["staged"].read_text(encoding="utf-8") for entry in entries})
        write_manifest("staged")
        try:
            for entry in entries:
                target, staged_file, backup, existed = entry["target"], entry["staged"], entry["backup"], entry["existed"]
                target.parent.mkdir(parents=True, exist_ok=True)
                if existed and file_sha256(target) != entry["before_sha256"]:
                    raise RuntimeError(f"Target changed during transaction staging: {target}")
                if existed:
                    os.replace(target, backup)
                committed.append(entry)
                try:
                    os.replace(staged_file, target)
                except BaseException:
                    if existed and backup.exists():
                        os.replace(backup, target)
                    committed.remove(entry)
                    raise
                if file_sha256(target) != entry["after_sha256"]:
                    raise RuntimeError(f"Committed checksum mismatch: {target}")
                write_manifest("committing")
        except BaseException:
            raise
        write_manifest("committed")
        transaction_succeeded = True
        return len(changed)
    except BaseException as error:
        write_manifest("rollback_pending", str(error))
        for entry in committed:
            if entry["existed"] and (not entry["backup"].is_file() or file_sha256(entry["backup"]) != entry["before_sha256"]):
                write_manifest("rollback_blocked", f"Backup checksum mismatch: {entry['backup']}")
                raise RuntimeError(f"Catalog rollback blocked; manual recovery required at {transaction_dir}") from error
        for entry in reversed(committed):
            target, backup, existed = entry["target"], entry["backup"], entry["existed"]
            if existed:
                os.replace(backup, target)
            elif target.exists():
                target.unlink()
        write_manifest("rolled_back", str(error))
        raise RuntimeError(
            f"Catalog transaction failed; recovery files retained at {transaction_dir}: {error}"
        ) from error
    finally:
        if transaction_succeeded:
            shutil.rmtree(transaction_dir, ignore_errors=True)


def run_apply_rejections(args):
    rejected = parse_review_manifest(args.manifest)
    locales = discover_locales(args.data_dir)
    if not locales:
        raise RuntimeError(f"No locale masters found under {args.data_dir}")
    masters = validate_catalog_topology(args.data_dir, locales)
    for locale, master in masters.items():
        missing = sorted(rejected - set(master))
        if missing:
            raise RuntimeError(f"Rejected IDs must exist exactly once in every locale master; missing from {locale}: {', '.join(missing)}")
    writes = {}
    removed_by_locale = {}
    for locale in locales:
        locale_dir = args.data_dir / locale
        master_path = locale_dir / "coloring-pages.json"
        pages = read_array(master_path)
        kept_pages = []
        removed = []
        for page in pages:
            if isinstance(page, dict) and page.get("id") in rejected:
                removed.append(page["id"])
            else:
                kept_pages.append(page)
        removed_by_locale[locale] = sorted(removed)
        writes[master_path] = json_text(kept_pages)
        shard_dir = locale_dir / "themes-data"
        if shard_dir.is_dir():
            for shard_path in sorted(shard_dir.glob("*.json")):
                shard = read_array(shard_path)
                filtered = [page for page in shard if not isinstance(page, dict) or page.get("id") not in rejected]
                writes[shard_path] = json_text(filtered)
        featured_path = locale_dir / "featured-pages.json"
        if featured_path.is_file():
            featured = read_array(featured_path)
            writes[featured_path] = json_text([
                page for page in featured if not isinstance(page, dict) or page.get("id") not in rejected
            ])
        update_catalog_counts(locale_dir, kept_pages, writes)

    def validate_repaired(overrides):
        repaired = validate_catalog_topology(args.data_dir, locales, overrides)
        for locale, master in repaired.items():
            remaining = sorted(rejected & set(master))
            if remaining:
                raise RuntimeError(f"Staged rejection validation failed in {locale}: {', '.join(remaining)}")

    validate_repaired(writes)
    summary = {
        "mode": "apply" if args.apply else "dry-run",
        "manifest": str(args.manifest),
        "reviewedRejectedIds": sorted(rejected),
        "removedByLocale": removed_by_locale,
        "changedFiles": 0,
    }
    if args.apply:
        summary["changedFiles"] = commit_transaction(
            writes, args.data_dir,
            lambda staged: validate_repaired({**writes, **staged}),
        )
    if args.report_json:
        atomic_write(args.report_json, json_text(summary))
    print(json.dumps(summary, indent=2, sort_keys=True))


def positive_int(value):
    parsed = int(value)
    if parsed <= 0:
        raise argparse.ArgumentTypeError("must be greater than zero")
    return parsed


def ratio(value):
    parsed = float(value)
    if not 0 <= parsed <= 1:
        raise argparse.ArgumentTypeError("must be between 0 and 1")
    return parsed


def build_parser():
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    audit = subparsers.add_parser("audit", help="download each unique remote URL and emit quality signals")
    audit.add_argument("--data-dir", type=Path, default=DEFAULT_DATA_DIR)
    audit.add_argument("--cache-dir", type=Path, required=True)
    audit.add_argument("--report-json", type=Path, required=True)
    audit.add_argument("--report-csv", type=Path, required=True)
    audit.add_argument("--contact-sheet", type=Path)
    audit.add_argument("--workers", type=positive_int, default=8)
    audit.add_argument("--timeout", type=positive_int, default=15)
    audit.add_argument("--max-bytes", type=positive_int, default=20 * 1024 * 1024)
    audit.add_argument("--sample-size", type=positive_int, default=256)
    audit.add_argument("--dark-pixel", type=int, choices=range(0, 256), default=48)
    audit.add_argument("--white-pixel", type=int, choices=range(0, 256), default=248)
    audit.add_argument("--dark-ratio", type=ratio, default=0.80)
    audit.add_argument("--blank-ratio", type=ratio, default=0.998)
    audit.add_argument("--saturated-pixel", type=ratio, default=0.35)
    audit.add_argument("--mean-saturation", type=ratio, default=0.25)
    audit.add_argument("--saturated-ratio", type=ratio, default=0.25)
    audit.add_argument("--min-dimension", type=positive_int, default=400)
    audit.add_argument("--hash-distance", type=int, choices=range(0, 65), default=5)
    audit.add_argument("--max-duplicate-pairs", type=positive_int, default=5000)
    audit.add_argument("--contact-sheet-limit", type=positive_int, default=200)
    audit.add_argument("--contact-sheet-columns", type=positive_int, default=5)
    audit.add_argument("--contact-sheet-cell", type=positive_int, default=220)
    audit.set_defaults(handler=run_audit)

    reject = subparsers.add_parser("apply-rejections", help="remove only explicitly reviewed IDs; dry-run by default")
    reject.add_argument("--data-dir", type=Path, default=DEFAULT_DATA_DIR)
    reject.add_argument("--manifest", type=Path, required=True)
    reject.add_argument("--report-json", type=Path)
    reject.add_argument("--apply", action="store_true")
    reject.set_defaults(handler=run_apply_rejections)
    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()
    args.data_dir = args.data_dir.resolve()
    if hasattr(args, "cache_dir"):
        args.cache_dir = args.cache_dir.resolve()
        args.report_json = args.report_json.resolve()
        args.report_csv = args.report_csv.resolve()
        if args.contact_sheet:
            args.contact_sheet = args.contact_sheet.resolve()
    if hasattr(args, "manifest"):
        args.manifest = args.manifest.resolve()
        if args.report_json:
            args.report_json = args.report_json.resolve()
    args.handler(args)


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, OSError) as error:
        print(f"remote_image_audit: {error}", file=sys.stderr)
        raise SystemExit(2) from error
