'use client';

import { useState } from'react';
import styles from'./ReportButton.module.css';

interface ReportButtonProps {
 imageUrl: string;
 category: string;
 isEn: boolean;
}

const REASONS_EN = [
 { value:'quality', label:'Poor image quality / too dark'},
 { value:'wrong', label:'Wrong image shown'},
 { value:'category', label:'Wrong category'},
 { value:'offensive', label:'Offensive or inappropriate'},
 { value:'other', label:'Something else'},
];

const REASONS_NL = [
 { value:'quality', label:'Slechte beeldkwaliteit / te donker'},
 { value:'wrong', label:'Verkeerde afbeelding'},
 { value:'category', label:'Verkeerde categorie'},
 { value:'offensive', label:'Aanstootgevend of ongepast'},
 { value:'other', label:'Iets anders'},
];

export default function ReportButton({ imageUrl, category, isEn }: ReportButtonProps) {
 const [open, setOpen] = useState(false);
 const [reason, setReason] = useState('');
 const [details, setDetails] = useState('');
 const [sending, setSending] = useState(false);
 const [done, setDone] = useState(false);

 const reasons = isEn ? REASONS_EN : REASONS_NL;

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!reason || sending) return;
 setSending(true);

 try {
 await fetch('/api/report', {
 method:'POST',
 headers: {'Content-Type':'application/json'},
 body: JSON.stringify({ imageUrl, category, reason, details }),
 });
 setDone(true);
 } catch {
 // silently fail — report is optional UX
 } finally {
 setSending(false);
 }
 };

 const handleClose = () => {
 setOpen(false);
 setTimeout(() => { setDone(false); setReason(''); setDetails(''); }, 300);
 };

 return (
 <div className={styles.reportWrap}>
 <button className={styles.reportTrigger} onClick={() => setOpen(true)}>
 <span className={styles.reportIcon}></span>
 {isEn ?'Something wrong with this image?':'Klopt er iets niet met deze kleurplaat?'}
 </button>

 {open && (
 <div className={styles.overlay} onClick={handleClose}>
 <div className={styles.modal} onClick={e => e.stopPropagation()}>
 <button className={styles.modalClose} onClick={handleClose}></button>

 {done ? (
 <div className={styles.successBox}>
 <div className={styles.successIcon}></div>
 <p className={styles.successTitle}>
 {isEn ?'Thank you!':'Bedankt!'}
 </p>
 <p className={styles.successSub}>
 {isEn
 ?'We received your report and will take a look.':'We hebben je melding ontvangen en kijken ernaar.'}
 </p>
 </div>
 ) : (
 <>
 <p className={styles.modalTitle}>
 {isEn ?'Report an Issue':'Probleem Melden'}
 </p>
 <p className={styles.modalSub}>
 {isEn
 ?'Help us improve ColorVaults. We review all reports.':'Help ons ColorVaults te verbeteren. We bekijken alle meldingen.'}
 </p>

 <form onSubmit={handleSubmit}>
 <label className={styles.label}>
 {isEn ?'What is the problem?':'Wat is het probleem?'} *
 </label>
 <select
 className={styles.select}
 value={reason}
 onChange={e => setReason(e.target.value)}
 required
 >
 <option value="">{isEn ?'Select a reason...':'Kies een reden...'}</option>
 {reasons.map(r => (
 <option key={r.value} value={r.value}>{r.label}</option>
 ))}
 </select>

 <label className={styles.label}>
 {isEn ?'Additional details (optional)':'Extra toelichting (optioneel)'}
 </label>
 <textarea
 className={styles.textarea}
 value={details}
 onChange={e => setDetails(e.target.value)}
 placeholder={isEn ?'Describe the issue...':'Beschrijf het probleem...'}
 rows={3}
 />

 <button
 type="submit"className={styles.submitBtn}
 disabled={!reason || sending}
 >
 {sending
 ? (isEn ?'Sending...':'Verzenden...')
 : (isEn ?'Send Report':'Melding Versturen')}
 </button>
 </form>
 </>
 )}
 </div>
 </div>
 )}
 </div>
 );
}
