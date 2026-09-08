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

interface LeafShadow {
  x: number;
  y: number;
  size: number;
  rot0: number;
  swayAmp: number;
  swaySpeed: number;
  phase: number;
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

function makeHeart(w: number, h: number, atBottom: boolean): Particle {
  return {
    x: rand(-10, w + 10),
    y: atBottom ? rand(h + 5, h + 40) : rand(-10, h),
    size: rand(6, 12),
    rot: rand(-0.3, 0.3),
    vr: rand(-0.6, 0.6),
    sway: rand(12, 26),
    phase: rand(0, Math.PI * 2),
    speed: rand(14, 26),
    drift: rand(0.6, 1.1),
  };
}

function makeLeafShadow(w: number, h: number): LeafShadow {
  return {
    x: rand(0, w),
    y: rand(0, h),
    size: rand(30, 70),
    rot0: rand(0, Math.PI * 2),
    swayAmp: rand(0.08, 0.22),
    swaySpeed: rand(0.3, 0.7),
    phase: rand(0, Math.PI * 2),
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

function drawHeart(ctx: CanvasRenderingContext2D, p: Particle, color: string) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.75;
  const s = p.size;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.35);
  ctx.bezierCurveTo(-s, -s * 0.5, -s * 0.4, -s * 1.1, 0, -s * 0.35);
  ctx.bezierCurveTo(s * 0.4, -s * 1.1, s, -s * 0.5, 0, s * 0.35);
  ctx.fill();
  ctx.restore();
}

function drawLeafShadow(ctx: CanvasRenderingContext2D, l: LeafShadow, rot: number) {
  ctx.save();
  ctx.translate(l.x, l.y);
  ctx.rotate(rot);
  ctx.fillStyle = 'rgba(40, 55, 15, 0.10)';
  const s = l.size;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.5);
  ctx.bezierCurveTo(s * 0.55, -s * 0.35, s * 0.55, s * 0.35, 0, s * 0.5);
  ctx.bezierCurveTo(-s * 0.55, s * 0.35, -s * 0.55, -s * 0.35, 0, -s * 0.5);
  ctx.fill();
  ctx.restore();
}

function runParticleEffect(
  ctx: CanvasRenderingContext2D,
  type: 'sakura' | 'snow' | 'hearts',
  getSize: () => { w: number; h: number },
  reduced: boolean,
) {
  const targetCount = type === 'sakura' ? 28 : type === 'hearts' ? 22 : 90;
  const make = type === 'sakura' ? makeSakura : type === 'hearts' ? makeHeart : makeSnow;
  const rising = type === 'hearts';
  let particles: Particle[] = [];
  let primed = false;

  const paint = () => {
    const { w, h } = getSize();
    while (particles.length < targetCount) particles.push(make(w, h, primed));
    if (particles.length > targetCount) particles.length = targetCount;
    primed = true;
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      if (type === 'sakura') drawPetal(ctx, p, Math.random() < 0.001 ? '#f28ab2' : '#f0a8c4');
      else if (type === 'hearts') drawHeart(ctx, p, Math.random() < 0.5 ? '#c77fe8' : '#ff9fc9');
      else drawFlake(ctx, p);
    }
  };

  if (reduced) {
    paint();
    return () => {};
  }

  let raf = 0;
  let last = performance.now();
  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = now / 1000;
    const { h } = getSize();
    for (const p of particles) {
      p.y += (rising ? -p.speed : p.speed) * dt * p.drift;
      p.x += Math.sin(t * 0.8 + p.phase) * p.sway * dt;
      p.rot += p.vr * dt;
    }
    particles = rising ? particles.filter((p) => p.y > -30) : particles.filter((p) => p.y < h + 30);
    paint();
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

function runLeavesEffect(
  ctx: CanvasRenderingContext2D,
  getSize: () => { w: number; h: number },
  reduced: boolean,
) {
  const { w: w0, h: h0 } = getSize();
  const count = Math.round(Math.min(22, Math.max(10, (w0 * h0) / 32000)));
  const leaves: LeafShadow[] = Array.from({ length: count }).map(() => makeLeafShadow(w0, h0));

  const paint = (t: number) => {
    const { w, h } = getSize();
    ctx.clearRect(0, 0, w, h);
    ctx.filter = 'blur(4px)';
    for (const l of leaves) {
      const rot = l.rot0 + Math.sin(t * l.swaySpeed + l.phase) * l.swayAmp;
      drawLeafShadow(ctx, l, rot);
    }
    ctx.filter = 'none';
  };

  if (reduced) {
    paint(0);
    return () => {};
  }

  let raf = 0;
  const start = performance.now();
  const tick = (now: number) => {
    paint((now - start) / 1000);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

/** 테마별 배경 효과 — 선택한 테마에 따라 전체 화면에 떠다니는 파티클/그림자를 그린다 */
export default function ThemeEffect({ type }: { type: EffectType }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (type === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const getSize = () => ({ w, h });
    const stop =
      type === 'leaves'
        ? runLeavesEffect(ctx, getSize, prefersReducedMotion)
        : runParticleEffect(ctx, type, getSize, prefersReducedMotion);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
    };
  }, [type]);

  if (type === 'none') return null;
  return <canvas ref={canvasRef} className="theme-effect-canvas" aria-hidden="true" />;
}
