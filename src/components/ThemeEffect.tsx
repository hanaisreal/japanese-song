import { useEffect, useRef } from 'react';
import type { EffectType } from '../theme';

interface Particle {
  x: number;
  y: number;
  size: number;
  rot: number;
  vr: number;
  sway: number;
  phase: number;
  speed: number;
  drift: number;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeSakura(w: number, h: number, atTop: boolean): Particle {
  return {
    x: rand(-20, w + 20),
    y: atTop ? rand(-40, -5) : rand(-20, h),
    size: rand(7, 13),
    rot: rand(0, Math.PI * 2),
    vr: rand(-1.4, 1.4),
    sway: rand(16, 34),
    phase: rand(0, Math.PI * 2),
    speed: rand(24, 44),
    drift: rand(0.7, 1.3),
  };
}

function makeSnow(w: number, h: number, atTop: boolean): Particle {
  const depth = Math.pow(Math.random(), 1.5);
  return {
    x: rand(-20, w + 20),
    y: atTop ? rand(-30, -5) : rand(-20, h),
    size: 1 + depth * 3.2,
    rot: 0,
    vr: 0,
    sway: rand(10, 28),
    phase: rand(0, Math.PI * 2),
    speed: 14 + depth * 30,
    drift: rand(0.3, 0.7),
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Particle, color: string) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  const s = p.size;
  ctx.moveTo(0, s);
  ctx.bezierCurveTo(-s * 1.1, s * 0.2, -s * 0.9, -s * 0.9, 0, -s * 0.8);
  ctx.bezierCurveTo(s * 0.9, -s * 0.9, s * 1.1, s * 0.2, 0, s);
  ctx.fill();
  ctx.restore();
}

function drawFlake(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.beginPath();
  ctx.globalAlpha = 0.35 + (p.size / 4.2) * 0.5;
  ctx.fillStyle = '#ffffff';
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fill();
}

/** 벚꽃/눈 배경 효과 — 선택한 테마에 따라 전체 화면에 떠다니는 파티클을 그린다 */
export default function ThemeEffect({ type }: { type: EffectType }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (type === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let primed = false;

    const targetCount = type === 'sakura' ? 28 : 90;
    const make = type === 'sakura' ? makeSakura : makeSnow;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      while (particles.length < targetCount) particles.push(make(w, h, primed));
      if (particles.length > targetCount) particles.length = targetCount;
      primed = true;

      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.speed * dt * p.drift;
        p.x += Math.sin(t * 0.8 + p.phase) * p.sway * dt;
        p.rot += p.vr * dt;
        if (type === 'sakura') drawPetal(ctx, p, Math.random() < 0.001 ? '#f28ab2' : '#f0a8c4');
        else drawFlake(ctx, p);
      }
      particles = particles.filter((p) => p.y < h + 30);

      raf = requestAnimationFrame(tick);
    };

    if (!prefersReducedMotion) {
      raf = requestAnimationFrame(tick);
    } else {
      // 모션 최소화 설정: 정적인 한 프레임만 그려둔다
      while (particles.length < targetCount) particles.push(make(w, h, false));
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (type === 'sakura') drawPetal(ctx, p, '#f0a8c4');
        else drawFlake(ctx, p);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [type]);

  if (type === 'none') return null;
  return <canvas ref={canvasRef} className="theme-effect-canvas" aria-hidden="true" />;
}
