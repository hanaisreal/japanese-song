#!/usr/bin/env node
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';

const [, , videoOrUrl, outName] = process.argv;
if (!videoOrUrl || !outName) {
  console.error('Usage: node scripts/download-song-audio.mjs <youtube-id-or-url> <public/audio/name.mp3>');
  process.exit(2);
}

const url = /^https?:\/\//.test(videoOrUrl) ? videoOrUrl : `https://www.youtube.com/watch?v=${videoOrUrl}`;
const outPath = resolve(outName);
mkdirSync(dirname(outPath), { recursive: true });

const result = spawnSync(
  'yt-dlp',
  [
    '--extract-audio',
    '--audio-format',
    'mp3',
    '--audio-quality',
    '0',
    '--no-playlist',
    '--output',
    outPath.replace(/\.mp3$/i, '.%(ext)s'),
    url,
  ],
  { stdio: 'inherit' },
);

if (result.error?.code === 'ENOENT') {
  console.error('yt-dlp is not installed. Install it with: brew install yt-dlp');
  process.exit(127);
}

process.exit(result.status ?? 1);
