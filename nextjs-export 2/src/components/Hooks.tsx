'use client';

import { useRef, useState, useEffect, ReactNode, useMemo, CSSProperties } from 'react';

// ─── useInView hook ───
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => setVisible(true);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) { show(); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { show(); obs.unobserve(el); } },
      { threshold, rootMargin: '50px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

// ─── Animated entry wrapper ───
export function Anim({ children, delay = 0, type = 'up', className = '', style = {} }: {
  children: ReactNode; delay?: number; type?: 'up' | 'left' | 'right' | 'scale'; className?: string; style?: CSSProperties;
}) {
  const [ref, visible] = useInView(0.1);
  const classMap: Record<string, string> = {
    up: 'anim-enter',
    left: 'anim-enter-left',
    right: 'anim-enter-right',
    scale: 'anim-enter-scale',
  };
  return (
    <div
      ref={ref}
      className={`${classMap[type] || classMap.up}${visible ? ' visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

// ─── Typewriter effect ───
export function Typewriter({ text, delay = 0, speed = 50, className = '' }: {
  text: string; delay?: number; speed?: number; className?: string;
}) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [ref, visible] = useInView(0.1);

  useEffect(() => {
    if (!visible || started) return;
    const timer = setTimeout(() => {
      setStarted(true);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, speed);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [visible, started, text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {started && displayed.length < text.length && <span className="typewriter-cursor"></span>}
    </span>
  );
}

// ─── Floating music particles ───
export function MusicParticles() {
  const notes = ['♪', '♫', '♩', '♬', '♭', '♮'];
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      note: notes[i % notes.length],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 10,
      size: 14 + Math.random() * 12,
    }))
  , []);

  return (
    <div className="particles-container">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >{p.note}</div>
      ))}
    </div>
  );
}

// ─── Sound wave visualizer ───
export function SoundWave({ bars = 30, height = 40 }: { bars?: number; height?: number }) {
  return (
    <div className="sound-wave" style={{ height }}>
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className="sound-wave-bar"
          style={{
            '--wave-h': `${8 + Math.sin(i * 0.5) * 16 + Math.random() * 8}px`,
            animationDelay: `${i * 0.05}s`,
            height: 6,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── XP / Progress system ───
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(1);
  const [sectionName, setSectionName] = useState('Início');

  const levels = [
    { name: 'Iniciante', threshold: 0 },
    { name: 'Curioso', threshold: 20 },
    { name: 'Estudante', threshold: 40 },
    { name: 'Praticante', threshold: 60 },
    { name: 'Avançado', threshold: 80 },
    { name: 'Mestre', threshold: 95 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, (scrollTop / docHeight) * 100);
      setProgress(pct);

      const newLevel = levels.reduce((acc, l) => pct >= l.threshold ? l : acc, levels[0]);
      const levelIdx = levels.indexOf(newLevel) + 1;
      setLevel(levelIdx);
      setSectionName(newLevel.name);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, level, sectionName, totalLevels: levels.length };
}

// ─── Animated Counter ───
export function AnimCounter({ end, duration = 2000, prefix = '', suffix = '' }: {
  end: number; duration?: number; prefix?: string; suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView(0.3);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - pct, 3);
      setCount(Math.round(eased * end));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}
