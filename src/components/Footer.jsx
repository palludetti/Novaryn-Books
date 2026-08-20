import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/${targetId}`);
    } else {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = `/${targetId}`;
      }
    }
  };

  return (
    <footer style={{
      background: '#060911',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '60px 0 30px',
      color: '#94a3b8'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', cursor: 'pointer' }} onClick={() => onNavigate ? onNavigate('/') : window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div style={{ background: '#10b981', padding: '8px', borderRadius: '8px', display: 'flex' }}>
                <TrendingUp size={20} color="#ffffff" />
              </div>
              <span className="font-display" style={{ fontSize: '1.15rem', color: '#ffffff', fontWeight: 800 }}>
                A MÁQUINA DE LUCRO DA SUA LOJA
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', maxWidth: '400px', lineHeight: 1.6 }}>
              Manual prático de gestão de margem, precificação estratégica e alavancagem de caixa para pequenos e médios varejistas no Brasil.
            </p>
          </div>

          <div>
            <h4 className="font-display" style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Links Rápidos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <a href="/#calculadora" onClick={(e) => handleLinkClick(e, '#calculadora')} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Calculadora de Lucro</a>
              <a href="/#livro" onClick={(e) => handleLinkClick(e, '#livro')} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Os 4 Pilares do Livro</a>
              <a href="/#comprar" onClick={(e) => handleLinkClick(e, '#comprar')} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Onde Comprar (Amazon/Kindle)</a>
              <a href="/#artigos" onClick={(e) => handleLinkClick(e, '#artigos')} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Artigos & Estratégias</a>
            </div>
          </div>

          <div>
            <h4 className="font-display" style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Plataformas</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <span>Amazon Brasil (Físico & Kindle)</span>
              <span>KDP Select</span>
              <span>Editora Sob Demanda Brasil</span>
            </div>
          </div>

        </div>

        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center', fontSize: '0.85rem' }}>
          <p>© {new Date().getFullYear()} A Máquina de Lucro da Sua Loja. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
