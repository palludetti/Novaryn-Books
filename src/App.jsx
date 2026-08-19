import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProfitCalculator from './components/ProfitCalculator';
import AuthorSection from './components/AuthorSection';
import BookFeatures from './components/BookFeatures';
import BuySection from './components/BuySection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import LeadMagnetModal from './components/LeadMagnetModal';
import AdminLeadsModal from './components/AdminLeadsModal';
import './styles/theme.css';

export default function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalData, setLeadModalData] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleOpenLeadModalWithData = (data) => {
    setLeadModalData(data);
    setIsLeadModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        onOpenLeadModal={() => { setLeadModalData(null); setIsLeadModalOpen(true); }}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
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
        <BlogSection />
      </main>

      <Footer />

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
