import { useState } from 'react';
import { GOJUON, DAKUON, YOON, toKatakana, type KanaRow } from '../data/kana';
import { kanaToRomaji } from '../romaji';
import { speak } from '../speak';

type Script = 'hiragana' | 'katakana';

const GOJUON_COLUMNS = ['あ段', 'い段', 'う段', 'え段', 'お段'];
const YOON_COLUMNS = ['ゃ', 'ゅ', 'ょ'];

function KanaChart({
  rows,
  script,
  showRomaji,
  columns,
}: {
  rows: KanaRow[];
  script: Script;
  showRomaji: boolean;
  columns: string[];
}) {
  return (
    <div className="kana-table-wrap">
      <table className="kana-table">
        <thead>
          <tr>
            <th className="kana-head row-head">행</th>
            {columns.map((column) => (
              <th key={column} className="kana-head">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th className="kana-row-name" scope="row">
                {row.name}
              </th>
              {row.kana.map((k, i) => {
                if (!k) return <td key={i} className="kana-slot empty" aria-label="빈 칸" />;
                const display = script === 'katakana' ? toKatakana(k) : k;
                return (
                  <td key={i} className="kana-slot">
                    <button
                      className="kana-cell"
                      title={`${display} ${kanaToRomaji(k)} — 클릭하면 발음이 나옵니다`}
                      onClick={() => speak(k)}
                    >
                      <span className="kana-char">{display}</span>
                      {showRomaji && <span className="kana-romaji">{kanaToRomaji(k)}</span>}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function KanaPage() {
  const [script, setScript] = useState<Script>('hiragana');
  const [showRomaji, setShowRomaji] = useState(true);

  return (
    <div className="page kana-page">
      <header className="page-header">
        <div>
          <h2 className="page-title">
            {script === 'hiragana' ? 'ひらがな' : 'カタカナ'}
            <span className="page-title-sub">오십음도 五十音図</span>
          </h2>
          <p className="page-desc">
            오십음도는 <strong>행(자음 계열)</strong> × <strong>단(모음 a·i·u·e·o)</strong>으로 봐야 헷갈리지 않습니다.
            빈 칸은 현대 일본어에서 보통 쓰지 않는 자리예요.
          </p>
        </div>
        <div className="controls">
          <div className="seg">
            <button
              className={`seg-btn ${script === 'hiragana' ? 'active' : ''}`}
              onClick={() => setScript('hiragana')}
            >
              ひらがな
            </button>
            <button
              className={`seg-btn ${script === 'katakana' ? 'active' : ''}`}
              onClick={() => setScript('katakana')}
            >
              カタカナ
            </button>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={showRomaji}
              onChange={(e) => setShowRomaji(e.target.checked)}
            />
            로마자
          </label>
        </div>
      </header>

      <section className="kana-section">
        <h3 className="section-name">청음 清音</h3>
        <KanaChart rows={GOJUON} script={script} showRomaji={showRomaji} columns={GOJUON_COLUMNS} />
      </section>

      <section className="kana-section">
        <h3 className="section-name">탁음·반탁음 濁音・半濁音</h3>
        <p className="page-desc">
          か→が처럼 점 두 개(゛)를 붙이면 탁음, は→ぱ처럼 동그라미(゜)를 붙이면 반탁음입니다.
          ぢ·づ는 표에 넣되 실제 단어에서는 じ·ず보다 훨씬 제한적으로 쓰입니다.
        </p>
        <KanaChart rows={DAKUON} script={script} showRomaji={showRomaji} columns={GOJUON_COLUMNS} />
      </section>

      <section className="kana-section">
        <h3 className="section-name">요음 拗音</h3>
        <p className="page-desc">
          い단 글자에 작은 ゃ·ゅ·ょ를 붙여 한 박으로 읽습니다. 예: きや(kiya)와 きゃ(kya)는 다릅니다.
        </p>
        <KanaChart rows={YOON} script={script} showRomaji={showRomaji} columns={YOON_COLUMNS} />
      </section>

      <div className="grammar-box">
        <div className="grammar-title">읽기 규칙 메모</div>
        <ul>
          <li>작은 っ(촉음)은 다음 자음을 겹쳐 끊어 읽습니다 — きって(kitte)</li>
          <li>ん은 뒤 소리에 따라 n/m/ng처럼 들립니다 — せんぱい(sempai처럼)</li>
          <li>장음: おう는 보통 오— 로 길게 — ありがとう(arigatō)</li>
          <li>조사 は→wa, へ→e, を→o 로 발음합니다</li>
        </ul>
      </div>
    </div>
  );
}
