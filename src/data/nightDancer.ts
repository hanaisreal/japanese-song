import type { Song } from '../types';

export const nightDancer: Song = {
  id: "night-dancer",
  title: "NIGHT DANCER",
  titleReading: "ナイトダンサー",
  artist: "imase",
  youtubeId: "kagoEGKHZvU",
  about: "도시적인 밤의 분위기와 가벼운 춤의 리듬을 중심으로 관계의 애매함과 친밀함을 다루는 곡입니다.",
  sections: [
    {
      name: "가사",
      lines: [
        {
          jp: "どうでもいいような 夜だけど",
          reading: "도오데모 이이요오나 요루다케도",
          ko: "아무래도 좋을 것 같은 밤이지만",
          tokens: [
            { surface: "どうでもいい", reading: "どうでもいい", pos: "expression", meaning: "아무래도 좋다, 상관없다" },
            { surface: "ような", pos: "expression", meaning: "~인 것 같은" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "だけど", pos: "particle", meaning: "~지만" }
          ]
        },
        {
          jp: "響めき 煌めきと君も",
          reading: "도요메키 키라메키토 키미모",
          ko: "웅성임과 반짝임 속에 너도",
          tokens: [
            { surface: "響めき", reading: "どよめき", pos: "noun", meaning: "웅성임, 술렁임" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "煌めき", reading: "きらめき", pos: "noun", meaning: "반짝임" },
            { surface: "と", pos: "particle", meaning: "~와/과" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "も", pos: "particle", meaning: "~도" }
          ]
        },
        {
          jp: "まだ止まった 刻む針も",
          reading: "마다 토맛타 키자무 하리모",
          ko: "아직 멈춰 선, 시간을 새기는 바늘도",
          tokens: [
            { surface: "まだ", reading: "まだ", pos: "adverb", meaning: "아직" },
            { surface: "止まった", reading: "とまった", base: "止まる", baseReading: "とまる", pos: "verb", meaning: "멈추다", note: "た형" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "刻む", reading: "きざむ", pos: "verb", meaning: "새기다" },
            { surface: "針", reading: "はり", pos: "noun", meaning: "바늘" },
            { surface: "も", pos: "particle", meaning: "~도" }
          ]
        },
        {
          jp: "入り浸った 散らかる部屋も",
          reading: "이리비탓타 치라카루 헤야모",
          ko: "늘 머물던 어질러진 방도",
          tokens: [
            { surface: "入り浸った", reading: "いりびたった", base: "入り浸る", baseReading: "いりびたる", pos: "verb", meaning: "눌러앉다, 죽치다", note: "た형" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "散らかる", reading: "ちらかる", pos: "verb", meaning: "어질러지다" },
            { surface: "部屋", reading: "へや", pos: "noun", meaning: "방" },
            { surface: "も", pos: "particle", meaning: "~도" }
          ]
        },
        {
          jp: "変わらないね 思い出しては",
          reading: "카와라나이네 오모이다시테와",
          ko: "변하지 않네, 떠올릴 때마다",
          tokens: [
            { surface: "変わらないね", reading: "かわらないね", base: "変わる", baseReading: "かわる", pos: "verb", meaning: "변하지 않네" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "思い出しては", reading: "おもいだしては", base: "思い出す", baseReading: "おもいだす", pos: "verb", meaning: "떠올리면, 떠올릴 때마다", note: "て형+は" }
          ]
        },
        {
          jp: "二人 歳を重ねてた",
          reading: "후타리 토시오 카사네테타",
          ko: "우리 둘은 나이를 더해가고 있었어",
          tokens: [
            { surface: "二人", reading: "ふたり", pos: "noun", meaning: "두 사람, 둘이서" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "歳", reading: "とし", pos: "noun", meaning: "나이" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "重ねてた", reading: "かさねてた", base: "重ねる", baseReading: "かさねる", pos: "verb", meaning: "쌓아왔다, 더해왔다" }
          ]
        },
        {
          jp: "また止まった 落とす針を",
          reading: "마타 토맛타 오토스 하리오",
          ko: "다시 멈춰 떨어뜨린 바늘을",
          tokens: [
            { surface: "また", reading: "また", pos: "adverb", meaning: "또, 다시" },
            { surface: "止まった", reading: "とまった", base: "止まる", baseReading: "とまる", pos: "verb", meaning: "멈추다", note: "た형" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "落とす", reading: "おとす", pos: "verb", meaning: "떨어뜨리다" },
            { surface: "針", reading: "はり", pos: "noun", meaning: "바늘" },
            { surface: "を", pos: "particle", meaning: "~을/를" }
          ]
        },
        {
          jp: "よく流した 聞き飽きるほど",
          reading: "요쿠 나가시타 키키아키루호도",
          ko: "질릴 만큼 자주 틀어두었지",
          tokens: [
            { surface: "よく", reading: "よく", pos: "adverb", meaning: "자주, 잘" },
            { surface: "流した", reading: "ながした", base: "流す", baseReading: "ながす", pos: "verb", meaning: "틀다, 흘려보내다", note: "た형" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "聞き飽きるほど", reading: "ききあきるほど", base: "聞き飽きる", baseReading: "ききあきる", pos: "expression", meaning: "질릴 만큼 듣다", note: "ほど = ~정도로" }
          ]
        },
        {
          jp: "変わらないね 変わらないで",
          reading: "카와라나이네 카와라나이데",
          ko: "변하지 않네, 변하지 말아줘",
          tokens: [
            { surface: "変わらないね", reading: "かわらないね", base: "変わる", baseReading: "かわる", pos: "verb", meaning: "변하지 않네" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "変わらないで", reading: "かわらないで", base: "変わる", baseReading: "かわる", pos: "verb", meaning: "변하지 말아줘", note: "부정형+で (~하지 말고)" }
          ]
        },
        {
          jp: "いられたのは 君だけか",
          reading: "이라레타노와 키미다케카",
          ko: "함께 있을 수 있었던 건 너뿐이었을까",
          tokens: [
            { surface: "いられた", reading: "いられた", base: "いる", baseReading: "いる", pos: "verb", meaning: "있을 수 있었다", note: "가능형 과거" },
            { surface: "の", pos: "particle", meaning: "~한 것" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "だけ", pos: "particle", meaning: "~만, ~뿐" },
            { surface: "か", pos: "particle", meaning: "~일까 (의문)" }
          ]
        },
        {
          jp: "無駄話で はぐらかして",
          reading: "무다바나시데 하구라카시테",
          ko: "쓸데없는 말로 얼버무리고",
          tokens: [
            { surface: "無駄話", reading: "むだばなし", pos: "noun", meaning: "쓸데없는 이야기" },
            { surface: "で", pos: "particle", meaning: "~로" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "はぐらかして", reading: "はぐらかして", base: "はぐらかす", baseReading: "はぐらかす", pos: "verb", meaning: "얼버무리다", note: "て형" }
          ]
        },
        {
          jp: "触れた先を ためらうように",
          reading: "후레타 사키오 타메라우요오니",
          ko: "닿은 그 앞을 망설이듯이",
          tokens: [
            { surface: "触れた", reading: "ふれた", base: "触れる", baseReading: "ふれる", pos: "verb", meaning: "닿다", note: "た형" },
            { surface: "先", reading: "さき", pos: "noun", meaning: "그 앞, 그 너머" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "ためらうように", reading: "ためらうように", base: "ためらう", baseReading: "ためらう", pos: "verb", meaning: "망설이듯이", note: "ように = ~듯이" }
          ]
        },
        {
          jp: "足踏みして ズレた針を余所に",
          reading: "아시부미시테 즈레타 하리오 요소니",
          ko: "제자리걸음하며 어긋난 바늘은 제쳐둔 채",
          tokens: [
            { surface: "足踏みして", reading: "あしぶみして", base: "足踏みする", baseReading: "あしぶみする", pos: "verb", meaning: "제자리걸음하다", note: "て형" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "ズレた", reading: "ずれた", base: "ズレる", baseReading: "ずれる", pos: "verb", meaning: "어긋나다", note: "た형" },
            { surface: "針", reading: "はり", pos: "noun", meaning: "바늘" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "余所", reading: "よそ", pos: "noun", meaning: "다른 곳" },
            { surface: "に", pos: "particle", meaning: "~에", note: "~を余所に = ~을 제쳐두고 (관용)" }
          ]
        },
        {
          jp: "揃い始めてた 息が",
          reading: "소로이하지메테타 이키가",
          ko: "숨결이 맞춰지기 시작했어",
          tokens: [
            { surface: "揃い始めてた", reading: "そろいはじめてた", base: "揃い始める", baseReading: "そろいはじめる", pos: "verb", meaning: "맞춰지기 시작했다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "息", reading: "いき", pos: "noun", meaning: "숨, 호흡" },
            { surface: "が", pos: "particle", meaning: "~이/가" }
          ]
        },
        {
          jp: "どうでもいいような 夜だけど",
          reading: "도오데모 이이요오나 요루다케도",
          ko: "아무래도 좋을 것 같은 밤이지만",
          tokens: [
            { surface: "どうでもいい", reading: "どうでもいい", pos: "expression", meaning: "아무래도 좋다, 상관없다" },
            { surface: "ような", pos: "expression", meaning: "~인 것 같은" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "だけど", pos: "particle", meaning: "~지만" }
          ]
        },
        {
          jp: "響めき 煌めきと君も “踊ろう”",
          reading: "도요메키 키라메키토 키미모 오도로오",
          ko: "웅성임과 반짝임 속에서 너도 춤추자",
          tokens: [
            { surface: "響めき", reading: "どよめき", pos: "noun", meaning: "웅성임, 술렁임" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "煌めき", reading: "きらめき", pos: "noun", meaning: "반짝임" },
            { surface: "と", pos: "particle", meaning: "~와/과" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "も", pos: "particle", meaning: "~도" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "“", pos: "expression", meaning: "인용부호" },
            { surface: "踊ろう", reading: "おどろう", base: "踊る", baseReading: "おどる", pos: "verb", meaning: "춤추자", note: "의지형" },
            { surface: "”", pos: "expression", meaning: "인용부호" }
          ]
        },
        {
          jp: "どうでもいいような 夜だけど",
          reading: "도오데모 이이요오나 요루다케도",
          ko: "아무래도 좋을 것 같은 밤이지만",
          tokens: [
            { surface: "どうでもいい", reading: "どうでもいい", pos: "expression", meaning: "아무래도 좋다, 상관없다" },
            { surface: "ような", pos: "expression", meaning: "~인 것 같은" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "だけど", pos: "particle", meaning: "~지만" }
          ]
        },
        {
          jp: "二人刻もう",
          reading: "후타리 키자모오",
          ko: "둘이서 새겨가자",
          tokens: [
            { surface: "二人", reading: "ふたり", pos: "noun", meaning: "두 사람, 둘이서" },
            { surface: "刻もう", reading: "きざもう", base: "刻む", baseReading: "きざむ", pos: "verb", meaning: "새기자", note: "의지형" }
          ]
        },
        {
          jp: "透き通った 白い肌も",
          reading: "스키토옷타 시로이 하다모",
          ko: "투명하게 맑은 하얀 피부도",
          tokens: [
            { surface: "透き通った", reading: "すきとおった", base: "透き通る", baseReading: "すきとおる", pos: "verb", meaning: "맑다, 투명하다", note: "た형" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "白い", reading: "しろい", pos: "i-adj", meaning: "하얗다" },
            { surface: "肌", reading: "はだ", pos: "noun", meaning: "피부" },
            { surface: "も", pos: "particle", meaning: "~도" }
          ]
        },
        {
          jp: "その笑った 無邪気な顔も",
          reading: "소노 와랏타 무자키나 카오모",
          ko: "그렇게 웃던 천진한 얼굴도",
          tokens: [
            { surface: "その", reading: "その", pos: "prenoun", meaning: "그" },
            { surface: "笑った", reading: "わらった", base: "笑う", baseReading: "わらう", pos: "verb", meaning: "웃다", note: "た형" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "無邪気な", reading: "むじゃきな", base: "無邪気だ", baseReading: "むじゃきだ", pos: "na-adj", meaning: "천진한, 순진한" },
            { surface: "顔", reading: "かお", pos: "noun", meaning: "얼굴" },
            { surface: "も", pos: "particle", meaning: "~도" }
          ]
        },
        {
          jp: "変わらないね 変わらないで",
          reading: "카와라나이네 카와라나이데",
          ko: "변하지 않네, 변하지 말아줘",
          tokens: [
            { surface: "変わらないね", reading: "かわらないね", base: "変わる", baseReading: "かわる", pos: "verb", meaning: "변하지 않네" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "変わらないで", reading: "かわらないで", base: "変わる", baseReading: "かわる", pos: "verb", meaning: "변하지 말아줘", note: "부정형+で (~하지 말고)" }
          ]
        },
        {
          jp: "いられるのは 今だけか",
          reading: "이라레루노와 이마다케카",
          ko: "함께 있을 수 있는 건 지금뿐일까",
          tokens: [
            { surface: "いられる", reading: "いられる", base: "いる", baseReading: "いる", pos: "verb", meaning: "있을 수 있다", note: "가능형" },
            { surface: "の", pos: "particle", meaning: "~한 것" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "今", reading: "いま", pos: "noun", meaning: "지금" },
            { surface: "だけ", pos: "particle", meaning: "~만, ~뿐" },
            { surface: "か", pos: "particle", meaning: "~일까 (의문)" }
          ]
        },
        {
          jp: "見つめるほどに",
          reading: "미츠메루호도니",
          ko: "바라볼수록",
          tokens: [
            { surface: "見つめる", reading: "みつめる", pos: "verb", meaning: "바라보다, 응시하다" },
            { surface: "ほどに", pos: "particle", meaning: "~할수록" }
          ]
        },
        {
          jp: "溢れる メモリー",
          reading: "아후레루 메모리이",
          ko: "기억이 넘쳐흘러",
          tokens: [
            { surface: "溢れる", reading: "あふれる", pos: "verb", meaning: "넘치다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "メモリー", pos: "noun", meaning: "메모리, 추억" }
          ]
        },
        {
          jp: "浮つく心に コーヒーを",
          reading: "우와츠쿠 코코로니 코오히이오",
          ko: "들뜬 마음에 커피를",
          tokens: [
            { surface: "浮つく", reading: "うわつく", pos: "verb", meaning: "들뜨다" },
            { surface: "心", reading: "こころ", pos: "noun", meaning: "마음" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "コーヒー", pos: "noun", meaning: "커피" },
            { surface: "を", pos: "particle", meaning: "~을/를" }
          ]
        },
        {
          jp: "乱れた髪に 掠れたメロディー",
          reading: "미다레타 카미니 카스레타 메로디이",
          ko: "흐트러진 머리에 스치는 듯한 멜로디",
          tokens: [
            { surface: "乱れた", reading: "みだれた", base: "乱れる", baseReading: "みだれる", pos: "verb", meaning: "흐트러지다", note: "た형" },
            { surface: "髪", reading: "かみ", pos: "noun", meaning: "머리카락" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "掠れた", reading: "かすれた", base: "掠れる", baseReading: "かすれる", pos: "verb", meaning: "희미해지다, 스치다", note: "た형" },
            { surface: "メロディー", pos: "noun", meaning: "멜로디" }
          ]
        },
        {
          jp: "混ざりあってよう もう一度",
          reading: "마자리앗테요오 모오 이치도",
          ko: "다시 한 번 서로 뒤섞여 있자",
          tokens: [
            { surface: "混ざりあってよう", reading: "まざりあってよう", base: "混ざり合う", baseReading: "まざりあう", pos: "verb", meaning: "서로 뒤섞이자", note: "의지형(권유)" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "もう一度", reading: "もういちど", pos: "adverb", meaning: "다시 한 번" }
          ]
        },
        {
          jp: "どうでもいいような 夜だけど",
          reading: "도오데모 이이요오나 요루다케도",
          ko: "아무래도 좋을 것 같은 밤이지만",
          tokens: [
            { surface: "どうでもいい", reading: "どうでもいい", pos: "expression", meaning: "아무래도 좋다, 상관없다" },
            { surface: "ような", pos: "expression", meaning: "~인 것 같은" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "だけど", pos: "particle", meaning: "~지만" }
          ]
        },
        {
          jp: "ときめき 色めきと君も “踊ろう”",
          reading: "토키메키 이로메키토 키미모 오도로오",
          ko: "설렘과 들뜬 빛 속에서 너도 춤추자",
          tokens: [
            { surface: "ときめき", reading: "ときめき", pos: "noun", meaning: "설렘" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "色めき", reading: "いろめき", pos: "noun", meaning: "들뜬 기색, 화색" },
            { surface: "と", pos: "particle", meaning: "~와/과" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "も", pos: "particle", meaning: "~도" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "“", pos: "expression", meaning: "인용부호" },
            { surface: "踊ろう", reading: "おどろう", base: "踊る", baseReading: "おどる", pos: "verb", meaning: "춤추자", note: "의지형" },
            { surface: "”", pos: "expression", meaning: "인용부호" }
          ]
        },
        {
          jp: "どうでもいいような 夜だけど",
          reading: "도오데모 이이요오나 요루다케도",
          ko: "아무래도 좋을 것 같은 밤이지만",
          tokens: [
            { surface: "どうでもいい", reading: "どうでもいい", pos: "expression", meaning: "아무래도 좋다, 상관없다" },
            { surface: "ような", pos: "expression", meaning: "~인 것 같은" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "だけど", pos: "particle", meaning: "~지만" }
          ]
        },
        {
          jp: "二人刻もう",
          reading: "후타리 키자모오",
          ko: "둘이서 새겨가자",
          tokens: [
            { surface: "二人", reading: "ふたり", pos: "noun", meaning: "두 사람, 둘이서" },
            { surface: "刻もう", reading: "きざもう", base: "刻む", baseReading: "きざむ", pos: "verb", meaning: "새기자", note: "의지형" }
          ]
        },
        {
          jp: "夜は長い おぼつかない",
          reading: "요루와 나가이 오보츠카나이",
          ko: "밤은 길고, 모든 게 불안정해",
          tokens: [
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "長い", reading: "ながい", pos: "i-adj", meaning: "길다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "おぼつかない", reading: "おぼつかない", pos: "i-adj", meaning: "불안정하다, 위태롭다" }
          ]
        },
        {
          jp: "今にも止まりそうな ミュージック",
          reading: "이마니모 토마리소오나 뮤우직쿠",
          ko: "금방이라도 멈출 것 같은 음악",
          tokens: [
            { surface: "今にも", reading: "いまにも", pos: "adverb", meaning: "금방이라도" },
            { surface: "止まりそうな", reading: "とまりそうな", base: "止まる", baseReading: "とまる", pos: "expression", meaning: "멈출 것 같은", note: "そう = 양태" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "ミュージック", pos: "noun", meaning: "음악" }
          ]
        },
        {
          jp: "君といたい 溺れてたい",
          reading: "키미토 이타이 오보레테타이",
          ko: "너와 있고 싶어, 이 밤에 빠져 있고 싶어",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "と", pos: "particle", meaning: "~와/과" },
            { surface: "いたい", reading: "いたい", base: "いる", baseReading: "いる", pos: "i-adj", meaning: "있고 싶다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "溺れてたい", reading: "おぼれてたい", base: "溺れる", baseReading: "おぼれる", pos: "i-adj", meaning: "빠져 있고 싶다" }
          ]
        },
        {
          jp: "明日がこなくたって もういいの",
          reading: "아스가 코나쿠탓테 모오 이이노",
          ko: "내일이 오지 않아도 이제 괜찮아",
          tokens: [
            { surface: "明日", reading: "あす", pos: "noun", meaning: "내일" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "こなくたって", reading: "こなくたって", base: "来る", baseReading: "くる", pos: "expression", meaning: "오지 않아도", note: "来ない+たって(=ても)" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "もういいの", reading: "もういいの", pos: "expression", meaning: "이제 됐어, 괜찮아" }
          ]
        },
        {
          jp: "どうでもいいような 夜だけど",
          reading: "도오데모 이이요오나 요루다케도",
          ko: "아무래도 좋을 것 같은 밤이지만",
          tokens: [
            { surface: "どうでもいい", reading: "どうでもいい", pos: "expression", meaning: "아무래도 좋다, 상관없다" },
            { surface: "ような", pos: "expression", meaning: "~인 것 같은" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "だけど", pos: "particle", meaning: "~지만" }
          ]
        },
        {
          jp: "響めき 煌めきと君も ”踊ろう”",
          reading: "도요메키 키라메키토 키미모 오도로오",
          ko: "웅성임과 반짝임 속에서 너도 춤추자",
          tokens: [
            { surface: "響めき", reading: "どよめき", pos: "noun", meaning: "웅성임, 술렁임" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "煌めき", reading: "きらめき", pos: "noun", meaning: "반짝임" },
            { surface: "と", pos: "particle", meaning: "~와/과" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "も", pos: "particle", meaning: "~도" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "”", pos: "expression", meaning: "인용부호" },
            { surface: "踊ろう", reading: "おどろう", base: "踊る", baseReading: "おどる", pos: "verb", meaning: "춤추자", note: "의지형" },
            { surface: "”", pos: "expression", meaning: "인용부호" }
          ]
        },
        {
          jp: "どうでもいいような 夜だけど",
          reading: "도오데모 이이요오나 요루다케도",
          ko: "아무래도 좋을 것 같은 밤이지만",
          tokens: [
            { surface: "どうでもいい", reading: "どうでもいい", pos: "expression", meaning: "아무래도 좋다, 상관없다" },
            { surface: "ような", pos: "expression", meaning: "~인 것 같은" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "だけど", pos: "particle", meaning: "~지만" }
          ]
        },
        {
          jp: "愛して",
          reading: "아이시테",
          ko: "사랑해줘",
          tokens: [
            { surface: "愛して", reading: "あいして", base: "愛する", baseReading: "あいする", pos: "verb", meaning: "사랑해줘", note: "愛する의 て형(부드러운 명령)" }
          ]
        },
        {
          jp: "どうでもいいから 僕だけを",
          reading: "도오데모 이이카라 보쿠다케오",
          ko: "다른 건 상관없으니 나만을",
          tokens: [
            { surface: "どうでもいい", reading: "どうでもいい", pos: "expression", meaning: "아무래도 좋다, 상관없다" },
            { surface: "から", pos: "particle", meaning: "~니까" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "僕", reading: "ぼく", pos: "noun", meaning: "나" },
            { surface: "だけ", pos: "particle", meaning: "~만" },
            { surface: "を", pos: "particle", meaning: "~을/를" }
          ]
        },
        {
          jp: "ふらつき よろめきながらも “踊ろう”",
          reading: "후라츠키 요로메키나가라모 오도로오",
          ko: "비틀거리고 휘청이면서도 춤추자",
          tokens: [
            { surface: "ふらつき", reading: "ふらつき", base: "ふらつく", baseReading: "ふらつく", pos: "verb", meaning: "비틀거리다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "よろめきながらも", reading: "よろめきながらも", base: "よろめく", baseReading: "よろめく", pos: "verb", meaning: "휘청이면서도", note: "ながら = ~하면서, も = ~도" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "“", pos: "expression", meaning: "인용부호" },
            { surface: "踊ろう", reading: "おどろう", base: "踊る", baseReading: "おどる", pos: "verb", meaning: "춤추자", note: "의지형" },
            { surface: "”", pos: "expression", meaning: "인용부호" }
          ]
        },
        {
          jp: "どうでもいいような 夜だけど",
          reading: "도오데모 이이요오나 요루다케도",
          ko: "아무래도 좋을 것 같은 밤이지만",
          tokens: [
            { surface: "どうでもいい", reading: "どうでもいい", pos: "expression", meaning: "아무래도 좋다, 상관없다" },
            { surface: "ような", pos: "expression", meaning: "~인 것 같은" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "だけど", pos: "particle", meaning: "~지만" }
          ]
        },
        {
          jp: "二人刻もう",
          reading: "후타리 키자모오",
          ko: "둘이서 새겨가자",
          tokens: [
            { surface: "二人", reading: "ふたり", pos: "noun", meaning: "두 사람, 둘이서" },
            { surface: "刻もう", reading: "きざもう", base: "刻む", baseReading: "きざむ", pos: "verb", meaning: "새기자", note: "의지형" }
          ]
        }
      ]
    }
  ]
};
