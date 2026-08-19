import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertTriangle, ArrowUpRight, CheckCircle2, Download, Sparkles, ArrowDown } from 'lucide-react';

export default function ProfitCalculator({ onOpenLeadModalWithData }) {
  const [revenue, setRevenue] = useState(50000);
  const [fixedCosts, setFixedCosts] = useState(15000);
  const [grossMargin, setGrossMargin] = useState(40);
  const [avgTicket, setAvgTicket] = useState(120);

  // Current Math
  const currentGrossProfit = revenue * (grossMargin / 100);
  const currentNetProfit = currentGrossProfit - fixedCosts;
  const currentNetMargin = revenue > 0 ? (currentNetProfit / revenue) * 100 : 0;

  // Optimized Math (Applying 3 Core Book Levers)
  const optRevenue = revenue * 1.08;
  const optGrossMargin = Math.min(grossMargin + 5, 85);
  const optFixedCosts = fixedCosts * 0.92;
  const optGrossProfit = optRevenue * (optGrossMargin / 100);
  const optNetProfit = optGrossProfit - optFixedCosts;
  const optNetMargin = optRevenue > 0 ? (optNetProfit / optRevenue) * 100 : 0;

  const monthlyExtraProfit = optNetProfit - currentNetProfit;
  const yearlyExtraProfit = monthlyExtraProfit * 12;

  const handleCaptureClick = () => {
    onOpenLeadModalWithData({
      revenue,
      fixedCosts,
      grossMargin,
      avgTicket,
      currentNetProfit,
      optNetProfit,
      monthlyExtraProfit,
      yearlyExtraProfit
    });
  };

  return (
    <section id="calculadora" style={{ padding: '90px 0', background: 'rgba(15, 23, 42, 0.5)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>
            <Sparkles size={14} /> Passo 1: Diagnóstico Instantâneo
          </span>
          <h2 className="font-display" style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '16px' }}>
            Calculadora de Sangria de Lucro
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
            Mova os valores abaixo para simular quanto a sua loja está deixando na mesa todo mês e descubra o seu potencial de lucro oculto.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="glass-card" style={{ padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          
          {/* Inputs Column */}
          <div>
            <h3 className="font-display" style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calculator color="#10b981" size={24} /> 1. Insira os Dados da Sua Loja
            </h3>

            {/* Input 1: Revenue */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Faturamento Mensal (R$)</label>
                <span style={{ color: '#10b981', fontWeight: 700 }}>R$ {revenue.toLocaleString('pt-BR')}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="500000" 
                step="5000" 
                value={revenue} 
                onChange={(e) => setRevenue(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
              />
              <input 
                type="number" 
                className="form-input" 
                value={revenue} 
                onChange={(e) => setRevenue(Number(e.target.value))}
              />
            </div>

            {/* Input 2: Fixed Costs */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Custos Fixos Mensais (R$) (Aluguel, Folha, Impostos)</label>
                <span style={{ color: '#f59e0b', fontWeight: 700 }}>R$ {fixedCosts.toLocaleString('pt-BR')}</span>
              </div>
              <input 
                type="range" 
                min="2000" 
                max="200000" 
                step="1000" 
                value={fixedCosts} 
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
              />
              <input 
                type="number" 
                className="form-input" 
                value={fixedCosts} 
                onChange={(e) => setFixedCosts(Number(e.target.value))}
              />
            </div>

            {/* Input 3: Gross Margin */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Margem Bruta Média (%)</label>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>{grossMargin}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="80" 
                step="1" 
                value={grossMargin} 
                onChange={(e) => setGrossMargin(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
            </div>

            {/* Input 4: Ticket Avg */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Ticket Médio por Venda (R$)</label>
                <span style={{ color: '#a78bfa', fontWeight: 700 }}>R$ {avgTicket}</span>
              </div>
              <input 
                type="number" 
                className="form-input" 
                value={avgTicket} 
                onChange={(e) => setAvgTicket(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Results Column */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp color="#f59e0b" size={24} /> 2. O Seu Potencial de Lucro
              </h3>

              {/* Current Net Profit Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Lucro Líquido Atual Estimado
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: currentNetProfit < 0 ? '#ef4444' : '#e2e8f0', marginTop: '4px' }}>
                  R$ {currentNetProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#94a3b8', marginLeft: '10px' }}>
                    ({currentNetMargin.toFixed(1)}% do faturamento)
                  </span>
                </div>
              </div>

              {/* Optimized Net Profit Card (Gold Glow) */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.15)',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Lucro com o Método do Livro
                  </div>
                  <span className="badge badge-emerald" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>+ {((optNetProfit - currentNetProfit) / (Math.abs(currentNetProfit) || 1) * 100).toFixed(0)}% de Lucro</span>
                </div>

                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', marginTop: '8px' }}>
                  R$ {optNetProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#34d399', marginLeft: '10px' }}>
                    / mês
                  </span>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed rgba(255, 255, 255, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>Recuperação de Lucro Anual:</span>
                  <span className="gradient-text-gold" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                    + R$ {yearlyExtraProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Lead Gate Action */}
            <div style={{ textAlign: 'center' }}>
              <button 
                className="btn-gold" 
                onClick={handleCaptureClick}
                style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '1.05rem' }}
              >
                <Download size={20} /> Receber Diagnóstico + Prefácio e Cap. 1 Grátis
              </button>
            </div>

          </div>

        </div>

        {/* Funnel Bridge Banner */}
        <div style={{
          marginTop: '60px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '20px',
          padding: '32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <h3 className="font-display" style={{ fontSize: '1.6rem', color: '#ffffff' }}>
            Quer aprender a colocar essa otimização em prática no seu negócio?
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '700px' }}>
            Conheça o método completo desenvolvido por <strong>Henrique Voss</strong> para fechar sangrias de caixa, ajustar precificação e recuperar a margem de lucro da sua loja.
          </p>
          <a href="#livro" className="btn-secondary" style={{ marginTop: '8px' }}>
            Conhecer o Livro e o Autor <ArrowDown size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}
