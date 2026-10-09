import React, { useEffect } from 'react';
import { ArrowLeft, UserCheck } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import AuthorBooks from './AuthorBooks';
import { author } from '../data/books';

export default function AuthorPage({ onNavigate, onOpenLeadModal, onOpenAdminModal }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${author.name} — livros sobre lucro, varejo e negócios`;
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      <Header onOpenLeadModal={onOpenLeadModal} onOpenAdminModal={onOpenAdminModal} onNavigate={onNavigate} />

      <main style={{ flex: 1, padding: '48px 0 40px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ marginBottom: '28px' }}>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}
            >
              <ArrowLeft size={16} /> Voltar para o início
            </a>
          </div>

          <section className="glass-card article-card-wrapper author-page-head">
            <div className="author-page-avatar">
              <UserCheck size={52} color="#fbbf24" />
            </div>
            <div style={{ minWidth: 0 }}>
              <h1 className="font-display article-page-title" style={{ color: '#ffffff', marginBottom: '6px' }}>
                {author.name}
              </h1>
              <p style={{ color: '#34d399', fontWeight: 700, fontSize: '0.95rem', marginBottom: '20px' }}>{author.role}</p>
              {author.bio.map((p, i) => (
                <p key={i} style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '14px' }}>{p}</p>
              ))}
            </div>
          </section>
        </div>

        <AuthorBooks onNavigate={onNavigate} />
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
