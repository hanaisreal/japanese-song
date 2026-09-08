import { useMemo, useState } from 'react';
import { songs } from '../data';
import { POS_INFO } from '../pos';
import type { POS, Token } from '../types';
import { speak } from '../speak';

// 단어장에 담을 품사 (조사·어미는 문법 탭에서 다룸)
const VOCAB_POS: POS[] = [
  'noun', 'pronoun', 'verb', 'i-adj', 'na-adj', 'adverb',
  'conjunction', 'interjection', 'prenoun', 'expression',
];

interface VocabItem {
  token: Token;
  songTitles: string[];
}

export default function VocabPage() {
  const [q, setQ] = useState('');
  const [posFilter, setPosFilter] = useState<POS | 'all'>('all');

  const items = useMemo(() => {
    const map = new Map<string, VocabItem>();
    for (const s of songs) {
      for (const sec of s.sections) {
        for (const line of sec.lines) {
          for (const t of line.tokens) {
            if (!VOCAB_POS.includes(t.pos)) continue;
            if (!/[\p{L}\p{N}]/u.test(t.surface)) continue; // 문장부호·공백 토큰 제외
            const key = `${t.base ?? t.surface}|${t.pos}`;
            const existing = map.get(key);
            if (existing) {
              if (!existing.songTitles.includes(s.title)) {
                existing.songTitles.push(s.title);
              }
            } else {
              map.set(key, { token: t, songTitles: [s.title] });
            }
          }
        }
      }
    }
    return [...map.values()];
  }, []);

  const filtered = items.filter(({ token: t }) => {
    if (posFilter !== 'all' && t.pos !== posFilter) return false;
    if (!q) return true;
    const hay = `${t.surface}${t.base ?? ''}${t.reading ?? ''}${t.meaning}`;
    return hay.includes(q);
  });

  const usedPos = [...new Set(items.map((i) => i.token.pos))];

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h2 className="page-title">
            단어장<span className="page-title-sub">単語帳</span>
          </h2>
          <p className="page-desc">
            추가한 모든 곡의 단어가 자동으로 모입니다. 현재{' '}
            <strong>{items.length}</strong>개.
          </p>
        </div>
        <input
          className="search"
          placeholder="검색 (일본어·읽기·뜻)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </header>

      <div className="seg wrap">
        <button
          className={`seg-btn ${posFilter === 'all' ? 'active' : ''}`}
          onClick={() => setPosFilter('all')}
        >
          전체
        </button>
        {usedPos.map((p) => (
          <button
            key={p}
            className={`seg-btn ${posFilter === p ? 'active' : ''}`}
            style={posFilter === p ? { borderColor: POS_INFO[p].color } : {}}
            onClick={() => setPosFilter(p)}
          >
            {POS_INFO[p].ko}
          </button>
        ))}
      </div>

      <div className="table-scroll">
        <table className="token-table">
          <thead>
            <tr>
              <th></th>
              <th>단어</th>
              <th>읽기</th>
              <th>품사</th>
              <th>뜻</th>
              <th>나온 곡</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ token: t, songTitles }, i) => {
              const info = POS_INFO[t.pos];
              const word = t.base ?? t.surface;
              const reading = t.baseReading ?? t.reading ?? t.surface;
              return (
                <tr key={i}>
                  <td>
                    <button
                      className="speak-btn small"
                      title="발음 듣기"
                      onClick={() => speak(reading)}
                    >
                      🔊
                    </button>
                  </td>
                  <td className="td-surface" style={{ color: info.color }}>
                    {word}
                  </td>
                  <td className="td-reading">{reading}</td>
                  <td>
                    <span
                      className="pos-badge"
                      style={{ borderColor: info.color, color: info.color }}
                    >
                      {info.ko}
                    </span>
                  </td>
                  <td className="td-meaning">{t.meaning}</td>
                  <td className="td-note">{songTitles.join(', ')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <p className="page-desc">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
