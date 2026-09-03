'use client';

import { useState } from'react';
import styles from'./SocialShareButtons.module.css';

interface SocialShareButtonsProps {
 isEn: boolean;
 title: string;
 url: string;
 imageUrl: string;
}

export default function SocialShareButtons({
 isEn,
 title,
 url,
 imageUrl,
}: SocialShareButtonsProps) {
 const [copied, setCopied] = useState(false);

 const fullUrl = typeof window !=='undefined'? window.location.href : url;
 const shareText = isEn
 ?`Check out this free printable coloring page: ${title}`:`Bekijk deze gratis printbare kleurplaat: ${title}`;

 const whatsappUrl =`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${fullUrl}`)}`;
 const pinterestUrl =`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(shareText)}`;
 const facebookUrl =`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;

 const handleCopyLink = async () => {
 try {
 await navigator.clipboard.writeText(fullUrl);
 setCopied(true);
 setTimeout(() => setCopied(false), 2500);
 } catch (err) {
 console.error('Failed to copy', err);
 }
 };

 return (
 <div className={styles.shareContainer}>
 <span className={styles.shareTitle}>
 {isEn ?'Share with Friends & Family:':'Deel met Vrienden & Familie:'}
 </span>

 <div className={styles.buttonRow}>
 <a
 href={whatsappUrl}
 target="_blank"rel="noopener noreferrer"className={`${styles.shareBtn} ${styles.whatsapp}`}
 aria-label="Share on WhatsApp">
 <span></span> WhatsApp
 </a>

 <a
 href={pinterestUrl}
 target="_blank"rel="noopener noreferrer"className={`${styles.shareBtn} ${styles.pinterest}`}
 aria-label="Pin on Pinterest">
 <span></span> Pinterest
 </a>

 <a
 href={facebookUrl}
 target="_blank"rel="noopener noreferrer"className={`${styles.shareBtn} ${styles.facebook}`}
 aria-label="Share on Facebook">
 <span></span> Facebook
 </a>

 <button
 onClick={handleCopyLink}
 className={`${styles.shareBtn} ${styles.copyLink}`}
 type="button">
 <span></span> {copied ? (isEn ?'Copied!':'Gekopieerd!') : (isEn ?'Copy Link':'Link Kopiëren')}
 </button>
 </div>
 </div>
 );
}
