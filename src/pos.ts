import type { POS } from './types';

export interface PosInfo {
  ko: string;   // 한국어 이름
  jp: string;   // 일본어 이름
  color: string;
}

// 밝은 화면에서도 확실히 구분되는 선명한 네온 팔레트
export const POS_INFO: Record<POS, PosInfo> = {
  noun:         { ko: '명사',       jp: '名詞',    color: '#006BFF' },
  pronoun:      { ko: '대명사',     jp: '代名詞',  color: '#00A3FF' },
  verb:         { ko: '동사',       jp: '動詞',    color: '#FF2D55' },
  'i-adj':      { ko: 'い형용사',   jp: '形容詞',  color: '#00C853' },
  'na-adj':     { ko: 'な형용사',   jp: '形容動詞', color: '#64DD17' },
  adverb:       { ko: '부사',       jp: '副詞',    color: '#9C27FF' },
  particle:     { ko: '조사',       jp: '助詞',    color: '#FF9F00' },
  auxiliary:    { ko: '조동사·어미', jp: '助動詞',  color: '#FF5E00' },
  conjunction:  { ko: '접속사',     jp: '接続詞',  color: '#00B8D4' },
  interjection: { ko: '감탄사',     jp: '感動詞',  color: '#FF00A8' },
  prenoun:      { ko: '연체사',     jp: '連体詞',  color: '#7C4DFF' },
  suffix:       { ko: '접미사',     jp: '接尾辞',  color: '#AEEA00' },
  expression:   { ko: '표현·관용구', jp: '表現',    color: '#00C2A8' },
};
