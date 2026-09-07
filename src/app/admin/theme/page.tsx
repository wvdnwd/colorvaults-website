'use client';

import { useEffect, useState } from 'react';
import AdminShell from '../AdminShell';
import { HOLIDAY_THEMES, HolidayThemeId, HolidayThemeConfig, resolveHolidayTheme } from '@/data/holidayThemes';
import styles from './theme.module.css';

export default function AdminThemePage() {
  const [activeThemeId, setActiveThemeId] = useState<HolidayThemeId>('auto');
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [bannerEnabled, setBannerEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/theme-config')
      .then(res => res.json())
      .then(data => {
        if (data.config) {
          setActiveThemeId(data.config.activeTheme || 'auto');
          setEffectsEnabled(data.config.effectsEnabled ?? true);
          setBannerEnabled(data.config.bannerEnabled ?? true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load theme config:', err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (themeToSave = activeThemeId, effects = effectsEnabled, banner = bannerEnabled) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/theme-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activeTheme: themeToSave,
          effectsEnabled: effects,
          bannerEnabled: banner
        })
      });

      if (res.ok) {
        showToast('🎉 Thema instellingen succesvol opgeslagen & live geactiveerd!');
      } else {
        showToast('❌ Fout bij opslaan van thema');
      }
    } catch (e) {
      console.error(e);
      showToast('❌ Fout bij verbinding met server');
    } finally {
      setSaving(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectTheme = (id: HolidayThemeId) => {
    setActiveThemeId(id);
    handleSave(id, effectsEnabled, bannerEnabled);
  };

  const resolvedTheme = resolveHolidayTheme(activeThemeId);
  const themesList = Object.values(HOLIDAY_THEMES);

  return (
    <AdminShell title="Feestdagen & Thema Switcher">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span>🎨</span> Feestdagen & Thema Switcher
          </h1>
          <p className={styles.subtitle}>
            Versier de ColorVaults website met 1 klik voor feestdagen of laat de website automatisch wisselen via de Feestdagen Kalender.
          </p>
        </div>

        {/* Global Controls */}
        <div className={styles.controlsBar}>
          <div className={styles.controlsGrid}>
            {/* Auto Toggle */}
            <div className={styles.switchCard}>
              <div className={styles.switchLabel}>
                <span className={styles.switchTitle}>
                  <span>🤖</span> Auto-Kalender Modus
                </span>
                <span className={styles.switchDesc}>
                  Wisselt automatisch mee met actuele feestdagen
                </span>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={activeThemeId === 'auto'}
                  onChange={(e) => {
                    const newId = e.target.checked ? 'auto' : 'default';
                    selectTheme(newId);
                  }}
                />
                <span className={styles.slider} />
              </label>
            </div>

            {/* Effects Toggle */}
            <div className={styles.switchCard}>
              <div className={styles.switchLabel}>
                <span className={styles.switchTitle}>
                  <span>✨</span> Zwevende Feesteffecten
                </span>
                <span className={styles.switchDesc}>
                  Sneeuw, vleermuizen, confetti, vallende bladeren
                </span>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={effectsEnabled}
                  onChange={(e) => {
                    setEffectsEnabled(e.target.checked);
                    handleSave(activeThemeId, e.target.checked, bannerEnabled);
                  }}
                />
                <span className={styles.slider} />
              </label>
            </div>

            {/* Banner Toggle */}
            <div className={styles.switchCard}>
              <div className={styles.switchLabel}>
                <span className={styles.switchTitle}>
                  <span>📢</span> Feestdagen Top-Banner
                </span>
                <span className={styles.switchDesc}>
                  Opvallende banner bovenaan met directe link
                </span>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={bannerEnabled}
                  onChange={(e) => {
                    setBannerEnabled(e.target.checked);
                    handleSave(activeThemeId, effectsEnabled, e.target.checked);
                  }}
                />
                <span className={styles.slider} />
              </label>
            </div>
          </div>

          {/* Active Status Display */}
          <div className={styles.statusBox}>
            <div className={styles.statusInfo}>
              <span className={styles.statusIcon}>{resolvedTheme.emoji}</span>
              <div className={styles.statusText}>
                <h4>
                  Huidig Actief Thema: <strong>{resolvedTheme.nameNl}</strong>
                  {activeThemeId === 'auto' && ' (Automatisch via Kalender)'}
                </h4>
                <p>
                  Accent: <span style={{ color: resolvedTheme.primaryColor, fontWeight: 800 }}>● {resolvedTheme.primaryColor}</span> | 
                  Effect: <strong>{resolvedTheme.particleType.toUpperCase()}</strong> | 
                  Link: <code>/{resolvedTheme.banner.targetSlug}</code>
                </p>
              </div>
            </div>

            <button
              className={styles.saveBtn}
              onClick={() => handleSave()}
              disabled={saving || loading}
            >
              <span>💾</span> {saving ? 'Opslaan...' : 'Wijzigingen Opslaan'}
            </button>
          </div>
        </div>

        {/* Themes Grid */}
        <div className={styles.themesGrid}>
          {themesList.map((t) => {
            const isSelected = activeThemeId === t.id;
            const isCurrentlyResolved = resolvedTheme.id === t.id;

            return (
              <div
                key={t.id}
                className={`${styles.themeCard} ${isSelected ? styles.themeCardActive : ''}`}
                onClick={() => selectTheme(t.id)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardEmoji}>{t.emoji}</div>
                  <div className={styles.cardTitleGroup}>
                    <h3 className={styles.cardTitle}>{t.nameNl}</h3>
                    <span className={styles.cardBadge}>{t.badge}</span>
                  </div>
                </div>

                {/* Palette Preview */}
                <div
                  className={styles.palettePreview}
                  style={{ background: t.bannerGradient }}
                />

                <div className={styles.cardDetails}>
                  <div className={detailRowClass(styles)}>
                    <span className={styles.detailKey}>Effect Animatie:</span>
                    <span className={styles.detailVal}>
                      {t.particleType === 'none' ? 'Geen' : `${t.particleType} (${t.particleCount}x)`}
                    </span>
                  </div>
                  <div className={detailRowClass(styles)}>
                    <span className={styles.detailKey}>Accent Kleur:</span>
                    <span className={styles.detailVal} style={{ color: t.primaryColor }}>
                      ■ {t.primaryColor}
                    </span>
                  </div>
                  <div className={detailRowClass(styles)}>
                    <span className={styles.detailKey}>Doelpagina:</span>
                    <span className={styles.detailVal}>
                      /{t.banner.targetSlug.split('/')[1] || t.banner.targetSlug}
                    </span>
                  </div>
                </div>

                <div className={styles.bannerSnippet}>
                  "{t.banner.titleNl}"
                </div>

                <button
                  type="button"
                  className={`${styles.selectBtn} ${isSelected ? styles.selectBtnActive : ''}`}
                >
                  {isSelected ? '✓ Actief Geselecteerd' : (isCurrentlyResolved && activeThemeId === 'auto' ? '★ Live via Auto-Kalender' : 'Activeer Dit Thema')}
                </button>
              </div>
            );
          })}
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className={styles.toast}>
            {toastMessage}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function detailRowClass(styles: any) {
  return styles.detailRow;
}
