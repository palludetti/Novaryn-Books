import React from 'react';
import { ShoppingCart, Smartphone, BookOpen, ExternalLink, Check, ShieldCheck, Tablet } from 'lucide-react';

export default function BuySection() {
  const options = [
    {
      title: "e-Book Digital (Amazon Kindle)",
      price: "Loja Amazon Kindle",
      type: "Leitura Imediata no Kindle, Smartphone ou Tablet",
      badge: "Download Imediato",
      icon: <Tablet size={32} color="#34d399" />,
      features: [
        "Baixe e leia imediatamente em qualquer celular, tablet ou e-reader Kindle",
        "Disponível globalmente na plataforma da Amazon",
        "Sem custos de frete",
        "Destaques, trechos e anotações salvos na nuvem"
      ],
      ctaText: "Comprar Versão Kindle na Amazon",
      ctaLink: "https://www.amazon.com/M%C3%81QUINA-LUCRO-SUA-LOJA-Portuguese-ebook/dp/B0HCJYRP6Z/ref=tmm_kin_swatch_0",
      isPopular: true
    },
    {
      title: "Livro Físico (UICLAP)",
      price: "Impresso Sob Demanda",
      type: "Edição Oficial Impressa no Brasil",
      badge: "Edição Impressa",
      icon: <BookOpen size={32} color="#fbbf24" />,
      features: [
        "Impressão oficial sob demanda da Editora Novaryn via UICLAP",
        "Ideal para marcar, grifar e ter na mesa da sua loja",
        "Envio com código de rastreio para todo o Brasil",
        "Qualidade gráfica e acabamento físico premium"
      ],
      ctaText: "Comprar Livro Físico na UICLAP",
      ctaLink: "https://loja.uiclap.com/titulo/ua189875",
      isPopular: false
    }
  ];

  return (
    <section id="comprar" style={{ padding: '90px 0', background: 'rgba(15, 23, 42, 0.4)', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>
            <ShieldCheck size={14} /> Adquira Seu Exemplar
          </span>
          <h2 className="font-display" style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '16px' }}>
            Disponível em Formato Kindle e Impresso
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
            Garanta agora o livro escrito por <strong>Henrique Voss</strong> na Amazon Kindle ou impresso pela UICLAP.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
          {options.map((opt, idx) => (
            <div 
              key={idx} 
              className="glass-card" 
              style={{ 
                padding: '36px', 
                position: 'relative',
                border: opt.isPopular ? '2px solid #10b981' : '1px solid rgba(245, 158, 11, 0.4)',
                boxShadow: opt.isPopular ? '0 0 30px rgba(16, 185, 129, 0.2)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: opt.isPopular ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: opt.isPopular ? '#ffffff' : '#000000',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '6px 16px',
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {opt.badge}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', marginTop: '8px' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: '12px' }}>
                    {opt.icon}
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: '1.3rem', color: '#ffffff' }}>
                      {opt.title}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{opt.type}</div>
                  </div>
                </div>

                <div style={{ margin: '20px 0' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: opt.isPopular ? '#34d399' : '#fbbf24' }}>
                    {opt.price}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {opt.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#cbd5e1', fontSize: '0.95rem' }}>
                      <Check size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '4px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a 
                href={opt.ctaLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={opt.isPopular ? "btn-primary" : "btn-gold"}
                style={{ width: '100%', justifyContent: 'center', textAlign: 'center', padding: '16px' }}
              >
                {opt.ctaText} <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
