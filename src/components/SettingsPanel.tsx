import { useEffect, useRef, useState } from 'react';
import {
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  JP_FONTS,
  KO_FONTS,
  LINE_GAP_MAX,
  LINE_GAP_MIN,
  updateSettings,
  useSettings,
} from '../settings';
import { THEMES, setThemeId, useThemeId } from '../theme';

/** 헤더의 설정(⚙) 버튼 — 글자 크기·여백 너비를 전역으로 조절 */
export default function SettingsPanel() {
  const settings = useSettings();
  const themeId = useThemeId();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div className="settings-panel" ref={ref}>
      <button
        className="settings-toggle"
        aria-label="설정"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 48 48" className="settings-gear" aria-hidden="true">
          <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const major = i % 3 === 0;
            const r1 = major ? 15.5 : 17;
            const r2 = 20.5;
            return (
              <line
                key={i}
                x1={24 + Math.cos(angle) * r1}
                y1={24 + Math.sin(angle) * r1}
                x2={24 + Math.cos(angle) * r2}
                y2={24 + Math.sin(angle) * r2}
                stroke="currentColor"
                strokeWidth={major ? 2.4 : 1.3}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx="24" cy="24" r="12.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="24" cy="24" r="2.6" fill="currentColor" />
          <line x1="24" y1="24" x2="24" y2="15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="settings-popover">
          <div className="settings-theme-row">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`theme-swatch ${themeId === t.id ? 'active' : ''}`}
                style={{ background: t.colors.bg, borderColor: t.colors.burgundy }}
                onClick={() => setThemeId(t.id)}
                title={t.name}
              >
                <span>{t.emoji}</span>
                <small style={{ color: t.colors.text }}>{t.name}</small>
              </button>
            ))}
          </div>
          <div className="settings-row">
            <label htmlFor="setting-jp-scale">일본어 크기</label>
            <input
              id="setting-jp-scale"
              type="range"
              min={FONT_SCALE_MIN}
              max={FONT_SCALE_MAX}
              step={0.04}
              value={settings.jpScale}
              onChange={(e) => updateSettings({ jpScale: Number(e.target.value) })}
            />
            <span className="settings-value">{Math.round(settings.jpScale * 100)}%</span>
          </div>
          <div className="settings-row">
            <label htmlFor="setting-ko-scale">한국어 크기</label>
            <input
              id="setting-ko-scale"
              type="range"
              min={FONT_SCALE_MIN}
              max={FONT_SCALE_MAX}
              step={0.04}
              value={settings.koScale}
              onChange={(e) => updateSettings({ koScale: Number(e.target.value) })}
            />
            <span className="settings-value">{Math.round(settings.koScale * 100)}%</span>
          </div>
          <div className="settings-row">
            <label htmlFor="setting-line-gap">문단 간격</label>
            <input
              id="setting-line-gap"
              type="range"
              min={LINE_GAP_MIN}
              max={LINE_GAP_MAX}
              step={2}
              value={settings.lineGap}
              onChange={(e) => updateSettings({ lineGap: Number(e.target.value) })}
            />
            <span className="settings-value">{settings.lineGap}px</span>
          </div>
          <div className="settings-row">
            <label htmlFor="setting-jp-font">일본어 폰트</label>
            <select
              id="setting-jp-font"
              className="settings-select"
              value={settings.jpFont}
              onChange={(e) => updateSettings({ jpFont: e.target.value })}
            >
              {JP_FONTS.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
            <span />
          </div>
          <div className="settings-row">
            <label htmlFor="setting-ko-font">한국어 폰트</label>
            <select
              id="setting-ko-font"
              className="settings-select"
              value={settings.koFont}
              onChange={(e) => updateSettings({ koFont: e.target.value })}
            >
              {KO_FONTS.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
            <span />
          </div>
          <label className="toggle settings-korean-toggle">
            <input
              type="checkbox"
              checked={settings.showReading}
              onChange={(e) => updateSettings({ showReading: e.target.checked })}
            />
            한국어식 발음 표시
          </label>
          <label className="toggle settings-korean-toggle">
            <input
              type="checkbox"
              checked={settings.showTranslation}
              onChange={(e) => updateSettings({ showTranslation: e.target.checked })}
            />
            한국어 번역 표시
          </label>
        </div>
      )}
    </div>
  );
}
