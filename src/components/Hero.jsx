import React from 'react';
import { ArrowRight, Calculator, Download, Star, CheckCircle, ShoppingBag, Tablet, AlertTriangle, Gift } from 'lucide-react';

export default function Hero({ onOpenLeadModal }) {
  return (
    <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, rgba(245, 158, 11, 0.08) 40%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' }}>
          
          {/* Text Content */}
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span className="badge badge-gold">
                <Star size={14} fill="#fbbf24" /> Autor: Henrique Voss
              </span>
              <span className="badge badge-emerald">
                <Tablet size={14} /> Disponível no Amazon Kindle & UICLAP
              </span>
            </div>

            <h1 className="font-display" style={{
              fontSize: '3.3rem',
              lineHeight: 1.12,
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '20px'
            }}>
              Sua Loja Está <span className="gradient-text-gold">Perdendo Lucro</span> Todos os Dias.
            </h1>

            <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '28px', maxWidth: '640px', lineHeight: 1.7 }}>
              Descubra como fechar as sangrias invisíveis de caixa e <strong style={{ color: '#34d399' }}>lucrar mais sem depender apenas de vender mais</strong>.
            </p>

            {/* Lead Offer Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <Gift size={28} color="#fbbf24" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>
                <strong style={{ color: '#ffffff' }}>Baixe o Kit Gratuito do Lojista:</strong> A Calculadora de Lucro + Prefácio e Capítulo 1 + Checklist de Gestão.
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
              <a href="#calculadora" className="btn-gold" style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
                <Calculator size={20} /> Simular Sangria de Lucro
              </a>
              <button className="btn-primary" onClick={onOpenLeadModal} style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
                <Download size={20} /> Baixar Kit Gratuito (3 em 1)
              </button>
            </div>
          </div>

          {/* Book Mockup Column */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '360px',
              perspective: '1000px'
            }}>
              <div style={{
                borderRadius: '16px',
                padding: '12px',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(245,158,11,0.2))',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 0 50px rgba(245, 158, 11, 0.25)',
                transition: 'transform 0.5s ease',
              }}>
                <img 
                  src="/book_cover.jpg" 
                  alt="Capa Oficial do Livro A Máquina de Lucro da Sua Loja - Henrique Voss" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    display: 'block',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                />
              </div>

              {/* Float Tag */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                background: '#0f172a',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '16px',
                padding: '14px 20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '10px', borderRadius: '10px' }}>
                  <Star size={24} color="#f59e0b" fill="#f59e0b" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Henrique Voss</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#34d399' }}>Amazon Kindle & UICLAP</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
