import { useEffect, useState } from 'react';

export interface AppSettings {
  /** 가사/본문 글자 크기 배율 */
  fontScale: number;
  /** 본문(가사·문법·단어장 등) 최대 너비(px) — 좌우 여백 조절용 */
  contentWidth: number;
}

export const FONT_SCALE_MIN = 0.72;
export const FONT_SCALE_MAX = 1.28;
export const CONTENT_WIDTH_MIN = 560;
export const CONTENT_WIDTH_MAX = 1200;

const DEFAULT_SETTINGS: AppSettings = { fontScale: 1, contentWidth: 900 };
const STORAGE_KEY = 'appSettings';

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

let settings = loadSettings();
const listeners = new Set<(s: AppSettings) => void>();

export function updateSettings(patch: Partial<AppSettings>) {
  settings = { ...settings, ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  listeners.forEach((listener) => listener(settings));
}

export function useSettings() {
  const [state, setState] = useState(settings);
  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);
  return state;
}
