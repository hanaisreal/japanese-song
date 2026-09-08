import { useEffect, useMemo, useRef, useState } from 'react';
import type { Line, Song, Token } from '../types';
import { kanaToRomaji } from '../romaji';
import { songs } from '../data';
import { songSources, type SongSource } from '../data/songSources';
import { findAndParseSongPage, parseSongPageUrl } from '../songPageFinder';
import { parsedPageToSong } from '../importedSong';
import Player, { type PlayerHandle } from '../components/Player';
import { useSettings } from '../settings';

// 곡 검색/URL 가져오기 기능은 일단 화면에서 비활성화 — 다시 켜려면 true로 변경
const SHOW_SONG_IMPORT = false;

const hasKanji = (s: string) => /[一-龯㐀-䶿]/.test(s);

const lineKey = (si: number, li: number) => `${si}-${li}`;

function fmtTime(t: number): string {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ---------- 싱크(타임스탬프) localStorage ----------
type SyncMap = Record<string, number>;

function loadSync(songId: string): SyncMap {
  try {
    return JSON.parse(localStorage.getItem(`sync:${songId}`) ?? '{}');
  } catch {
    return {};
  }
}

function saveSync(songId: string, map: SyncMap) {
  localStorage.setItem(`sync:${songId}`, JSON.stringify(map));
}

function TokenRuby({ token, furigana }: { token: Token; furigana: boolean }) {
  const word = isWordToken(token);
  const tooltip = [token.surface, token.reading, token.meaning].filter(Boolean).join(' · ');
  const className = `tok ${word ? 'tok-word' : 'tok-rest'}`;
  if (furigana && token.reading && hasKanji(token.surface)) {
    return (
      <ruby title={tooltip} className={className}>
        {token.surface}
        <rt>{token.reading}</rt>
      </ruby>
    );
  }
  return (
    <span title={tooltip} className={className}>
      {token.surface}
    </span>
  );
}

function displayKo(value: string): string {
  if (!value || value === '번역 확인 필요') return '한국어 번역 데이터 없음';
  if (value.startsWith('초벌:')) return '한국어 번역 데이터 없음';
  return value;
}

function isWordToken(token: Token): boolean {
  return token.meaning !== '문장부호' && token.pos !== 'particle' && token.pos !== 'auxiliary' && token.pos !== 'suffix';
}

function LineCard({
  line,
  index,
  furigana,
  romaji,
  showReading,
  showTranslation,
  active,
  start,
  syncMode,
  isNextToStamp,
  onPlay,
  onSeek,
  onStamp,
  cardRef,
}: {
  line: Line;
  index: number;
  furigana: boolean;
  romaji: boolean;
  showReading: boolean;
  showTranslation: boolean;
  active: boolean;
  start?: number;
  syncMode: boolean;
  isNextToStamp: boolean;
  onPlay: () => void;
  onSeek: () => void;
  onStamp: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const fullReading = line.tokens.map((t) => t.reading ?? t.surface).join('');
  return (
    <div
      ref={cardRef}
      className={`line-card ${active ? 'now' : ''} ${
        syncMode && isNextToStamp ? 'stamp-next' : ''
      }`}
    >
      <div className="line-head">
        {syncMode && start !== undefined ? (
          <button
            className="line-time"
            title="이 시점으로 이동"
            onClick={onSeek}
          >
            {fmtTime(start)}
          </button>
        ) : syncMode ? (
          <span className="line-num">{index + 1}</span>
        ) : null}
        <button className="line-main" onClick={onPlay}>
          <span className="line-jp">
            {line.tokens.map((t, i) => (
              <TokenRuby key={i} token={t} furigana={furigana} />
            ))}
          </span>
          {showReading && (
            <span className="line-pronunciation">{line.reading ?? line.tokens.map((token) => token.reading ?? token.surface).join(' ')}</span>
          )}
          {showTranslation && (
            <span className="line-ko-preview">{displayKo(line.ko)}</span>
          )}
        </button>
        {syncMode && (
          <button className="stamp-btn" title="지금 이 줄 시작!" onClick={onStamp}>
            ⏱
          </button>
        )}
      </div>
      {romaji && (
        <div className="line-romaji">{kanaToRomaji(fullReading)}</div>
      )}
    </div>
  );
}

function Legend() {
  return (
    <div className="legend two-color-legend">
      <span className="legend-item">
        <span className="legend-line" />
        단어는 밑줄
        <span className="legend-jp">善意 · 壊れる · 生活</span>
      </span>
      <span className="legend-item">
        나머지는 일반 표시
        <span className="legend-jp">조사 · 어미 · 연결</span>
      </span>
    </div>
  );
}

const IMPORT_CACHE_VERSION = 'stored-default-songs-v1';

function loadImportedSongs(): Song[] {
  try {
    if (localStorage.getItem('importedSongsVersion') !== IMPORT_CACHE_VERSION) return [];
    const stored = JSON.parse(localStorage.getItem('importedSongs') ?? '[]') as Song[];
    return stored.map((song) => {
      const sourceId = song.id.match(/^imported-(.+)$/)?.[1];
      const source = songSources.find((entry) => entry.id === sourceId);
      return source ? { ...song, youtubeId: song.youtubeId ?? source.youtubeId, audioFile: song.audioFile ?? source.audioFile } : song;
    });
  } catch {
    return [];
  }
}

function saveImportedSongs(next: Song[]) {
  localStorage.setItem('importedSongsVersion', IMPORT_CACHE_VERSION);
  localStorage.setItem('importedSongs', JSON.stringify(next));
}

export default function SongsPage() {
  const [importedSongs, setImportedSongs] = useState<Song[]>(loadImportedSongs);
  const visibleSongs = useMemo(() => {
    const importedSourceIds = new Set(
      importedSongs
        .map((song) => song.id.match(/^imported-(.+)$/)?.[1])
        .filter((id): id is string => Boolean(id)),
    );
    return [...importedSongs, ...songs.filter((song) => !importedSourceIds.has(song.id))];
  }, [importedSongs]);
  const [songId, setSongId] = useState(visibleSongs[0]?.id);
  const [furigana, setFurigana] = useState(true);
  const [romaji, setRomaji] = useState(false);
  const [follow, setFollow] = useState(true);
  const [syncMode, setSyncMode] = useState(false);
  const [syncMap, setSyncMap] = useState<SyncMap>({});
  const [time, setTime] = useState(0);
  const [selectedLineKey, setSelectedLineKey] = useState<string>();
  const [songSearch, setSongSearch] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [importStatus, setImportStatus] = useState<string>();
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const settings = useSettings();

  const playerRef = useRef<PlayerHandle>(null);
  const cardRefs = useRef(new Map<string, HTMLDivElement>());
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const defaultImportStarted = useRef(false);

  const song: Song | undefined = visibleSongs.find((s) => s.id === songId) ?? visibleSongs[0];
  const hasMedia = !!(song?.youtubeId || song?.audioFile);

  const parseSourceToSong = async (
    source: SongSource,
    id = `imported-${source.id}`,
  ): Promise<Song> => {
    const readerProxy = (url: string) => `https://r.jina.ai/http://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
    const strictReaderProxy = (url: string) => `https://r.jina.ai/http://r.jina.ai/http://${url}`;
    const direct = await parseSongPageUrl(source.url, { timeoutMs: 20_000 });
    const firstParsed = direct.page
      ? direct
      : await parseSongPageUrl(source.url, { timeoutMs: 20_000, proxy: readerProxy });
    const firstSong = firstParsed.page ? parsedPageToSong(firstParsed.page, { title: source.title, artist: source.artist, id }) : undefined;
    const parsed = firstSong && firstSong.sections.some((section) => section.lines.length > 0)
      ? firstParsed
      : await parseSongPageUrl(source.url, { timeoutMs: 20_000, proxy: strictReaderProxy });

    if (!parsed.page) {
      throw new Error(`${source.title}: ${parsed.errors[0]?.message ?? '페이지를 읽지 못했어요.'}`);
    }

    return parsedPageToSong(parsed.page, {
      title: source.title,
      artist: source.artist,
      id,
      youtubeId: source.youtubeId,
      audioFile: source.audioFile,
    });
  };

  const importSong = async () => {
    const query = songSearch.trim();
    if (!query) return;
    setLyricsLoading(true);
    setImportStatus('검색하고 가사 페이지를 파싱하는 중…');

    try {
      const readerProxy = (url: string) => `https://r.jina.ai/http://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
      const isUrl = /^https?:\/\//i.test(query);
      const parsed = isUrl
        ? await parseSongPageUrl(query, { timeoutMs: 20_000 })
        : await findAndParseSongPage(
            { title: query, artist: songArtist.trim() || undefined },
            { timeoutMs: 20_000 },
          );
      const fallbackParsed = parsed.page
        ? parsed
        : isUrl
          ? await parseSongPageUrl(query, { timeoutMs: 20_000, proxy: readerProxy })
          : await findAndParseSongPage(
              { title: query, artist: songArtist.trim() || undefined },
              { timeoutMs: 20_000, proxy: readerProxy },
            );

      if (!fallbackParsed.page) {
        setLyricsLoading(false);
        setImportStatus(
          `가사 페이지를 읽지 못했어요. 현재 검색/가져오기는 브라우저에서 직접 외부 사이트를 읽는 방식이라 CORS나 사이트 차단이 있으면 실패합니다. 백엔드/프록시 연결이 필요해요. ${fallbackParsed.errors[0]?.message ?? ''}`,
        );
        return;
      }

      const nextSong = parsedPageToSong(fallbackParsed.page, {
        title: isUrl ? undefined : query,
        artist: songArtist.trim() || undefined,
        id: `imported-${crypto.randomUUID()}`,
      });
      const lineCount = nextSong.sections.reduce((sum, section) => sum + section.lines.length, 0);
      setImportedSongs((prev) => {
        const next = [nextSong, ...prev];
        saveImportedSongs(next);
        return next;
      });
      setSongId(nextSong.id);
      setSyncMode(false);
      setImportStatus(
        lineCount > 0
          ? `${lineCount}줄을 가져왔어요. 발음은 자동 추정, 번역은 확인된 줄 외에는 초안입니다.`
          : '페이지는 읽었지만 가사 줄을 찾지 못했어요. 백엔드/프록시 파서 연결이 없으면 사이트 구조나 차단 때문에 자동 가져오기가 실패할 수 있습니다.',
      );
      setLyricsLoading(false);
    } catch (error) {
      setLyricsLoading(false);
      setImportStatus(
        `가져오기가 실패했어요. 백엔드/프록시 연결이 없거나 외부 사이트가 브라우저 요청을 막는 상태일 수 있습니다. ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  // 기본으로 준비된 두 곡은 사용자가 다시 입력하지 않아도 자동으로 가져와서 표시
  useEffect(() => {
    if (defaultImportStarted.current) return;
    defaultImportStarted.current = true;

    const storedSongs = loadImportedSongs();
    const missingSources = songSources.filter((source) => {
      const builtInSong = songs.find((entry) => entry.id === source.id);
      const builtInLineCount = builtInSong?.sections.reduce((sum, section) => sum + section.lines.length, 0) ?? 0;
      return builtInLineCount === 0 && !storedSongs.some((entry) => entry.id === `imported-${source.id}`);
    });
    if (missingSources.length === 0) return;

    setLyricsLoading(true);
    setImportStatus('기본 곡 가사를 자동으로 가져오는 중…');
    void Promise.allSettled(missingSources.map((source) => parseSourceToSong(source))).then((results) => {
      const loaded = results
        .filter((result): result is PromiseFulfilledResult<Song> => result.status === 'fulfilled')
        .map((result) => result.value);
      const failed = results.filter((result) => result.status === 'rejected').length;

      if (loaded.length > 0) {
        setImportedSongs((prev) => {
          const existingIds = new Set(prev.map((entry) => entry.id));
          const next = [...loaded.filter((entry) => !existingIds.has(entry.id)), ...prev];
          saveImportedSongs(next);
          return next;
        });
        setSongId(loaded[0].id);
      }

      setImportStatus(
        failed > 0
          ? `${loaded.length}곡을 기본으로 가져왔고, ${failed}곡은 실패했어요. 브라우저에서 외부 가사 사이트를 직접 읽지 못하면 백엔드/프록시 연결이 필요합니다.`
          : `${loaded.length}곡을 기본으로 가져왔어요.`,
      );
      setLyricsLoading(false);
    });
  }, []);

  // 곡이 바뀌면 저장된 싱크 불러오기
  useEffect(() => {
    if (songId) setSyncMap(loadSync(songId));
  }, [songId]);

  // 재생 시간 폴링
  useEffect(() => {
    if (!hasMedia) return;
    const id = setInterval(() => {
      setTime(playerRef.current?.getTime() ?? 0);
    }, 250);
    return () => clearInterval(id);
  }, [hasMedia, songId]);

  // 줄의 실제 시작 시간: 로컬 싱크가 데이터보다 우선
  const flat = useMemo(() => {
    if (!song) return [];
    return song.sections.flatMap((sec, si) =>
      sec.lines.map((line, li) => {
        const key = lineKey(si, li);
        return { key, line, start: syncMap[key] ?? line.start };
      })
    );
  }, [song, syncMap]);

  // 현재 재생 중인 줄
  const activeKey = useMemo(() => {
    let found: string | undefined;
    for (const f of flat) {
      if (f.start !== undefined && f.start <= time) found = f.key;
    }
    return found ?? selectedLineKey;
  }, [flat, time, selectedLineKey]);

  const playFromLine = (key: string, start?: number) => {
    if (!hasMedia) return;
    setSelectedLineKey(key);
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    const index = flat.findIndex((f) => f.key === key);
    const duration = playerRef.current?.getDuration() ?? 0;
    const estimated = duration > 0 && flat.length > 0
      ? Math.max(0, (duration * index) / flat.length)
      : Math.max(0, index * 4);
    const startAt = start ?? estimated;
    const nextKnownStart = flat[index + 1]?.start;
    const estimatedNext = duration > 0 && flat.length > 0
      ? Math.max(startAt + 1.5, (duration * (index + 1)) / flat.length)
      : startAt + 4;
    const stopAt = nextKnownStart ?? estimatedNext;
    const playMs = Math.max(1500, Math.min(12_000, (stopAt - startAt) * 1000));

    playerRef.current?.seek(startAt);
    playerRef.current?.play();
    stopTimerRef.current = setTimeout(() => {
      playerRef.current?.pause();
    }, playMs);
  };

  // 자동 스크롤
  useEffect(() => {
    if (!follow || !activeKey || syncMode) return;
    cardRefs.current
      .get(activeKey)
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [activeKey, follow, syncMode]);

  // 싱크 모드: 다음에 찍을 줄 = 아직 타임스탬프 없는 첫 줄
  const nextToStamp = syncMode
    ? flat.find((f) => syncMap[f.key] === undefined)?.key
    : undefined;

  const stamp = (key: string) => {
    if (!songId) return;
    const t = playerRef.current?.getTime() ?? 0;
    const next = { ...syncMap, [key]: Math.round(t * 10) / 10 };
    setSyncMap(next);
    saveSync(songId, next);
  };

  const undoLastStamp = () => {
    if (!songId) return;
    const keys = Object.keys(syncMap);
    if (keys.length === 0) return;
    const last = keys.reduce((a, b) => (syncMap[a] >= syncMap[b] ? a : b));
    const next = { ...syncMap };
    delete next[last];
    setSyncMap(next);
    saveSync(songId, next);
  };

  const clearStamps = () => {
    if (!songId) return;
    if (!confirm('저장된 싱크를 모두 지울까요?')) return;
    setSyncMap({});
    saveSync(songId, {});
  };

  const copyStamps = () => {
    navigator.clipboard.writeText(JSON.stringify(syncMap, null, 2));
  };

  // 싱크 모드에서 Enter/Space로 다음 줄 스탬프
  useEffect(() => {
    if (!syncMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (nextToStamp) stamp(nextToStamp);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncMode, nextToStamp, syncMap, songId]);

  const nextLine = flat.find((f) => f.key === nextToStamp);

  return (
    <div className="songs-layout">
      <aside className="song-sidebar">
        {SHOW_SONG_IMPORT && (
          <>
            <div className="sidebar-label">노래 검색/가져오기</div>
            <form
              className="song-import-form"
              onSubmit={(e) => {
                e.preventDefault();
                void importSong();
              }}
            >
              <input
                className="search song-import-input"
                value={songSearch}
                onChange={(e) => setSongSearch(e.target.value)}
                placeholder="곡명 또는 가사 URL"
              />
              <input
                className="search song-import-input"
                value={songArtist}
                onChange={(e) => setSongArtist(e.target.value)}
                placeholder="가수명(선택)"
              />
              <button className="btn song-import-btn" type="submit">
                검색해서 파싱
              </button>
              {importStatus && <p className="import-status">{importStatus}</p>}
            </form>
          </>
        )}

        <div className="sidebar-label">노래 목록</div>
        <nav className="song-list">
          {visibleSongs.map((s) => (
            <button
              key={s.id}
              className={`song-item ${s.id === songId ? 'active' : ''}`}
              onClick={() => {
                setSongId(s.id);
                setSyncMode(false);
                setSelectedLineKey(undefined);
                setTime(0);
              }}
            >
              {s.youtubeId ? (
                <img
                  className="song-cover"
                  src={`https://img.youtube.com/vi/${s.youtubeId}/mqdefault.jpg`}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <span className="song-cover-fallback">♪</span>
              )}
              <span className="song-item-text">
                <span className="song-title">{s.title}</span>
                <span className="song-artist">{s.artist}</span>
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="songs-main">
        {song && (
          <>
            <header className="song-header">
              <div>
                <h2 className="song-h2">
                  {song.titleReading ? (
                    <ruby>
                      {song.title}
                      <rt>{song.titleReading}</rt>
                    </ruby>
                  ) : (
                    song.title
                  )}
                </h2>
                <div className="song-h2-artist">{song.artist}</div>
              </div>
              <div className="controls">
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={furigana}
                    onChange={(e) => setFurigana(e.target.checked)}
                  />
                  후리가나
                </label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={romaji}
                    onChange={(e) => setRomaji(e.target.checked)}
                  />
                  로마자
                </label>
                {hasMedia && (
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={follow}
                      onChange={(e) => setFollow(e.target.checked)}
                    />
                    자동 스크롤
                  </label>
                )}
                {hasMedia && flat.length > 0 && (
                  <button
                    className={`btn ${syncMode ? 'btn-active' : ''}`}
                    onClick={() => setSyncMode(!syncMode)}
                  >
                    {syncMode ? '싱크 편집 끝내기' : '싱크 편집'}
                  </button>
                )}
              </div>
            </header>

            {song.about && <p className="song-about">{song.about}</p>}

            {hasMedia && (
              <div className="player-wrap">
                <Player
                  ref={playerRef}
                  youtubeId={song.youtubeId}
                  audioFile={song.audioFile}
                />
              </div>
            )}

            {syncMode && (
              <div className="sync-bar">
                <div className="sync-info">
                  <strong>싱크 편집 모드</strong> — 노래를 틀고, 각 줄이
                  시작되는 순간 <kbd>Enter</kbd>(또는 ⏱ 버튼)를 누르세요.
                  {nextLine ? (
                    <span className="sync-next">
                      다음: <em>{nextLine.line.jp}</em>
                    </span>
                  ) : (
                    <span className="sync-next">모든 줄 완료! 🎉</span>
                  )}
                </div>
                <div className="sync-actions">
                  <span className="sync-time">{fmtTime(time)}</span>
                  <button className="btn" onClick={undoLastStamp}>
                    되돌리기
                  </button>
                  <button className="btn" onClick={copyStamps}>
                    JSON 복사
                  </button>
                  <button className="btn" onClick={clearStamps}>
                    전체 삭제
                  </button>
                </div>
              </div>
            )}

            {lyricsLoading && (
              <div className="lyrics-loading" role="status" aria-live="polite">
                <div className="loading-orbit" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  <strong>가사 불러오는 중…</strong>
                  <p>페이지를 파싱하고 발음/번역 데이터를 정리하고 있어요.</p>
                </div>
              </div>
            )}

            {!lyricsLoading && flat.length > 0 && <Legend />}

            {!lyricsLoading && flat.length === 0 && (
              <div className="empty-lyrics">
                <strong>아직 표시할 가사 줄이 없어요.</strong>
                <span>
                  왼쪽 검색창에 곡명/가수명 또는 가사 URL을 넣고 <b>검색해서 파싱</b>을 누르면
                  가져온 줄이 이 영역에 표시됩니다.
                </span>
              </div>
            )}

            {!lyricsLoading && song.sections.map((sec, si) => (
              <section key={si} className="section lyric-section">
                {sec.name && <h3 className="section-name">{sec.name}</h3>}
                {sec.lines.map((line, li) => {
                  const key = lineKey(si, li);
                  const f = flat.find((x) => x.key === key);
                  return (
                    <LineCard
                      key={key}
                      line={line}
                      index={li}
                      furigana={furigana}
                      romaji={romaji}
                      showReading={settings.showReading}
                      showTranslation={settings.showTranslation}
                      active={key === activeKey}
                      start={f?.start}
                      syncMode={syncMode}
                      isNextToStamp={key === nextToStamp}
                      onPlay={() => playFromLine(key, f?.start)}
                      onSeek={() => playFromLine(key, f?.start)}
                      onStamp={() => stamp(key)}
                      cardRef={(el) => {
                        if (el) cardRefs.current.set(key, el);
                        else cardRefs.current.delete(key);
                      }}
                    />
                  );
                })}
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
