'use client';

import { useState, useEffect } from 'react';
import { useInView, Anim, SoundWave, AnimCounter } from './Hooks';
import { BassStringsBackground, SoundSpectrum, GlowOrbs, GradientText, PulseRing, StatCard } from './Visuals';
import { PriceAnchor, UrgencyBanner, TrustSignals, GuaranteeBadge } from './Conversion';

const LINK = 'https://pay.kiwify.com.br/Yl6OoSO';

const MODULES = [
  { num: '01', title: 'Fundamentos da Pentatônica', intro: 'Antes de correr, você precisa entender o mapa. Nesta parte, você aprende a base da escala pentatônica.',
    items: ['Estrutura da escala pentatônica','Formação intervalar','Campo harmônico relacionado','Sonoridade da pentatônica na prática','Visualização em qualquer tonalidade','Entender sem depender de desenhos prontos'],
    hl: 'Aqui você constrói o alicerce. Sem isso, o resto vira decoreba gourmetizada.' },
  { num: '02', title: 'Distribuições Inteligentes', intro: 'Distribuições que mudam completamente a forma de visualizar a pentatônica no braço.',
    items: ['2x3','3x2','Horizontais','Verticais','Cadenciais','Quartais','Conexões entre shapes','Organização estratégica no braço'],
    hl: 'Sair do óbvio e começar a criar caminhos mais musicais, modernos e inteligentes.' },
  { num: '03', title: 'Desenvolvimento Horizontal', intro: 'Um dos maiores bloqueios é tocar preso em regiões pequenas. Aprenda fluidez horizontal.',
    items: ['Conexão entre regiões','Expansão de frases','Mobilidade no instrumento','Liberdade para transitar','Não ficar refém de um shape','Frases que caminham naturalmente'],
    hl: 'Você começa a tocar pensando no braço inteiro, não em blocos isolados.' },
  { num: '04', title: 'Criação de Frases', intro: 'Saber a escala é uma coisa. Criar frases boas é outra.',
    items: ['Frases modernas','Frases melódicas','Frases rápidas','Frases gospel','Identidade musical','Linguagem própria','Como as frases nascem'],
    hl: 'O objetivo não é copiar frases para sempre. É entender como elas nascem.' },
  { num: '05', title: 'Aplicações Musicais', intro: 'Pentatônica sem aplicação é teoria bonita e inútil.',
    items: ['Onde usar a pentatônica','Diferentes contextos','Grooves','Improviso','Solos','Música gospel','Progressões modernas','Pensar musicalmente'],
    hl: 'A parte onde o estudo vira música. O conceito sai da aula e entra no som.' },
];

