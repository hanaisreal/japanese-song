import { crawlWebsite, type CrawlOptions, type ParsedPage } from './crawler';

export interface SongLookupInput {
  title: string;
  artist?: string;
  album?: string;
  language?: string;
  /** Extra words to bias discovery, e.g. ['official'], ['歌詞'], ['chords']. */
  keywords?: string[];
  /** Restrict discovery to a site, e.g. 'uta-net.com' or 'genius.com'. */
  site?: string;
}

export interface PageCandidate {
  url: string;
  title: string;
  snippet: string;
  score: number;
  source: string;
}

export interface FindAndParseResult {
  query: string;
  candidates: PageCandidate[];
  page?: ParsedPage;
  errors: Array<{ url: string; message: string }>;
}

export interface ParseUrlResult {
  url: string;
  page?: ParsedPage;
  errors: Array<{ url: string; message: string }>;
}

type SearchFetcher = (query: string, options: CrawlOptions) => Promise<string>;

const DEFAULT_DISCOVERY_TERMS = ['lyrics', '歌詞'];
const MUSIC_PAGE_HINTS = [
  'lyrics',
  'lyric',
  '歌詞',
  'song',
  'track',
  'music',
  'artist',
  '作詞',
  '作曲',
];
const LOW_VALUE_HINTS = ['translation', '翻訳', 'romanized', 'cover', 'karaoke', 'instrumental'];
const KNOWN_MUSIC_HOSTS = [
  'uta-net.com',
  'utaten.com',
  'j-lyric.net',
  'musixmatch.com',
  'genius.com',
  'azlyrics.com',
  'lyrics.com',
  'letras.com',
  'kkbox.com',
  'spotify.com',
  'music.apple.com',
  'youtube.com',
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/[\s\-_–—|:()[\]【】「」『』]+/g, ' ').trim();
}

function buildQuery(input: SongLookupInput): string {
  const terms = input.keywords && input.keywords.length > 0 ? input.keywords : DEFAULT_DISCOVERY_TERMS;
  const parts = [input.title, input.artist, input.album, input.language, ...terms].filter(Boolean);
  const site = input.site ? `site:${input.site}` : '';
  return [...parts, site].filter(Boolean).join(' ');
}

function absoluteDuckDuckGoUrl(href: string): string | null {
  try {
    const url = new URL(href, 'https://duckduckgo.com');
    const redirected = url.searchParams.get('uddg');
    return redirected ? decodeURIComponent(redirected) : url.toString();
  } catch {
    return null;
  }
}

function stripSearchMarkup(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreCandidate(candidate: Omit<PageCandidate, 'score'>, input: SongLookupInput): number {
  const haystack = normalize(`${candidate.title} ${candidate.snippet} ${candidate.url}`);
  const title = normalize(input.title);
  const artist = normalize(input.artist ?? '');
  const album = normalize(input.album ?? '');
  const host = new URL(candidate.url).hostname.replace(/^www\./, '');

  let score = 0;
  if (title && haystack.includes(title)) score += 40;
  if (artist && haystack.includes(artist)) score += 30;
  if (album && haystack.includes(album)) score += 8;
  if (MUSIC_PAGE_HINTS.some((hint) => haystack.includes(hint))) score += 15;
  if (KNOWN_MUSIC_HOSTS.some((known) => host === known || host.endsWith(`.${known}`))) score += 10;
  if (input.site && host.endsWith(input.site)) score += 20;
  if (LOW_VALUE_HINTS.some((hint) => haystack.includes(hint))) score -= 8;

  return score;
}

function parseDuckDuckGoResults(html: string, input: SongLookupInput): PageCandidate[] {
  const candidates: PageCandidate[] = [];
  const seen = new Set<string>();
  const resultRe = /<div[^>]*class="[^"]*result[^"]*"[\s\S]*?<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?(?:<a[^>]*class="[^"]*result__snippet[^"]*"[^>]*>|<div[^>]*class="[^"]*result__snippet[^"]*"[^>]*>)([\s\S]*?)(?:<\/a>|<\/div>)/gi;
  let match: RegExpExecArray | null;

  while ((match = resultRe.exec(html)) !== null) {
    const url = absoluteDuckDuckGoUrl(match[1] ?? '');
    if (!url || seen.has(url)) continue;

    const title = stripSearchMarkup(match[2] ?? '');
    const snippet = stripSearchMarkup(match[3] ?? '');
    const source = new URL(url).hostname.replace(/^www\./, '');
    const base = { url, title, snippet, source };
    candidates.push({ ...base, score: scoreCandidate(base, input) });
    seen.add(url);
  }

  return candidates.sort((a, b) => b.score - a.score);
}

async function fetchDuckDuckGoHtml(query: string, options: CrawlOptions): Promise<string> {
  const searchUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const target = options.proxy ? options.proxy(searchUrl) : searchUrl;
  const response = await fetch(target, {
    headers: {
      Accept: 'text/html',
      'User-Agent': 'Mozilla/5.0 (compatible; JapaneseStudyCrawler/1.0)',
    },
  });
  if (!response.ok) throw new Error(`Search failed: HTTP ${response.status} ${response.statusText}`);
  return response.text();
}

/** Parse any already-known page URL with the generic crawler/parser. */
export async function parseSongPageUrl(url: string, options: CrawlOptions = {}): Promise<ParseUrlResult> {
  const crawled = await crawlWebsite(url, { ...options, maxPages: 1, followLinks: false });
  return { url, page: crawled.pages[0], errors: crawled.errors };
}

/** Find likely song/lyric pages for any song, then parse the best reachable candidate. */
export async function findAndParseSongPage(
  input: SongLookupInput,
  options: CrawlOptions & { searchFetcher?: SearchFetcher } = {},
): Promise<FindAndParseResult> {
  const query = buildQuery(input);
  const errors: FindAndParseResult['errors'] = [];
  const fetchSearch = options.searchFetcher ?? fetchDuckDuckGoHtml;

  let candidates: PageCandidate[] = [];
  try {
    const searchHtml = await fetchSearch(query, options);
    candidates = parseDuckDuckGoResults(searchHtml, input);
  } catch (error) {
    errors.push({ url: `search:${query}`, message: error instanceof Error ? error.message : String(error) });
  }

  for (const candidate of candidates) {
    const parsed = await parseSongPageUrl(candidate.url, options);
    errors.push(...parsed.errors);
    if (parsed.page) return { query, candidates, page: parsed.page, errors };
  }

  return { query, candidates, errors };
}
