import type { Song } from '../types';

export const akari: Song = {
  id: "akari",
  title: "燈",
  titleReading: "あかり",
  artist: "崎山蒼志 (Sakiyama Soushi)",
  youtubeId: "4jWzGkRsHw8",
  about: "주술회전 2기(회옥·옥절) 엔딩 테마. 일본어 원문, 한국어식 발음, 한국어 번역을 줄별로 저장한 학습용 데이터입니다.",
  sections: [
    {
      name: "가사",
      lines: [
        {
          jp: "僕の善意が壊れてゆく前に",
          reading: "보쿠노 젠이가 코와레테 유쿠 마에니",
          ko: "내 선의가 부서져 버리기 전에",
          tokens: [
            { surface: "僕", reading: "ぼく", pos: "noun", meaning: "나" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "善意", reading: "ぜんい", pos: "noun", meaning: "선의" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "壊れてゆく", reading: "こわれてゆく", base: "壊れる", baseReading: "こわれる", pos: "verb", meaning: "부서져 가다", note: "壊れる의 て형 + ゆく(~해 가다)" },
            { surface: "前", reading: "まえ", pos: "noun", meaning: "전, 앞" },
            { surface: "に", pos: "particle", meaning: "~에" }
          ]
        },
        {
          jp: "君に全部告げるべきだった",
          reading: "키미니 젠부 츠게루베키닷타",
          ko: "너에게 전부 전했어야 했어",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "に", pos: "particle", meaning: "~에게" },
            { surface: "全部", reading: "ぜんぶ", pos: "noun", meaning: "전부" },
            { surface: "告げるべきだった", reading: "つげるべきだった", base: "告げる", baseReading: "つげる", pos: "expression", meaning: "말했어야 했다", note: "동사 사전형+べきだった(~했어야 했다)" }
          ]
        },
        {
          jp: "夜が降りて解けての生活に",
          reading: "요루가 오리테 토케테노 세이카츠니",
          ko: "밤이 내려와 사라지는 생활에",
          tokens: [
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "降りて", reading: "おりて", base: "降りる", baseReading: "おりる", pos: "verb", meaning: "내리다", note: "て형" },
            { surface: "解けての", reading: "とけての", base: "解ける", baseReading: "とける", pos: "verb", meaning: "풀리다, 사라지다", note: "て형+の (명사 수식)" },
            { surface: "生活", reading: "せいかつ", pos: "noun", meaning: "생활" },
            { surface: "に", pos: "particle", meaning: "~에" }
          ]
        },
        {
          jp: "混濁した気持ち掠れる燈",
          reading: "콘다쿠시타 키모치 카스레루 아카리",
          ko: "혼탁한 마음과 스쳐가는 등불",
          tokens: [
            { surface: "混濁した", reading: "こんだくした", base: "混濁する", baseReading: "こんだくする", pos: "verb", meaning: "혼탁하다" },
            { surface: "気持ち", reading: "きもち", pos: "noun", meaning: "마음, 기분" },
            { surface: "掠れる", reading: "かすれる", pos: "verb", meaning: "스치다, 희미해지다" },
            { surface: "燈", reading: "あかり", pos: "noun", meaning: "등불, 빛" }
          ]
        },
        {
          jp: "仕方がないと受け入れるのなら",
          reading: "시카타가 나이토 우케이레루노나라",
          ko: "어쩔 수 없다며 받아들일 거라면",
          tokens: [
            { surface: "仕方", reading: "しかた", pos: "noun", meaning: "방법, 수단", note: "仕方がない = 어쩔 수 없다" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" },
            { surface: "と", pos: "particle", meaning: "~라고" },
            { surface: "受け入れる", reading: "うけいれる", pos: "verb", meaning: "받아들이다" },
            { surface: "のなら", pos: "expression", meaning: "~할 거라면" }
          ]
        },
        {
          jp: "それまでだってわかっても",
          reading: "소레마데닷테 와캇테모",
          ko: "거기까지라고 알면서도",
          tokens: [
            { surface: "それ", reading: "それ", pos: "pronoun", meaning: "그것" },
            { surface: "まで", pos: "particle", meaning: "~까지" },
            { surface: "だって", pos: "particle", meaning: "~라도, ~든" },
            { surface: "わかって", reading: "わかって", base: "わかる", baseReading: "わかる", pos: "verb", meaning: "알다", note: "て형" },
            { surface: "も", pos: "particle", meaning: "~도" }
          ]
        },
        {
          jp: "なんだか割に合わないの、意義が",
          reading: "난다카 와리니 아와나이노 이기가",
          ko: "뭔가 딱 맞지 않아, 의의가",
          tokens: [
            { surface: "なんだか", reading: "なんだか", pos: "adverb", meaning: "왠지, 뭔가" },
            { surface: "割に合わない", reading: "わりにあわない", base: "割に合う", baseReading: "わりにあう", pos: "i-adj", meaning: "수지가 맞지 않다, 이치에 맞지 않다" },
            { surface: "の", pos: "particle", meaning: "~인 것" },
            { surface: "、", pos: "expression", meaning: "문장부호" },
            { surface: "意義", reading: "いぎ", pos: "noun", meaning: "의의" },
            { surface: "が", pos: "particle", meaning: "~이/가" }
          ]
        },
        {
          jp: "ないなんて",
          reading: "나이난테",
          ko: "없다니",
          tokens: [
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" },
            { surface: "なんて", pos: "particle", meaning: "~라니" }
          ]
        },
        {
          jp: "何処にでもあるようなものが",
          reading: "도코니데모 아루요오나 모노가",
          ko: "어디에나 있을 법한 것이",
          tokens: [
            { surface: "何処", reading: "どこ", pos: "pronoun", meaning: "어디" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "で", pos: "particle", meaning: "~에서" },
            { surface: "も", pos: "particle", meaning: "~도" },
            { surface: "あるような", reading: "あるような", base: "ある", baseReading: "ある", pos: "expression", meaning: "있을 법한, 있는 것 같은" },
            { surface: "もの", pos: "noun", meaning: "것" },
            { surface: "が", pos: "particle", meaning: "~이/가" }
          ]
        },
        {
          jp: "ここにしかないことに気づく",
          reading: "코코니 시카 나이 코토니 키즈쿠",
          ko: "여기에만 있다는 걸 깨달아",
          tokens: [
            { surface: "ここ", reading: "ここ", pos: "pronoun", meaning: "여기" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "しか", pos: "particle", meaning: "~밖에" },
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" },
            { surface: "こと", pos: "noun", meaning: "것" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "気づく", reading: "きづく", pos: "verb", meaning: "깨닫다, 알아차리다" }
          ]
        },
        {
          jp: "くだらない話でもよくて",
          reading: "쿠다라나이 하나시데모 요쿠테",
          ko: "별것 아닌 이야기여도 좋아",
          tokens: [
            { surface: "くだらない", reading: "くだらない", pos: "i-adj", meaning: "하찮다, 시시하다" },
            { surface: "話", reading: "はなし", pos: "noun", meaning: "이야기" },
            { surface: "で", pos: "particle", meaning: "~여도, ~라도" },
            { surface: "も", pos: "particle", meaning: "~도" },
            { surface: "よくて", reading: "よくて", base: "良い", baseReading: "よい", pos: "i-adj", meaning: "좋아서, 좋고", note: "て형" }
          ]
        },
        {
          jp: "赤らめた顔また見せて",
          reading: "아카라메타 카오 마타 미세테",
          ko: "붉어진 얼굴을 다시 보여줘",
          tokens: [
            { surface: "赤らめた", reading: "あからめた", base: "赤らめる", baseReading: "あからめる", pos: "verb", meaning: "붉히다" },
            { surface: "顔", reading: "かお", pos: "noun", meaning: "얼굴" },
            { surface: "また", reading: "また", pos: "adverb", meaning: "다시, 또" },
            { surface: "見せて", reading: "みせて", base: "見せる", baseReading: "みせる", pos: "verb", meaning: "보여주다", note: "て형" }
          ]
        },
        {
          jp: "故に月は暗い 頭flight",
          reading: "유에니 츠키와 쿠라이 아타마 flight",
          ko: "그래서 달은 어둡고 머리는 flight",
          tokens: [
            { surface: "故に", reading: "ゆえに", pos: "conjunction", meaning: "그러므로, 그래서" },
            { surface: "月", reading: "つき", pos: "noun", meaning: "달" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "暗い", reading: "くらい", pos: "i-adj", meaning: "어둡다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "頭", reading: "あたま", pos: "noun", meaning: "머리" },
            { surface: "flight", pos: "noun", meaning: "비행, 도피 (영어 삽입어)" }
          ]
        },
        {
          jp: "今日は櫂を持って",
          reading: "쿄오와 카이오 못테",
          ko: "오늘은 노를 들고서",
          tokens: [
            { surface: "今日", reading: "きょう", pos: "noun", meaning: "오늘" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "櫂", reading: "かい", pos: "noun", meaning: "노(배를 젓는 도구)" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "持って", reading: "もって", base: "持つ", baseReading: "もつ", pos: "verb", meaning: "들다, 가지다", note: "て형" }
          ]
        },
        {
          jp: "探し物がない 揺れる愛",
          reading: "사가시모노가 나이 유레루 아이",
          ko: "찾는 것이 없어 흔들리는 사랑",
          tokens: [
            { surface: "探し物", reading: "さがしもの", pos: "noun", meaning: "찾는 것, 찾고 있는 물건" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "揺れる", reading: "ゆれる", pos: "verb", meaning: "흔들리다" },
            { surface: "愛", reading: "あい", pos: "noun", meaning: "사랑" }
          ]
        },
        {
          jp: "隠し持って生きる",
          reading: "카쿠시 못테 이키루",
          ko: "남몰래 간직한 채 살아가",
          tokens: [
            { surface: "隠し持って", reading: "かくしもって", base: "隠し持つ", baseReading: "かくしもつ", pos: "verb", meaning: "몰래 지니다, 숨겨 가지다", note: "て형" },
            { surface: "生きる", reading: "いきる", pos: "verb", meaning: "살다" }
          ]
        },
        {
          jp: "故に月は暗い 頭flight",
          reading: "유에니 츠키와 쿠라이 아타마 flight",
          ko: "그래서 달은 어둡고 머리는 flight",
          tokens: [
            { surface: "故に", reading: "ゆえに", pos: "conjunction", meaning: "그러므로, 그래서" },
            { surface: "月", reading: "つき", pos: "noun", meaning: "달" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "暗い", reading: "くらい", pos: "i-adj", meaning: "어둡다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "頭", reading: "あたま", pos: "noun", meaning: "머리" },
            { surface: "flight", pos: "noun", meaning: "비행, 도피 (영어 삽입어)" }
          ]
        },
        {
          jp: "今日は何処も行けず",
          reading: "쿄오와 도코모 이케즈",
          ko: "오늘은 어디도 가지 못한 채",
          tokens: [
            { surface: "今日", reading: "きょう", pos: "noun", meaning: "오늘" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "何処", reading: "どこ", pos: "pronoun", meaning: "어디" },
            { surface: "も", pos: "particle", meaning: "~도" },
            { surface: "行けず", reading: "いけず", base: "行く", baseReading: "いく", pos: "verb", meaning: "가지 못하고", note: "行ける(가능형)의 부정 ず형" }
          ]
        },
        {
          jp: "眠る、眠る 新品の朝へ",
          reading: "네무루 네무루 신핀노 아사에",
          ko: "자고 또 자고 새로운 아침을 향해",
          tokens: [
            { surface: "眠る", reading: "ねむる", pos: "verb", meaning: "자다" },
            { surface: "、", pos: "expression", meaning: "문장부호" },
            { surface: "眠る", reading: "ねむる", pos: "verb", meaning: "자다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "新品", reading: "しんぴん", pos: "noun", meaning: "신품, 새것" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "朝", reading: "あさ", pos: "noun", meaning: "아침" },
            { surface: "へ", pos: "particle", meaning: "~로" }
          ]
        },
        {
          jp: "孤独 under crying",
          reading: "코도쿠 under crying",
          ko: "고독 under crying",
          tokens: [
            { surface: "孤独", reading: "こどく", pos: "noun", meaning: "고독" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "under", pos: "expression", meaning: "~아래, ~밑에서 (영어 삽입어)" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "crying", pos: "expression", meaning: "우는, 울음 (영어 삽입어)" }
          ]
        },
        {
          jp: "めんどくさい 線引きのない",
          reading: "멘도쿠사이 센비키노 나이",
          ko: "귀찮은 선긋기 없는",
          tokens: [
            { surface: "めんどくさい", reading: "めんどくさい", pos: "i-adj", meaning: "귀찮다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "線引き", reading: "せんびき", pos: "noun", meaning: "선긋기, 구분" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" }
          ]
        },
        {
          jp: "記憶は儚い",
          reading: "키오쿠와 하카나이",
          ko: "기억은 덧없지",
          tokens: [
            { surface: "記憶", reading: "きおく", pos: "noun", meaning: "기억" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "儚い", reading: "はかない", pos: "i-adj", meaning: "덧없다" }
          ]
        },
        {
          jp: "昨日にまるで用はない",
          reading: "키노오니 마루데 요오와 나이",
          ko: "어제에는 전혀 관심 없고",
          tokens: [
            { surface: "昨日", reading: "きのう", pos: "noun", meaning: "어제" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "まるで", reading: "まるで", pos: "adverb", meaning: "전혀, 마치" },
            { surface: "用", reading: "よう", pos: "noun", meaning: "용무, 볼일" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" }
          ]
        },
        {
          jp: "故に月は暗い 歪むLight",
          reading: "유에니 츠키와 쿠라이 유가무 Light",
          ko: "그래서 달은 어둡고 일그러진 Light",
          tokens: [
            { surface: "故に", reading: "ゆえに", pos: "conjunction", meaning: "그러므로, 그래서" },
            { surface: "月", reading: "つき", pos: "noun", meaning: "달" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "暗い", reading: "くらい", pos: "i-adj", meaning: "어둡다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "歪む", reading: "ゆがむ", pos: "verb", meaning: "일그러지다" },
            { surface: "Light", pos: "noun", meaning: "빛 (영어 삽입어)" }
          ]
        },
        {
          jp: "明日は何処行こう",
          reading: "아스와 도코 유코오",
          ko: "내일은 어디로 갈까",
          tokens: [
            { surface: "明日", reading: "あす", pos: "noun", meaning: "내일" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "何処", reading: "どこ", pos: "pronoun", meaning: "어디" },
            { surface: "行こう", reading: "いこう", base: "行く", baseReading: "いく", pos: "verb", meaning: "가자", note: "의지형" }
          ]
        },
        {
          jp: "傷ついてる心がわかるのに",
          reading: "키즈츠이테루 코코로가 와카루노니",
          ko: "상처받은 마음을 알고 있는데도",
          tokens: [
            { surface: "傷ついてる", reading: "きずついてる", base: "傷つく", baseReading: "きずつく", pos: "verb", meaning: "상처받다", note: "傷ついている의 축약형" },
            { surface: "心", reading: "こころ", pos: "noun", meaning: "마음" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "わかる", reading: "わかる", pos: "verb", meaning: "알다, 이해하다" },
            { surface: "のに", pos: "particle", meaning: "~는데도" }
          ]
        },
        {
          jp: "なぜ傷つけてしまうおんなじ跡",
          reading: "나제 키즈츠케테시마우 온나지 아토",
          ko: "왜 같은 자국을 남기며 상처 주고 마는 걸까",
          tokens: [
            { surface: "なぜ", reading: "なぜ", pos: "adverb", meaning: "왜" },
            { surface: "傷つけてしまう", reading: "きずつけてしまう", base: "傷つける", baseReading: "きずつける", pos: "verb", meaning: "상처 주고 말다" },
            { surface: "おんなじ", reading: "おんなじ", pos: "prenoun", meaning: "똑같은 (同じ의 구어체)" },
            { surface: "跡", reading: "あと", pos: "noun", meaning: "자국, 흔적" }
          ]
        },
        {
          jp: "エゴといって一括りにしていた",
          reading: "에고토 잇테 히토쿠쿠리니 시테이타",
          ko: "에고라고 말하며 하나로 묶어버렸어",
          tokens: [
            { surface: "エゴ", pos: "noun", meaning: "에고, 자아" },
            { surface: "と", pos: "particle", meaning: "~라고" },
            { surface: "いって", reading: "いって", base: "言う", baseReading: "いう", pos: "verb", meaning: "말하다", note: "て형" },
            { surface: "一括り", reading: "ひとくくり", pos: "noun", meaning: "하나로 묶음" },
            { surface: "に", pos: "particle", meaning: "~로" },
            { surface: "していた", reading: "していた", base: "する", baseReading: "する", pos: "verb", meaning: "하고 있었다" }
          ]
        },
        {
          jp: "僕とあなたの本当 透明に燃えて",
          reading: "보쿠토 아나타노 혼토오 토오메이니 모에테",
          ko: "나와 당신의 진심은 투명하게 타올라",
          tokens: [
            { surface: "僕", reading: "ぼく", pos: "noun", meaning: "나" },
            { surface: "と", pos: "particle", meaning: "~와/과" },
            { surface: "あなた", reading: "あなた", pos: "pronoun", meaning: "당신, 너" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "本当", reading: "ほんとう", pos: "noun", meaning: "진심, 진짜" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "透明", reading: "とうめい", pos: "na-adj", meaning: "투명함" },
            { surface: "に", pos: "particle", meaning: "~하게" },
            { surface: "燃えて", reading: "もえて", base: "燃える", baseReading: "もえる", pos: "verb", meaning: "타오르다", note: "て형" }
          ]
        },
        {
          jp: "変わりたくって変わらない気持ち",
          reading: "카와리타쿳테 카와라나이 키모치",
          ko: "변하고 싶지만 변하지 않는 마음",
          tokens: [
            { surface: "変わりたくって", reading: "かわりたくって", base: "変わりたい", baseReading: "かわりたい", pos: "i-adj", meaning: "변하고 싶어서", note: "たくて의 구어체 촉음편" },
            { surface: "変わらない", reading: "かわらない", base: "変わる", baseReading: "かわる", pos: "verb", meaning: "변하지 않다" },
            { surface: "気持ち", reading: "きもち", pos: "noun", meaning: "마음, 기분" }
          ]
        },
        {
          jp: "形だけ崩れてく",
          reading: "카타치다케 쿠즈레테쿠",
          ko: "형태만 무너져 가",
          tokens: [
            { surface: "形", reading: "かたち", pos: "noun", meaning: "형태" },
            { surface: "だけ", pos: "particle", meaning: "~만" },
            { surface: "崩れてく", reading: "くずれてく", base: "崩れる", baseReading: "くずれる", pos: "verb", meaning: "무너져 가다", note: "崩れていく의 축약형" }
          ]
        },
        {
          jp: "希望の手 離さない 君の幽霊と",
          reading: "키보오노 테 하나사나이 키미노 유우레이토",
          ko: "희망의 손을 놓지 않아, 너의 유령과",
          tokens: [
            { surface: "希望", reading: "きぼう", pos: "noun", meaning: "희망" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "手", reading: "て", pos: "noun", meaning: "손" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "離さない", reading: "はなさない", base: "離す", baseReading: "はなす", pos: "verb", meaning: "놓지 않다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "幽霊", reading: "ゆうれい", pos: "noun", meaning: "유령" },
            { surface: "と", pos: "particle", meaning: "~와/과" }
          ]
        },
        {
          jp: "孤独から日々を数えたら",
          reading: "코도쿠카라 히비오 카조에타라",
          ko: "고독 속에서 하루하루를 세어보면",
          tokens: [
            { surface: "孤独", reading: "こどく", pos: "noun", meaning: "고독" },
            { surface: "から", pos: "particle", meaning: "~부터" },
            { surface: "日々", reading: "ひび", pos: "noun", meaning: "나날, 하루하루" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "数えたら", reading: "かぞえたら", base: "数える", baseReading: "かぞえる", pos: "verb", meaning: "세면", note: "たら 조건형" }
          ]
        },
        {
          jp: "ひとつの涙に溺れてた",
          reading: "히토츠노 나미다니 오보레테타",
          ko: "한 방울 눈물에 빠져 있었어",
          tokens: [
            { surface: "ひとつ", reading: "ひとつ", pos: "noun", meaning: "하나" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "涙", reading: "なみだ", pos: "noun", meaning: "눈물" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "溺れてた", reading: "おぼれてた", base: "溺れる", baseReading: "おぼれる", pos: "verb", meaning: "빠져 있었다" }
          ]
        },
        {
          jp: "くだらないならいっそ壊して",
          reading: "쿠다라나이나라 잇소 코와시테",
          ko: "쓸데없다면 차라리 부숴버려",
          tokens: [
            { surface: "くだらないなら", reading: "くだらないなら", base: "くだらない", baseReading: "くだらない", pos: "i-adj", meaning: "하찮다면" },
            { surface: "いっそ", reading: "いっそ", pos: "adverb", meaning: "차라리" },
            { surface: "壊して", reading: "こわして", base: "壊す", baseReading: "こわす", pos: "verb", meaning: "부수다", note: "て형" }
          ]
        },
        {
          jp: "歌の中で自由に生きるから",
          reading: "우타노 나카데 지유우니 이키루카라",
          ko: "노래 속에서 자유롭게 살아갈 테니까",
          tokens: [
            { surface: "歌", reading: "うた", pos: "noun", meaning: "노래" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "中", reading: "なか", pos: "noun", meaning: "속, 안" },
            { surface: "で", pos: "particle", meaning: "~에서" },
            { surface: "自由", reading: "じゆう", pos: "na-adj", meaning: "자유로움" },
            { surface: "に", pos: "particle", meaning: "~하게" },
            { surface: "生きる", reading: "いきる", pos: "verb", meaning: "살다" },
            { surface: "から", pos: "particle", meaning: "~니까" }
          ]
        },
        {
          jp: "何処にでもあるようなものが",
          reading: "도코니데모 아루요오나 모노가",
          ko: "어디에나 있을 법한 것이",
          tokens: [
            { surface: "何処", reading: "どこ", pos: "pronoun", meaning: "어디" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "で", pos: "particle", meaning: "~에서" },
            { surface: "も", pos: "particle", meaning: "~도" },
            { surface: "あるような", reading: "あるような", base: "ある", baseReading: "ある", pos: "expression", meaning: "있을 법한, 있는 것 같은" },
            { surface: "もの", pos: "noun", meaning: "것" },
            { surface: "が", pos: "particle", meaning: "~이/가" }
          ]
        },
        {
          jp: "ここにしかないことに気づく",
          reading: "코코니 시카 나이 코토니 키즈쿠",
          ko: "여기에만 있다는 걸 깨달아",
          tokens: [
            { surface: "ここ", reading: "ここ", pos: "pronoun", meaning: "여기" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "しか", pos: "particle", meaning: "~밖에" },
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" },
            { surface: "こと", pos: "noun", meaning: "것" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "気づく", reading: "きづく", pos: "verb", meaning: "깨닫다, 알아차리다" }
          ]
        },
        {
          jp: "くだらない静けさの夜また",
          reading: "쿠다라나이 시즈케사노 요루 마타",
          ko: "하찮은 고요의 밤에 또 다시",
          tokens: [
            { surface: "くだらない", reading: "くだらない", pos: "i-adj", meaning: "하찮다" },
            { surface: "静けさ", reading: "しずけさ", pos: "noun", meaning: "고요함" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "また", reading: "また", pos: "adverb", meaning: "또, 다시" }
          ]
        },
        {
          jp: "記憶に住む僕だけ目覚める",
          reading: "키오쿠니 스무 보쿠다케 메자메루",
          ko: "기억 속에 사는 나만 눈을 떠",
          tokens: [
            { surface: "記憶", reading: "きおく", pos: "noun", meaning: "기억" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "住む", reading: "すむ", pos: "verb", meaning: "살다, 거주하다" },
            { surface: "僕", reading: "ぼく", pos: "noun", meaning: "나" },
            { surface: "だけ", pos: "particle", meaning: "~만" },
            { surface: "目覚める", reading: "めざめる", pos: "verb", meaning: "눈뜨다, 잠깨다" }
          ]
        },
        {
          jp: "ここにしかない",
          reading: "코코니 시카 나이",
          ko: "여기에만 있어",
          tokens: [
            { surface: "ここ", reading: "ここ", pos: "pronoun", meaning: "여기" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "しか", pos: "particle", meaning: "~밖에" },
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" }
          ]
        },
        {
          jp: "君に触れたい",
          reading: "키미니 후레타이",
          ko: "너에게 닿고 싶어",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "に", pos: "particle", meaning: "~에게" },
            { surface: "触れたい", reading: "ふれたい", base: "触れる", baseReading: "ふれる", pos: "i-adj", meaning: "닿고 싶다, 만지고 싶다" }
          ]
        },
        {
          jp: "くだらない話でもよくて",
          reading: "쿠다라나이 하나시데모 요쿠테",
          ko: "별것 아닌 이야기여도 좋아",
          tokens: [
            { surface: "くだらない", reading: "くだらない", pos: "i-adj", meaning: "하찮다, 시시하다" },
            { surface: "話", reading: "はなし", pos: "noun", meaning: "이야기" },
            { surface: "で", pos: "particle", meaning: "~여도, ~라도" },
            { surface: "も", pos: "particle", meaning: "~도" },
            { surface: "よくて", reading: "よくて", base: "良い", baseReading: "よい", pos: "i-adj", meaning: "좋아서, 좋고", note: "て형" }
          ]
        },
        {
          jp: "赤らめた顔また見せて",
          reading: "아카라메타 카오 마타 미세테",
          ko: "붉어진 얼굴을 다시 보여줘",
          tokens: [
            { surface: "赤らめた", reading: "あからめた", base: "赤らめる", baseReading: "あからめる", pos: "verb", meaning: "붉히다" },
            { surface: "顔", reading: "かお", pos: "noun", meaning: "얼굴" },
            { surface: "また", reading: "また", pos: "adverb", meaning: "다시, 또" },
            { surface: "見せて", reading: "みせて", base: "見せる", baseReading: "みせる", pos: "verb", meaning: "보여주다", note: "て형" }
          ]
        },
        {
          jp: "孤独 under crying",
          reading: "코도쿠 under crying",
          ko: "고독 under crying (×4)",
          tokens: [
            { surface: "孤独", reading: "こどく", pos: "noun", meaning: "고독" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "under", pos: "expression", meaning: "~아래, ~밑에서 (영어 삽입어)" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "crying", pos: "expression", meaning: "우는, 울음 (영어 삽입어)" }
          ]
        },
        {
          jp: "孤独 under crying",
          reading: "코도쿠 under crying",
          ko: "고독 under crying",
          tokens: [
            { surface: "孤独", reading: "こどく", pos: "noun", meaning: "고독" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "under", pos: "expression", meaning: "~아래, ~밑에서 (영어 삽입어)" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "crying", pos: "expression", meaning: "우는, 울음 (영어 삽입어)" }
          ]
        },
        {
          jp: "めんどくさい 線引きのない",
          reading: "멘도쿠사이 센비키노 나이",
          ko: "귀찮은 선긋기 없는",
          tokens: [
            { surface: "めんどくさい", reading: "めんどくさい", pos: "i-adj", meaning: "귀찮다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "線引き", reading: "せんびき", pos: "noun", meaning: "선긋기, 구분" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" }
          ]
        },
        {
          jp: "記憶は儚い",
          reading: "키오쿠와 하카나이",
          ko: "기억은 덧없지",
          tokens: [
            { surface: "記憶", reading: "きおく", pos: "noun", meaning: "기억" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "儚い", reading: "はかない", pos: "i-adj", meaning: "덧없다" }
          ]
        },
        {
          jp: "昨日にまるで用はない",
          reading: "키노오니 마루데 요오와 나이",
          ko: "어제에는 전혀 관심 없고",
          tokens: [
            { surface: "昨日", reading: "きのう", pos: "noun", meaning: "어제" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "まるで", reading: "まるで", pos: "adverb", meaning: "전혀, 마치" },
            { surface: "用", reading: "よう", pos: "noun", meaning: "용무, 볼일" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "ない", reading: "ない", pos: "i-adj", meaning: "없다" }
          ]
        },
        {
          jp: "故に月は暗い 歪むLight",
          reading: "유에니 츠키와 쿠라이 유가무 Light",
          ko: "그래서 달은 어둡고 일그러진 Light",
          tokens: [
            { surface: "故に", reading: "ゆえに", pos: "conjunction", meaning: "그러므로, 그래서" },
            { surface: "月", reading: "つき", pos: "noun", meaning: "달" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "暗い", reading: "くらい", pos: "i-adj", meaning: "어둡다" },
            { surface: " ", pos: "expression", meaning: "공백" },
            { surface: "歪む", reading: "ゆがむ", pos: "verb", meaning: "일그러지다" },
            { surface: "Light", pos: "noun", meaning: "빛 (영어 삽입어)" }
          ]
        },
        {
          jp: "明日は何処行こう",
          reading: "아스와 도코 유코오",
          ko: "내일은 어디로 갈까",
          tokens: [
            { surface: "明日", reading: "あす", pos: "noun", meaning: "내일" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "何処", reading: "どこ", pos: "pronoun", meaning: "어디" },
            { surface: "行こう", reading: "いこう", base: "行く", baseReading: "いく", pos: "verb", meaning: "가자", note: "의지형" }
          ]
        }
      ]
    }
  ]
};
