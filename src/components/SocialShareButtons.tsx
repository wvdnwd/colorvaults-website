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
 target="_blank" rel="noopener noreferrer" className={`${styles.shareBtn} ${styles.whatsapp}`}
 aria-label="Share on WhatsApp">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24h.22z"/>
 </svg>
 <span>WhatsApp</span>
 </a>

 <a
 href={pinterestUrl}
 target="_blank" rel="noopener noreferrer" className={`${styles.shareBtn} ${styles.pinterest}`}
 aria-label="Pin on Pinterest">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.369-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
 </svg>
 <span>Pinterest</span>
 </a>

 <a
 href={facebookUrl}
 target="_blank" rel="noopener noreferrer" className={`${styles.shareBtn} ${styles.facebook}`}
 aria-label="Share on Facebook">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
 </svg>
 <span>Facebook</span>
 </a>

 <button
 onClick={handleCopyLink}
 className={`${styles.shareBtn} ${styles.copyLink}`}
 type="button">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
 </svg>
 <span>{copied ? (isEn ?'Copied!':'Gekopieerd!') : (isEn ?'Copy Link':'Link Kopiëren')}</span>
 </button>
 </div>
 </div>
 );
}
