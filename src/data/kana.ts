// 오십음도(五十音図) 데이터 — 히라가나 기준, 가타카나는 코드포인트 변환으로 파생
export interface KanaRow {
  name: string;
  kana: (string | null)[]; // null = 빈 칸
}

export const GOJUON: KanaRow[] = [
  { name: 'あ행', kana: ['あ', 'い', 'う', 'え', 'お'] },
  { name: 'か행', kana: ['か', 'き', 'く', 'け', 'こ'] },
  { name: 'さ행', kana: ['さ', 'し', 'す', 'せ', 'そ'] },
  { name: 'た행', kana: ['た', 'ち', 'つ', 'て', 'と'] },
  { name: 'な행', kana: ['な', 'に', 'ぬ', 'ね', 'の'] },
  { name: 'は행', kana: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
  { name: 'ま행', kana: ['ま', 'み', 'む', 'め', 'も'] },
  { name: 'や행', kana: ['や', null, 'ゆ', null, 'よ'] },
  { name: 'ら행', kana: ['ら', 'り', 'る', 'れ', 'ろ'] },
  { name: 'わ행', kana: ['わ', null, null, null, 'を'] },
  { name: 'ん', kana: ['ん', null, null, null, null] },
];

export const DAKUON: KanaRow[] = [
  { name: 'が행', kana: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
  { name: 'ざ행', kana: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
  { name: 'だ행', kana: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
  { name: 'ば행', kana: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
  { name: 'ぱ행', kana: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },
];

export const YOON: KanaRow[] = [
  { name: 'きゃ행', kana: ['きゃ', 'きゅ', 'きょ'] },
  { name: 'しゃ행', kana: ['しゃ', 'しゅ', 'しょ'] },
  { name: 'ちゃ행', kana: ['ちゃ', 'ちゅ', 'ちょ'] },
  { name: 'にゃ행', kana: ['にゃ', 'にゅ', 'にょ'] },
  { name: 'ひゃ행', kana: ['ひゃ', 'ひゅ', 'ひょ'] },
  { name: 'みゃ행', kana: ['みゃ', 'みゅ', 'みょ'] },
  { name: 'りゃ행', kana: ['りゃ', 'りゅ', 'りょ'] },
  { name: 'ぎゃ행', kana: ['ぎゃ', 'ぎゅ', 'ぎょ'] },
  { name: 'じゃ행', kana: ['じゃ', 'じゅ', 'じょ'] },
  { name: 'びゃ행', kana: ['びゃ', 'びゅ', 'びょ'] },
  { name: 'ぴゃ행', kana: ['ぴゃ', 'ぴゅ', 'ぴょ'] },
];

/** 히라가나 → 가타카나 */
export function toKatakana(hira: string): string {
  return hira.replace(/[ぁ-ゖ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}
