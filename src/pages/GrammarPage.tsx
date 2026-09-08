import { useMemo, useState } from 'react';
import { GRAMMAR, type GrammarEntry } from '../data/grammar';
import { songs } from '../data';
import { speak } from '../speak';

const CATEGORIES = ['전체', '조사', '조동사·어미', '활용형', '표현'] as const;

function GrammarCard({ entry }: { entry: GrammarEntry }) {
  return (
    <div className="grammar-card">
      <div className="grammar-card-head">
        <span className="grammar-surface">{entry.surface}</span>
        {entry.reading && (
          <span className="grammar-reading">{entry.reading}</span>
        )}
        <span className="grammar-cat">{entry.category}</span>
      </div>
      <div className="grammar-meaning">{entry.meaning}</div>
      <p className="grammar-explain">{entry.explain}</p>
      {entry.example && (
        <div className="grammar-example">
          <button
            className="speak-btn small"
            title="발음 듣기"
            onClick={() => speak(entry.example!.jp)}
          >
            🔊
          </button>
          <span className="ex-jp">{entry.example.jp}</span>
          <span className="ex-ko">{entry.example.ko}</span>
        </div>
      )}
    </div>
  );
}

export default function GrammarPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('전체');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return GRAMMAR.filter((g) => {
      if (cat !== '전체' && g.category !== cat) return false;
      if (!q) return true;
      const hay = `${g.surface}${g.meaning}${g.explain}`;
      return hay.includes(q);
    });
  }, [cat, q]);

  // 노래에서 나온 문법 포인트 자동 수집
  const fromSongs = useMemo(() => {
    const out: { song: string; line: string; point: string }[] = [];
    for (const s of songs) {
      for (const sec of s.sections) {
        for (const line of sec.lines) {
          for (const g of line.grammar ?? []) {
            out.push({ song: s.title, line: line.jp, point: g });
          }
        }
      }
    }
    return out;
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h2 className="page-title">
            문법<span className="page-title-sub">조사·어미·활용</span>
          </h2>
          <p className="page-desc">
            가사에서 가장 자주 만나는 조사와 어미를 정리했습니다. 예문의 🔊로
            발음도 들어보세요.
          </p>
        </div>
        <input
          className="search"
          placeholder="검색 (예: を, 부정, ~하고 싶다)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </header>

      <div className="seg wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`seg-btn ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grammar-grid">
        {filtered.map((g, i) => (
          <GrammarCard key={i} entry={g} />
        ))}
        {filtered.length === 0 && (
          <p className="page-desc">검색 결과가 없습니다.</p>
        )}
      </div>

      {fromSongs.length > 0 && (
        <>
          <h3 className="section-name">노래에서 배운 문법</h3>
          <div className="table-scroll">
            <table className="token-table">
              <thead>
                <tr>
                  <th>문법 포인트</th>
                  <th>나온 가사</th>
                  <th>곡</th>
                </tr>
              </thead>
              <tbody>
                {fromSongs.map((f, i) => (
                  <tr key={i}>
                    <td className="td-meaning">{f.point}</td>
                    <td className="td-jp-serif">{f.line}</td>
                    <td className="td-note">{f.song}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
