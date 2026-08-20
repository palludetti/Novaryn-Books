import React, { useEffect } from 'react';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function ArticleNotFound({ onNavigate, onOpenLeadModal, onOpenAdminModal }) {
  useEffect(() => {
    document.title = "Artigo Não Encontrado | A Máquina de Lucro da Sua Loja";
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      <Header 
        onOpenLeadModal={onOpenLeadModal} 
        onOpenAdminModal={onOpenAdminModal}
        onNavigate={onNavigate}
      />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '48px 36px', textAlign: 'center' }}>
          
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <AlertCircle size={32} color="#ef4444" />
          </div>

          <h1 className="font-display" style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '16px' }}>
            Artigo não encontrado
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
            O artigo que você está procurando não existe, foi movido ou o endereço foi digitado incorretamente.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a 
              href="/#artigos" 
              onClick={(e) => { e.preventDefault(); onNavigate('/#artigos'); }}
              className="btn-primary"
            >
              <ArrowLeft size={16} /> Ver Artigos Disponíveis
            </a>

            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
              className="btn-secondary"
            >
              <Home size={16} /> Página Inicial
            </a>
          </div>

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
