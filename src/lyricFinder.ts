export {
  findAndParseSongPage as findAndParseLyricPage,
  parseSongPageUrl as parseLyricPageUrl,
} from './songPageFinder';

export type {
  FindAndParseResult as LyricPageResult,
  PageCandidate as LyricPageCandidate,
  ParseUrlResult as LyricUrlParseResult,
  SongLookupInput as LyricSearchInput,
} from './songPageFinder';
