import React, { useState, useEffect } from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import PlayBookCard from './PlayBookCard';
import { playCatalog } from '../../data/playCatalog';

export default function PlayPage({ onNavigate }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const seoData = playCatalog.seo[language];
  const disclaimer = playCatalog.disclaimer[language];
  const books = playCatalog.books;

  // Separate books
  const publishedBooks = books.filter(b => b.status === 'available');
  const comingBooks = books.filter(b => b.status === 'coming-soon');

  // Update page title and meta tags dynamically (REMOVED A Máquina reference)
  useEffect(() => {
    document.title = seoData.title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = seoData.description;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://metodomaquinadelucro.com.br/play';

    const ogUpdates = {
      'og:title': seoData.title,
      'og:description': seoData.description,
      'og:url': 'https://metodomaquinadelucro.com.br/play',
      'og:type': 'website',
      'og:image': 'https://metodomaquinadelucro.com.br/og/novaryn-play.jpg',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/jpeg'
    };

    Object.entries(ogUpdates).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    // Update Twitter tags
    const twitterUpdates = {
      'twitter:card': 'summary_large_image',
      'twitter:title': seoData.title,
      'twitter:description': seoData.description,
      'twitter:image': 'https://metodomaquinadelucro.com.br/og/novaryn-play.jpg'
    };

    Object.entries(twitterUpdates).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

  }, [language, seoData]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f1419' }}>
      {/* Play Header - Separate from Máquina */}
      <header style={{
        background: 'linear-gradient(135deg, #0f1419 0%, #1a202c 100%)',
        borderBottom: '2px solid rgba(255, 153, 0, 0.3)',
        padding: 'clamp(16px, 4vw, 24px) 20px',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={() => onNavigate('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              fontWeight: 800,
              letterSpacing: '0.05em'
            }}
          >
            NOVARYN BOOKS
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#ff9900', fontWeight: 700 }}>
              NOVARYN PLAY
            </div>
          </button>

          {/* Language Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Globe size={18} style={{ color: '#ff9900' }} />
            <button
              onClick={() => setLanguage('en')}
              style={{
                padding: '8px 12px',
                background: language === 'en' ? '#ff9900' : 'rgba(255, 255, 255, 0.05)',
                color: language === 'en' ? '#0f1419' : '#cbd5e1',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('pt')}
              style={{
                padding: '8px 12px',
                background: language === 'pt' ? '#ff9900' : 'rgba(255, 255, 255, 0.05)',
                color: language === 'pt' ? '#0f1419' : '#cbd5e1',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              PT
            </button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #1a202c 0%, #0f1419 100%)',
          padding: 'clamp(40px, 10vw, 80px) 20px',
          borderBottom: '1px solid rgba(255, 153, 0, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'rgba(255, 153, 0, 0.1)',
              border: '1px solid rgba(255, 153, 0, 0.3)',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <span style={{ color: '#ff9900', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {language === 'pt' ? 'Guias Estratégicos' : 'Strategy Guides'}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}>
              Novaryn Play
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#cbd5e1',
              marginBottom: '28px',
              maxWidth: '700px',
              margin: '0 auto 28px',
              lineHeight: 1.7
            }}>
              {language === 'pt' 
                ? 'Guias não oficiais de estratégia para jogadores. Domine mecânicas complexas com táticas especializadas.'
                : 'Unofficial strategy guides and player resources for complex games. Master game mechanics with expert tactics.'}
            </p>
          </div>
        </section>

        {/* Published Section */}
        <section style={{
          padding: 'clamp(40px, 8vw, 60px) 20px',
          borderBottom: '1px solid rgba(255, 153, 0, 0.2)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                fontWeight: 900,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.01em'
              }}>
                {language === 'pt' ? 'Publicados' : 'Published'}
              </h2>
              <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #ff9900, transparent)' }}></div>
            </div>

            <p style={{
              color: '#94a3b8',
              marginBottom: '40px',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              maxWidth: '800px'
            }}>
              {language === 'pt' 
                ? `${publishedBooks.length} guia${publishedBooks.length !== 1 ? 's' : ''} disponível${publishedBooks.length !== 1 ? 's' : ''} na Amazon.`
                : `${publishedBooks.length} guide${publishedBooks.length !== 1 ? 's' : ''} available on Amazon.`}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: 'clamp(16px, 4vw, 24px)',
              '@media (max-width: 640px)': {
                gridTemplateColumns: '1fr'
              }
            }}>
              {publishedBooks.map(book => (
                <PlayBookCard 
                  key={book.id} 
                  book={book} 
                  language={language}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Coming Next Section */}
        {comingBooks.length > 0 && (
          <section style={{
            padding: 'clamp(40px, 8vw, 60px) 20px',
            background: 'rgba(255, 153, 0, 0.03)',
            borderBottom: '1px solid rgba(255, 153, 0, 0.2)'
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}>
                  {language === 'pt' ? 'Em Breve' : 'Coming Next'}
                </h2>
                <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #ff9900, transparent)' }}></div>
              </div>

              <p style={{
                color: '#94a3b8',
                marginBottom: '40px',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                maxWidth: '800px'
              }}>
                {language === 'pt' 
                  ? 'Novos guias em produção. Fique atento para os próximos lançamentos.'
                  : 'New guides in production. Stay tuned for upcoming releases.'}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                gap: 'clamp(16px, 4vw, 24px)'
              }}>
                {comingBooks.map(book => (
                  <PlayBookCard 
                    key={book.id} 
                    book={book} 
                    language={language}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <section style={{
          padding: 'clamp(40px, 8vw, 60px) 20px'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              padding: 'clamp(20px, 4vw, 32px)',
              background: 'linear-gradient(135deg, rgba(255, 153, 0, 0.08) 0%, rgba(255, 153, 0, 0.04) 100%)',
              border: '1px solid rgba(255, 153, 0, 0.2)',
              borderRadius: '12px'
            }}>
              <h3 style={{
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                fontWeight: 700,
                color: '#ff9900',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0
              }}>
                {language === 'pt' ? 'Aviso' : 'Notice'}
              </h3>
              <p style={{
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                color: '#cbd5e1',
                lineHeight: 1.8,
                margin: '12px 0 0 0'
              }}>
                {disclaimer}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Play Footer - Separate from Máquina */}
      <footer style={{
        background: 'linear-gradient(135deg, #0f1419 0%, #1a202c 100%)',
        borderTop: '1px solid rgba(255, 153, 0, 0.2)',
        padding: '40px 20px 24px',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                {language === 'pt' ? '© 2026 Novaryn Books' : '© 2026 Novaryn Books'}
              </p>
            </div>
            <button 
              onClick={() => onNavigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ff9900',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
              onMouseLeave={(e) => e.currentTarget.style.gap = '8px'}
            >
              {language === 'pt' ? 'Voltar para Home' : 'Back to Home'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
