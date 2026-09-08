// 브라우저 내장 TTS로 일본어 발음 듣기
let jaVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (jaVoice) return jaVoice;
  const voices = (window.speechSynthesis?.getVoices() ?? []).filter((v) =>
    v.lang.startsWith('ja')
  );
  // 프리미엄/향상된 음성을 최우선으로 선택
  // (macOS: 시스템 설정 → 손쉬운 사용 → 콘텐츠 말하기 → 시스템 음성에서
  //  일본어 Kyoko/O-Ren의 '고급(Premium/Enhanced)' 버전을 다운로드하면 품질이 크게 좋아짐)
  const score = (v: SpeechSynthesisVoice) => {
    const n = v.name.toLowerCase();
    if (n.includes('premium') || n.includes('プレミアム')) return 4;
    if (n.includes('enhanced') || n.includes('拡張')) return 3;
    if (n.includes('siri')) return 2;
    if (v.localService) return 1;
    return 0;
  };
  jaVoice =
    voices.sort((a, b) => score(b) - score(a))[0] ?? null;
  return jaVoice;
}

// 일부 브라우저는 voices가 비동기로 로드됨
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    jaVoice = null;
    pickVoice();
  };
}

export function speak(text: string, rate = 0.85) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) u.voice = voice;
  u.lang = 'ja-JP';
  u.rate = rate;
  window.speechSynthesis.speak(u);
}
