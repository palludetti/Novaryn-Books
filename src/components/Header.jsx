import React, { useState } from 'react';
import { TrendingUp, Lock, Gift, Menu, X } from 'lucide-react';

export default function Header({ onOpenLeadModal, onOpenAdminModal }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(9, 13, 22, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '14px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        
        {/* Logo */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} 
          onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)'
          }}>
            <TrendingUp size={20} color="#ffffff" />
          </div>
          <div>
            <div className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
              A MÁQUINA DE LUCRO
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.5px' }}>
              DA SUA LOJA
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-desktop-nav">
          <a href="#calculadora" onClick={(e) => handleNavClick(e, '#calculadora')} style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}>
            Calculadora de Lucro
          </a>
          <a href="#livro" onClick={(e) => handleNavClick(e, '#livro')} style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}>
            Sobre o Livro & Autor
          </a>
          <a href="#comprar" onClick={(e) => handleNavClick(e, '#comprar')} style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}>
            Onde Comprar
          </a>
          <a href="#artigos" onClick={(e) => handleNavClick(e, '#artigos')} style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}>
            Artigos SEO
          </a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="header-desktop-actions">
          <button className="btn-primary" onClick={onOpenLeadModal} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            <Gift size={16} /> Kit Gratuito (3 em 1)
          </button>
          
          <button 
            onClick={onOpenAdminModal}
            title="Painel de Leads do Autor"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '10px',
              borderRadius: '50%',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <Lock size={16} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="header-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="header-mobile-drawer">
          <a href="#calculadora" onClick={(e) => handleNavClick(e, '#calculadora')} className="header-mobile-link">
            Calculadora de Lucro
          </a>
          <a href="#livro" onClick={(e) => handleNavClick(e, '#livro')} className="header-mobile-link">
            Sobre o Livro & Autor
          </a>
          <a href="#comprar" onClick={(e) => handleNavClick(e, '#comprar')} className="header-mobile-link">
            Onde Comprar
          </a>
          <a href="#artigos" onClick={(e) => handleNavClick(e, '#artigos')} className="header-mobile-link">
            Artigos SEO
          </a>
          
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              className="btn-primary" 
              onClick={() => { setIsMobileMenuOpen(false); onOpenLeadModal(); }}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}
            >
              <Gift size={16} /> Kit Gratuito (3 em 1)
            </button>
            
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onOpenAdminModal(); }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Lock size={14} /> Painel de Leads do Autor
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
