// 기초 문법 사전 — 조사·조동사·어미·자주 나오는 패턴
export interface GrammarEntry {
  surface: string;      // は, が, ~ない ...
  reading?: string;     // 표기와 발음이 다를 때 (は→wa)
  category: '조사' | '조동사·어미' | '활용형' | '표현';
  meaning: string;      // 한국어 뜻
  explain: string;      // 상세 설명
  example?: { jp: string; ko: string };
}

export const GRAMMAR: GrammarEntry[] = [
  // ---------- 조사 ----------
  {
    surface: 'は', reading: 'わ(wa)로 발음', category: '조사',
    meaning: '~은/는 (주제)',
    explain: '문장의 주제를 나타내는 조사. 조사로 쓰일 때만 「わ」로 발음합니다.',
    example: { jp: '私は学生です', ko: '나는 학생입니다' },
  },
  {
    surface: 'が', category: '조사',
    meaning: '~이/가 (주격)',
    explain: '동작·상태의 주체를 나타냄. 「見える(보이다)」「ある(있다)」 같은 동사와 자주 짝을 이룹니다.',
    example: { jp: '灯りが見える', ko: '불빛이 보인다' },
  },
  {
    surface: 'を', reading: 'お(o)로 발음', category: '조사',
    meaning: '~을/를 (목적격)',
    explain: '동작의 대상을 나타냄. 이 글자는 조사로만 쓰입니다.',
    example: { jp: '歌を歌う', ko: '노래를 부르다' },
  },
  {
    surface: 'に', category: '조사',
    meaning: '~에, ~에게',
    explain: '장소·시간·방향·대상. 존재하는 위치나 도착점을 나타냅니다.',
    example: { jp: '空に灯りがある', ko: '하늘에 불빛이 있다' },
  },
  {
    surface: 'で', category: '조사',
    meaning: '~에서, ~(으)로',
    explain: '동작이 일어나는 장소, 또는 수단·방법·상태를 나타냅니다.',
    example: { jp: '一人で歩く', ko: '혼자서 걷다' },
  },
  {
    surface: 'の', category: '조사',
    meaning: '~의 (소유·수식)',
    explain: '「A の B」= A의 B. 명사와 명사를 연결합니다. 가사에서는 「~の」로 끝나 여운을 남기기도 합니다.',
    example: { jp: '君の声', ko: '너의 목소리' },
  },
  {
    surface: 'と', category: '조사',
    meaning: '~와/과, ~라고',
    explain: '나열(A와 B), 동반(~와 함께), 인용(~라고 말하다)에 씁니다.',
    example: { jp: '君と歩く', ko: '너와 걷다' },
  },
  {
    surface: 'も', category: '조사',
    meaning: '~도',
    explain: '첨가·포함. 「は」나 「が」 자리를 대신해 들어갑니다.',
    example: { jp: '明日も晴れ', ko: '내일도 맑음' },
  },
  {
    surface: 'へ', reading: 'え(e)로 발음', category: '조사',
    meaning: '~(으)로, ~를 향해',
    explain: '방향을 나타냄. 조사로 쓰일 때만 「え」로 발음합니다.',
    example: { jp: '未来へ進む', ko: '미래로 나아가다' },
  },
  {
    surface: 'から', category: '조사',
    meaning: '~부터, ~니까',
    explain: '출발점(~에서부터), 또는 문장 끝에서 이유(~이니까)를 나타냅니다.',
    example: { jp: 'ここから始まる', ko: '여기서부터 시작된다' },
  },
  {
    surface: 'まで', category: '조사',
    meaning: '~까지',
    explain: '도달점. 시간·장소 모두에 씁니다.',
    example: { jp: '朝まで歌う', ko: '아침까지 노래하다' },
  },
  {
    surface: 'よ', category: '조사',
    meaning: '~야, ~라구 (강조)',
    explain: '문장 끝에서 상대에게 알려주거나 강조하는 종조사.',
    example: { jp: '大丈夫だよ', ko: '괜찮아' },
  },
  {
    surface: 'ね', category: '조사',
    meaning: '~네, ~지? (공감)',
    explain: '문장 끝에서 동의·확인을 구하는 종조사.',
    example: { jp: 'きれいだね', ko: '예쁘네' },
  },
  {
    surface: 'か', category: '조사',
    meaning: '~까? (의문)',
    explain: '문장 끝에 붙어 의문문을 만듭니다.',
    example: { jp: '行くか', ko: '갈까?' },
  },

  // ---------- 조동사·어미 ----------
  {
    surface: '~ない', category: '조동사·어미',
    meaning: '~지 않다 (부정)',
    explain: '동사의 ない형에 붙는 부정. 예: 忘れる→忘れない(잊지 않는다).',
    example: { jp: '忘れない', ko: '잊지 않아' },
  },
  {
    surface: '~た', category: '조동사·어미',
    meaning: '~했다 (과거)',
    explain: '과거·완료. て형과 같은 방식으로 활용합니다. 예: 見る→見た(봤다).',
    example: { jp: '空を見た', ko: '하늘을 봤다' },
  },
  {
    surface: '~ます', category: '조동사·어미',
    meaning: '~합니다 (정중)',
    explain: '정중형. 가사에서는 드물고 회화에서 기본이 되는 형태입니다.',
    example: { jp: '歩きます', ko: '걷습니다' },
  },
  {
    surface: '~たい', category: '조동사·어미',
    meaning: '~하고 싶다 (희망)',
    explain: '동사 ます형 어간에 붙음. 예: 会う→会いたい(만나고 싶다). 가사 단골 표현.',
    example: { jp: '君に会いたい', ko: '너를 만나고 싶어' },
  },
  {
    surface: '~てる / ~ている', category: '조동사·어미',
    meaning: '~하고 있다 (진행·상태)',
    explain: '진행이나 상태의 지속. 구어·가사에서는 い가 생략된 「~てる」가 흔합니다.',
    example: { jp: 'まだ覚えてる', ko: '아직 기억하고 있어' },
  },
  {
    surface: '~れる / ~られる', category: '조동사·어미',
    meaning: '~받다/~할 수 있다',
    explain: '수동·가능·존경을 모두 나타낼 수 있어 문맥으로 판단합니다.',
    example: { jp: '忘れられない', ko: '잊을 수 없어' },
  },

  // ---------- 활용형 ----------
  {
    surface: 'て형', category: '활용형',
    meaning: '~하고, ~해서 (연결)',
    explain: '동사를 연결하는 만능 형태. 「~てください(해 주세요)」「~ている(하고 있다)」의 기반이 됩니다.',
    example: { jp: '歩いて帰る', ko: '걸어서 돌아가다' },
  },
  {
    surface: 'ます형 어간', category: '활용형',
    meaning: '복합동사의 재료',
    explain: '「歌い + 続ける = 계속 노래하다」처럼 어간 뒤에 다른 동사·접미사가 붙습니다.',
    example: { jp: '歌い続ける', ko: '계속 노래하다' },
  },
  {
    surface: '사전형(기본형)', category: '활용형',
    meaning: '~하다 (원형)',
    explain: '사전에 실리는 형태. 반말 현재형으로도 그대로 씁니다. う단으로 끝납니다.',
    example: { jp: '歩く', ko: '걷다' },
  },

  // ---------- 표현 ----------
  {
    surface: '~ように', category: '표현',
    meaning: '~하도록, ~하기를',
    explain: '목적(~하도록)이나 기원(~하기를 빌다)을 나타냅니다.',
    example: { jp: '忘れないように', ko: '잊지 않도록' },
  },
  {
    surface: '~そう', category: '표현',
    meaning: '~할 것 같다',
    explain: '모습을 보고 추측. 예: 泣きそう(울 것 같아).',
    example: { jp: '消えそうな灯り', ko: '꺼질 것 같은 불빛' },
  },
  {
    surface: '~だろう / ~でしょう', category: '표현',
    meaning: '~겠지, ~일 것이다',
    explain: '추측. 가사에서는 반말 「だろう」가 자주 나옵니다.',
    example: { jp: '明日は晴れるだろう', ko: '내일은 맑겠지' },
  },
];
