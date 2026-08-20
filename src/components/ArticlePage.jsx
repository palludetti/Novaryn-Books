import React, { useEffect } from 'react';
import { BookOpen, Clock, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function ArticlePage({ article, onNavigate, onOpenLeadModal, onOpenAdminModal }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Dynamic Client-side title as fallback
    if (article) {
      document.title = `${article.seoTitle} | A Máquina de Lucro da Sua Loja`;
    }
  }, [article]);

  if (!article) return null;

  const handleBackClick = (e) => {
    e.preventDefault();
    onNavigate('/#artigos');
  };

  const handleCtaClick = (e, href) => {
    if (href && href.startsWith('/#')) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      <Header 
        onOpenLeadModal={onOpenLeadModal} 
        onOpenAdminModal={onOpenAdminModal}
        onNavigate={onNavigate}
      />

      <main style={{ flex: 1, padding: '60px 0 90px' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          
          {/* Breadcrumb / Back Link */}
          <div style={{ marginBottom: '32px' }}>
            <a 
              href="/#artigos" 
              onClick={handleBackClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              <ArrowLeft size={16} /> Voltar para todos os artigos
            </a>
          </div>

          {/* Article Card Wrapper */}
          <article className="glass-card" style={{ padding: '48px 40px' }}>
            
            {/* Meta Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
              <span className="badge badge-emerald">
                <BookOpen size={14} /> {article.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.9rem' }}>
                <Clock size={14} /> {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display" style={{ fontSize: '2.4rem', color: '#ffffff', lineHeight: 1.3, marginBottom: '24px' }}>
              {article.title}
            </h1>

            {/* Excerpt / Lead */}
            <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '36px', paddingBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', fontStyle: 'italic' }}>
              {article.excerpt}
            </p>

            {/* Main Content */}
            <div 
              className="article-body"
              style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.85 }}
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />

            {/* Article CTA Section */}
            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
              {article.cta ? (
                <div>
                  <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '18px' }}>
                    {article.cta.supportText}
                  </p>
                  <a 
                    href={article.cta.buttonHref} 
                    onClick={(e) => handleCtaClick(e, article.cta.buttonHref)}
                    className="btn-gold"
                    style={{ fontSize: '1.05rem', padding: '16px 32px' }}
                  >
                    {article.cta.buttonText} <ArrowRight size={18} />
                  </a>
                  {article.cta.bookMention && (
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '20px', fontStyle: 'italic', maxWidth: '600px', margin: '20px auto 0' }}>
                      {article.cta.bookMention}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '18px' }}>
                    Quer dominar todas as estratégias completas de lucratividade?
                  </p>
                  <a 
                    href="https://loja.uiclap.com/titulo/ua189875" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-gold"
                    style={{ fontSize: '1.05rem', padding: '16px 32px' }}
                  >
                    Garantir Meu Exemplar Impresso na UICLAP <ExternalLink size={18} />
                  </a>
                </div>
              )}
            </div>

          </article>

          {/* Bottom Back Navigation */}
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <a 
              href="/#artigos" 
              onClick={handleBackClick}
              className="btn-secondary"
            >
              <ArrowLeft size={16} /> Ver outros artigos do livro
            </a>
          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
