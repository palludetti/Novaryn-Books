import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProfitCalculator from './components/ProfitCalculator';
import AuthorSection from './components/AuthorSection';
import BookFeatures from './components/BookFeatures';
import BuySection from './components/BuySection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';
import ArticleNotFound from './components/ArticleNotFound';
import LeadMagnetModal from './components/LeadMagnetModal';
import AdminLeadsModal from './components/AdminLeadsModal';
import { getArticleBySlug } from './data/articles';
import './styles/theme.css';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalData, setLeadModalData] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle hash scrolling when landing on home with a hash
  useEffect(() => {
    if (currentPath === '/' && window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [currentPath]);

  const handleNavigate = (path) => {
    if (path.startsWith('/#')) {
      const hash = path.replace('/', '');
      if (currentPath === '/') {
        window.history.pushState(null, '', hash);
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.history.pushState(null, '', path);
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
      return;
    }

    if (path === '/') {
      window.history.pushState(null, '', '/');
      setCurrentPath('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenLeadModalWithData = (data) => {
    setLeadModalData(data);
    setIsLeadModalOpen(true);
  };

  // Route Dispatching
  if (currentPath.startsWith('/artigos/')) {
    const slug = currentPath.replace('/artigos/', '').split('?')[0].split('#')[0].replace(/\/$/, '');
    const article = getArticleBySlug(slug);

    if (article) {
      return (
        <ArticlePage 
          article={article}
          onNavigate={handleNavigate}
          onOpenLeadModal={() => { setLeadModalData(null); setIsLeadModalOpen(true); }}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />
      );
    }

    return (
      <ArticleNotFound 
        onNavigate={handleNavigate}
        onOpenLeadModal={() => { setLeadModalData(null); setIsLeadModalOpen(true); }}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />
    );
  }

  // Home Page
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        onOpenLeadModal={() => { setLeadModalData(null); setIsLeadModalOpen(true); }}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onNavigate={handleNavigate}
      />

      <main style={{ flex: 1 }}>
        {/* 1. Hero */}
        <Hero 
          onOpenLeadModal={() => { setLeadModalData(null); setIsLeadModalOpen(true); }}
        />

        {/* 2. Value First: Calculadora */}
        <ProfitCalculator 
          onOpenLeadModalWithData={handleOpenLeadModalWithData}
        />

        {/* 3. Credibility: Bio do Autor Henrique Voss */}
        <AuthorSection />

        {/* 4. Solution: O que você aprenderá + Os 4 Pilares */}
        <BookFeatures />

        {/* 5. Offer: Onde Comprar (UICLAP / Kindle) */}
        <BuySection />

        {/* 6. Content: Artigos SEO */}
        <BlogSection 
          onNavigate={handleNavigate}
        />
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <LeadMagnetModal 
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialData={leadModalData}
      />

      <AdminLeadsModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}
