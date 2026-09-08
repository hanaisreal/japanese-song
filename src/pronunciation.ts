import { kanaToRomaji } from './romaji';

const ROMAJI_TO_HANGUL: Array<[RegExp, string]> = [
  [/kyo/g, '쿄'], [/kyu/g, '큐'], [/kya/g, '캬'],
  [/sho/g, '쇼'], [/shu/g, '슈'], [/sha/g, '샤'],
  [/cho/g, '초'], [/chu/g, '츄'], [/cha/g, '챠'],
  [/nyo/g, '뇨'], [/nyu/g, '뉴'], [/nya/g, '냐'],
  [/hyo/g, '효'], [/hyu/g, '휴'], [/hya/g, '햐'],
  [/myo/g, '묘'], [/myu/g, '뮤'], [/mya/g, '먀'],
  [/ryo/g, '료'], [/ryu/g, '류'], [/rya/g, '랴'],
  [/gyo/g, '교'], [/gyu/g, '규'], [/gya/g, '갸'],
  [/jo/g, '조'], [/ju/g, '주'], [/ja/g, '자'],
  [/byo/g, '뵤'], [/byu/g, '뷰'], [/bya/g, '뱌'],
  [/pyo/g, '표'], [/pyu/g, '퓨'], [/pya/g, '퍄'],
  [/tsu/g, '츠'], [/shi/g, '시'], [/chi/g, '치'], [/fu/g, '후'],
  [/ka/g, '카'], [/ki/g, '키'], [/ku/g, '쿠'], [/ke/g, '케'], [/ko/g, '코'],
  [/sa/g, '사'], [/su/g, '스'], [/se/g, '세'], [/so/g, '소'],
  [/ta/g, '타'], [/te/g, '테'], [/to/g, '토'],
  [/na/g, '나'], [/ni/g, '니'], [/nu/g, '누'], [/ne/g, '네'], [/no/g, '노'],
  [/ha/g, '하'], [/hi/g, '히'], [/he/g, '헤'], [/ho/g, '호'],
  [/ma/g, '마'], [/mi/g, '미'], [/mu/g, '무'], [/me/g, '메'], [/mo/g, '모'],
  [/ya/g, '야'], [/yu/g, '유'], [/yo/g, '요'],
  [/ra/g, '라'], [/ri/g, '리'], [/ru/g, '루'], [/re/g, '레'], [/ro/g, '로'],
  [/wa/g, '와'], [/wo/g, '오'],
  [/ga/g, '가'], [/gi/g, '기'], [/gu/g, '구'], [/ge/g, '게'], [/go/g, '고'],
  [/za/g, '자'], [/ji/g, '지'], [/zu/g, '즈'], [/ze/g, '제'], [/zo/g, '조'],
  [/da/g, '다'], [/de/g, '데'], [/do/g, '도'],
  [/ba/g, '바'], [/bi/g, '비'], [/bu/g, '부'], [/be/g, '베'], [/bo/g, '보'],
  [/pa/g, '파'], [/pi/g, '피'], [/pu/g, '푸'], [/pe/g, '페'], [/po/g, '포'],
  [/a/g, '아'], [/i/g, '이'], [/u/g, '우'], [/e/g, '에'], [/o/g, '오'], [/n/g, 'ㄴ'],
];

export const WORD_READING: Record<string, string> = {
  僕: 'ぼく', 善意: 'ぜんい', 壊: 'こわ', 前: 'まえ', 君: 'きみ', 全部: 'ぜんぶ', 告: 'つ',
  夜: 'よる', 街: 'まち', 一人: 'ひとり', 歩: 'ある', 降: 'お', 解: 'ほど', 生活: 'せいかつ',
  混濁: 'こんだく', 気持: 'きも', 掠: 'かす', 燈: 'あかり', 仕方: 'しかた', 受: 'う', 入: 'い',
  何処: 'どこ', 話: 'はなし', 赤: 'あか', 顔: 'かお', 見: 'み', 故: 'ゆえ', 月: 'つき', 暗: 'くら',
  頭: 'あたま', 今日: 'きょう', 櫂: 'かい', 持: 'も', 探: 'さが', 物: 'もの', 揺: 'ゆ', 愛: 'あい',
  隠: 'かく', 生: 'い', 眠: 'ねむ', 新品: 'しんぴん', 朝: 'あさ', 孤独: 'こどく', 線引: 'せんび',
  記憶: 'きおく', 儚: 'はかな', 昨日: 'きのう', 用: 'よう', 歪: 'ゆが', 明日: 'あす', 行: 'い',
  傷: 'きず', 心: 'こころ', 同: 'おな', 跡: 'あと', 一括: 'ひとくく', 本当: 'ほんとう', 透明: 'とうめい',
  燃: 'も', 変: 'か', 形: 'かたち', 崩: 'くず', 希望: 'きぼう', 手: 'て', 離: 'はな', 幽霊: 'ゆうれい',
  日々: 'ひび', 数: 'かぞ', 涙: 'なみだ', 歌: 'うた', 中: 'なか', 自由: 'じゆう',
  静: 'しず', 住: 'す', 目覚: 'めざ', 触: 'ふ',
  響: 'どよ', 煌: 'きら', 踊: 'おど', 吐: 'は', 出: 'だ', 刻: 'きざ', 長: 'なが',
  止: 'と', 今: 'いま', 回: 'まわ', 時計: 'とけい', 針: 'はり', 音: 'おと',
  好: 'す', 溺: 'おぼ', 忘: 'わす', 願: 'ねが', 確: 'たし',
};

export function kanaToHangul(kana: string): string {
  let romaji = kanaToRomaji(kana).replace(/'/g, '');
  for (const [pattern, value] of ROMAJI_TO_HANGUL) romaji = romaji.replace(pattern, value);
  return romaji;
}

export function readingToHangul(reading: string): string {
  return reading
    .split(/\s+/)
    .map((part) => (/^[ぁ-んァ-ヶー]+$/.test(part) ? kanaToHangul(part) : part))
    .join(' ')
    .replace(/ㄴ(?=[아-힣])/g, 'ㄴ');
}

export function readingForSurface(surface: string): string | undefined {
  return WORD_READING[surface];
}
