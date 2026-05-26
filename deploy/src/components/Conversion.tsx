'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView, Anim, AnimCounter } from './Hooks';
import { GlowOrbs, GradientText } from './Visuals';

const LINK = 'https://pay.kiwify.com.br/Yl6OoSO';

// ─── Sticky CTA (mobile) ───
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const h = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const offerEl = document.getElementById('oferta');
      const offerVisible = offerEl && offerEl.getBoundingClientRect().top < window.innerHeight && offerEl.getBoundingClientRect().bottom > 0;
      setVisible(scrollPct > 0.25 && !offerVisible && !dismissed);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, [dismissed]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 150,
      background: 'linear-gradient(to top, rgba(15,12,9,0.98) 60%, transparent)',
      padding: '20px 16px 16px', display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 6,
      animation: 'slideUpSticky 0.4s var(--ease)',
    }}>
      <a href="#oferta" className="btn-cta" style={{
        width: '100%', maxWidth: 400, justifyContent: 'center',
        fontSize: '1rem', padding: '14px 24px', minHeight: 50,
      }}>
        ▶ Garantir por R$37,90
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 2 }}>
        <span style={{ fontSize: 10, color: 'var(--text-low)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#4CAF50', fontSize: 12 }}>🔒</span> Pagamento seguro
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-low)' }}>·</span>
        <span style={{ fontSize: 10, color: 'var(--text-low)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12 }}>🛡️</span> 7 dias de garantia
        </span>
      </div>
    </div>
  );
}

// ─── Guarantee Badge ───
export function GuaranteeBadge({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.25)',
        borderRadius: 'var(--r-full)', padding: '8px 18px',
        fontSize: '0.8rem', color: '#81C784', fontWeight: 600,
      }}>
        <span style={{ fontSize: 16 }}>🛡️</span>
        7 dias de garantia incondicional
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 480, margin: '32px auto 0', padding: '28px 32px',
      background: 'linear-gradient(135deg, rgba(76,175,80,0.04), rgba(76,175,80,0.02))',
      border: '1px solid rgba(76,175,80,0.2)', borderRadius: 'var(--r-xl)',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
      <div style={{
        fontFamily: 'var(--font-d)', fontSize: '1.3rem', color: '#81C784',
        letterSpacing: '0.04em', marginBottom: 8,
      }}>Garantia Incondicional de 7 Dias</div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>
        Se em até 7 dias você sentir que o treinamento não é para você, basta solicitar o reembolso.
        Sem perguntas, sem burocracia. O risco é zero.
      </p>
    </div>
  );
}

// ─── Price Anchoring ───
export function PriceAnchor() {
  return (
    <div style={{ textAlign: 'center', marginBottom: 8 }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-low)', marginBottom: 4, letterSpacing: '0.06em' }}>VALOR REAL DO CONTEÚDO</div>
      <div style={{
        fontFamily: 'var(--font-d)', fontSize: 'clamp(1.5rem, 5vw, 2rem)',
        color: 'var(--text-low)', textDecoration: 'line-through',
        textDecorationColor: 'rgba(232,80,80,0.6)', opacity: 0.6,
      }}>R$497,00</div>
      <div style={{
        fontSize: '0.75rem', color: 'var(--cta)', fontWeight: 700,
        marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>Promoção de lançamento</div>
    </div>
  );
}

// ─── Trust Signals ───
export function TrustSignals() {
  const signals = [
    { icon: '🔒', text: 'Pagamento 100% seguro' },
    { icon: '💳', text: 'PIX, cartão ou boleto' },
    { icon: '⚡', text: 'Acesso imediato' },
    { icon: '🛡️', text: '7 dias de garantia' },
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 20 }}>
      {signals.map((s, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: '0.72rem', color: 'var(--text-low)', fontWeight: 600, letterSpacing: '0.04em',
        }}>
          <span style={{ fontSize: 14 }}>{s.icon}</span>
          {s.text}
        </div>
      ))}
    </div>
  );
}

// ─── Urgency Banner ───
export function UrgencyBanner() {
  return (
    <Anim type="scale">
      <div style={{
        maxWidth: 520, margin: '24px auto 0', padding: '14px 24px',
        background: 'linear-gradient(135deg, rgba(232,122,26,0.08), rgba(217,163,91,0.05))',
        border: '1px solid rgba(232,122,26,0.25)', borderRadius: 'var(--r-full)',
        textAlign: 'center', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 16, animation: 'floatBadge 1.5s ease-in-out infinite' }}>🔥</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--cta)', fontWeight: 700, letterSpacing: '0.04em' }}>
          Preço promocional por tempo limitado
        </span>
        <span style={{ fontSize: 16, animation: 'floatBadge 1.5s ease-in-out 0.3s infinite' }}>🔥</span>
      </div>
    </Anim>
  );
}

