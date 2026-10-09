import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { books, author } from '../data/books';

// Grade com os livros de Henrique Voss.
// excludeSlug: esconde um livro (ex.: na página dele mesmo).
// compact: versão menor para o fim dos artigos.
export default function AuthorBooks({ onNavigate, excludeSlug, compact = false, title, intro }) {
  const list = books.filter((b) => b.slug !== excludeSlug);
  if (list.length === 0) return null;

  const go = (e, path) => {
    if (!onNavigate) return;
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <section
      id={compact ? undefined : 'livros-do-autor'}
      style={{ padding: compact ? '0' : '80px 0', background: compact ? 'transparent' : 'rgba(15, 23, 42, 0.35)' }}
    >
      <div className={compact ? undefined : 'container'}>
        <div style={{ textAlign: compact ? 'left' : 'center', maxWidth: '720px', margin: compact ? '0 0 24px' : '0 auto 48px' }}>
          {!compact && (
            <span className="badge badge-gold" style={{ marginBottom: '16px' }}>
              <BookOpen size={14} /> Livros do autor
            </span>
          )}
          <h2
            className="font-display"
            style={{ fontSize: compact ? '1.35rem' : '2.2rem', color: '#ffffff', marginBottom: '12px' }}
          >
            {title || `Livros de ${author.name}`}
          </h2>
          {(intro || !compact) && (
            <p style={{ color: '#94a3b8', fontSize: compact ? '0.95rem' : '1.05rem', lineHeight: 1.7 }}>
              {intro || 'Dois livros, a mesma pergunta de fundo: quanto sobra de verdade depois que a conta fecha.'}
            </p>
          )}
        </div>

        <div
          className="author-books-grid"
          style={list.length === 1 && !compact ? { maxWidth: '640px', margin: '0 auto' } : undefined}
        >
          {list.map((book) => (
            <article key={book.slug} className="glass-card author-book-card">
              <a href={book.pagePath} onClick={(e) => go(e, book.pagePath)} className="author-book-cover-link">
                <img
                  src={book.cover}
                  alt={`Capa do livro ${book.title}`}
                  loading="lazy"
                  className="author-book-cover"
                />
              </a>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0 }}>
                <h3 className="font-display" style={{ color: '#ffffff', fontSize: '1.2rem', lineHeight: 1.3 }}>
                  {book.title}
                </h3>
                <p style={{ color: '#34d399', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.45 }}>
                  {book.subtitle}
                </p>
                {!compact && (
                  <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.65 }}>{book.tagline}</p>
                )}
                <a
                  href={book.pagePath}
                  onClick={(e) => go(e, book.pagePath)}
                  className="btn-secondary"
                  style={{ alignSelf: 'flex-start', marginTop: '4px', padding: '10px 18px', fontSize: '0.9rem' }}
                >
                  Conhecer o livro <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
