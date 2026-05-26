'use client';

import { useRef, useEffect, useMemo, ReactNode, CSSProperties } from 'react';
import { AnimCounter } from './Hooks';

// ─── Animated Bass Strings Background ───
export function BassStringsBackground({ opacity = 0.06 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const strings = 4;
      const gap = h / (strings + 1);

      for (let s = 0; s < strings; s++) {
        const y = gap * (s + 1);
        const thick = 1 + s * 0.8;
        const amp = 3 + Math.sin(t + s * 1.2) * (4 + s * 2);
        const freq = 0.003 + s * 0.001;

        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < w; x += 4) {
          const wave = Math.sin(x * freq + t * (2 + s * 0.5)) * amp;
          const decay = Math.sin((x / w) * Math.PI);
          ctx.lineTo(x, y + wave * decay);
        }
        ctx.strokeStyle = `rgba(217, 163, 91, ${0.15 + s * 0.05})`;
        ctx.lineWidth = thick;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity, pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}

// ─── Animated Sound Spectrum ───
export function SoundSpectrum({ bars = 60, height = 80, glow = true }: {
  bars?: number; height?: number; color?: string; glow?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = height * 2;
    };
    resize();

    const draw = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const barW = (w / bars) * 0.7;
      const gap = w / bars;

      for (let i = 0; i < bars; i++) {
        const x = i * gap + gap * 0.15;
        const noise = Math.sin(i * 0.4 + t) * 0.5 + Math.sin(i * 0.15 + t * 1.3) * 0.3 + Math.sin(t * 0.7 + i * 0.08) * 0.2;
        const barH = Math.abs(noise) * h * 0.8 + h * 0.05;
        const y = (h - barH) / 2;

        const gradient = ctx.createLinearGradient(x, y, x, y + barH);
        gradient.addColorStop(0, 'rgba(232, 122, 26, 0.6)');
        gradient.addColorStop(0.5, 'rgba(217, 163, 91, 0.8)');
        gradient.addColorStop(1, 'rgba(232, 122, 26, 0.6)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, barW / 2);
        ctx.fill();

        if (glow) {
          ctx.shadowColor = 'rgba(217, 163, 91, 0.4)';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [bars, height, glow]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height, display: 'block', margin: '0 auto', maxWidth: 600 }}
    />
  );
}

// ─── Glowing Orb Background ───
export function GlowOrbs({ count = 3 }: { count?: number }) {
  const orbs = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      size: 200 + Math.random() * 300,
      delay: i * 2,
      duration: 8 + Math.random() * 6,
      color: i % 2 === 0 ? 'rgba(217,163,91,0.06)' : 'rgba(232,122,26,0.04)',
    }))
  , [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${orb.x}%`, top: `${orb.y}%`,
            width: orb.size, height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animation: `orbFloat ${orb.duration}s ease-in-out ${orb.delay}s infinite alternate`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

// ─── Fretboard Decoration ───
export function FretboardDecoration({ style = {} }: { style?: CSSProperties }) {
  const highlightNotes = [
    {s: 0, f: 2}, {s: 0, f: 5}, {s: 1, f: 2}, {s: 1, f: 5},
    {s: 2, f: 2}, {s: 2, f: 4}, {s: 3, f: 2}, {s: 3, f: 5},
    {s: 0, f: 9}, {s: 1, f: 7}, {s: 2, f: 7}, {s: 3, f: 7},
  ];

  return (
    <div style={{ overflow: 'hidden', borderRadius: 12, ...style }}>
      <svg viewBox="0 0 800 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="fb-wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1610" />
            <stop offset="100%" stopColor="#120E0A" />
          </linearGradient>
          <filter id="note-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="800" height="160" fill="url(#fb-wood)" rx="6" />
        <rect width="6" height="160" fill="#E8DCC8" rx="2" />
        {Array.from({ length: 15 }, (_, i) => (
          <line key={i} x1={30 + (i + 1) * 50} y1={0} x2={30 + (i + 1) * 50} y2={160} stroke="#8A7A60" strokeWidth="1.5" opacity="0.3" />
        ))}
        {[3,5,7,9,12].map(f => {
          const cx = 30 + f * 50 - 25;
          return f === 12 ? (
            <g key={f}>
              <circle cx={cx} cy={50} r={4} fill="#2E2418" opacity={0.6} />
              <circle cx={cx} cy={110} r={4} fill="#2E2418" opacity={0.6} />
            </g>
          ) : (
            <circle key={f} cx={cx} cy={80} r={4} fill="#2E2418" opacity={0.6} />
          );
        })}
        {Array.from({ length: 4 }, (_, i) => (
          <line key={i} x1={0} y1={25 + i * 38} x2={800} y2={25 + i * 38} stroke={i < 2 ? '#B0A890' : '#8A8070'} strokeWidth={1.2 + i * 0.6} opacity={0.4} />
        ))}
        {highlightNotes.map((n, i) => {
          const cx = 30 + n.f * 50 - 25;
          const cy = 25 + n.s * 38;
          const isRoot = n.f === 2 && n.s === 2;
          return (
            <g key={i} filter="url(#note-glow)">
              <circle cx={cx} cy={cy} r={isRoot ? 12 : 9}
                fill={isRoot ? 'rgba(217,163,91,0.9)' : 'rgba(217,163,91,0.15)'}
                stroke="rgba(217,163,91,0.6)" strokeWidth={isRoot ? 0 : 1}>
                <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Animated Gradient Text ───
export function GradientText({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{
      background: 'linear-gradient(135deg, #F4D08A 0%, #D9A35B 25%, #E87A1A 50%, #D9A35B 75%, #F4D08A 100%)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'gradientShift 4s ease infinite',
      ...style,
    }}>
      {children}
    </span>
  );
}

// ─── Pulse Ring on CTA ───
export function PulseRing({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        position: 'absolute', inset: -8, borderRadius: 'var(--r-full)',
        border: '2px solid rgba(232,122,26,0.3)',
        animation: 'pulseRing 2s ease-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: -16, borderRadius: 'var(--r-full)',
        border: '1px solid rgba(232,122,26,0.15)',
        animation: 'pulseRing 2s ease-out 0.5s infinite',
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  );
}

// ─── Floating Badge ───
export function FloatingBadge({ text, icon = '⚡', delay = 0 }: { text: string; icon?: string; delay?: number }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'linear-gradient(135deg, rgba(232,122,26,0.15), rgba(217,163,91,0.1))',
      border: '1px solid rgba(217,163,91,0.3)',
      borderRadius: 'var(--r-full)', padding: '8px 18px',
      fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)',
      fontFamily: 'var(--font-b)', letterSpacing: '0.06em',
      animation: `floatBadge 3s ease-in-out ${delay}s infinite`,
      boxShadow: '0 0 20px rgba(217,163,91,0.1)',
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      {text}
    </div>
  );
}

// ─── Stat Card ───
export function StatCard({ number, label, prefix = '', suffix = '', icon }: {
  number: number; label: string; prefix?: string; suffix?: string; icon?: string;
}) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', padding: '24px 20px', textAlign: 'center',
      transition: 'all 0.3s', cursor: 'default',
      flex: 1, minWidth: 120,
    }}>
      {icon && <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>}
      <div style={{
        fontFamily: 'var(--font-d)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        color: 'var(--primary)', lineHeight: 1,
      }}>
        <AnimCounter end={number} prefix={prefix} suffix={suffix} />
      </div>
      <div style={{
        fontSize: '0.75rem', color: 'var(--text-low)', marginTop: 6,
        fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}
