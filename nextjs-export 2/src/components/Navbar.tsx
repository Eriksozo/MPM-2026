'use client';

import { useState, useEffect } from 'react';
import { useScrollProgress } from './Hooks';

const LINK = 'https://pay.kiwify.com.br/Yl6OoSO';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { progress } = useScrollProgress();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      <div className="xp-bar-container">
        <div className="xp-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <nav className="nav" style={scrolled ? { background: 'rgba(15,12,9,0.95)' } : {}}>
        <div className="nav-inner">
          <div className="nav-logo">joab pereira</div>
          <div className="nav-links">
            <a href="#modulos">Método</a>
            <a href="#oferta" className="nav-cta">Começar</a>
          </div>
        </div>
      </nav>
    </>
  );
}