// ─── Modules (Skill Tree) ───
export function ModulesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [unlockedUpTo, setUnlockedUpTo] = useState(2);
  const [ref, visible] = useInView(0.05);

  useEffect(() => {
    if (!visible) return;
    const timers: NodeJS.Timeout[] = [];
    for (let i = 2; i < MODULES.length; i++) {
      timers.push(setTimeout(() => setUnlockedUpTo(i + 1), (i - 1) * 1500));
    }
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  return (
    <section className="sect" id="modulos" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <GlowOrbs count={2} />
      <div className="sect-inner" style={{ position: 'relative', zIndex: 1 }}>
        <Anim><h2 className="sect-title">Sua Jornada Musical<br /><GradientText>5 módulos do zero ao avançado</GradientText></h2></Anim>
        <Anim delay={0.1}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <SoundSpectrum bars={24} height={32} />
          </div>
        </Anim>
        <div className="skill-tree">
          {MODULES.map((m, i) => {
            const unlocked = i < unlockedUpTo;
            const isActive = activeIdx === i;
            const completed = i < activeIdx;
            const status = completed ? 'completed' : isActive ? 'active' : unlocked ? 'unlocked' : '';
            return (
              <Anim key={i} delay={i * 0.1} type="left">
                <div className={`skill-node ${status}`} onClick={() => unlocked && setActiveIdx(i)}>
                  <div className="skill-node-dot">{completed ? '✓' : m.num}</div>
                  <div className="skill-card">
                    <div className="skill-card-header">
                      <div>
                        <h3>{m.title}</h3>
                        <p>{m.intro.slice(0, 70)}…</p>
                      </div>
                      <span className={`skill-badge ${completed ? 'done' : isActive ? 'current' : 'locked'}`}>
                        {completed ? 'Completo' : isActive ? 'Atual' : unlocked ? 'Disponível' : 'Bloqueado'}
                      </span>
                    </div>
                    <div className="skill-card-body">
                      <div className="skill-card-body-inner">
                        <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 16 }}>{m.intro}</p>
                        <ul className="skill-items">
                          {m.items.map((it, j) => <li key={j}>{it}</li>)}
                        </ul>
                        <div className="skill-highlight">{m.hl}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Anim>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Differential ───
export function DiffSection() {
  const items = ['Estrutura','Organização','Distribuição','Conexão','Aplicação real','Desenvolvimento criativo','Visão moderna','Construção de linguagem'];
  return (
    <section className="sect sect-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="sect-inner" style={{ position: 'relative', zIndex: 1 }}>
        <Anim><h2 className="sect-title">O diferencial: você não aprende só desenhos.<br /><GradientText>Você aprende linguagem.</GradientText></h2></Anim>
        <Anim delay={0.1}><div className="sect-text"><p>Enquanto muitos treinamentos ensinam apenas desenhos para você decorar, aqui você aprende a lógica por trás da pentatônica.</p></div></Anim>
        <div className="diff-grid">
          {items.map((it, i) => (
            <Anim key={i} delay={0.1 + i * 0.06} type="scale">
              <div className="diff-item">{it}</div>
            </Anim>
          ))}
        </div>
        <Anim delay={0.6} type="scale"><div className="callout" style={{ textAlign: 'center' }}>A ideia não é fazer você tocar mais notas. É fazer você tocar melhor. Com intenção. Com fluidez. Com identidade.</div></Anim>
      </div>
    </section>
  );
}

// ─── Results ───
export function ResultsSection() {
  const items = ['Enxergar a pentatônica no braço inteiro','Criar frases com mais liberdade','Improvisar com mais segurança','Tocar sem ficar preso em caixinhas','Desenvolver uma linguagem mais moderna','Aplicar em grooves, solos e improvisos','Entender padrões de grandes músicos','Construir frases com musicalidade','Usar a pentatônica profissionalmente'];
  return (
    <section className="sect">
      <div className="sect-inner">
        <Anim><h2 className="sect-title">O que muda na sua forma de tocar <GradientText>depois do treinamento</GradientText></h2></Anim>
        <ul className="checklist">
          {items.map((it, i) => (
            <Anim key={i} delay={i * 0.07} type="left">
              <li><span className="check-icon">✓</span>{it}</li>
            </Anim>
          ))}
        </ul>
        <Anim delay={0.7} type="scale"><div className="callout" style={{ textAlign: 'center' }}>Você deixa de tocar desenhos. E começa a falar música.</div></Anim>
        <Anim delay={0.8}>
          <div style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
            <StatCard number={5} label="Módulos" icon="📚" />
            <StatCard number={30} suffix="+" label="Aulas" icon="🎬" />
            <StatCard number={100} suffix="%" label="Prático" icon="🎸" />
          </div>
        </Anim>
      </div>
    </section>
  );
}

// ─── Concept ───
export function ConceptSection() {
  return (
    <section className="sect sect-dark">
      <div className="sect-inner">
        <Anim><h2 className="sect-title">A pentatônica deixa de ser escala básica e vira <GradientText>ferramenta de expressão musical</GradientText></h2></Anim>
        <Anim delay={0.1}><div className="sect-text" style={{ fontSize: 17, lineHeight: 2, textAlign: 'center', margin: '0 auto' }}>
          <p>Esse treinamento não é sobre decorar escala. É sobre mudar sua visão.</p>
          <p>Porque quando você entende a pentatônica como linguagem, tudo muda.</p>
          <p>Você para de pensar apenas em nota. Começa a pensar em frase.</p>
          <p>Para de tocar no automático. Começa a tocar com intenção.</p>
        </div></Anim>
        <Anim delay={0.2} type="scale"><div className="callout" style={{ textAlign: 'center' }}>A pentatônica deixa de ser uma escala básica e vira uma ferramenta poderosa de expressão musical.</div></Anim>
      </div>
    </section>
  );
}

// ─── Authority ───
export function AuthoritySection() {
  return (
    <section className="sect">
      <div className="sect-inner">
        <Anim><h2 className="sect-title" style={{ textAlign: 'center' }}>Método criado por <GradientText>Prof. Joab Pereira</GradientText></h2></Anim>
        <Anim delay={0.1} type="scale">
          <div className="authority-card">
            <div className="authority-avatar">JP</div>
            <div className="authority-info">
              <h3>Prof. Joab Pereira</h3>
              <p>O método foi criado a partir de anos de estudo, prática e aplicação real no contrabaixo. Uma abordagem moderna, prática e musical.</p>
              <p style={{ marginTop: 12 }}>Não é teoria jogada. Não é conteúdo solto. É um caminho organizado para você entender, aplicar e dominar a pentatônica com clareza.</p>
            </div>
          </div>
        </Anim>
      </div>
    </section>
  );
}

// ─── Promise ───
export function PromiseSection() {
  return (
    <section className="sect sect-dark">
      <div className="sect-inner" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <Anim><h2 className="sect-title">Se você quer parar de tocar pentatônica de forma mecânica, <GradientText>esse treinamento foi feito para você</GradientText></h2></Anim>
        <Anim delay={0.1}><div className="sect-text" style={{ margin: '0 auto' }}>
          <p>A Nova Linguagem da Pentatônica vai te mostrar como transformar uma das escalas mais conhecidas em uma ferramenta avançada de criação.</p>
          <p>Você vai aprender a usar a pentatônica com liberdade, musicalidade e identidade.</p>
        </div></Anim>
        <Anim delay={0.15} type="scale"><div className="callout" style={{ textAlign: 'center' }}>Do zero ao avançado. Da caixinha à linguagem. Da repetição à criação.</div></Anim>
      </div>
    </section>
  );
}

// ─── Offer ───
export function OfferSection() {
  const [revealed, setRevealed] = useState(false);
  const [ref, visible] = useInView(0.2);

  useEffect(() => {
    if (visible && !revealed) { setTimeout(() => setRevealed(true), 600); }
  }, [visible, revealed]);

  const benefits = [
    { title: 'Treinamento completo', desc: 'Abordagem prática para dominar a pentatônica do zero ao avançado.' },
    { title: 'Fundamentos da pentatônica', desc: 'Estrutura, formação intervalar, sonoridade e aplicação.' },
    { title: 'Distribuições inteligentes', desc: '2x3, 3x2, horizontais, verticais, cadenciais, quartais.' },
    { title: 'Desenvolvimento horizontal', desc: 'Parar de tocar preso e enxergar o braço com liberdade.' },
    { title: 'Criação de frases', desc: 'Frases modernas, melódicas, rápidas, gospel e com identidade.' },
    { title: 'Aplicações musicais reais', desc: 'Grooves, improvisos, solos, gospel e progressões modernas.' },
  ];

  return (
    <section className="sect" style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }} id="oferta" ref={ref}>
      <GlowOrbs count={3} />
      <div className="sect-inner" style={{ position: 'relative', zIndex: 1 }}>
        <Anim><h2 className="sect-title" style={{ textAlign: 'center' }}>Domine a pentatônica no contrabaixo por apenas <GradientText style={{ fontFamily: 'var(--font-d)' }}>R$37,90</GradientText></h2></Anim>
        <Anim delay={0.1}><div className="sect-text" style={{ margin: '0 auto', textAlign: 'center', maxWidth: 640 }}>
          <p>Você pode continuar tentando juntar vídeos soltos, decorar shapes aleatórios e torcer para uma hora &quot;clicar&quot;.</p>
          <p>Ou pode seguir um caminho organizado, direto e musical.</p>
        </div></Anim>

        <Anim delay={0.15} type="scale">
          <PriceAnchor />
          <div className="offer-price-card" style={{
            transform: revealed ? 'scale(1)' : 'scale(0.9)',
            opacity: revealed ? 1 : 0,
            transition: 'all 0.8s var(--ease)',
          }}>
            <span className="eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>Acesso Completo</span>
            <div className="offer-price">R$37<span className="offer-cents">,90</span></div>
            <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', marginTop: 8, marginBottom: 20, textAlign: 'center' }}>Acesso ao treinamento completo A Nova Linguagem da Pentatônica.</p>
            <UrgencyBanner />
            <div style={{ marginTop: 24 }}>
              <PulseRing><a href={LINK} className="btn-cta btn-cta-pulse" style={{ width: '100%', justifyContent: 'center' }}>▶ Quero acessar o treinamento por R$37,90</a></PulseRing>
            </div>
            <TrustSignals />
          </div>
          <GuaranteeBadge />
        </Anim>

        <Anim delay={0.2}>
          <div style={{ marginTop: 56 }}>
            <h3 className="sect-title" style={{ fontSize: 'clamp(1.2rem,3vw,1.6rem)', textAlign: 'center', marginBottom: 32 }}>O que você desbloqueia ao entrar</h3>
            <div className="offer-benefits-grid">
              {benefits.map((b, i) => (
                <Anim key={i} delay={0.25 + i * 0.08} type="scale">
                  <div className="offer-benefit-card">
                    <span className="check-icon" style={{ marginBottom: 0 }}>✓</span>
                    <div>
                      <strong style={{ color: 'var(--text-high)', fontSize: '0.9rem', display: 'block', marginBottom: 4 }}>{b.title}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)', lineHeight: 1.5 }}>{b.desc}</span>
                    </div>
                  </div>
                </Anim>
              ))}
            </div>
          </div>
        </Anim>

        <Anim delay={0.3}>
          <div style={{ marginTop: 48, padding: '32px 28px', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', fontSize: '1rem', color: 'var(--text-mid)', lineHeight: 1.8 }}>
            <p>Isso é menos do que uma aula particular.</p>
            <p>Menos do que um jogo de cordas simples.</p>
            <p style={{ marginTop: 16, color: 'var(--text-high)', fontWeight: 700 }}>Mas pode mudar completamente a forma como você entende e aplica a pentatônica.</p>
          </div>
        </Anim>

        <Anim delay={0.35}>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <PulseRing><a href={LINK} className="btn-cta btn-cta-pulse" style={{ fontSize: '1.1rem', padding: '18px 48px' }}>▶ Quero acessar o treinamento por R$37,90</a></PulseRing>
            <p style={{ marginTop: 14, fontSize: '0.75rem', color: 'var(--text-low)', maxWidth: 480, margin: '14px auto 0', letterSpacing: '0.04em' }}>Garanta seu acesso e comece hoje.</p>
            <div style={{ marginTop: 12 }}><GuaranteeBadge compact={true} /></div>
            <TrustSignals />
          </div>
        </Anim>
      </div>
    </section>
  );
}

// ─── Final CTA ───
export function FinalCTASection() {
  return (
    <section style={{ padding: 'clamp(5rem, 10vw, 7rem) clamp(1rem, 4vw, 1.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }} id="cta">
      <BassStringsBackground opacity={0.03} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(232,122,26,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}></div>
      <Anim>
        <h2 className="sect-title" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 16px', position: 'relative', zIndex: 1 }}>Entre agora para o treinamento <GradientText>A Nova Linguagem da Pentatônica</GradientText></h2>
        <p className="sect-text" style={{ textAlign: 'center', margin: '0 auto 40px', maxWidth: 520, position: 'relative', zIndex: 1 }}>Comece a dominar a pentatônica no contrabaixo do zero ao avançado.</p>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <PulseRing><a href="#oferta" className="btn-cta btn-cta-pulse" style={{ fontSize: '1.1rem', padding: '18px 48px' }}>▶ Quero entrar no treinamento</a></PulseRing>
        </div>
      </Anim>
      <Anim delay={0.2}>
        <div style={{ marginTop: 40, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <SoundSpectrum bars={50} height={40} />
        </div>
      </Anim>
    </section>
  );
}

// ─── Footer ───
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">joab pereira</div>
        <p>© 2026 A Nova Linguagem da Pentatônica · Prof. Joab Pereira</p>
      </div>
    </footer>
  );
}
