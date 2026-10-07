import React from 'react';
import { resolveEdition } from '../../data/playCatalog';
import { trackAmazonClick } from '../../utils/tracking';

const T = {
  card: {
    background: '#1a202c',
    border: '1px solid #2a3341',
    borderRadius: '14px',
    padding: '20px',
    display: 'flex',
    gap: '18px',
    alignItems: 'flex-start',
    transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
  },
  cover: {
    flex: 'none',
    width: '124px',
    borderRadius: '6px',
    overflow: 'hidden',
    background: '#12161f',
    boxShadow: '0 8px 22px rgba(0, 0, 0, 0.45)',
  },
  coverImg: {
    width: '100%',
    height: 'auto',
    aspectRatio: '2 / 3',
    objectFit: 'cover',
    display: 'block',
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
    color: '#e8ecf3',
  },
  subtitle: { 
    margin: '5px 0 0', 
    fontSize: '0.85rem', 
    color: '#98a3b5',
    fontWeight: 500,
    lineHeight: 1.4
  },
  desc: { 
    margin: '12px 0 0', 
    fontSize: '0.9rem', 
    color: '#98a3b5', 
    lineHeight: 1.55 
  },
  buys: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '8px', 
    marginTop: '16px' 
  },
  btnBase: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    borderRadius: '9999px',
    padding: '8px 16px',
    fontSize: '0.8rem',
    fontWeight: 700,
    textDecoration: 'none',
    border: '1px solid #2a3341',
    color: '#e8ecf3',
    background: 'transparent',
    transition: 'background 0.15s, border-color 0.15s, color 0.15s',
  },
  btnPrimary: {
    background: '#ff9d2e',
    borderColor: '#ff9d2e',
    color: '#1a1204',
  },
  soon: {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '9999px',
    padding: '8px 15px',
    fontSize: '0.8rem',
    fontWeight: 600,
    border: '1px dashed #2a3341',
    color: '#6b7789',
    background: 'transparent',
    cursor: 'default',
  },
  flag: { 
    fontSize: '0.7rem', 
    opacity: 0.8, 
    letterSpacing: '0.06em',
    fontWeight: 800
  },
  badges: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '6px', 
    marginTop: '10px' 
  },
  badge: {
    display: 'inline-block',
    padding: '3px 9px',
    borderRadius: '9999px',
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  badgeKu: { 
    background: 'rgba(255, 157, 46, 0.15)', 
    color: '#ff9d2e',
    border: '1px solid rgba(255, 157, 46, 0.3)' 
  },
  badgeLang: { 
    background: 'rgba(152, 163, 181, 0.12)', 
    color: '#98a3b5',
    border: '1px solid rgba(152, 163, 181, 0.25)' 
  },
};

function BuyLink({ href, label, flag, primary, bookId, lang, format }) {
  if (!href) return null;

  const handleClick = () => {
    trackAmazonClick({
      bookId,
      lang,
      format,
      store: flag,
      href,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      style={primary ? { ...T.btnBase, ...T.btnPrimary } : T.btnBase}
      aria-label={`${label} (${flag}) - ${format}`}
    >
      {label}
      {flag ? <span style={T.flag}>{flag}</span> : null}
    </a>
  );
}

export default function PlayBookCard({ book, lang, copy }) {
  const { edition, fallback } = resolveEdition(book, lang);
  const { links } = edition;

  // Ordem de destaque dos botões: BR (se houver) -> US -> Impresso
  const order = [
    { key: 'br', href: links.br, label: copy.buyAmazon, flag: 'BR', format: 'ebook' },
    { key: 'us', href: links.us, label: copy.buyAmazon, flag: 'US', format: 'ebook' },
    { key: 'print', href: links.print, label: copy.buyPaperback, flag: 'US', format: 'paperback' },
  ];
  const available = order.filter((o) => o.href);

  // Exibe "Amazon Brasil — em breve" apenas se não houver link BR disponível
  const showBrSoon = !links.br;

  // Descrição descritiva da imagem para acessibilidade
  const altText = lang === 'pt'
    ? `Capa da edição ${edition.subtitle} de ${book.title}, por Adrian Vossell`
    : `Cover of ${book.title} — ${edition.subtitle} by Adrian Vossell`;

  return (
    <article style={T.card} className="play-card">
      <div style={T.cover}>
        <img
          src={edition.cover}
          alt={altText}
          width="848"
          height="1264"
          loading="lazy"
          decoding="async"
          style={T.coverImg}
          onError={(e) => {
            // Em caso de falha de carregamento, evita ícone quebrado
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div style={{ minWidth: 0, flex: 1 }}>
        <h3 style={T.title}>{book.title}</h3>
        <p style={T.subtitle}>
          {edition.subtitle} — Adrian Vossell
        </p>

        <div style={T.badges}>
          {edition.kindleUnlimited ? (
            <span style={{ ...T.badge, ...T.badgeKu }}>{copy.ku}</span>
          ) : null}
          {fallback ? (
            <span style={{ ...T.badge, ...T.badgeLang }}>{copy.englishEdition}</span>
          ) : null}
        </div>

        <p style={T.desc}>{book.description[lang]}</p>

        <div style={T.buys}>
          {available.map((o, i) => (
            <BuyLink
              key={o.key}
              href={o.href}
              label={o.label}
              flag={o.flag}
              primary={i === 0}
              bookId={book.id}
              lang={lang}
              format={o.format}
            />
          ))}
          {showBrSoon ? <span style={T.soon}>{copy.brSoon}</span> : null}
        </div>
      </div>
    </article>
  );
}