// ─── FAQ Section ───
export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { q: 'Preciso saber teoria musical para acompanhar?', a: 'Não. O treinamento começa do zero. Você vai aprender os fundamentos da pentatônica desde a estrutura básica, sem precisar de conhecimento prévio de teoria.' },
    { q: 'Serve para baixo de 5 ou 6 cordas?', a: 'Sim! O método se aplica a qualquer contrabaixo. Os conceitos de distribuição, fraseado e conexão funcionam independente do número de cordas.' },
    { q: 'Quanto tempo tenho de acesso?', a: 'Acesso vitalício. Você pode assistir quantas vezes quiser, no seu ritmo, sem prazo para expirar.' },
    { q: 'E se eu não gostar?', a: 'Você tem 7 dias de garantia incondicional. Se não estiver satisfeito por qualquer motivo, basta solicitar o reembolso e devolvemos 100% do valor. Sem perguntas.' },
    { q: 'Já toco há anos. Esse curso é para mim?', a: 'Sim! Mesmo baixistas experientes ficam presos nos mesmos padrões. O treinamento vai expandir sua visão sobre distribuições, conexões e fraseado de formas que provavelmente você ainda não explorou.' },
    { q: 'Como recebo o acesso?', a: 'Após a confirmação do pagamento, você recebe imediatamente o acesso por e-mail com login para a plataforma. No PIX, o acesso é instantâneo.' },
    { q: 'Quais as formas de pagamento?', a: 'PIX (acesso imediato), cartão de crédito (até 12x) ou boleto bancário. Tudo processado pela Kiwify, plataforma segura e confiável.' },
  ];

  return (
    <section className="sect">
      <div className="sect-inner">
        <Anim><h2 className="sect-title" style={{ textAlign: 'center' }}>Perguntas <GradientText>Frequentes</GradientText></h2></Anim>
        <div style={{ maxWidth: 700, margin: '40px auto 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <Anim key={i} delay={i * 0.05}>
                <div style={{
                  background: isOpen ? 'var(--bg-card)' : 'transparent',
                  border: `1px solid ${isOpen ? 'rgba(217,163,91,0.25)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-lg)', overflow: 'hidden',
                  transition: 'all 0.3s var(--ease)',
                  boxShadow: isOpen ? 'var(--shadow-glow)' : 'none',
                }}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      padding: '18px 24px', cursor: 'pointer', textAlign: 'left',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: 16, fontFamily: 'var(--font-b)',
                    }}
                  >
                    <span style={{
                      fontSize: '0.95rem', fontWeight: 600,
                      color: isOpen ? 'var(--text-high)' : 'var(--text-mid)',
                      transition: 'color 0.3s', lineHeight: 1.4,
                    }}>{faq.q}</span>
                    <span style={{
                      color: isOpen ? 'var(--primary)' : 'var(--text-low)',
                      fontSize: 16, flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s var(--ease), color 0.3s',
                    }}>▾</span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 200 : 0, overflow: 'hidden',
                    transition: 'max-height 0.4s var(--ease)',
                  }}>
                    <div style={{
                      padding: '0 24px 18px', fontSize: '0.875rem',
                      color: 'var(--text-mid)', lineHeight: 1.7, textAlign: 'left',
                    }}>{faq.a}</div>
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

// ─── Mini-Quiz ───
export function MiniQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { id: 'q1', q: 'Você sente que toca sempre as mesmas frases na pentatônica?', yes: 'Sim, sempre repito as mesmas ideias', no: 'Não, tenho bastante variedade' },
    { id: 'q2', q: 'Consegue improvisar com confiança usando a pentatônica?', yes: 'Não, travo na hora H', no: 'Sim, improviso bem' },
    { id: 'q3', q: 'Conhece a pentatônica além dos desenhos básicos?', yes: 'Não, só sei os shapes', no: 'Sim, conheço distribuições avançadas' },
  ];

  const yesCount = Object.values(answers).filter(v => v === 'yes').length;
  const allAnswered = Object.keys(answers).length === questions.length;

  useEffect(() => {
    if (allAnswered) {
      setTimeout(() => setShowResult(true), 500);
    }
  }, [allAnswered]);

  return (
    <section className="sect sect-dark" style={{ position: 'relative', overflow: 'hidden' }}>
      <GlowOrbs count={2} />
      <div className="sect-inner" style={{ position: 'relative', zIndex: 1 }}>
        <Anim><span className="eyebrow">Teste rápido</span></Anim>
        <Anim delay={0.05}><h2 className="sect-title" style={{ textAlign: 'center' }}>
          Você realmente domina a <GradientText>pentatônica</GradientText>?
        </h2></Anim>
        <Anim delay={0.1}><p className="sect-text" style={{ textAlign: 'center', marginBottom: 40 }}>
          Responda com sinceridade. Leva 10 segundos.
        </p></Anim>

        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {questions.map((q, i) => (
            <Anim key={q.id} delay={0.15 + i * 0.1} type="scale">
              <div style={{
                background: 'var(--bg-card)', border: `1px solid ${answers[q.id] ? 'rgba(217,163,91,0.3)' : 'var(--border)'}`,
                borderRadius: 'var(--r-lg)', padding: '24px',
                transition: 'all 0.3s var(--ease)',
                boxShadow: answers[q.id] ? '0 0 20px rgba(217,163,91,0.08)' : 'none',
              }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-high)', fontWeight: 600, marginBottom: 14, textAlign: 'left' }}>
                  {i + 1}. {q.q}
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[{ key: 'yes', label: q.yes }, { key: 'no', label: q.no }].map(opt => {
                    const selected = answers[q.id] === opt.key;
                    return (
                      <button key={opt.key} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                        style={{
                          flex: 1, padding: '12px 16px', borderRadius: 'var(--r-md)',
                          border: `1px solid ${selected ? (opt.key === 'yes' ? 'var(--cta)' : 'var(--primary)') : 'var(--border)'}`,
                          background: selected ? (opt.key === 'yes' ? 'rgba(232,122,26,0.1)' : 'rgba(217,163,91,0.08)') : 'var(--bg-overlay)',
                          color: selected ? 'var(--text-high)' : 'var(--text-mid)',
                          fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                          fontFamily: 'var(--font-b)', transition: 'all 0.2s', textAlign: 'center',
                        }}
                      >{opt.label}</button>
                    );
                  })}
                </div>
              </div>
            </Anim>
          ))}
        </div>

        {showResult && (
          <Anim type="scale">
            <div style={{
              maxWidth: 600, margin: '32px auto 0', padding: '28px 32px',
              background: 'linear-gradient(135deg, rgba(232,122,26,0.06), rgba(217,163,91,0.04))',
              border: '1px solid rgba(232,122,26,0.3)', borderRadius: 'var(--r-xl)', textAlign: 'center',
            }}>
              {yesCount >= 2 ? (
                <>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🎯</div>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: 'var(--cta)', marginBottom: 8 }}>
                    O treinamento foi feito exatamente para você.
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>
                    Você tem potencial, mas está preso nos padrões comuns. A Nova Linguagem da Pentatônica vai destravar sua forma de tocar.
                  </p>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>💡</div>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: 8 }}>
                    Mesmo assim, tem muito a explorar.
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>
                    A pentatônica tem camadas que a maioria nunca explora. O treinamento vai expandir o que você já sabe.
                  </p>
                </>
              )}
              <a href="#oferta" className="btn-cta" style={{ marginTop: 20, fontSize: '0.95rem', padding: '14px 36px' }}>
                ▶ Ver a oferta especial
              </a>
            </div>
          </Anim>
        )}
      </div>
    </section>
  );
}

// ─── Exit Intent Popup ───
export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered.current && !closed) {
        triggered.current = true;
        setShow(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [closed]);

  if (!show || closed) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'exitFadeIn 0.3s ease',
    }} onClick={() => setClosed(true)}>
      <div style={{
        maxWidth: 440, width: '100%', padding: '40px 36px',
        background: 'linear-gradient(135deg, #1A130D, var(--bg-card))',
        border: '1px solid rgba(217,163,91,0.3)', borderRadius: 'var(--r-xl)',
        textAlign: 'center', position: 'relative',
        boxShadow: '0 0 60px rgba(217,163,91,0.15), 0 20px 60px rgba(0,0,0,0.5)',
        animation: 'exitPopIn 0.4s var(--ease)',
      }} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setClosed(true)} style={{
          position: 'absolute', top: 12, right: 16, background: 'none',
          border: 'none', color: 'var(--text-low)', fontSize: 20, cursor: 'pointer', padding: 4,
        }}>✕</button>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🎸</div>
        <div style={{
          fontFamily: 'var(--font-d)', fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
          color: 'var(--text-high)', lineHeight: 1.1, marginBottom: 12,
        }}>Espera! Não vai sem isso.</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 8 }}>
          Por apenas <strong style={{ color: 'var(--cta)' }}>R$37,90</strong>, você pode transformar sua forma de tocar pentatônica no contrabaixo.
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-low)', marginBottom: 24 }}>
          Garantia de 7 dias · Acesso imediato · Pagamento seguro
        </p>
        <a href={LINK} className="btn-cta" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}>
          ▶ Quero garantir meu acesso
        </a>
        <button onClick={() => setClosed(true)} style={{
          background: 'none', border: 'none', color: 'var(--text-low)',
          fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'var(--font-b)',
          display: 'block', margin: '16px auto 0',
        }}>
          Não, obrigado. Quero continuar tocando as mesmas frases.
        </button>
      </div>
    </div>
  );
}
