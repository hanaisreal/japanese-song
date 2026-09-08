import type { Token } from './types';

const PHRASE_TRANSLATIONS: Array<[RegExp, string]> = [
  [/どうでもいいような.*夜だけど/, '아무래도 좋을 것 같은 밤이지만'],
  [/騒がしい.*日々に.*笑えない君に/, '소란스러운 나날 속 웃지 못하는 너에게'],
  [/思い出すように.*まぶたに/, '떠올리듯 눈꺼풀에'],
  [/映る君を.*描いた/, '비치는 너를 그렸어'],
  [/響めき.*煌めき.*君も.*踊ろう/, '웅성임과 반짝임 속에서 너도 함께 춤추자'],
  [/どうにもならないような.*夜だけど/, '어떻게도 되지 않을 것 같은 밤이지만'],
  [/吐き出さないで/, '털어놓지 말아줘'],
  [/二人刻もう/, '둘이서 새겨가자'],
  [/夜は長い/, '밤은 길어'],
  [/おぼつかない/, '불안정해'],
  [/今にも止まりそうな/, '금방이라도 멈출 것 같은'],
  [/時計の針を/, '시곗바늘을'],
  [/回そう/, '돌리자'],
  [/ミュージック/, '음악'],
  [/夜に溺れて/, '밤에 빠져들어'],
  [/忘れないで/, '잊지 말아줘'],
  [/願うなら/, '바란다면'],
  [/確かめて/, '확인해줘'],
  [/君といたい/, '너와 있고 싶어'],
  [/明日がこなくたって/, '내일이 오지 않아도'],
  [/どうでもいいような\s*夜だけど/, '아무래도 좋을 것 같은 밤이지만'],
  [/君も.*踊ろう/, '너도 함께 춤추자'],
  [/二人刻もう/, '둘이서 새겨가자'],
  [/夜は長い/, '밤은 길고'],
  [/君といたい/, '너와 있고 싶어'],
  [/明日がこなくたって/, '내일이 오지 않아도'],
  [/僕の善意が壊れてゆく前に/, '내 선의가 부서져 가기 전에'],
  [/君に全部告げるべきだった/, '너에게 전부 말했어야 했어'],
  [/夜が降りて/, '밤이 내려와'],
  [/気持ち/, '마음'],
  [/燈/, '등불'],
  [/今日は/, '오늘은'],
  [/記憶は儚い/, '기억은 덧없어'],
];

const WORD_TRANSLATIONS: Record<string, string> = {
  僕: '나',
  私: '나',
  俺: '나',
  君: '너',
  二人: '두 사람',
  夜: '밤',
  朝: '아침',
  今日: '오늘',
  明日: '내일',
  昨日: '어제',
  今: '지금',
  愛: '사랑',
  心: '마음',
  気持ち: '마음',
  記憶: '기억',
  声: '목소리',
  顔: '얼굴',
  肌: '피부',
  髪: '머리카락',
  部屋: '방',
  針: '바늘/시곗바늘',
  燈: '등불',
  灯り: '불빛',
  光: '빛',
  月: '달',
  夢: '꿈',
  世界: '세계',
  善意: '선의',
  生活: '생활',
  話: '이야기',
  コーヒー: '커피',
  メモリー: '메모리/기억',
  ミュージック: '음악',
};

const PARTICLE_TRANSLATIONS: Record<string, string> = {
  は: '~은/는',
  が: '~이/가',
  を: '~을/를',
  に: '~에',
  で: '~에서/~로',
  と: '~와/라고',
  も: '~도',
  の: '~의',
  へ: '~로',
  から: '~부터',
  まで: '~까지',
};

function compact(value: string): string {
  return value.replace(/\s+/g, '').trim();
}

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

export function translateJapaneseLineHeuristic(jp: string, tokens: Token[]): string {
  const line = compact(jp);
  for (const [pattern, ko] of PHRASE_TRANSLATIONS) {
    if (pattern.test(line)) return ko;
  }

  const words = unique(
    tokens.map((token) => WORD_TRANSLATIONS[token.surface] ?? PARTICLE_TRANSLATIONS[token.surface] ?? '')
  );

  if (words.length >= 3) return `초벌: ${words.slice(0, 5).join(' · ')}`;
  if (words.length > 0) return `초벌: ${words.join(' · ')}`;

  return '한국어 번역 데이터 없음';
}

export async function translateWithOptionalEndpoint(
  jp: string,
  tokens: Token[],
  endpoint?: string,
): Promise<string> {
  if (!endpoint) return translateJapaneseLineHeuristic(jp, tokens);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jp, tokens }),
  });
  if (!response.ok) throw new Error(`Translation failed: HTTP ${response.status}`);
  const data = (await response.json()) as { ko?: string };
  return data.ko?.trim() || translateJapaneseLineHeuristic(jp, tokens);
}
