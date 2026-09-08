import { useEffect, useState } from 'react';

export interface FontOption {
  id: string;
  label: string;
  css: string;
}

export const JP_FONTS: FontOption[] = [
  { id: 'mincho', label: '명조 (기본)', css: '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif' },
  { id: 'gothic', label: '고딕', css: '"Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif' },
  { id: 'maru', label: '둥근 고딕', css: '"Hiragino Maru Gothic ProN", "Noto Sans JP", sans-serif' },
];

export const KO_FONTS: FontOption[] = [
  { id: 'pretendard', label: '프리텐다드 (기본)', css: '"Pretendard", "Apple SD Gothic Neo", sans-serif' },
  { id: 'nanum-myeongjo', label: '나눔명조', css: '"Nanum Myeongjo", "Apple Myungjo", serif' },
  { id: 'noto-sans-kr', label: 'Noto Sans KR', css: '"Noto Sans KR", "Apple SD Gothic Neo", sans-serif' },
];

export interface AppSettings {
  /** 일본어 가사(원문·후리가나) 글자 크기 배율 */
  jpScale: number;
  /** 한국어(발음·번역) 글자 크기 배율 */
  koScale: number;
  /** 일본어 가사 글꼴 (JP_FONTS의 id) */
  jpFont: string;
  /** 한국어(발음·번역) 글꼴 (KO_FONTS의 id) */
  koFont: string;
  /** 한국어식 발음(로마자 아님, 한글 표기) 표시 여부 */
  showReading: boolean;
  /** 한국어 번역 표시 여부 */
  showTranslation: boolean;
  /** 가사 줄(문단) 사이 간격(px) */
  lineGap: number;
}

export const FONT_SCALE_MIN = 0.72;
export const FONT_SCALE_MAX = 1.28;
export const LINE_GAP_MIN = 8;
export const LINE_GAP_MAX = 56;

const DEFAULT_SETTINGS: AppSettings = {
  jpScale: 1,
  koScale: 1,
  jpFont: 'mincho',
  koFont: 'pretendard',
  showReading: true,
  showTranslation: true,
  lineGap: 24,
};
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

export function getFontCss(list: FontOption[], id: string): string {
  return (list.find((f) => f.id === id) ?? list[0]).css;
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
