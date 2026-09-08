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

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: 'pink' | 'cyan';
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

function makeNode(w: number, h: number): Node {
  return {
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-10, 10),
    vy: rand(-10, 10),
    r: rand(1.4, 3),
    hue: Math.random() < 0.5 ? 'pink' : 'cyan',
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

const CYBER_PINK = '255, 62, 200';
const CYBER_CYAN = '46, 230, 230';

function runParticleEffect(
  ctx: CanvasRenderingContext2D,
  type: 'sakura' | 'snow',
  getSize: () => { w: number; h: number },
  reduced: boolean,
) {
  const targetCount = type === 'sakura' ? 28 : 90;
  const make = type === 'sakura' ? makeSakura : makeSnow;
  let particles: Particle[] = [];
  let primed = false;

  const paint = (t: number) => {
    const { w, h } = getSize();
    while (particles.length < targetCount) particles.push(make(w, h, primed));
    if (particles.length > targetCount) particles.length = targetCount;
    primed = true;
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      if (type === 'sakura') drawPetal(ctx, p, Math.random() < 0.001 ? '#f28ab2' : '#f0a8c4');
      else drawFlake(ctx, p);
    }
  };

  if (reduced) {
    paint(0);
    return () => {};
  }

  let raf = 0;
  let last = performance.now();
  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = now / 1000;
    const { w, h } = getSize();
    for (const p of particles) {
      p.y += p.speed * dt * p.drift;
      p.x += Math.sin(t * 0.8 + p.phase) * p.sway * dt;
      p.rot += p.vr * dt;
    }
    particles = particles.filter((p) => p.y < h + 30);
    paint(t);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

function runCyberEffect(
  ctx: CanvasRenderingContext2D,
  getSize: () => { w: number; h: number },
  reduced: boolean,
) {
  const { w: w0, h: h0 } = getSize();
  const count = Math.round(Math.min(70, Math.max(30, (w0 * h0) / 22000)));
  const nodes: Node[] = Array.from({ length: count }).map(() => makeNode(w0, h0));
  const linkDist = 130;

  const paint = () => {
    const { w, h } = getSize();
    ctx.clearRect(0, 0, w, h);

    // 노드 간 연결선 — 가까운 노드끼리 은은한 네온 선으로 연결
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < linkDist) {
          const alpha = (1 - d / linkDist) * 0.5;
          const color = a.hue === b.hue ? (a.hue === 'pink' ? CYBER_PINK : CYBER_CYAN) : '150, 150, 255';
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // 노드 — 발광하는 점
    for (const n of nodes) {
      const color = n.hue === 'pink' ? CYBER_PINK : CYBER_CYAN;
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${color}, 0.9)`;
      ctx.fillStyle = `rgba(${color}, 0.95)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
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
    const { w, h } = getSize();
    for (const n of nodes) {
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      n.x = Math.max(0, Math.min(w, n.x));
      n.y = Math.max(0, Math.min(h, n.y));
    }
    paint();
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

/** 벚꽃/눈/홀로그램 배경 효과 — 선택한 테마에 따라 전체 화면에 떠다니는 파티클을 그린다 */
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
      type === 'cyber'
        ? runCyberEffect(ctx, getSize, prefersReducedMotion)
        : runParticleEffect(ctx, type, getSize, prefersReducedMotion);

    return () => {
      stop();
      window.removeEventListener('resize', resize);
    };
  }, [type]);

  if (type === 'none') return null;
  return <canvas ref={canvasRef} className={`theme-effect-canvas ${type === 'cyber' ? 'theme-effect-cyber' : ''}`} aria-hidden="true" />;
}
