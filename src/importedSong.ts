import type { Line, POS, Song, Token } from './types';
import type { ParsedPage } from './crawler';
import { translateJapaneseLineHeuristic } from './lineTranslator';
import { findCuratedAkariLine } from './data/curatedAkari';
import { findCuratedNightDancerLine } from './data/curatedNightDancer';
import { kanaToHangul, readingForSurface, readingToHangul } from './pronunciation';

const JP_RE = /[ぁ-んァ-ン一-龯々〆ヵヶ]/;
const NOISE_RE =
  /(歌詞検索|ランキング|RANKING|新着|発売日|作詞|作曲|編曲|この曲|無料|動画|マイ歌ネット|ログイン|会員|ページ|広告|SNS|共有|歌ネット|イイネ|Amazon|Apple|Spotify|YouTube|LINE|TikTok)/i;
const SECTION_RE = /(verse|chorus|bridge|intro|outro|サビ|Ａメロ|Bメロ|Cメロ|間奏|前奏|後奏)/i;
const PUNCT_RE = /^[\s、。！？!?.…・ー~～「」『』（）()[\]【】]+$/;
const PARTICLES = new Set(['は', 'が', 'を', 'に', 'で', 'と', 'も', 'の', 'へ', 'や', 'から', 'まで', 'より', 'だけ', 'しか']);
const AUXILIARIES = new Set(['ない', 'たい', 'ます', 'です', 'だ', 'だった', 'てる', 'いる', 'れる', 'られる', 'させる']);
const CONJUNCTIONS = new Set(['でも', 'けど', 'そして', 'だから', 'なら', 'ただ', 'また']);
const COMMON_KO: Record<string, string> = {
  君: '너',
  僕: '나',
  私: '나, 저',
  俺: '나',
  夜: '밤',
  朝: '아침',
  今日: '오늘',
  明日: '내일',
  昨日: '어제',
  今: '지금',
  夢: '꿈',
  愛: '사랑',
  心: '마음',
  声: '목소리',
  顔: '얼굴',
  名前: '이름',
  空: '하늘',
  光: '빛',
  燈: '등불, 빛',
  灯り: '불빛',
  街: '거리',
  人: '사람',
  世界: '세계',
  手: '손',
  目: '눈',
  笑う: '웃다',
  泣く: '울다',
  見る: '보다',
  見える: '보이다',
  歌う: '노래하다',
  踊る: '춤추다',
  忘れる: '잊다',
  知る: '알다',
  行く: '가다',
  来る: '오다',
  いる: '있다',
  ある: '있다',
  は: '~은/는',
  が: '~이/가',
  を: '~을/를',
  に: '~에, ~에게',
  で: '~에서, ~(으)로',
  と: '~와/과, 라고',
  も: '~도',
  の: '~의',
  へ: '~로',
  から: '~부터, ~니까',
  まで: '~까지',
  ない: '~지 않다',
};

function normalizeLine(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function isLikelyLyricLine(line: string): boolean {
  const value = normalizeLine(line);
  if (!value || !JP_RE.test(value)) return false;
  if (value.includes('](') || value.startsWith('*') || value.startsWith('#') || value.startsWith('![')) return false;
  if (NOISE_RE.test(value)) return false;
  if (SECTION_RE.test(value) && value.length < 18) return false;
  if (value.length < 2 || value.length > 80) return false;
  if (/^\d+[.)]/.test(value)) return false;
  return true;
}

