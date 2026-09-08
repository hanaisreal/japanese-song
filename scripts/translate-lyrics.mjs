#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const DEFAULT_MODEL = 'gpt-5.5-sol';

function usage() {
  console.log(`Usage:
  node scripts/translate-lyrics.mjs --input lyrics.txt --out src/data/curatedNightDancer.ts --const NIGHT_DANCER --function findCuratedNightDancerLine --title "NIGHT DANCER" --artist imase
  node scripts/translate-lyrics.mjs --input lyrics.txt --dry-run

Environment for LLM mode:
  LLM_API_KEY      required unless --dry-run
  LLM_BASE_URL     default: https://api.openai.com/v1
  LLM_MODEL        default: ${DEFAULT_MODEL}

Input format:
  One Japanese lyric line per line. Blank lines are ignored.

Output:
  TypeScript curated data file with jp -> { reading, ko } entries.
`);
}

function arg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
}

const inputPath = arg('input');
const outPath = arg('out', 'src/data/curatedLyrics.ts');
const constName = arg('const', 'CURATED_LINES');
const functionName = arg('function', 'findCuratedLine');
const title = arg('title', 'Imported Song');
const artist = arg('artist', '');
const dryRun = process.argv.includes('--dry-run');
const help = process.argv.includes('--help') || process.argv.includes('-h');

if (help || !inputPath) {
  usage();
  process.exit(help ? 0 : 1);
}

function isJapaneseLyricLine(line) {
  return /[ぁ-んァ-ン一-龯々]/.test(line) && !/^[-#>|]/.test(line.trim());
}

const jpLines = readFileSync(inputPath, 'utf8')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .filter(isJapaneseLyricLine);

if (jpLines.length === 0) throw new Error(`No Japanese lyric lines found in ${inputPath}`);

function buildPrompt(lines) {
  return `You are preparing Korean study data for Japanese song lyrics.

Task:
For each Japanese lyric line, produce:
1. reading: Korean hangul pronunciation as it would be sung/read by a Korean learner.
2. ko: natural Korean translation, concise and lyric-like.

Rules:
- Return ONLY valid JSON.
- JSON shape: {"lines":[{"jp":"...","reading":"...","ko":"..."}]}
- Preserve input order and exact jp string.
- Output length must equal input length.
- Do not add explanations or markdown.
- reading must be Korean hangul pronunciation, not romaji and not hiragana.
- Keep English words in the line as English in reading when sung in English.
- ko should be a real Korean translation, not word-by-word gloss.

Song title: ${title}
Artist: ${artist}

Japanese lines JSON:
${JSON.stringify(lines, null, 2)}
`;
}

async function callLlm(prompt) {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) throw new Error('LLM_API_KEY is required. Use --dry-run to print the prompt only.');

  const baseUrl = (process.env.LLM_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = process.env.LLM_MODEL ?? DEFAULT_MODEL;
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: 'system', content: 'Return only strict JSON. No markdown.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) throw new Error(`LLM HTTP ${response.status}: ${await response.text()}`);
  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('LLM response had no message content.');
  return content;
}

function parseJsonResponse(text) {
  const trimmed = text.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  const parsed = JSON.parse(trimmed);
  if (!Array.isArray(parsed.lines)) throw new Error('Response JSON must include a lines array.');
  if (parsed.lines.length !== jpLines.length) {
    throw new Error(`Expected ${jpLines.length} lines, got ${parsed.lines.length}.`);
  }
  parsed.lines.forEach((line, index) => {
    if (line.jp !== jpLines[index]) throw new Error(`Line ${index + 1} jp mismatch. Expected ${jpLines[index]}, got ${line.jp}`);
    if (!line.reading || !line.ko) throw new Error(`Line ${index + 1} missing reading or ko.`);
  });
  return parsed.lines;
}

function tsString(value) {
  return JSON.stringify(value).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

function makeTsFile(lines) {
  const pairs = lines
    .map((line) => `  [${tsString(line.jp)}, { reading: ${tsString(line.reading)}, ko: ${tsString(line.ko)} }],`)
    .join('\n');

  return `export interface CuratedLine {\n  reading: string;\n  ko: string;\n}\n\nfunction normalize(value: string): string {\n  return value.replace(/[\\s　、。]/g, '').trim();\n}\n\nconst ${constName}: Array<[string, CuratedLine]> = [\n${pairs}\n];\n\nconst CURATED_MAP = new Map(${constName}.map(([jp, data]) => [normalize(jp), data]));\n\nexport function ${functionName}(jp: string): CuratedLine | undefined {\n  return CURATED_MAP.get(normalize(jp));\n}\n`;
}

const prompt = buildPrompt(jpLines);
if (dryRun) {
  console.log(prompt);
  process.exit(0);
}

const responseText = await callLlm(prompt);
const translatedLines = parseJsonResponse(responseText);
writeFileSync(outPath, makeTsFile(translatedLines));
console.log(`Wrote ${translatedLines.length} curated lines to ${outPath} from ${basename(inputPath)}.`);
