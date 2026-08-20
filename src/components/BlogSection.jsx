import React from 'react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { articles } from '../data/articles';

export default function BlogSection({ onNavigate }) {
  const handleArticleClick = (e, slug) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/artigos/${slug}`);
    } else {
      window.location.href = `/artigos/${slug}`;
    }
  };

  return (
    <section id="artigos" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '16px' }}>
            <BookOpen size={14} /> Trechos & Estratégias do Livro
          </span>
          <h2 className="font-display blog-section-title" style={{ color: '#ffffff', marginBottom: '16px' }}>
            Conhecimento Prático por Henrique Voss
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
            Artigos e pílulas de conhecimento extraídos dos conceitos centrais da obra.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '30px' }}>
          {articles.map((art) => (
            <div key={art.id} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{art.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {art.readTime}</span>
                </div>

                <h3 className="font-display" style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '12px', lineHeight: 1.4, minHeight: '3.5rem' }}>
                  {art.title}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  {art.excerpt}
                </p>
              </div>

              <a 
                href={`/artigos/${art.slug}`}
                onClick={(e) => handleArticleClick(e, art.slug)}
                className="btn-secondary" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                Ler Artigo Completo <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
