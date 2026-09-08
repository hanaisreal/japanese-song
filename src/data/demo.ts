import type { Song } from '../types';

// UI 확인용 데모 — 직접 만든 예문입니다. 실제 가사를 받으면 교체하세요.
export const demo: Song = {
  id: 'demo',
  title: 'デモ（れんしゅう）',
  artist: '연습용 예문',
  about:
    '앱 사용법을 익히기 위한 연습 문장입니다. 줄을 클릭하면 단어별 분석이 열립니다. 실제 가사를 추가하면 이 데모는 지워도 됩니다.',
  sections: [
    {
      name: '연습 1',
      lines: [
        {
          jp: '夜の街を一人で歩く',
          ko: '밤의 거리를 혼자서 걷는다',
          tokens: [
            { surface: '夜', reading: 'よる', pos: 'noun', meaning: '밤' },
            {
              surface: 'の', pos: 'particle', meaning: '~의',
              note: '소유·수식의 조사. 「A の B」= A의 B',
            },
            { surface: '街', reading: 'まち', pos: 'noun', meaning: '거리, 시내' },
            {
              surface: 'を', pos: 'particle', meaning: '~을/를',
              note: '목적격 조사. 동작의 대상을 나타냄',
            },
            { surface: '一人', reading: 'ひとり', pos: 'noun', meaning: '혼자, 한 사람' },
            {
              surface: 'で', pos: 'particle', meaning: '~(으)로, ~서',
              note: '수단·상태의 조사. 「一人で」= 혼자서',
            },
            {
              surface: '歩く', reading: 'あるく', base: '歩く', pos: 'verb',
              meaning: '걷다', note: '사전형(기본형) 그대로 쓰인 형태',
            },
          ],
          grammar: ['「~を + 동사」: ~을/를 ~하다 (목적어 구조)'],
        },
        {
          jp: '遠くの空に灯りが見える',
          ko: '먼 하늘에 불빛이 보인다',
          tokens: [
            {
              surface: '遠く', reading: 'とおく', base: '遠い', baseReading: 'とおい', pos: 'noun',
              meaning: '먼 곳', note: 'い형용사 遠い(멀다)의 명사화. 「遠くの~」= 먼 곳의~',
            },
            { surface: 'の', pos: 'particle', meaning: '~의' },
            { surface: '空', reading: 'そら', pos: 'noun', meaning: '하늘' },
            {
              surface: 'に', pos: 'particle', meaning: '~에',
              note: '장소·방향의 조사. 존재하는 위치를 나타냄',
            },
            { surface: '灯り', reading: 'あかり', pos: 'noun', meaning: '불빛, 등불' },
            {
              surface: 'が', pos: 'particle', meaning: '~이/가',
              note: '주격 조사. 見える(보이다) 같은 자발동사와 자주 짝을 이룸',
            },
            {
              surface: '見える', reading: 'みえる', base: '見える', pos: 'verb',
              meaning: '보이다', note: '見る(보다)와 달리 저절로 눈에 들어온다는 뜻',
            },
          ],
          grammar: ['「~が見える」: ~이 보인다 (가능·자발 표현)'],
        },
        {
          jp: '君の声を忘れないように',
          ko: '너의 목소리를 잊지 않도록',
          tokens: [
            {
              surface: '君', reading: 'きみ', pos: 'pronoun', meaning: '너, 그대',
              note: '가사에서 아주 자주 나오는 2인칭. 친밀한 사이에 씀',
            },
            { surface: 'の', pos: 'particle', meaning: '~의' },
            { surface: '声', reading: 'こえ', pos: 'noun', meaning: '목소리' },
            { surface: 'を', pos: 'particle', meaning: '~을/를' },
            {
              surface: '忘れ', reading: 'わすれ', base: '忘れる', baseReading: 'わすれる', pos: 'verb',
              meaning: '잊다', note: '忘れる의 ない형 어간',
            },
            {
              surface: 'ない', pos: 'auxiliary', meaning: '~지 않다',
              note: '부정의 조동사. 동사 ない형에 붙음',
            },
            {
              surface: 'ように', pos: 'expression', meaning: '~하도록',
              note: '목적·기원의 표현. 「~ないように」= ~하지 않도록',
            },
          ],
          grammar: ['「~ないように」: ~하지 않도록 (기원·목적)'],
        },
        {
          jp: '明日もきっと歌い続ける',
          ko: '내일도 분명 계속 노래할 거야',
          tokens: [
            { surface: '明日', reading: 'あした', pos: 'noun', meaning: '내일' },
            {
              surface: 'も', pos: 'particle', meaning: '~도',
              note: '첨가의 조사. 「明日も」= 내일도',
            },
            { surface: 'きっと', pos: 'adverb', meaning: '분명히, 꼭' },
            {
              surface: '歌い', reading: 'うたい', base: '歌う', baseReading: 'うたう', pos: 'verb',
              meaning: '노래하다', note: '歌う의 ます형 어간 — 뒤에 다른 동사가 붙는 형태',
            },
            {
              surface: '続ける', reading: 'つづける', base: '続ける', pos: 'verb',
              meaning: '계속하다', note: '「동사 ます형 + 続ける」= 계속 ~하다 (복합동사)',
            },
          ],
          grammar: ['「~続ける」: 계속 ~하다'],
        },
      ],
    },
  ],
};
