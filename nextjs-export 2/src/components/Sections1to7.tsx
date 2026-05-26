'use client';

import { useState, useEffect } from 'react';
import { useInView, Anim, Typewriter, MusicParticles, SoundWave } from './Hooks';
import { BassStringsBackground, SoundSpectrum, GlowOrbs, FretboardDecoration, GradientText, PulseRing, FloatingBadge } from './Visuals';

const LINK = 'https://pay.kiwify.com.br/Yl6OoSO';

// ─── Hero ───
export function HeroSection() {
  return (
    <section className="hero" id="inicio" style={{ position: 'relative', overflow: 'hidden' }}>
      <MusicParticles />
      <GlowOrbs count={4} />
      <BassStringsBackground opacity={0.04} />
      <div className="hero-split" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <Anim><span className="eyebrow">A Nova Linguagem da Pentatônica</span></Anim>
          <Anim delay={0.1}>
            <h1>
              <Typewriter text="Domine a " speed={60} />
              <GradientText><Typewriter text="pentatônica" delay={0.8} speed={70} /></GradientText>
              <br />
              <Typewriter text="no contrabaixo e pare de soar como todo mundo" delay={1.8} speed={40} />
            </h1>
          </Anim>
          <Anim delay={0.3}>
            <p className="hero-sub">Um treinamento do zero ao avançado para baixistas que querem sair dos desenhos decorados, ganhar liberdade no braço e transformar a pentatônica em linguagem musical de verdade.</p>
          </Anim>
          <Anim delay={0.4}>
            <SoundSpectrum bars={40} height={48} />
          </Anim>
          <Anim delay={0.45}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
              <FloatingBadge text="5 Módulos" icon="🎸" delay={0} />
              <FloatingBadge text="Do Zero ao Avançado" icon="🔥" delay={0.4} />
            </div>
          </Anim>
          <Anim delay={0.5}>
            <div style={{ marginTop: 24 }}>
              <PulseRing><a href="#oferta" className="btn-cta btn-cta-pulse">▶ Quero dominar a pentatônica</a></PulseRing>
            </div>
            <p className="hero-note">Treinamento criado por Prof. Joab Pereira para baixistas que querem tocar com mais liberdade, fraseado e identidade musical.</p>
          </Anim>
        </div>
        <Anim delay={0.3} type="right">
          <div style={{
            border: '1px solid rgba(217,163,91,0.18)', borderRadius: 'var(--r-xl)',
            background: 'var(--bg-card)', position: 'relative', overflow: 'hidden',
            boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(217,163,91,0.18)',
            maxWidth: 400, width: '100%',
          }}>
            {/* @ts-expect-error Wistia custom element */}
            <wistia-player media-id="iuieek8lrm" aspect="0.5625"></wistia-player>
          </div>
        </Anim>
      </div>
    </section>
  );
}

// ─── Problem ───
export function ProblemSection() {
  return (
    <section className="sect sect-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <BassStringsBackground opacity={0.03} />
      <div className="sect-inner" style={{ position: 'relative', zIndex: 1 }}>
        <Anim><h2 className="sect-title">A maioria dos baixistas conhece a pentatônica.<br /><span className="accent">Mas poucos sabem usar.</span></h2></Anim>
        <Anim delay={0.1}><div className="sect-text">
          <p>O problema não é a escala.</p>
          <p>O problema é que a maioria aprende a pentatônica do jeito mais limitado possível: decorando desenhos, repetindo shapes e tocando sempre as mesmas frases.</p>
          <p>Resultado?</p>
          <p>Você até sabe &quot;onde estão as notas&quot;, mas quando chega a hora de criar, improvisar ou construir uma frase musical de verdade, tudo parece travado.</p>
          <p>A mão até anda.</p>
          <p><strong>Mas a música não fala.</strong></p>
        </div></Anim>
        <Anim delay={0.2} type="scale"><div className="callout">E é exatamente isso que o treinamento A Nova Linguagem da Pentatônica resolve.</div></Anim>
        <Anim delay={0.3} type="scale">
          <div style={{ maxWidth: 360, margin: '40px auto 0', borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid rgba(217,163,91,0.18)', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.6)' }}>
            {/* @ts-expect-error Wistia custom element */}
            <wistia-player media-id="iti05qn4ly" aspect="0.4621309370988447"></wistia-player>
          </div>
        </Anim>
      </div>
    </section>
  );
}

// ─── What Is ───
export function WhatIsSection() {
  return (
    <section className="sect" style={{ position: 'relative' }}>
      <div className="sect-inner">
        <Anim><h2 className="sect-title">O que é o treinamento<br /><GradientText>A Nova Linguagem da Pentatônica</GradientText></h2></Anim>
        <Anim delay={0.1}><div className="sect-text">
          <p>A Nova Linguagem da Pentatônica é um treinamento completo para contrabaixistas que querem dominar a pentatônica de uma forma moderna, prática e musical.</p>
          <p>Aqui, você não vai aprender apenas &quot;caixinhas&quot;.</p>
          <p>Você vai entender como a pentatônica funciona, como ela se organiza no braço, como conectar regiões, como criar frases e como aplicar tudo isso em grooves, improvisos, solos, música gospel e progressões modernas.</p>
        </div></Anim>
        <Anim delay={0.2} type="scale"><div className="callout">A proposta é simples: fazer você parar de tocar padrões soltos e começar a construir linguagem.</div></Anim>
        <Anim delay={0.3}>
          <FretboardDecoration style={{ marginTop: 40, opacity: 0.7 }} />
        </Anim>
      </div>
    </section>
  );
}

