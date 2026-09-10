#!/usr/bin/env python3
"""Portable image and catalog audit for ColorVaults.

The EN master catalog is canonical. NL and per-theme files are mirrored copies
of those identities. Audits are non-destructive by default; heuristic image or
catalog findings are never used as rejection input.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable


SCRIPT_DIR = Path(__file__).resolve().parent
DEFAULT_ROOT = SCRIPT_DIR.parent
PAGE_COLLECTIONS = ("coloring-pages.json", "featured-pages.json")
TITLE_FIELDS = (
    "metaTitle",
    "metaDescription",
    "shortDescription",
    "longDescription",
    "altText",
)
SCENE_RE = re.compile(r"^(?P<base>.+?) \((?P<label>Scene|Scène|Scne) (?P<number>\d+)\)$")
NL_SCNE_RE = re.compile(r"\bScne(?= \d+\))")
IMAGE_EXTENSIONS = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"}
KNOWN_REJECTED_IDS = {"page-paw-patrol-1", "page-paw-patrol-123"}
FEATURED_SELECTOR_REMOVALS = {
    "page-frozen-1": "African_Savanna_Scene_1788436385897.webp",
    "page-sonic-the-hedgehog-1": "Naruto_in_his_Nine-Tails_Mode_1788560731593.webp",
    "page-sonic-the-hedgehog-2": "Sonic_The_Hedgehog_1788295103115.webp",
}
FROZEN_BELLE_IMAGE = "Belle_and_Elsa_Tea_Time_1788344032298.webp"

# Exact generated Paw Patrol stems whose source filenames show truncation too.
# Their completion is franchise context, not a guessed scene description.
PAW_PATROL_TITLES = {
    "en": {
        "Chase The Police Pup From Pa": "Chase the Police Pup from Paw Patrol",
        "Rocky The Eco Pup From Paw P": "Rocky the Eco Pup from Paw Patrol",
        "Skye The Aviation Pup From P": "Skye the Aviation Pup from Paw Patrol",
        "Zuma The Water Rescue Pup Fr": "Zuma the Water Rescue Pup from Paw Patrol",
    },
    "nl": {
        "Chase de Police Pup van Pa": "Chase de politiehond van Paw Patrol",
        "Rocky de Eco Pup van Paw P": "Rocky de ecologische pup van Paw Patrol",
        "Skye de Aviation Pup van P": "Skye de luchtvaartpup van Paw Patrol",
        "Zuma de Water Rescue Pup Fr": "Zuma de waterreddingspup van Paw Patrol",
    },
}


@dataclass
class CatalogFile:
    path: Path
    language: str
    kind: str
    items: list[dict[str, Any]]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", type=Path, default=DEFAULT_ROOT)
    parser.add_argument(
        "--image-root",
        type=Path,
        action="append",
        default=[],
        help="Local image tree; may be repeated. URL paths and basenames are resolved within it.",
    )
    parser.add_argument("--remote", action="store_true", help="Fetch unresolved HTTP(S) images.")
    parser.add_argument("--timeout", type=float, default=8.0, help="Per-request remote timeout in seconds.")
    parser.add_argument("--max-images", type=int, default=0, help="Maximum unique images to decode; 0 means all.")
    parser.add_argument("--sample-size", type=int, default=512, help="Maximum width/height used for pixel metrics.")
    parser.add_argument("--black-threshold", type=int, default=10, help="RGB channel ceiling for a black pixel.")
    parser.add_argument("--white-threshold", type=int, default=250, help="RGB channel floor for a white pixel.")
    parser.add_argument("--saturation-threshold", type=int, default=10, help="HSV S and RGB spread threshold (0-255).")
    parser.add_argument("--black-ratio", type=float, default=0.70, help="Flag above this black-pixel ratio.")
    parser.add_argument("--white-ratio", type=float, default=0.995, help="Flag above this white-pixel ratio.")
    parser.add_argument("--gray-ratio", type=float, default=0.02, help="Flag above this intermediate-gray pixel ratio.")
    parser.add_argument("--skip-images", action="store_true", help="Only audit catalog structure and titles.")
    parser.add_argument("--json-report", type=Path, default=SCRIPT_DIR / "audit_report.json")
    parser.add_argument("--csv-report", type=Path, default=SCRIPT_DIR / "bad_images_report.csv")
    parser.add_argument("--reject-file", type=Path, help="JSON/CSV with explicit id, slug, and/or image identities.")
    parser.add_argument(
        "--apply-rejections",
        action="store_true",
        help="Write explicit rejection removals. Without this flag, rejection handling is a dry run.",
    )
    parser.add_argument(
        "--fix-titles",
        action="store_true",
        help="Write only allowlisted Paw Patrol completions and Dutch 'Scne' corrections.",
    )
    parser.add_argument(
        "--apply-source-corrections",
        action="store_true",
        help="Apply the reviewed Paw Patrol rejections, featured selector fixes, and safe title repairs.",
    )
    args = parser.parse_args()
    if not 0 <= args.black_threshold <= 255 or not 0 <= args.white_threshold <= 255:
        parser.error("pixel thresholds must be between 0 and 255")
    if not 0 <= args.saturation_threshold <= 255:
        parser.error("--saturation-threshold must be between 0 and 255")
    if not 0 <= args.black_ratio <= 1 or not 0 <= args.white_ratio <= 1 or not 0 <= args.gray_ratio <= 1:
        parser.error("ratio thresholds must be between 0 and 1")
    if args.timeout <= 0 or args.max_images < 0 or args.sample_size <= 0:
        parser.error("timeout/sample size must be positive and max images cannot be negative")
    if args.apply_rejections and not args.reject_file:
        parser.error("--apply-rejections requires --reject-file")
    return args


def load_catalogs(repo_root: Path) -> list[CatalogFile]:
    data_root = repo_root.resolve() / "src" / "data"
    catalogs: list[CatalogFile] = []
    for language in ("en", "nl"):
        language_root = data_root / language
        paths = [language_root / name for name in PAGE_COLLECTIONS]
        paths.extend(sorted((language_root / "themes-data").glob("*.json")))
        for path in paths:
            if not path.exists():
                continue
            with path.open(encoding="utf-8") as handle:
                items = json.load(handle)
            if not isinstance(items, list) or not all(isinstance(item, dict) for item in items):
                raise ValueError(f"expected an array of objects in {path}")
            kind = "theme" if path.parent.name == "themes-data" else path.stem
            catalogs.append(CatalogFile(path, language, kind, items))
    masters = {(catalog.language, catalog.kind) for catalog in catalogs}
    for required in (("en", "coloring-pages"), ("nl", "coloring-pages")):
        if required not in masters:
            raise FileNotFoundError(f"missing required {required[0]} master coloring-pages.json")
    return catalogs


def dump_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(value, handle, ensure_ascii=False, indent=2)
        handle.write("\n")


def canonical_items(catalogs: list[CatalogFile]) -> list[dict[str, Any]]:
    master = next(c for c in catalogs if c.language == "en" and c.kind == "coloring-pages")
    return master.items


def item_identity(item: dict[str, Any]) -> str:
    return str(item.get("id") or item.get("slug") or item.get("image") or "")


def source_folder(url: str) -> str:
    path = urllib.parse.unquote(urllib.parse.urlparse(url).path).strip("/")
    parts = path.split("/")
    return parts[-2] if len(parts) > 1 else ""


def normalized_words(value: str) -> set[str]:
    return set(re.findall(r"[a-z0-9]+", urllib.parse.unquote(value).lower()))


def catalog_audit(catalogs: list[CatalogFile], repo_root: Path) -> dict[str, Any]:
    refs: dict[str, list[tuple[CatalogFile, dict[str, Any]]]] = defaultdict(list)
    duplicate_ids: list[dict[str, Any]] = []
    shard_mismatches: list[dict[str, Any]] = []
    missing_from_master: list[dict[str, Any]] = []
    scene_groups: list[dict[str, Any]] = []
    title_fixes: list[dict[str, Any]] = []
    category_mismatches: list[dict[str, Any]] = []

    for catalog in catalogs:
        seen: set[str] = set()
        for item in catalog.items:
            identity = item_identity(item)
            if not identity:
                missing_from_master.append({"file": str(catalog.path.relative_to(repo_root)), "reason": "missing_identity"})
                continue
            if identity in seen:
                duplicate_ids.append({"file": str(catalog.path.relative_to(repo_root)), "id": identity})
            seen.add(identity)
            refs[identity].append((catalog, item))

    master = next(c for c in catalogs if c.language == "en" and c.kind == "coloring-pages")
    master_by_id = {item_identity(item): item for item in master.items}
    for identity, locations in refs.items():
        expected = master_by_id.get(identity)
        for catalog, item in locations:
            relative = str(catalog.path.relative_to(repo_root))
            if expected is None and catalog.kind in ("theme", "featured-pages"):
                missing_from_master.append(
                    {"id": identity, "file": relative, "reason": f"{catalog.kind}_only_identity"}
                )
            if catalog.kind == "theme" and catalog.path.stem != item.get("parentTheme"):
                shard_mismatches.append(
                    {"id": identity, "file": relative, "parentTheme": item.get("parentTheme"), "reason": "wrong_shard"}
                )
            if expected and catalog.language == "en" and catalog.kind == "theme":
                differing = [key for key in ("slug", "parentTheme", "image", "title") if item.get(key) != expected.get(key)]
                if differing:
                    shard_mismatches.append({"id": identity, "file": relative, "fields": differing, "reason": "master_diff"})
            if expected and catalog.kind == "featured-pages":
                differing = [key for key in ("slug", "parentTheme", "image") if item.get(key) != expected.get(key)]
                if differing:
                    shard_mismatches.append(
                        {"id": identity, "file": relative, "fields": differing, "reason": "featured_master_diff"}
                    )

    theme_words: dict[str, set[str]] = {}
    theme_names: dict[frozenset[str], list[str]] = defaultdict(list)
    themes_path = repo_root / "src" / "data" / "en" / "themes.json"
    if themes_path.exists():
        with themes_path.open(encoding="utf-8") as handle:
            for theme in json.load(handle):
                slug = str(theme.get("slug", ""))
                title = str(theme.get("title", ""))
                theme_words[slug] = normalized_words(
                    f"{theme.get('slug', '')} {theme.get('title', '')}"
                )
                theme_names[frozenset(normalized_words(slug))].append(slug)
                theme_names[frozenset(normalized_words(title))].append(slug)

    family_members: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)
    for item in master.items:
        title = str(item.get("title", ""))
        match = SCENE_RE.match(title)
        if match:
            family_members[(str(item.get("parentTheme", "")), match.group("base"))].append(
                {"id": item_identity(item), "number": int(match.group("number")), "title": title}
            )
        fix = safe_title(item, "en")
        if fix and fix != title:
            title_fixes.append({"id": item_identity(item), "language": "en", "before": title, "after": fix})

        folder = source_folder(str(item.get("image", "")))
        own_words = theme_words.get(str(item.get("parentTheme", "")), set())
        folder_words = normalized_words(folder)
        other_matches = sorted(
            slug
            for slug, _words in theme_words.items()
            if slug != item.get("parentTheme")
            and normalized_words(slug)
            and normalized_words(slug) <= folder_words
        )
        if folder and own_words and not (folder_words & own_words) and other_matches:
            category_mismatches.append(
                {
                    "id": item_identity(item),
                    "parentTheme": item.get("parentTheme"),
                    "sourceFolder": folder,
                    "possibleThemes": other_matches[:5],
                    "reason": "source_folder_matches_other_theme",
                }
            )
        description = str(item.get("metaDescription", ""))
        collection = re.search(r"\bfrom the (.+?) collection\b", description, re.IGNORECASE)
        if collection:
            named_themes = sorted(set(theme_names.get(frozenset(normalized_words(collection.group(1))), [])))
            named_themes = [slug for slug in named_themes if slug != item.get("parentTheme")]
            if named_themes:
                category_mismatches.append(
                    {
                        "id": item_identity(item),
                        "parentTheme": item.get("parentTheme"),
                        "metadataCollection": collection.group(1),
                        "possibleThemes": named_themes,
                        "reason": "metadata_names_other_theme",
                    }
                )

    for (theme, base), members in family_members.items():
        if len(members) >= 3:
            scene_groups.append(
                {
                    "parentTheme": theme,
                    "baseTitle": base,
                    "count": len(members),
                    "numbers": sorted(member["number"] for member in members),
                    "ids": [member["id"] for member in members],
                    "action": "review_only_no_semantic_source",
                }
            )

    for catalog in catalogs:
        if catalog.language != "nl":
            continue
        for item in catalog.items:
            fixed = safe_title(item, "nl")
            if fixed and fixed != item.get("title"):
                title_fixes.append(
                    {
                        "id": item_identity(item),
                        "language": "nl",
                        "before": item.get("title"),
                        "after": fixed,
                        "file": str(catalog.path.relative_to(repo_root)),
                    }
                )

    return {
        "canonicalPattern": {
            "master": "src/data/en/coloring-pages.json",
            "identity": "id",
            "crossChecks": ["slug", "image"],
            "mirrors": ["src/data/nl/coloring-pages.json", "src/data/{en,nl}/themes-data/*.json"],
        },
        "counts": {
            "catalogFiles": len(catalogs),
            "masterItems": len(master.items),
            "uniqueReferencedIdentities": len(refs),
        },
        "duplicateIdsWithinFile": duplicate_ids,
        "missingFromMaster": missing_from_master,
        "shardMismatches": shard_mismatches,
        "repetitiveSceneGroups": scene_groups,
        "safeTitleFixes": title_fixes,
        "categoryMismatches": category_mismatches,
    }


def safe_title(item: dict[str, Any], language: str) -> str | None:
    title = str(item.get("title", ""))
    fixed = title
    if language == "nl":
        fixed = NL_SCNE_RE.sub("Scène", fixed)
    if item.get("parentTheme") == "paw-patrol":
        scene = ""
        match = SCENE_RE.match(fixed)
        base = fixed
        if match:
            base = match.group("base")
            label = "Scène" if language == "nl" else "Scene"
            scene = f" ({label} {match.group('number')})"
        replacement = PAW_PATROL_TITLES[language].get(base)
        if replacement:
            fixed = replacement + scene
    return fixed if fixed != title else None


def apply_safe_titles(catalogs: list[CatalogFile]) -> dict[str, Any]:
    changed_files: dict[str, int] = {}
    changed_identities: set[tuple[str, str]] = set()
    for catalog in catalogs:
        count = 0
        for item in catalog.items:
            old_title = str(item.get("title", ""))
            new_title = safe_title(item, catalog.language)
            changed = bool(new_title)
            if new_title:
                item["title"] = new_title
            for field in TITLE_FIELDS:
                value = item.get(field)
                if isinstance(value, str):
                    repaired = value.replace(old_title, new_title) if new_title else value
                    if catalog.language == "nl":
                        repaired = repaired.replace("Scne ", "Scène ")
                    changed = changed or repaired != value
                    item[field] = repaired
            if not changed:
                continue
            count += 1
            changed_identities.add((catalog.language, item_identity(item)))
        if count:
            dump_json(catalog.path, catalog.items)
            changed_files[str(catalog.path)] = count
    return {"files": changed_files, "uniqueLanguageIdentities": len(changed_identities)}


def apply_featured_selector_fixes(catalogs: list[CatalogFile]) -> dict[str, Any]:
    """Apply only selectors verified against the EN/NL authoritative records."""
    changed_files: dict[str, dict[str, Any]] = {}
    for catalog in catalogs:
        if catalog.kind != "featured-pages":
            continue
        removed: list[str] = []
        corrected: list[dict[str, str]] = []
        kept: list[dict[str, Any]] = []
        for item in catalog.items:
            identity = item_identity(item)
            image_name = Path(urllib.parse.unquote(urllib.parse.urlparse(str(item.get("image", ""))).path)).name
            rejected_image = FEATURED_SELECTOR_REMOVALS.get(identity)
            if rejected_image == image_name:
                removed.append(identity)
                continue
            if identity == "page-frozen-2" and image_name == FROZEN_BELLE_IMAGE:
                corrected.append({"from": identity, "to": "page-frozen-1"})
                item["id"] = "page-frozen-1"
                item["slug"] = "frozen-1"
            kept.append(item)
        if removed or corrected:
            catalog.items = kept
            dump_json(catalog.path, kept)
            changed_files[str(catalog.path)] = {"removed": removed, "corrected": corrected}
    return {"files": changed_files}


def load_rejections(path: Path) -> list[dict[str, str]]:
    allowed = ("id", "slug", "image")
    rows: Iterable[Any]
    if path.suffix.lower() == ".csv":
        with path.open(encoding="utf-8-sig", newline="") as handle:
            rows = list(csv.DictReader(handle))
    else:
        with path.open(encoding="utf-8") as handle:
            payload = json.load(handle)
        rows = payload.get("rejections", []) if isinstance(payload, dict) else payload
    if not isinstance(rows, list):
        raise ValueError("rejection input must be an array or an object with a rejections array")
    result: list[dict[str, str]] = []
    for row in rows:
        if isinstance(row, str):
            row = {"id": row}
        if not isinstance(row, dict):
            raise ValueError("each rejection must be an id string or an object")
        identity = {key: str(row[key]) for key in allowed if row.get(key)}
        if not identity:
            raise ValueError("each rejection needs at least one exact id, slug, or image")
        result.append(identity)
    return result


def matches_rejection(item: dict[str, Any], rejection: dict[str, str]) -> bool:
    # Every supplied selector must match, preventing a broad partial selector.
    return all(str(item.get(key, "")) == value for key, value in rejection.items())


def reject_items(catalogs: list[CatalogFile], rejections: list[dict[str, str]], apply: bool) -> dict[str, Any]:
    matched_rejections: set[int] = set()
    files: dict[str, dict[str, Any]] = {}
    for catalog in catalogs:
        removed: list[str] = []
        kept: list[dict[str, Any]] = []
        for item in catalog.items:
            matches = [index for index, rejection in enumerate(rejections) if matches_rejection(item, rejection)]
            if matches:
                matched_rejections.update(matches)
                removed.append(item_identity(item))
            else:
                kept.append(item)
        if removed:
            files[str(catalog.path)] = {"count": len(removed), "ids": removed}
            if apply:
                dump_json(catalog.path, kept)
                catalog.items = kept
    return {
        "mode": "applied" if apply else "dry-run",
        "files": files,
        "matchedRejections": len(matched_rejections),
        "unmatchedRejections": [rejections[i] for i in range(len(rejections)) if i not in matched_rejections],
    }


def refresh_theme_counts(repo_root: Path, catalogs: list[CatalogFile]) -> dict[str, int]:
    """Synchronize existing count fields after explicit removals; never invent fields."""
    shard_counts = {
        (catalog.language, catalog.path.stem): len(catalog.items)
        for catalog in catalogs
        if catalog.kind == "theme"
    }
    changed: dict[str, int] = {}
    for language in ("en", "nl"):
        path = repo_root / "src" / "data" / language / "themes.json"
        if not path.exists():
            continue
        with path.open(encoding="utf-8") as handle:
            themes = json.load(handle)
        edits = 0
        for theme in themes:
            count = shard_counts.get((language, str(theme.get("slug", ""))))
            if count is None:
                continue
            for field in ("pageCount", "totalCount", "itemCount", "coloringPageCount"):
                if field in theme and theme[field] != count:
                    theme[field] = count
                    edits += 1
        if edits:
            dump_json(path, themes)
            changed[str(path)] = edits
    return changed


def build_local_index(roots: list[Path]) -> tuple[dict[str, Path], dict[str, Path]]:
    by_relative: dict[str, Path] = {}
    by_name: dict[str, Path] = {}
    ambiguous: set[str] = set()
    for root in roots:
        if not root.exists():
            continue
        if root.is_file():
            paths = [root]
            base = root.parent
        else:
            paths = (path for path in root.rglob("*") if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS)
            base = root
        for path in paths:
            relative = path.relative_to(base).as_posix().lower()
            by_relative.setdefault(relative, path)
            name = path.name.lower()
            if name in by_name and by_name[name] != path:
                ambiguous.add(name)
            else:
                by_name[name] = path
    for name in ambiguous:
        by_name.pop(name, None)
    return by_relative, by_name


def resolve_local(url: str, repo_root: Path, relative: dict[str, Path], names: dict[str, Path]) -> Path | None:
    parsed = urllib.parse.urlparse(url)
    decoded = urllib.parse.unquote(parsed.path if parsed.scheme else url).lstrip("/")
    direct = Path(decoded)
    candidates = [direct, repo_root / direct]
    for candidate in candidates:
        if candidate.is_file():
            return candidate.resolve()
    key = decoded.lower()
    if key in relative:
        return relative[key]
    return names.get(Path(decoded).name.lower())


def read_image(url: str, local: Path | None, remote: bool, timeout: float) -> tuple[bytes | None, str, str | None]:
    if local:
        try:
            return local.read_bytes(), "local", None
        except OSError as error:
            return None, "local_error", str(error)
    if not remote or urllib.parse.urlparse(url).scheme not in ("http", "https"):
        return None, "unavailable", None
    request = urllib.request.Request(url, headers={"User-Agent": "ColorVaultsAudit/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.read(), "remote", None
    except (OSError, urllib.error.URLError) as error:
        return None, "remote_error", str(error)


def analyze_pixels(data: bytes, args: argparse.Namespace) -> dict[str, Any]:
    try:
        from PIL import Image, UnidentifiedImageError
    except ImportError as error:
        raise RuntimeError("Pillow is required to decode available images: python -m pip install Pillow") from error
    try:
        with Image.open(io.BytesIO(data)) as opened:
            opened.verify()
        with Image.open(io.BytesIO(data)) as opened:
            if "A" in opened.getbands() or "transparency" in opened.info:
                rgba = opened.convert("RGBA")
                background = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
                image = Image.alpha_composite(background, rgba).convert("RGB")
            else:
                image = opened.convert("RGB")
            original_size = image.size
            image.thumbnail((args.sample_size, args.sample_size))
            pixels = list(image.getdata())
            hsv_pixels = list(image.convert("HSV").getdata())
            image_format = opened.format
    except (OSError, ValueError, UnidentifiedImageError) as error:
        return {"status": "corrupt", "error": str(error), "issues": ["corrupt"]}
    total = len(pixels)
    if not total:
        return {"status": "corrupt", "error": "image has no pixels", "issues": ["corrupt"]}
    black = sum(max(pixel) <= args.black_threshold for pixel in pixels) / total
    white = sum(min(pixel) >= args.white_threshold for pixel in pixels) / total
    gray = sum(
        max(pixel) - min(pixel) <= args.saturation_threshold
        and args.black_threshold < sum(pixel) / 3 < args.white_threshold
        for pixel in pixels
    ) / total
    rgb_non_gray = sum(max(pixel) - min(pixel) > args.saturation_threshold for pixel in pixels) / total
    rgb_saturated = sum(
        (255 * (max(pixel) - min(pixel)) / max(pixel) if max(pixel) else 0) > args.saturation_threshold
        for pixel in pixels
    ) / total
    hsv_saturated = sum(pixel[1] > args.saturation_threshold for pixel in hsv_pixels) / total
    issues: list[str] = []
    if black > args.black_ratio:
        issues.append("black_ratio")
    if white > args.white_ratio:
        issues.append("white_ratio")
    if gray > args.gray_ratio:
        issues.append("gray_ratio")
    if hsv_saturated > 0 or rgb_non_gray > 0:
        issues.append("non_grayscale")
    digest = hashlib.sha256(image.tobytes()).hexdigest()
    return {
        "status": "decoded",
        "format": image_format,
        "width": original_size[0],
        "height": original_size[1],
        "samplePixels": total,
        "blackRatio": round(black, 6),
        "whiteRatio": round(white, 6),
        "grayRatio": round(gray, 6),
        "hsvSaturationOverThresholdRatio": round(hsv_saturated, 6),
        "rgbSaturationOverThresholdRatio": round(rgb_saturated, 6),
        "rgbNonGrayRatio": round(rgb_non_gray, 6),
        "decodedRgbSha256": digest,
        "issues": issues,
    }


def image_audit(items: list[dict[str, Any]], repo_root: Path, args: argparse.Namespace) -> dict[str, Any]:
    roots = [path.resolve() for path in args.image_root]
    relative, names = build_local_index(roots)
    by_url: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in items:
        url = str(item.get("image", ""))
        if url:
            by_url[url].append(item)
    missing_images = [item_identity(item) for item in items if not str(item.get("image", "")).strip()]
    invalid_urls = [
        {"id": item_identity(item), "url": str(item.get("image", ""))}
        for item in items
        if item.get("image") and urllib.parse.urlparse(str(item["image"])).scheme not in ("http", "https")
    ]
    rows: list[dict[str, Any]] = []
    hashes: dict[str, list[dict[str, str]]] = defaultdict(list)
    urls = sorted(by_url)
    if args.max_images:
        urls = urls[: args.max_images]
    for url in urls:
        referenced = by_url[url]
        local = resolve_local(url, repo_root, relative, names)
        data, source, error = read_image(url, local, args.remote, args.timeout)
        row: dict[str, Any] = {
            "id": item_identity(referenced[0]),
            "ids": [item_identity(item) for item in referenced],
            "url": url,
            "source": source,
            "localPath": str(local) if local else None,
            "referenceCount": len(referenced),
        }
        if error:
            row.update({"status": source, "error": error, "issues": [source]})
        elif data is None:
            row.update({"status": "unavailable", "issues": ["unavailable"]})
        else:
            row.update(analyze_pixels(data, args))
            digest = row.get("decodedRgbSha256")
            if digest:
                for item in referenced:
                    hashes[digest].append({"id": item_identity(item), "url": url})
        rows.append(row)
    duplicates = []
    for digest, members in hashes.items():
        unique_ids = sorted({member["id"] for member in members})
        unique_urls = sorted({member["url"] for member in members})
        if len(unique_ids) > 1 or len(unique_urls) > 1:
            duplicates.append({"decodedRgbSha256": digest, "ids": unique_ids, "urls": unique_urls})
    return {
        "thresholds": {
            "blackPixelRgbMax": args.black_threshold,
            "blackRatioGreaterThan": args.black_ratio,
            "whitePixelRgbMin": args.white_threshold,
            "whiteRatioGreaterThan": args.white_ratio,
            "grayRatioGreaterThan": args.gray_ratio,
            "saturationOrRgbSpreadGreaterThan": args.saturation_threshold,
        },
        "counts": {
            "catalogItems": len(items),
            "missingImageReferences": len(missing_images),
            "invalidImageUrls": len(invalid_urls),
            "uniqueImageUrls": len(by_url),
            "attempted": len(rows),
            "decoded": sum(row["status"] == "decoded" for row in rows),
            "corrupt": sum(row["status"] == "corrupt" for row in rows),
            "unavailable": sum(row["status"] == "unavailable" for row in rows),
            "remoteErrors": sum(row["status"] == "remote_error" for row in rows),
            "localErrors": sum(row["status"] == "local_error" for row in rows),
        },
        "missingImageReferences": missing_images,
        "invalidImageUrls": invalid_urls,
        "duplicateSourceUrls": [
            {"url": url, "ids": sorted({item_identity(item) for item in referenced})}
            for url, referenced in by_url.items()
            if len({item_identity(item) for item in referenced}) > 1
        ],
        "duplicateContent": duplicates,
        "manualReviewLimitations": [
            "Anatomical AI defects such as duplicate heads or missing limbs require human visual review.",
            "Heuristic findings are report-only and are never automatic rejection input.",
        ],
        "images": rows,
    }


def write_csv(path: Path, image_report: dict[str, Any]) -> None:
    fields = [
        "id", "ids", "url", "source", "localPath", "status", "format", "width", "height",
        "blackRatio", "whiteRatio", "grayRatio", "hsvSaturationOverThresholdRatio", "rgbSaturationOverThresholdRatio",
        "rgbNonGrayRatio",
        "decodedRgbSha256", "issues", "error",
    ]
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        for image in image_report.get("images", []):
            row = dict(image)
            row["ids"] = "|".join(row.get("ids", []))
            row["issues"] = "|".join(row.get("issues", []))
            writer.writerow(row)


def main() -> int:
    args = parse_args()
    repo_root = args.repo_root.resolve()
    report: dict[str, Any]
    try:
        catalogs = load_catalogs(repo_root)
        report = {
            "schemaVersion": 1,
            "repoRoot": str(repo_root),
            "catalog": catalog_audit(catalogs, repo_root),
        }
        if args.apply_source_corrections:
            report["knownRejections"] = reject_items(
                catalogs, [{"id": identity} for identity in sorted(KNOWN_REJECTED_IDS)], True
            )
            report["featuredSelectorApply"] = apply_featured_selector_fixes(catalogs)
            report["titleApply"] = apply_safe_titles(catalogs)
            report["catalogAfterSourceCorrections"] = catalog_audit(catalogs, repo_root)
        if args.reject_file:
            report["rejections"] = reject_items(
                catalogs, load_rejections(args.reject_file.resolve()), args.apply_rejections
            )
            if args.apply_rejections:
                report["rejections"]["themeCountUpdates"] = refresh_theme_counts(repo_root, catalogs)
        if args.fix_titles and not args.apply_source_corrections:
            report["titleApply"] = apply_safe_titles(catalogs)
            report["catalogAfterTitleApply"] = catalog_audit(catalogs, repo_root)
        if not args.skip_images:
            report["imageAudit"] = image_audit(canonical_items(catalogs), repo_root, args)
            write_csv(args.csv_report.resolve(), report["imageAudit"])
        dump_json(args.json_report.resolve(), report)
    except (OSError, ValueError, json.JSONDecodeError, RuntimeError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 2

    print(json.dumps({
        "jsonReport": str(args.json_report.resolve()),
        "csvReport": None if args.skip_images else str(args.csv_report.resolve()),
        "catalogCounts": report["catalog"]["counts"],
        "imageCounts": report.get("imageAudit", {}).get("counts"),
        "rejections": report.get("rejections", {}).get("mode"),
        "titleApply": report.get("titleApply"),
    }, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
