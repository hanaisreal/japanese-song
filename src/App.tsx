import { useEffect, useState } from 'react';
import SongsPage from './pages/SongsPage';
import KanaPage from './pages/KanaPage';
import GrammarPage from './pages/GrammarPage';
import VocabPage from './pages/VocabPage';
import SettingsPanel from './components/SettingsPanel';
import ThemeEffect from './components/ThemeEffect';
import { useSettings } from './settings';
import { getTheme, useThemeId } from './theme';
import './App.css';

const TABS = [
  { id: 'songs', label: '노래', jp: '歌詞' },
  { id: 'kana', label: '문자', jp: 'かな' },
  { id: 'grammar', label: '문법', jp: '文法' },
  { id: 'vocab', label: '단어장', jp: '単語' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function App() {
  const [tab, setTab] = useState<TabId>('songs');
  const settings = useSettings();
  const themeId = useThemeId();
  const theme = getTheme(themeId);

  useEffect(() => {
    document.documentElement.style.setProperty('--lyric-scale', String(settings.fontScale));
    document.documentElement.style.setProperty('--content-max-width', `${settings.contentWidth}px`);
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--bg', theme.colors.bg);
    root.setProperty('--bg-panel', theme.colors.bgPanel);
    root.setProperty('--bg-card', theme.colors.bgCard);
    root.setProperty('--bg-card-open', theme.colors.bgCardOpen);
    root.setProperty('--border', theme.colors.border);
    root.setProperty('--border-soft', theme.colors.borderSoft);
    root.setProperty('--text', theme.colors.text);
    root.setProperty('--text-dim', theme.colors.textDim);
    root.setProperty('--burgundy', theme.colors.burgundy);
    root.setProperty('--burgundy-soft', theme.colors.burgundySoft);
    root.setProperty('--green', theme.colors.green);
    root.setProperty('--green-soft', theme.colors.greenSoft);
  }, [theme]);

  return (
    <div className="app">
      <ThemeEffect type={theme.effect} />
      <header className="topbar">
        <div className="brand">
          <span className="brand-jp">燈</span>
          <span className="brand-text">
            가사로 배우는 일본어
            <span className="brand-sub">歌詞で学ぶ日本語</span>
          </span>
        </div>
        <nav className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className="tab-jp">{t.jp}</span>
              {t.label}
            </button>
          ))}
        </nav>
        <SettingsPanel />
      </header>

      <main className="content">
        {tab === 'songs' && <SongsPage />}
        {tab === 'kana' && <KanaPage />}
        {tab === 'grammar' && <GrammarPage />}
        {tab === 'vocab' && <VocabPage />}
      </main>

      <footer className="footer">
        가사를 추가할수록 단어장과 문법 노트가 함께 자라납니다 🌱
      </footer>
    </div>
  );
}
