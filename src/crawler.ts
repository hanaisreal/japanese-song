export interface CrawlOptions {
  /**
   * Optional CORS proxy for browser use. Example:
   *   (url) => `/api/crawl?url=${encodeURIComponent(url)}`
   * In Node.js, leave this empty and fetch the target URL directly.
   */
  proxy?: (url: string) => string;
  /** Request timeout in milliseconds. Defaults to 15 seconds. */
  timeoutMs?: number;
  /** Maximum number of same-origin pages to visit. Defaults to 1. */
  maxPages?: number;
  /** Follow same-origin links discovered on the page. Defaults to false. */
  followLinks?: boolean;
}

export interface ParsedLink {
  text: string;
  href: string;
}

export interface ParsedPage {
  url: string;
  title: string;
  description: string;
  headings: string[];
  text: string;
  links: ParsedLink[];
}

export interface CrawlResult {
  startUrl: string;
  pages: ParsedPage[];
  errors: Array<{ url: string; message: string }>;
}

const BLOCK_TAG_RE = /<(script|style|noscript|svg|canvas|iframe)[\s\S]*?<\/\1>/gi;
const COMMENT_RE = /<!--[\s\S]*?-->/g;
const TAG_RE = /<[^>]+>/g;
const SPACE_RE = /[ \t\f\v\u00a0]+/g;
const LINE_RE = /\n{3,}/g;

function decodeEntities(value: string): string {
  const named: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
  };

  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][\w-]+);/g, (match, entity: string) => {
    if (entity[0] === '#') {
      const isHex = entity[1]?.toLowerCase() === 'x';
      const codePoint = Number.parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }
    return named[entity] ?? match;
  });
}

function normalizeText(value: string): string {
  return decodeEntities(value)
    .replace(/\r\n?/g, '\n')
    .replace(SPACE_RE, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(LINE_RE, '\n\n')
    .trim();
}

function stripTags(value: string): string {
  return normalizeText(value.replace(TAG_RE, ' '));
}

function absolutizeUrl(href: string, baseUrl: string): string | null {
  if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) {
    return null;
  }

  try {
    return new URL(decodeEntities(href), baseUrl).toString();
  } catch {
    return null;
  }
}

function firstMatch(html: string, re: RegExp): string {
  return normalizeText(re.exec(html)?.[1] ?? '');
}

function parseLinks(html: string, baseUrl: string): ParsedLink[] {
  const links: ParsedLink[] = [];
  const seen = new Set<string>();
  const linkRe = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = linkRe.exec(html)) !== null) {
    const attrs = match[1] ?? '';
    const body = match[2] ?? '';
    const href = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs)?.slice(1).find(Boolean);
    const absoluteHref = href ? absolutizeUrl(href, baseUrl) : null;
    if (!absoluteHref || seen.has(absoluteHref)) continue;

    const text = stripTags(body);
    links.push({ text, href: absoluteHref });
    seen.add(absoluteHref);
  }

  return links;
}

function parseHeadings(html: string): string[] {
  const headings: string[] = [];
  const headingRe = /<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  let match: RegExpExecArray | null;

  while ((match = headingRe.exec(html)) !== null) {
    const heading = stripTags(match[1] ?? '');
    if (heading) headings.push(heading);
  }

  return headings;
}

function htmlToReadableText(html: string): string {
  const cleaned = html
    .replace(BLOCK_TAG_RE, '')
    .replace(COMMENT_RE, '')
    .replace(/<(br|hr)\b[^>]*>/gi, '\n')
    .replace(/<\/(p|div|section|article|header|footer|main|aside|li|tr|h[1-6])>/gi, '\n')
    .replace(/<\/td>/gi, ' ');

  return normalizeText(cleaned.replace(TAG_RE, ' '));
}

export function parseHtmlPage(html: string, url: string): ParsedPage {
  const withoutBlocks = html.replace(BLOCK_TAG_RE, '').replace(COMMENT_RE, '');
  const markdownTitle = /^Title:\s*(.+)$/m.exec(withoutBlocks)?.[1] ?? '';
  const markdownHeadings = [...withoutBlocks.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => normalizeText(match[1] ?? ''));
  const title = firstMatch(withoutBlocks, /<title\b[^>]*>([\s\S]*?)<\/title>/i) || normalizeText(markdownTitle);
  const description = firstMatch(
    withoutBlocks,
    /<meta\b(?=[^>]*(?:name|property)\s*=\s*["'](?:description|og:description)["'])(?=[^>]*content\s*=\s*["']([^"']*)["'])[^>]*>/i,
  );
  const htmlHeadings = parseHeadings(withoutBlocks);

  return {
    url,
    title,
    description,
    headings: htmlHeadings.length > 0 ? htmlHeadings : markdownHeadings,
    text: htmlToReadableText(withoutBlocks),
    links: parseLinks(withoutBlocks, url),
  };
}

async function fetchHtml(url: string, options: CrawlOptions): Promise<string> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), options.timeoutMs ?? 15_000);
  const target = options.proxy ? options.proxy(url) : url;

  try {
    const response = await fetch(target, {
      signal: controller.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (compatible; JapaneseStudyCrawler/1.0)',
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
    return await response.text();
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

function sameOriginLinks(page: ParsedPage): string[] {
  const origin = new URL(page.url).origin;
  return page.links
    .map((link) => link.href)
    .filter((href) => {
      try {
        return new URL(href).origin === origin;
      } catch {
        return false;
      }
    });
}

export async function crawlWebsite(startUrl: string, options: CrawlOptions = {}): Promise<CrawlResult> {
  const maxPages = Math.max(1, options.maxPages ?? 1);
  const queue = [new URL(startUrl).toString()];
  const visited = new Set<string>();
  const pages: ParsedPage[] = [];
  const errors: CrawlResult['errors'] = [];

  while (queue.length > 0 && pages.length < maxPages) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;
    visited.add(url);

    try {
      const html = await fetchHtml(url, options);
      const page = parseHtmlPage(html, url);
      pages.push(page);

      if (options.followLinks) {
        for (const href of sameOriginLinks(page)) {
          if (!visited.has(href) && queue.length + pages.length < maxPages) queue.push(href);
        }
      }
    } catch (error) {
      errors.push({ url, message: error instanceof Error ? error.message : String(error) });
    }
  }

  return { startUrl, pages, errors };
}
