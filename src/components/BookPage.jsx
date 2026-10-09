import React, { useEffect } from 'react';
import { ArrowLeft, Check, ExternalLink, BookOpen, Users } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import AuthorBooks from './AuthorBooks';
import { author } from '../data/books';

export default function BookPage({ book, onNavigate, onOpenLeadModal, onOpenAdminModal }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (book) document.title = `${book.seoTitle || book.title} | ${author.name}`;
  }, [book]);

  if (!book) return null;

  const go = (e, path) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      <Header onOpenLeadModal={onOpenLeadModal} onOpenAdminModal={onOpenAdminModal} onNavigate={onNavigate} />

      <main style={{ flex: 1, padding: '48px 0 90px' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ marginBottom: '28px' }}>
            <a
              href={`/${author.slug}`}
              onClick={(e) => go(e, `/${author.slug}`)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}
            >
              <ArrowLeft size={16} /> Livros de {author.name}
            </a>
          </div>

          {/* Topo: capa + título + compra */}
          <section className="glass-card book-hero">
            <img src={book.cover} alt={`Capa do livro ${book.title}`} className="book-hero-cover" />
            <div style={{ minWidth: 0 }}>
              <span className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                <BookOpen size={14} /> Livro de {author.name}
              </span>
              <h1 className="font-display article-page-title" style={{ color: '#ffffff', marginBottom: '12px' }}>
                {book.title}
              </h1>
              <p style={{ color: '#34d399', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '20px' }}>
                {book.subtitle}
              </p>
              <p style={{ color: '#fbbf24', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '28px' }}>
                “{book.tagline}”
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {book.formats.map((f) => (
                  <a
                    key={f.href}
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={f.primary ? 'btn-gold' : 'btn-secondary'}
                    style={{ padding: '14px 22px', fontSize: '0.95rem' }}
                  >
                    {f.label} <ExternalLink size={16} />
                  </a>
                ))}
              </div>
              {book.formats.some((f) => f.note) && (
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '12px' }}>
                  {book.formats.filter((f) => f.note).map((f) => f.note).join(' · ')}
                </p>
              )}
            </div>
          </section>

          {/* Sobre o livro */}
          <section className="glass-card article-card-wrapper" style={{ marginTop: '32px' }}>
            <h2 className="font-display" style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '16px' }}>
              Sobre o livro
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '16px' }}>{book.description}</p>
            {(book.intro || []).map((p, i) => (
              <p key={i} style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '16px' }}>{p}</p>
            ))}

            {book.learn && (
              <>
                <h2 className="font-display" style={{ color: '#ffffff', fontSize: '1.4rem', margin: '32px 0 16px' }}>
                  O que você vai aprender
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {book.learn.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.6 }}>
                      <Check size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {book.forWho && (
              <>
                <h2 className="font-display" style={{ color: '#ffffff', fontSize: '1.4rem', margin: '32px 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={20} color="#fbbf24" /> Para quem é
                </h2>
                <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.6 }}>
                  {book.forWho.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                {book.notFor && (
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '16px', fontStyle: 'italic' }}>{book.notFor}</p>
                )}
              </>
            )}

            <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h2 className="font-display" style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '10px' }}>Sobre o autor</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.75, marginBottom: '14px' }}>{author.shortBio}</p>
              <a href={`/${author.slug}`} onClick={(e) => go(e, `/${author.slug}`)} style={{ color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}>
                Conheça {author.name} e os outros livros →
              </a>
            </div>
          </section>

          <div style={{ marginTop: '48px' }}>
            <AuthorBooks
              compact
              onNavigate={onNavigate}
              excludeSlug={book.slug}
              title="Do mesmo autor"
            />
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
