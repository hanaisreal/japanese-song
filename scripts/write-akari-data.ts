import { writeFileSync } from 'node:fs';
import { parseSongPageUrl } from '../src/songPageFinder';
import { parsedPageToSong } from '../src/importedSong';
import { songSources } from '../src/data/songSources';
import { findCuratedAkariLine } from '../src/data/curatedAkari';

function ts(value: unknown): string {
  return JSON.stringify(value, null, 2).replace(/"([^"\n]+)":/g, '$1:');
}

const source = songSources.find((entry) => entry.id === 'akari');
if (!source) throw new Error('akari source not found');

const readerProxy = (url: string) => `https://r.jina.ai/http://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
const direct = await parseSongPageUrl(source.url, { timeoutMs: 20_000 });
const parsed = direct.page ? direct : await parseSongPageUrl(source.url, { timeoutMs: 20_000, proxy: readerProxy });
if (!parsed.page) throw new Error(parsed.errors[0]?.message ?? 'parse failed');

const parsedSong = parsedPageToSong(parsed.page, source);
const lines = parsedSong.sections.flatMap((section) => section.lines);
if (lines.length === 0) throw new Error('no lines parsed');

const missing = lines.filter((line) => !findCuratedAkariLine(line.jp));
if (missing.length > 0) {
  throw new Error(`curatedAkari is missing ${missing.length} parsed lines: ${missing.map((line) => line.jp).join(' / ')}`);
}

const song = {
  id: 'akari',
  title: '燈',
  titleReading: 'あかり',
  artist: '崎山蒼志 (Sakiyama Soushi)',
  youtubeId: source.youtubeId,
  about: '주술회전 2기(회옥·옥절) 엔딩 테마. 일본어 원문, 한국어식 발음, 한국어 번역을 줄별로 저장한 학습용 데이터입니다.',
  sections: [
    {
      name: '가사',
      lines: lines.map((line) => {
        const curated = findCuratedAkariLine(line.jp)!;
        return {
          jp: line.jp,
          reading: curated.reading,
          ko: curated.ko,
          tokens: line.tokens,
        };
      }),
    },
  ],
};

writeFileSync('src/data/akari.ts', `import type { Song } from '../types';\n\nexport const akari: Song = ${ts(song)};\n`);
console.log(JSON.stringify({ written: 'src/data/akari.ts', lines: lines.length }, null, 2));
