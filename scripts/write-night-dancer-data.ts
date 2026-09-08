import { writeFileSync } from 'node:fs';
import { parseSongPageUrl } from '../src/songPageFinder';
import { parsedPageToSong } from '../src/importedSong';
import { songSources } from '../src/data/songSources';
import { findCuratedNightDancerLine } from '../src/data/curatedNightDancer';

function ts(value: unknown): string {
  return JSON.stringify(value, null, 2).replace(/"([^"\n]+)":/g, '$1:');
}

const source = songSources.find((entry) => entry.id === 'night-dancer');
if (!source) throw new Error('night-dancer source not found');

const readerProxy = (url: string) => `https://r.jina.ai/http://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
const direct = await parseSongPageUrl(source.url, { timeoutMs: 20_000 });
const parsed = direct.page ? direct : await parseSongPageUrl(source.url, { timeoutMs: 20_000, proxy: readerProxy });
if (!parsed.page) throw new Error(parsed.errors[0]?.message ?? 'parse failed');

const parsedSong = parsedPageToSong(parsed.page, source);
const lines = parsedSong.sections.flatMap((section) => section.lines);
if (lines.length === 0) throw new Error('no lines parsed');

const missing = lines.filter((line) => !findCuratedNightDancerLine(line.jp));
if (missing.length > 0) {
  throw new Error(`curatedNightDancer is missing ${missing.length} parsed lines`);
}

const song = {
  id: 'night-dancer',
  title: 'NIGHT DANCER',
  titleReading: 'ナイトダンサー',
  artist: 'imase',
  youtubeId: source.youtubeId,
  about: '도시적인 밤의 분위기와 가벼운 춤의 리듬을 중심으로 관계의 애매함과 친밀함을 다루는 곡입니다.',
  sections: [
    {
      name: '가사',
      lines: lines.map((line) => {
        const curated = findCuratedNightDancerLine(line.jp)!;
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

writeFileSync(
  'src/data/nightDancer.ts',
  `import type { Song } from '../types';\n\nexport const nightDancer: Song = ${ts(song)};\n`,
);

console.log(JSON.stringify({ written: 'src/data/nightDancer.ts', lines: lines.length }, null, 2));
