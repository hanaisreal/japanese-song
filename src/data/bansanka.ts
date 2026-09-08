import type { Song } from '../types';

export const bansanka: Song = {
  id: "bansanka",
  title: "晩餐歌",
  titleReading: "ばんさんか",
  artist: "tuki.",
  about: "'너를 울릴 수밖에 없다는 것을 알면서도 곁에 두고 싶어하는' 모순된 사랑을 저녁 식사(만찬)에 비유한 노래입니다.",
  youtubeId: "x46yKKXI7Ig",
  sections: [
    {
      name: "1절",
      lines: [
        {
          jp: "君を泣かすから　だから一緒には居れないな",
          reading: "키미오 나카스카라 다카라 잇쇼니와 이레나이나",
          ko: "너를 울릴 테니까 그러니 함께 있을 수는 없겠지",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "泣かす", reading: "なかす", base: "泣かす", baseReading: "なかす", pos: "verb", meaning: "울리다", note: "泣く(울다)의 사역형" },
            { surface: "から", pos: "particle", meaning: "~니까, ~때문에" },
            { surface: "だから", pos: "conjunction", meaning: "그러니까" },
            { surface: "一緒", reading: "いっしょ", pos: "noun", meaning: "함께, 같이" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "居れない", reading: "いれない", base: "居る", baseReading: "いる", pos: "verb", meaning: "있을 수 없다", note: "居る의 가능형 부정" },
            { surface: "な", pos: "auxiliary", meaning: "~네, ~구나 (문말 영탄)" }
          ]
        },
        {
          jp: "君を泣かすから　早く忘れて欲しいんだ",
          reading: "키미오 나카스카라 하야쿠 와스레테 호시인다",
          ko: "너를 울릴 테니까 빨리 잊어 줬으면 해",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "泣かす", reading: "なかす", pos: "verb", meaning: "울리다" },
            { surface: "から", pos: "particle", meaning: "~니까" },
            { surface: "早く", reading: "はやく", base: "早い", baseReading: "はやい", pos: "adverb", meaning: "빨리" },
            { surface: "忘れて", reading: "わすれて", base: "忘れる", baseReading: "わすれる", pos: "verb", meaning: "잊다", note: "て형" },
            { surface: "欲しい", reading: "ほしい", pos: "i-adj", meaning: "~하길 바라다, 원하다", note: "동사 て형 + 欲しい = ~해줬으면 좋겠다" },
            { surface: "んだ", pos: "auxiliary", meaning: "~인 것이다 (설명·강조)" }
          ]
        },
        {
          jp: "人間だからね　たまには違うものも食べたいね",
          reading: "닌겐다카라네 타마니와 치가우 모노모 타베타이네",
          ko: "인간인지라 가끔은 다른 것도 맛보고 싶어",
          tokens: [
            { surface: "人間", reading: "にんげん", pos: "noun", meaning: "인간" },
            { surface: "だから", pos: "conjunction", meaning: "~이니까 (だ+から)" },
            { surface: "ね", pos: "particle", meaning: "~네 (동의·확인)" },
            { surface: "たまに", pos: "adverb", meaning: "가끔" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "違う", reading: "ちがう", pos: "verb", meaning: "다르다" },
            { surface: "もの", pos: "noun", meaning: "것" },
            { surface: "も", pos: "particle", meaning: "~도" },
            { surface: "食べたい", reading: "たべたい", base: "食べる", baseReading: "たべる", pos: "verb", meaning: "먹고 싶다", note: "동사ます형+たい" },
            { surface: "ね", pos: "particle", meaning: "~네" }
          ]
        },
        {
          jp: "君を泣かすから　そう君を泣かすから",
          reading: "키미오 나카스카라 소- 키미오 나카스카라",
          ko: "너를 울릴 테니까 그래 너를 울릴 테니까",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "泣かす", reading: "なかす", pos: "verb", meaning: "울리다" },
            { surface: "から", pos: "particle", meaning: "~니까" },
            { surface: "そう", pos: "interjection", meaning: "그래" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "泣かす", reading: "なかす", pos: "verb", meaning: "울리다" },
            { surface: "から", pos: "particle", meaning: "~니까" }
          ]
        },
        {
          jp: "でも味気ないんだよね",
          reading: "데모 아지케나인다요네",
          ko: "그런데 썩 맛있진 않네",
          tokens: [
            { surface: "でも", pos: "conjunction", meaning: "그런데, 하지만" },
            { surface: "味気ない", reading: "あじけない", pos: "i-adj", meaning: "재미없다, 밋밋하다", note: "직역하면 '맛이 없다'지만 '재미·감흥이 없다'는 뜻의 관용 표현" },
            { surface: "んだよね", pos: "auxiliary", meaning: "~인 거지 (설명+동의 확인)" }
          ]
        },
        {
          jp: "会いたくなんだよね",
          reading: "아이타쿠난다요네",
          ko: "네가 보고 싶어져",
          tokens: [
            { surface: "会いたく", reading: "あいたく", base: "会いたい", baseReading: "あいたい", pos: "i-adj", meaning: "만나고 싶다", note: "会う+たい의 활용형" },
            { surface: "なんだよね", pos: "auxiliary", meaning: "~인 거지" }
          ]
        },
        {
          jp: "君以外会いたくないんだよね",
          reading: "키미 이가이 아이타쿠 나인다요네",
          ko: "너 이외엔 만나고 싶지 않아",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "以外", reading: "いがい", pos: "noun", meaning: "이외" },
            { surface: "会いたくない", reading: "あいたくない", base: "会いたい", baseReading: "あいたい", pos: "i-adj", meaning: "만나고 싶지 않다" },
            { surface: "んだよね", pos: "auxiliary", meaning: "~인 거지" }
          ]
        },
        {
          jp: "なんて勝手だね",
          reading: "난테 캇테다네",
          ko: "참 제멋대로지",
          tokens: [
            { surface: "なんて", pos: "particle", meaning: "~라니, 정말이지 (감탄·강조)" },
            { surface: "勝手だ", reading: "かってだ", base: "勝手だ", baseReading: "かってだ", pos: "na-adj", meaning: "제멋대로다" },
            { surface: "ね", pos: "particle", meaning: "~네" }
          ]
        },
        {
          jp: "大体曖昧なんだよね",
          reading: "다이타이 아이마이난다요네",
          ko: "대체로 애매하잖아",
          tokens: [
            { surface: "大体", reading: "だいたい", pos: "adverb", meaning: "대체로" },
            { surface: "曖昧", reading: "あいまい", pos: "na-adj", meaning: "애매하다" },
            { surface: "なんだよね", pos: "auxiliary", meaning: "~인 거지" }
          ]
        },
        {
          jp: "愛の存在証明なんて",
          reading: "아이노 손자이 쇼-메-난테",
          ko: "사랑의 존재 증명 같은 건",
          tokens: [
            { surface: "愛", reading: "あい", pos: "noun", meaning: "사랑" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "存在", reading: "そんざい", pos: "noun", meaning: "존재" },
            { surface: "証明", reading: "しょうめい", pos: "noun", meaning: "증명" },
            { surface: "なんて", pos: "particle", meaning: "~같은 건, ~따위" }
          ]
        },
        {
          jp: "君が教えてくれないか",
          reading: "키미가 오시에테쿠레나이카",
          ko: "네가 가르쳐 줄 수 없을까",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "教えて", reading: "おしえて", base: "教える", baseReading: "おしえる", pos: "verb", meaning: "가르치다", note: "て형" },
            { surface: "くれない", base: "くれる", pos: "verb", meaning: "~해주지 않다" },
            { surface: "か", pos: "particle", meaning: "~까? (의문)" }
          ]
        },
        {
          jp: "何十回の夜を過ごしたって得られぬような",
          reading: "난쥿카이노 요루오 스고시탓테 에라레누요-나",
          ko: "몇십 번의 밤을 보내더라도 얻을 수 없을 만한",
          tokens: [
            { surface: "何十回", reading: "なんじゅっかい", pos: "noun", meaning: "몇십 번" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "過ごしたって", reading: "すごしたって", base: "過ごす", baseReading: "すごす", pos: "expression", meaning: "보내더라도", note: "過ごした+って(=ても, ~해도)" },
            { surface: "得られぬ", reading: "えられぬ", base: "得られる", baseReading: "えられる", pos: "verb", meaning: "얻을 수 없는", note: "고어체 부정 조동사 ぬ (=ない)" },
            { surface: "ような", pos: "expression", meaning: "~같은, ~만한" }
          ]
        },
        {
          jp: "愛してるを並べてみて",
          reading: "아이시테루오 나라베테미테",
          ko: "사랑해를 나열해 봐",
          tokens: [
            { surface: "愛してる", reading: "あいしてる", base: "愛する", baseReading: "あいする", pos: "expression", meaning: "사랑해", note: "愛している의 축약형" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "並べて", reading: "ならべて", base: "並べる", baseReading: "ならべる", pos: "verb", meaning: "나열하다", note: "て형" },
            { surface: "みて", base: "みる", pos: "verb", meaning: "~해보다" }
          ]
        },
        {
          jp: "何十回の夜を過ごしたって得られぬような",
          reading: "난쥿카이노 요루오 스고시탓테 에라레누요-나",
          ko: "몇십 번의 밤을 보내더라도 얻을 수 없을 만한",
          tokens: [
            { surface: "何十回", reading: "なんじゅっかい", pos: "noun", meaning: "몇십 번" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "過ごしたって", reading: "すごしたって", base: "過ごす", baseReading: "すごす", pos: "expression", meaning: "보내더라도" },
            { surface: "得られぬ", reading: "えられぬ", base: "得られる", baseReading: "えられる", pos: "verb", meaning: "얻을 수 없는" },
            { surface: "ような", pos: "expression", meaning: "~같은, ~만한" }
          ]
        },
        {
          jp: "最高のフルコースを頂戴",
          reading: "사이코-노 후루코-스오 쵸-다이",
          ko: "최고의 풀코스를 선사해 줘",
          tokens: [
            { surface: "最高", reading: "さいこう", pos: "noun", meaning: "최고" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "フルコース", pos: "noun", meaning: "풀코스" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "頂戴", reading: "ちょうだい", pos: "expression", meaning: "줘, 주세요" }
          ]
        }
      ]
    },
    {
      name: "2절",
      lines: [
        {
          jp: "君を泣かすから　きっと一生は無理だよね",
          reading: "키미오 나카스카라 킷토 잇쇼-와 무리다요네",
          ko: "너를 울릴 테니까 분명 평생 동안은 무리겠지",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "泣かす", reading: "なかす", pos: "verb", meaning: "울리다" },
            { surface: "から", pos: "particle", meaning: "~니까" },
            { surface: "きっと", pos: "adverb", meaning: "분명, 틀림없이" },
            { surface: "一生", reading: "いっしょう", pos: "noun", meaning: "평생" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "無理だ", reading: "むりだ", pos: "na-adj", meaning: "무리다" },
            { surface: "よね", pos: "particle", meaning: "~겠지, ~지 (확인)" }
          ]
        },
        {
          jp: "君を泣かすから　胸がとても痛くなんだ",
          reading: "키미오 나카스카라 무네가 토테모 이타쿠난다",
          ko: "너를 울릴 테니까 가슴이 너무나도 아파",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "泣かす", reading: "なかす", pos: "verb", meaning: "울리다" },
            { surface: "から", pos: "particle", meaning: "~니까" },
            { surface: "胸", reading: "むね", pos: "noun", meaning: "가슴" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "とても", pos: "adverb", meaning: "매우, 너무나도" },
            { surface: "痛くなんだ", reading: "いたくなんだ", base: "痛い", baseReading: "いたい", pos: "expression", meaning: "아픈 것이다" }
          ]
        },
        {
          jp: "人間だからね　たまには分かり合えなくなって",
          reading: "닌겐다카라네 타마니와 와카리아에나쿠 낫테",
          ko: "인간인지라 가끔은 서로 이해할 수 없게 돼서",
          tokens: [
            { surface: "人間", reading: "にんげん", pos: "noun", meaning: "인간" },
            { surface: "だから", pos: "conjunction", meaning: "~이니까" },
            { surface: "ね", pos: "particle", meaning: "~네" },
            { surface: "たまに", pos: "adverb", meaning: "가끔" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "分かり合えなく", reading: "わかりあえなく", base: "分かり合える", baseReading: "わかりあえる", pos: "verb", meaning: "서로 이해할 수 없게", note: "分かり合う의 가능형 부정 연용형" },
            { surface: "なって", base: "なる", pos: "verb", meaning: "되다", note: "て형" }
          ]
        },
        {
          jp: "君を泣かすから　また君を泣かすから",
          reading: "키미오 나카스카라 마타 키미오 나카스카라",
          ko: "너를 울릴 테니까 또다시 너를 울릴 테니까",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "泣かす", reading: "なかす", pos: "verb", meaning: "울리다" },
            { surface: "から", pos: "particle", meaning: "~니까" },
            { surface: "また", pos: "conjunction", meaning: "또, 다시" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "泣かす", reading: "なかす", pos: "verb", meaning: "울리다" },
            { surface: "から", pos: "particle", meaning: "~니까" }
          ]
        },
        {
          jp: "でも自信がないんだよね",
          reading: "데모 지신가 나인다요네",
          ko: "하지만 자신이 없어",
          tokens: [
            { surface: "でも", pos: "conjunction", meaning: "그런데, 하지만" },
            { surface: "自信", reading: "じしん", pos: "noun", meaning: "자신감" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "ない", pos: "i-adj", meaning: "없다" },
            { surface: "んだよね", pos: "auxiliary", meaning: "~인 거지" }
          ]
        },
        {
          jp: "変わりたくないんだよね",
          reading: "카와리타쿠 나인다요네",
          ko: "변하고 싶지 않은걸",
          tokens: [
            { surface: "変わりたくない", reading: "かわりたくない", base: "変わりたい", baseReading: "かわりたい", pos: "i-adj", meaning: "변하고 싶지 않다" },
            { surface: "んだよね", pos: "auxiliary", meaning: "~인 거지" }
          ]
        },
        {
          jp: "君以外会いたくないんだよね",
          reading: "키미 이가이 아이타쿠 나인다요네",
          ko: "너 이외엔 만나고 싶지 않아",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "以外", reading: "いがい", pos: "noun", meaning: "이외" },
            { surface: "会いたくない", reading: "あいたくない", base: "会いたい", baseReading: "あいたい", pos: "i-adj", meaning: "만나고 싶지 않다" },
            { surface: "んだよね", pos: "auxiliary", meaning: "~인 거지" }
          ]
        },
        {
          jp: "なんて勝手だね",
          reading: "난테 캇테다네",
          ko: "참 제멋대로지",
          tokens: [
            { surface: "なんて", pos: "particle", meaning: "~라니, 정말이지" },
            { surface: "勝手だ", reading: "かってだ", pos: "na-adj", meaning: "제멋대로다" },
            { surface: "ね", pos: "particle", meaning: "~네" }
          ]
        },
        {
          jp: "大体曖昧だったよね",
          reading: "다이타이 아이마이닷타요네",
          ko: "대체로 애매했었어",
          tokens: [
            { surface: "大体", reading: "だいたい", pos: "adverb", meaning: "대체로" },
            { surface: "曖昧", reading: "あいまい", pos: "na-adj", meaning: "애매하다" },
            { surface: "だった", pos: "auxiliary", meaning: "~이었다" },
            { surface: "よね", pos: "particle", meaning: "~었지 (확인)" }
          ]
        },
        {
          jp: "愛の存在証明なんて",
          reading: "아이노 손자이 쇼-메-난테",
          ko: "사랑의 존재 증명 같은 건",
          tokens: [
            { surface: "愛", reading: "あい", pos: "noun", meaning: "사랑" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "存在", reading: "そんざい", pos: "noun", meaning: "존재" },
            { surface: "証明", reading: "しょうめい", pos: "noun", meaning: "증명" },
            { surface: "なんて", pos: "particle", meaning: "~같은 건" }
          ]
        },
        {
          jp: "君がそこに居るのにね",
          reading: "키미가 소코니 이루노니네",
          ko: "네가 거기에 있는데 말이야",
          tokens: [
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "が", pos: "particle", meaning: "~이/가" },
            { surface: "そこ", pos: "pronoun", meaning: "거기" },
            { surface: "に", pos: "particle", meaning: "~에" },
            { surface: "居る", reading: "いる", pos: "verb", meaning: "있다" },
            { surface: "のにね", pos: "expression", meaning: "~인데도 말이야" }
          ]
        },
        {
          jp: "何百回の夜を過ごしたって得られぬような",
          reading: "난뱟카이노 요루오 스고시탓테 에라레누요-나",
          ko: "몇백 번의 밤을 보내더라도 얻을 수 없을 만한",
          tokens: [
            { surface: "何百回", reading: "なんびゃっかい", pos: "noun", meaning: "몇백 번" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "過ごしたって", reading: "すごしたって", base: "過ごす", baseReading: "すごす", pos: "expression", meaning: "보내더라도" },
            { surface: "得られぬ", reading: "えられぬ", base: "得られる", baseReading: "えられる", pos: "verb", meaning: "얻을 수 없는" },
            { surface: "ような", pos: "expression", meaning: "~같은, ~만한" }
          ]
        },
        {
          jp: "愛してるを並べてみて",
          reading: "아이시테루오 나라베테미테",
          ko: "사랑해를 나열해 봐",
          tokens: [
            { surface: "愛してる", reading: "あいしてる", base: "愛する", baseReading: "あいする", pos: "expression", meaning: "사랑해" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "並べて", reading: "ならべて", base: "並べる", baseReading: "ならべる", pos: "verb", meaning: "나열하다" },
            { surface: "みて", base: "みる", pos: "verb", meaning: "~해보다" }
          ]
        },
        {
          jp: "何百回の夜を過ごしたって得られぬような",
          reading: "난뱟카이노 요루오 스고시탓테 에라레누요-나",
          ko: "몇백 번의 밤을 보내더라도 얻을 수 없을 만한",
          tokens: [
            { surface: "何百回", reading: "なんびゃっかい", pos: "noun", meaning: "몇백 번" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "過ごしたって", reading: "すごしたって", base: "過ごす", baseReading: "すごす", pos: "expression", meaning: "보내더라도" },
            { surface: "得られぬ", reading: "えられぬ", base: "得られる", baseReading: "えられる", pos: "verb", meaning: "얻을 수 없는" },
            { surface: "ような", pos: "expression", meaning: "~같은, ~만한" }
          ]
        },
        {
          jp: "最高のフルコースを頂戴",
          reading: "사이코-노 후루코-스오 쵸-다이",
          ko: "최고의 풀코스를 선사해 줘",
          tokens: [
            { surface: "最高", reading: "さいこう", pos: "noun", meaning: "최고" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "フルコース", pos: "noun", meaning: "풀코스" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "頂戴", reading: "ちょうだい", pos: "expression", meaning: "줘, 주세요" }
          ]
        }
      ]
    },
    {
      name: "브릿지",
      lines: [
        {
          jp: "離れないで　傍に居てくれたのは",
          reading: "하나레나이데 소바니 이테쿠레타노와",
          ko: "떠나지 않고 곁에 머물러 준 건",
          tokens: [
            { surface: "離れないで", reading: "はなれないで", base: "離れる", baseReading: "はなれる", pos: "verb", meaning: "떠나지 않고", note: "부정형+で" },
            { surface: "傍に", reading: "そばに", base: "傍", baseReading: "そば", pos: "expression", meaning: "곁에" },
            { surface: "居てくれた", reading: "いてくれた", base: "居てくれる", baseReading: "いてくれる", pos: "verb", meaning: "있어주었다" },
            { surface: "のは", pos: "particle", meaning: "~한 것은" }
          ]
        },
        {
          jp: "結局君一人だったよね",
          reading: "켓쿄쿠 키미 히토리닷타요네",
          ko: "결국 너 한 명뿐이었어",
          tokens: [
            { surface: "結局", reading: "けっきょく", pos: "adverb", meaning: "결국" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "一人", reading: "ひとり", pos: "noun", meaning: "한 명, 혼자" },
            { surface: "だったよね", pos: "auxiliary", meaning: "~이었지" }
          ]
        },
        {
          jp: "涙のスパイスは君の胸に",
          reading: "나미다노 스파이스와 키미노 무네니",
          ko: "눈물의 향신료는 너의 가슴에",
          tokens: [
            { surface: "涙", reading: "なみだ", pos: "noun", meaning: "눈물" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "スパイス", pos: "noun", meaning: "향신료" },
            { surface: "は", pos: "particle", meaning: "~은/는" },
            { surface: "君", reading: "きみ", pos: "noun", meaning: "너" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "胸", reading: "むね", pos: "noun", meaning: "가슴" },
            { surface: "に", pos: "particle", meaning: "~에" }
          ]
        },
        {
          jp: "残ってしまうだろうけど",
          reading: "노콧테 시마우다로-케도",
          ko: "남고 말겠지만",
          tokens: [
            { surface: "残って", reading: "のこって", base: "残る", baseReading: "のこる", pos: "verb", meaning: "남다", note: "て형" },
            { surface: "しまう", pos: "auxiliary", meaning: "~해버리다" },
            { surface: "だろうけど", pos: "auxiliary", meaning: "~겠지만" }
          ]
        },
        {
          jp: "何千回の夜を過ごしたって得られぬような",
          reading: "난젠카이노 요루오 스고시탓테 에라레누요-나",
          ko: "몇천 번의 밤을 보내더라도 얻을 수 없을 만한",
          tokens: [
            { surface: "何千回", reading: "なんぜんかい", pos: "noun", meaning: "몇천 번" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "過ごしたって", reading: "すごしたって", base: "過ごす", baseReading: "すごす", pos: "expression", meaning: "보내더라도" },
            { surface: "得られぬ", reading: "えられぬ", base: "得られる", baseReading: "えられる", pos: "verb", meaning: "얻을 수 없는" },
            { surface: "ような", pos: "expression", meaning: "~같은, ~만한" }
          ]
        },
        {
          jp: "愛してるを並べるから",
          reading: "아이시테루오 나라베루카라",
          ko: "사랑해를 나열해 줄 테니까",
          tokens: [
            { surface: "愛してる", reading: "あいしてる", base: "愛する", baseReading: "あいする", pos: "expression", meaning: "사랑해" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "並べるから", reading: "ならべるから", base: "並べる", baseReading: "ならべる", pos: "expression", meaning: "나열할 테니까" }
          ]
        },
        {
          jp: "何千回の夜を過ごしたって得られぬような",
          reading: "난젠카이노 요루오 스고시탓테 에라레누요-나",
          ko: "몇천 번의 밤을 보내더라도 얻을 수 없을 만한",
          tokens: [
            { surface: "何千回", reading: "なんぜんかい", pos: "noun", meaning: "몇천 번" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "過ごしたって", reading: "すごしたって", base: "過ごす", baseReading: "すごす", pos: "expression", meaning: "보내더라도" },
            { surface: "得られぬ", reading: "えられぬ", base: "得られる", baseReading: "えられる", pos: "verb", meaning: "얻을 수 없는" },
            { surface: "ような", pos: "expression", meaning: "~같은, ~만한" }
          ]
        },
        {
          jp: "最高のフルコースを",
          reading: "사이코-노 후루코-스오",
          ko: "최고의 풀코스를",
          tokens: [
            { surface: "最高", reading: "さいこう", pos: "noun", meaning: "최고" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "フルコース", pos: "noun", meaning: "풀코스" },
            { surface: "を", pos: "particle", meaning: "~을/를" }
          ]
        }
      ]
    },
    {
      name: "아우트로",
      lines: [
        {
          jp: "何万回の夜を過ごしたって忘れぬような",
          reading: "난만카이노 요루오 스고시탓테 와스레누요-나",
          ko: "몇만 번의 밤을 보내더라도 잊을 수 없을 만한",
          tokens: [
            { surface: "何万回", reading: "なんまんかい", pos: "noun", meaning: "몇만 번" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "過ごしたって", reading: "すごしたって", base: "過ごす", baseReading: "すごす", pos: "expression", meaning: "보내더라도" },
            { surface: "忘れぬ", reading: "わすれぬ", base: "忘れる", baseReading: "わすれる", pos: "verb", meaning: "잊지 않는", note: "고어체 부정 조동사 ぬ" },
            { surface: "ような", pos: "expression", meaning: "~같은, ~만한" }
          ]
        },
        {
          jp: "愛してるを並べるから",
          reading: "아이시테루오 나라베루카라",
          ko: "사랑해를 나열해 줄 테니까",
          tokens: [
            { surface: "愛してる", reading: "あいしてる", base: "愛する", baseReading: "あいする", pos: "expression", meaning: "사랑해" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "並べるから", reading: "ならべるから", base: "並べる", baseReading: "ならべる", pos: "expression", meaning: "나열할 테니까" }
          ]
        },
        {
          jp: "何万回の夜を過ごしたって忘れぬような",
          reading: "난만카이노 요루오 스고시탓테 와스레누요-나",
          ko: "몇만 번의 밤을 보내더라도 잊을 수 없을 만한",
          tokens: [
            { surface: "何万回", reading: "なんまんかい", pos: "noun", meaning: "몇만 번" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "夜", reading: "よる", pos: "noun", meaning: "밤" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "過ごしたって", reading: "すごしたって", base: "過ごす", baseReading: "すごす", pos: "expression", meaning: "보내더라도" },
            { surface: "忘れぬ", reading: "わすれぬ", base: "忘れる", baseReading: "わすれる", pos: "verb", meaning: "잊지 않는" },
            { surface: "ような", pos: "expression", meaning: "~같은, ~만한" }
          ]
        },
        {
          jp: "最高のフルコースを頂戴",
          reading: "사이코-노 후루코-스오 쵸-다이",
          ko: "최고의 풀코스를 선사해 줘",
          tokens: [
            { surface: "最高", reading: "さいこう", pos: "noun", meaning: "최고" },
            { surface: "の", pos: "particle", meaning: "~의" },
            { surface: "フルコース", pos: "noun", meaning: "풀코스" },
            { surface: "を", pos: "particle", meaning: "~을/를" },
            { surface: "頂戴", reading: "ちょうだい", pos: "expression", meaning: "줘, 주세요" }
          ]
        }
      ]
    }
  ]
};