// ─── Audience ───
export function AudienceSection() {
  const cards = [
    { icon: '◇', text: 'Iniciantes que querem aprender a pentatônica do jeito certo desde o começo.' },
    { icon: '◈', text: 'Intermediários que já conhecem alguns desenhos, mas ainda se sentem presos no braço.' },
    { icon: '★', text: 'Avançados que querem expandir vocabulário, fraseado e aplicação musical.' },
    { icon: '♪', text: 'Músicos de igreja que querem tocar com mais intenção, fluidez e musicalidade.' },
    { icon: '⚡', text: 'Improvisadores e solistas que querem criar frases modernas com mais liberdade.' },
    { icon: '◎', text: 'Professores de música que querem organizar melhor a forma de ensinar pentatônica.' },
  ];
  return (
    <section className="sect sect-dark">
      <div className="sect-inner">
        <Anim><h2 className="sect-title">Esse treinamento é para baixistas que querem <GradientText>evoluir de verdade</GradientText></h2></Anim>
        <div className="audience-grid">
          {cards.map((c, i) => (
            <Anim key={i} delay={i * 0.08} type="scale">
              <div className="audience-card">
                <div className="audience-icon">{c.icon}</div>
                <p>{c.text}</p>
              </div>
            </Anim>
          ))}
        </div>
        <Anim delay={0.5} type="scale"><div className="callout" style={{ marginTop: 48 }}>Mesmo se você já toca há anos, esse treinamento vai te mostrar possibilidades que provavelmente você ainda não explorou.</div></Anim>
      </div>
    </section>
  );
}

// ─── Big Problem / Comparison ───
export function BigProblemSection() {
  const [ref, visible] = useInView(0.1);
  const [itemsShown, setItemsShown] = useState(false);

  useEffect(() => {
    if (visible) { setTimeout(() => setItemsShown(true), 400); }
  }, [visible]);

  const beforeItems = ['Decora desenhos prontos', 'Repete shapes sem entender', 'Toca sempre na mesma região', 'Sobe e desce a escala', 'Repete licks de outros'];
  const afterItems = ['Entende a lógica da escala', 'Cria caminhos próprios', 'Transita pelo braço inteiro', 'Constrói frases musicais', 'Desenvolve identidade'];

  return (
    <section className="sect" ref={ref}>
      <div className="sect-inner">
        <Anim><h2 className="sect-title">Existe uma diferença enorme entre conhecer a pentatônica e <GradientText>falar música</GradientText> usando a pentatônica</h2></Anim>
        <Anim delay={0.1}><div className="sect-text">
          <p>A pentatônica é uma das escalas mais usadas da música moderna. Ela aparece no gospel, no blues, no pop, no fusion, no jazz, no rock e em vários outros estilos.</p>
          <p>Mas a maioria dos baixistas fica presa nisso: sobe e desce escala, repete lick pronto, toca sempre no mesmo lugar do braço.</p>
        </div></Anim>
        <Anim delay={0.15} type="scale"><div className="callout">É como ter um monte de palavras soltas, mas não conseguir formar uma frase.</div></Anim>
        <Anim delay={0.2}>
          <div className="comparison-grid">
            <div className="comp-col muted">
              <h3>O jeito comum</h3>
              <ul>
                {beforeItems.map((item, i) => (
                  <li key={i} className={itemsShown ? 'show' : ''} style={{ transitionDelay: `${0.5 + i * 0.15}s` }}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="comp-col ds-accent">
              <h3>A nova linguagem</h3>
              <ul>
                {afterItems.map((item, i) => (
                  <li key={i} className={itemsShown ? 'show' : ''} style={{ transitionDelay: `${0.8 + i * 0.15}s` }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Anim>
        <Anim delay={0.25}><div className="sect-text" style={{ marginTop: 32 }}>
          <p>E música é linguagem. <strong>Não é só digitação.</strong></p>
        </div></Anim>
      </div>
    </section>
  );
}

// ─── Turn ───
export function TurnSection() {
  const items = [
    'Vai sair das "caixinhas".',
    'Vai conectar regiões.',
    'Vai criar frases com começo, meio e fim.',
    'Vai entender como transformar padrões simples em ideias musicais modernas.',
  ];
  return (
    <section className="sect sect-dark">
      <div className="sect-inner">
        <Anim><h2 className="sect-title">A virada acontece quando você para de decorar shapes e começa a <GradientText>enxergar linguagem</GradientText></h2></Anim>
        <Anim delay={0.1}><div className="sect-text">
          <p>O treinamento A Nova Linguagem da Pentatônica foi criado para mudar sua forma de enxergar essa escala.</p>
          <p>Você vai aprender a pensar em distribuição, conexão, intenção melódica, aplicação e fraseado.</p>
        </div></Anim>
        <Anim delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '28px auto', maxWidth: 600, textAlign: 'left' }}>
            {items.map((item, i) => (
              <div key={i} style={{ fontSize: '1rem', color: 'var(--text-high)', lineHeight: 1.6, paddingLeft: 24, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--primary)', fontWeight: 700 }}>▸</span>
                {item}
              </div>
            ))}
          </div>
        </Anim>
        <Anim delay={0.5} type="scale"><div className="callout" style={{ textAlign: 'center' }}>É aqui que a pentatônica deixa de ser uma escala comum e começa a virar vocabulário.</div></Anim>
      </div>
    </section>
  );
}
