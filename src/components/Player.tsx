import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface PlayerHandle {
  getTime(): number;
  getDuration(): number;
  seek(t: number): void;
  play(): void;
  pause(): void;
}

interface Props {
  youtubeId?: string;
  audioFile?: string;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars?: Record<string, number>;
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  getCurrentTime?: () => number;
  getDuration?: () => number;
  seekTo?: (t: number, allowSeekAhead: boolean) => void;
  playVideo?: () => void;
  pauseVideo?: () => void;
  destroy?: () => void;
}

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return ytApiPromise;
}

/** 공식 YouTube 임베드 또는 로컬 오디오 파일 재생기 */
const Player = forwardRef<PlayerHandle, Props>(function Player(
  { youtubeId, audioFile },
  ref
) {
  const ytContainer = useRef<HTMLDivElement>(null);
  const ytPlayer = useRef<YTPlayer | null>(null);
  const audioEl = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!youtubeId || !ytContainer.current) return;
    let cancelled = false;
    const host = ytContainer.current;
    loadYouTubeApi().then(() => {
      if (cancelled || !window.YT) return;
      const mount = document.createElement('div');
      host.appendChild(mount);
      ytPlayer.current = new window.YT.Player(mount, {
        videoId: youtubeId,
        playerVars: { rel: 0, playsinline: 1 },
      });
    });
    return () => {
      cancelled = true;
      ytPlayer.current?.destroy?.();
      ytPlayer.current = null;
      host.replaceChildren();
    };
  }, [youtubeId]);

  useImperativeHandle(ref, () => ({
    getTime() {
      if (youtubeId) return ytPlayer.current?.getCurrentTime?.() ?? 0;
      return audioEl.current?.currentTime ?? 0;
    },
    getDuration() {
      if (youtubeId) return ytPlayer.current?.getDuration?.() ?? 0;
      return audioEl.current?.duration && Number.isFinite(audioEl.current.duration)
        ? audioEl.current.duration
        : 0;
    },
    seek(t: number) {
      if (youtubeId) ytPlayer.current?.seekTo?.(t, true);
      else if (audioEl.current) audioEl.current.currentTime = t;
    },
    play() {
      if (youtubeId) ytPlayer.current?.playVideo?.();
      else void audioEl.current?.play();
    },
    pause() {
      if (youtubeId) ytPlayer.current?.pauseVideo?.();
      else audioEl.current?.pause();
    },
  }));

  if (youtubeId) {
    return <div className="yt-frame" ref={ytContainer} />;
  }
  if (audioFile) {
    return (
      <audio
        ref={audioEl}
        controls
        className="audio-player"
        src={`/audio/${audioFile}`}
      />
    );
  }
  return null;
});

export default Player;