function uniqueInOrder(lines: string[]): string[] {
  const seen = new Set<string>();
  return lines.filter((line) => {
    const key = normalizeLine(line);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function extractJapaneseLines(page: ParsedPage): string[] {
  const rawLines = page.text.split('\n').map(normalizeLine);
  const startIndex = rawLines.findIndex((line) => /^Play\s+"/.test(line) || /^Play\s+/.test(line));
  const endIndex = rawLines.findIndex(
    (line, index) =>
      index > startIndex &&
      (/この歌詞を/.test(line) || /RANKING/.test(line) || /人気歌詞ランキング/.test(line) || /新着歌詞/.test(line)),
  );
  const searchArea = startIndex >= 0 ? rawLines.slice(startIndex + 1, endIndex > startIndex ? endIndex : undefined) : rawLines;
  const lines = searchArea.filter(isLikelyLyricLine);

  return uniqueInOrder(lines);
}

function guessPos(surface: string): POS {
  if (PARTICLES.has(surface)) return 'particle';
  if (AUXILIARIES.has(surface)) return 'auxiliary';
  if (CONJUNCTIONS.has(surface)) return 'conjunction';
  if (/[する]$/.test(surface) || /[うくぐすつぬぶむる]$/.test(surface)) return 'verb';
  if (/い$/.test(surface)) return 'i-adj';
  if (/に$/.test(surface)) return 'adverb';
  if (/^[ぁ-んァ-ン]+$/.test(surface)) return 'expression';
  return 'noun';
}

function meaningFor(surface: string, pos: POS): string {
  if (COMMON_KO[surface]) return COMMON_KO[surface];
  if (pos === 'particle') return '조사';
  if (pos === 'auxiliary') return '조동사/어미';
  if (pos === 'verb') return '동사 — 뜻 추가 필요';
  if (pos === 'i-adj' || pos === 'na-adj') return '형용사 — 뜻 추가 필요';
  return '뜻 추가 필요';
}

function tokenReading(surface: string): string | undefined {
  if (/^[ぁ-んァ-ヶー]+$/.test(surface)) return surface;
  return readingForSurface(surface);
}

export function tokenizeJapaneseLine(line: string): Token[] {
  const parts = line.match(/[一-龯々〆ヵヶ]+|[ぁ-んァ-ンー]+|[A-Za-z0-9]+|[^\s]/g) ?? [line];
  const tokens: Token[] = [];

  for (const part of parts) {
    if (PUNCT_RE.test(part)) {
      tokens.push({ surface: part, pos: 'expression', meaning: '문장부호' });
      continue;
    }

    if (part.length > 1 && /^[ぁ-ん]+$/.test(part)) {
      let rest = part;
      while (rest.length > 0) {
        const particle = [...PARTICLES].sort((a, b) => b.length - a.length).find((p) => rest.startsWith(p));
        if (particle) {
          tokens.push({ surface: particle, pos: 'particle', meaning: meaningFor(particle, 'particle') });
          rest = rest.slice(particle.length);
        } else {
          const chunk = rest.match(/^[ぁ-ん]+?(?=(は|が|を|に|で|と|も|の|へ|から|まで|より|だけ|しか)|$)/)?.[0] ?? rest[0];
          const pos = guessPos(chunk);
          tokens.push({ surface: chunk, reading: tokenReading(chunk), pos, meaning: meaningFor(chunk, pos) });
          rest = rest.slice(chunk.length);
        }
      }
      continue;
    }

    const pos = guessPos(part);
    tokens.push({ surface: part, reading: tokenReading(part), pos, meaning: meaningFor(part, pos) });
  }

  return tokens;
}

function cleanTitle(value: string): string {
  return normalizeLine(value.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[[^\]]*\]\([^)]*\)/g, '').replace(/[#*_`]/g, ''));
}

function findCuratedLine(jp: string): { reading: string; ko: string } | undefined {
  return findCuratedAkariLine(jp) ?? findCuratedNightDancerLine(jp);
}

function inferredLineReading(tokens: Token[]): string {
  return tokens
    .map((token) => {
      if (token.meaning === '문장부호') return '';
      if (/^[A-Za-z0-9]+$/.test(token.surface)) return token.surface;
      const reading = token.reading ?? token.surface;
      return /^[ぁ-んァ-ヶー]+$/.test(reading) ? kanaToHangul(reading) : readingToHangul(reading);
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parsedPageToSong(
  page: ParsedPage,
  fallback: { title?: string; artist?: string; id?: string; youtubeId?: string; audioFile?: string } = {},
): Song {
  const lines = extractJapaneseLines(page);
  const pageHeading = page.headings.map(cleanTitle).find((h) => h && (JP_RE.test(h) || /[A-Za-z]/.test(h)));
  const title = fallback.title || pageHeading || cleanTitle(page.title) || 'Imported Song';
  const artist = fallback.artist || '검색으로 가져온 곡';
  const id = fallback.id || `imported-${Date.now()}`;

  return {
    id,
    title,
    artist,
    youtubeId: fallback.youtubeId,
    audioFile: fallback.audioFile,
    about: `검색/크롤링으로 가져온 원문입니다. 자동 토큰화라 품사·뜻은 학습용 초안으로 보고, 줄을 열어서 직접 보정하세요. Source: ${page.url}`,
    sections: [
      {
        name: '가져온 가사',
        lines: lines.map<Line>((jp) => {
          const tokens = tokenizeJapaneseLine(jp);
          const curated = findCuratedLine(jp);
          return {
            jp,
            reading: curated?.reading ?? inferredLineReading(tokens),
            ko: curated?.ko ?? translateJapaneseLineHeuristic(jp, tokens),
            tokens,
          };
        }),
      },
    ],
  };
}
