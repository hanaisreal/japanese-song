import { useEffect, useRef, useState } from 'react';
import {
  CONTENT_WIDTH_MAX,
  CONTENT_WIDTH_MIN,
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  updateSettings,
  useSettings,
} from '../settings';

/** 헤더의 설정(⚙) 버튼 — 글자 크기·여백 너비를 전역으로 조절 */
export default function SettingsPanel() {
  const settings = useSettings();
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
        ⚙
      </button>
      {open && (
        <div className="settings-popover">
          <div className="settings-row">
            <label htmlFor="setting-font-scale">글자 크기</label>
            <input
              id="setting-font-scale"
              type="range"
              min={FONT_SCALE_MIN}
              max={FONT_SCALE_MAX}
              step={0.04}
              value={settings.fontScale}
              onChange={(e) => updateSettings({ fontScale: Number(e.target.value) })}
            />
            <span className="settings-value">{Math.round(settings.fontScale * 100)}%</span>
          </div>
          <div className="settings-row">
            <label htmlFor="setting-content-width">여백 너비</label>
            <input
              id="setting-content-width"
              type="range"
              min={CONTENT_WIDTH_MIN}
              max={CONTENT_WIDTH_MAX}
              step={20}
              value={settings.contentWidth}
              onChange={(e) => updateSettings({ contentWidth: Number(e.target.value) })}
            />
            <span className="settings-value">{settings.contentWidth}px</span>
          </div>
        </div>
      )}
    </div>
  );
}
