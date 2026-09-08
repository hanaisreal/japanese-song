// 품사(品詞) 분류 — 색상 코딩의 기준
export type POS =
  | 'noun'        // 명사 名詞
  | 'pronoun'     // 대명사 代名詞
  | 'verb'        // 동사 動詞
  | 'i-adj'       // い형용사 形容詞
  | 'na-adj'      // な형용사 形容動詞
  | 'adverb'      // 부사 副詞
  | 'particle'    // 조사 助詞
  | 'auxiliary'   // 조동사·어미 助動詞
  | 'conjunction' // 접속사 接続詞
  | 'interjection'// 감탄사 感動詞
  | 'prenoun'     // 연체사 連体詞
  | 'suffix'      // 접미사 接尾辞
  | 'expression'; // 관용구·표현

export interface Token {
  /** 가사에 실제로 나오는 형태 (예: 見上げた) */
  surface: string;
  /** 히라가나 읽기 (예: みあげた) — 칸지가 없으면 생략 가능 */
  reading?: string;
  /** 사전형/기본형 (예: 見上げる) — 활용된 단어일 때 */
  base?: string;
  /** 기본형의 히라가나 읽기 (예: みあげる) — 단어장에서 사용 */
  baseReading?: string;
  pos: POS;
  /** 한국어 뜻 */
  meaning: string;
  /** 문법 설명 — 조사·어미·활용 등 (한국어) */
  note?: string;
}

export interface Line {
  /** 원문 한 줄 */
  jp: string;
  /** 한국어 사용자를 위한 실제 발음 표기 */
  reading?: string;
  tokens: Token[];
  /** 한국어 번역 */
  ko: string;
  /** 이 줄의 핵심 문법 포인트 */
  grammar?: string[];
  /** 노래에서 이 줄이 시작되는 시간(초) — karaoke 하이라이트용 */
  start?: number;
}

export interface Section {
  /** 예: 1절, 사비(후렴), 브릿지 */
  name?: string;
  lines: Line[];
}

export interface Song {
  id: string;
  title: string;
  titleReading?: string;
  artist: string;
  /** 곡에 대한 소개/메모 */
  about?: string;
  /** 공식 YouTube 영상 ID — 임베드 재생 + 가사 싱크에 사용 */
  youtubeId?: string;
  /** public/audio/ 안의 오디오 파일명 (직접 소장한 음원용, 예: akari.mp3) */
  audioFile?: string;
  sections: Section[];
}
