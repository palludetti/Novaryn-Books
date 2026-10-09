import React, { useState, useEffect } from 'react';
import PlayBookCard from './PlayBookCard';
import { playBooks, playComingNext, playCopy } from '../../data/playCatalog';

const T = {
  page: {
    minHeight: '100vh',
    background: '#0d1117',
    color: '#e8ecf3',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    lineHeight: 1.55,
  },
  topbar: {
    borderBottom: '1px solid #2a3341',
    padding: '14px 20px',
    background: 'rgba(13, 17, 23, 0.95)',
    position: 'sticky',
    top: 0,
    zIndex: 40,
    backdropFilter: 'blur(8px)',
  },
  topbarInner: {
    maxWidth: '1120px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  back: {
    color: '#98a3b5',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 600,
    transition: 'color 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  langGroup: {
    display: 'flex',
    border: '1px solid #2a3341',
    borderRadius: '9999px',
    overflow: 'hidden',
    flex: 'none',
  },
  langBtn: {
    appearance: 'none',
    border: 0,
    background: 'transparent',
    color: '#98a3b5',
    font: 'inherit',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s',
  },
  langBtnOn: { 
    background: '#ff9d2e', 
    color: '#1a1204' 
  },
  main: { 
    flex: 1, 
    padding: 'clamp(40px, 6vw, 72px) 20px' 
  },
  container: {
    maxWidth: '1120px',
    margin: '0 auto',
  },
  kicker: {
    fontSize: '0.75rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#98a3b5',
    margin: '0 0 10px',
    fontWeight: 600,
  },
  h1: {
    margin: 0,
    fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
    fontWeight: 800,
    color: '#e8ecf3',
  },
  mark: { color: '#ff9d2e' },
  tagline: {
    margin: '14px 0 0',
    color: '#98a3b5',
    maxWidth: '56ch',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  band: { marginTop: 'clamp(36px, 5vw, 56px)' },
  bandHead: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '14px',
    marginBottom: '22px',
  },
  bandTitle: {
    margin: 0,
    fontSize: '0.85rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    fontWeight: 700,
    color: '#e8ecf3',
  },
  rule: { flex: 1, height: '1px', background: '#2a3341' },
  count: { fontSize: '0.75rem', color: '#98a3b5', fontVariantNumeric: 'tabular-nums', fontWeight: 600 },
  grid: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
  },
  soonCard: {
    background: '#1a202c',
    border: '1px solid #2a3341',
    borderRadius: '14px',
    padding: '20px',
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
  },
  soonTile: {
    flex: 'none',
    width: '124px',
    aspectRatio: '2 / 3',
    borderRadius: '6px',
    border: '1px dashed #2a3341',
    background: '#12161f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3b4657',
    fontSize: '1.8rem',
    fontWeight: 800,
  },
  soonTitle: { 
    margin: 0, 
    fontSize: '1.1rem', 
    fontWeight: 700, 
    color: '#e8ecf3',
    lineHeight: 1.3
  },
  soonSub: {
    margin: '4px 0 0',
    fontSize: '0.8rem',
    color: '#98a3b5',
  },
  chip: {
    display: 'inline-block',
    marginTop: '12px',
    padding: '4px 11px',
    borderRadius: '9999px',
    background: 'rgba(255, 157, 46, 0.12)',
    color: '#ff9d2e',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  foot: {
    marginTop: 'clamp(36px, 5vw, 52px)',
    paddingTop: '24px',
    borderTop: '1px solid #2a3341',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px 28px',
  },
  note: { 
    margin: 0, 
    fontSize: '0.8rem', 
    color: '#98a3b5', 
    maxWidth: '64ch', 
    lineHeight: 1.6 
  },
};

export default function PlayPage({ onNavigate }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('lang');
      if (param === 'pt' || param === 'pt-BR') return 'pt';
    }
    return 'en';
  });
  const copy = playCopy[lang];

  // Sincroniza idioma do documento, título e meta tags na troca de idioma
  useEffect(() => {
    const prevLang = document.documentElement.getAttribute('lang');
    const prevTitle = document.title;
    document.documentElement.setAttribute('lang', copy.htmlLang);
    document.title = copy.seoTitle;

    // Atualiza meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', copy.seoDescription);
    }

    return () => {
      if (prevLang) document.documentElement.setAttribute('lang', prevLang);
      document.title = prevTitle;
    };
  }, [copy.htmlLang, copy.seoTitle, copy.seoDescription]);

  const handleBack = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div style={T.page}>
      <header style={T.topbar}>
        <div style={T.topbarInner}>
          <a href="/" onClick={handleBack} style={T.back}>
            {copy.backToHome}
          </a>
          <div style={T.langGroup} role="group" aria-label="Language selection">
            {['en', 'pt'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                style={lang === code ? { ...T.langBtn, ...T.langBtnOn } : T.langBtn}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={T.main}>
        <div style={T.container}>
          <header>
            <p style={T.kicker}>{copy.kicker}</p>
            <h1 className="font-display" style={T.h1}>
              NOVARYN <span style={T.mark}>PLAY</span>
            </h1>
            <p style={T.tagline}>{copy.tagline}</p>
          </header>

          <section style={T.band} aria-labelledby="published-heading">
            <div style={T.bandHead}>
              <h2 id="published-heading" style={T.bandTitle}>{copy.published}</h2>
              <span style={T.rule} />
              <span style={T.count}>{String(playBooks.length).padStart(2, '0')}</span>
            </div>
            <div style={T.grid}>
              {playBooks.map((book) => (
                <PlayBookCard key={book.id} book={book} lang={lang} copy={copy} />
              ))}
            </div>
          </section>

          <section style={T.band} aria-labelledby="coming-heading">
            <div style={T.bandHead}>
              <h2 id="coming-heading" style={T.bandTitle}>{copy.comingNext}</h2>
              <span style={T.rule} />
              <span style={T.count}>{String(playComingNext.length).padStart(2, '0')}</span>
            </div>
            <div style={T.grid}>
              {playComingNext.map((item) => (
                <article key={item.id} style={T.soonCard} className="play-card">
                  <div style={T.soonTile} aria-hidden="true">
                    {item.mark}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 style={T.soonTitle}>{item.title}</h3>
                    {item.subtitle ? <p style={T.soonSub}>{item.subtitle}</p> : null}
                    <span style={T.chip}>{copy.inProduction}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer style={T.foot}>
            <p style={T.note}>{copy.disclaimer}</p>
            <p style={T.note}>{copy.noDownloads}</p>
          </footer>
        </div>
      </main>

      <style>{`
        @media (max-width: 520px) {
          .play-card { 
            flex-direction: column !important; 
            align-items: flex-start !important; 
            gap: 14px !important; 
          }
        }
      `}</style>
    </div>
  );
}
