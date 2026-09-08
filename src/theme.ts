import { useEffect, useState } from 'react';

export type EffectType = 'none' | 'sakura' | 'snow' | 'hearts' | 'leaves';

export interface Theme {
  id: string;
  name: string;
  emoji: string;
  effect: EffectType;
  colors: {
    bg: string;
    bgPanel: string;
    bgCard: string;
    bgCardOpen: string;
    border: string;
    borderSoft: string;
    text: string;
    textDim: string;
    burgundy: string;
    burgundySoft: string;
    green: string;
    greenSoft: string;
  };
}

export const THEMES: Theme[] = [
  {
    id: 'default',
    name: '기본 (크림)',
    emoji: '🍃',
    effect: 'none',
    colors: {
      bg: '#f0eee5',
      bgPanel: '#f7f5ee',
      bgCard: '#fbfaf6',
      bgCardOpen: '#fefdfa',
      border: '#ded9cb',
      borderSoft: '#e8e4d8',
      text: '#3d3929',
      textDim: '#85806e',
      burgundy: '#8a3b3f',
      burgundySoft: 'rgba(138, 59, 63, 0.08)',
      green: '#4a6b57',
      greenSoft: 'rgba(74, 107, 87, 0.09)',
    },
  },
  {
    id: 'red-lime',
    name: '레드 & 연두',
    emoji: '🍋',
    effect: 'leaves',
    colors: {
      bg: '#fffaf3',
      bgPanel: '#e9f7c5',
      bgCard: '#fffdf5',
      bgCardOpen: '#ffffff',
      border: '#f3b3ad',
      borderSoft: '#f7cfc9',
      text: '#2a1a16',
      textDim: '#8f6f66',
      burgundy: '#c21d1d',
      burgundySoft: 'rgba(227, 52, 47, 0.10)',
      green: '#4d7a1a',
      greenSoft: 'rgba(163, 230, 53, 0.20)',
    },
  },
  {
    id: 'sakura',
    name: '벚꽃길',
    emoji: '🌸',
    effect: 'sakura',
    colors: {
      bg: '#fff8fa',
      bgPanel: '#fde8f0',
      bgCard: '#fffbfc',
      bgCardOpen: '#ffffff',
      border: '#f9cddc',
      borderSoft: '#fbdde8',
      text: '#3f2f38',
      textDim: '#a58a98',
      burgundy: '#c94f7c',
      burgundySoft: 'rgba(242, 138, 178, 0.12)',
      green: '#7c9473',
      greenSoft: 'rgba(124, 148, 115, 0.14)',
    },
  },
  {
    id: 'snow',
    name: '눈 오는 밤',
    emoji: '❄️',
    effect: 'snow',
    colors: {
      bg: '#0f1a2b',
      bgPanel: '#0b1422',
      bgCard: '#16233a',
      bgCardOpen: '#1b2a44',
      border: '#223349',
      borderSoft: '#1c2c40',
      text: '#e6eef8',
      textDim: '#8a9bb5',
      burgundy: '#3d6fa8',
      burgundySoft: 'rgba(142, 197, 255, 0.14)',
      green: '#2f9e8c',
      greenSoft: 'rgba(47, 158, 140, 0.16)',
    },
  },
  {
    id: 'candy',
    name: '라벤더 캔디',
    emoji: '💜',
    effect: 'hearts',
    colors: {
      bg: '#faf6ff',
      bgPanel: '#f1e8ff',
      bgCard: '#fdfbff',
      bgCardOpen: '#ffffff',
      border: '#e0cffa',
      borderSoft: '#ede0fc',
      text: '#3a2e4d',
      textDim: '#9a89b5',
      burgundy: '#b45cd6',
      burgundySoft: 'rgba(180, 92, 214, 0.12)',
      green: '#ff7fb4',
      greenSoft: 'rgba(255, 127, 180, 0.14)',
    },
  },
];

const STORAGE_KEY = 'themeId';

function loadThemeId(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? 'default';
  } catch {
    return 'default';
  }
}

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

let themeId = loadThemeId();
const listeners = new Set<(id: string) => void>();

export function setThemeId(id: string) {
  themeId = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // localStorage unavailable — theme choice just won't persist
  }
  listeners.forEach((l) => l(id));
}

export function useThemeId() {
  const [id, setId] = useState(themeId);
  useEffect(() => {
    listeners.add(setId);
    return () => {
      listeners.delete(setId);
    };
  }, []);
  return id;
}
