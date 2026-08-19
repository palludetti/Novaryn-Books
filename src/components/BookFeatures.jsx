import React from 'react';
import { DollarSign, ShieldAlert, Zap, ShieldCheck, Target, Award, CheckCircle2, TrendingUp } from 'lucide-react';

export default function BookFeatures() {
  const scannablePoints = [
    "Como descobrir exatamente onde a sua loja perde dinheiro todos os dias",
    "Como identificar e corrigir erros silenciosos de precificação",
    "Como reduzir desperdícios e sangrias invisíveis de caixa",
    "Como usar indicadores simples para tomar decisões sem depender do 'achismo'",
    "Como aumentar a margem de lucro real sem precisar vender mais em volume"
  ];

  const pillars = [
    {
      icon: <DollarSign size={28} color="#10b981" />,
      title: "1. Precificação Científica & Margem Real",
      desc: "Aprenda a fórmula exata para embutir custos fixos, variáveis, taxas de cartão e impostos no preço final sem ficar fora do mercado."
    },
    {
      icon: <ShieldAlert size={28} color="#f59e0b" />,
      title: "2. O Fim do Vício em Descontos",
      desc: "Entenda por que dar 10% de desconto pode exigir que você venda 40% a mais só para empatar o lucro. Crie políticas rígidas de concessão."
    },
    {
      icon: <Zap size={28} color="#38bdf8" />,
      title: "3. Alavancagem de Ticket Médio",
      desc: "Estratégias práticas de combinação de produtos (kits e combos) e treinamento de equipe para aumentar o valor gasto por cliente em até 30%."
    },
    {
      icon: <ShieldCheck size={28} color="#a78bfa" />,
      title: "4. Capital de Giro Blindado",
      desc: "Como montar uma reserva de emergência comercial e se livrar para sempre do uso nocivo de antecipação de recebíveis e juros bancários."
    }
  ];

  return (
    <section id="livro" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Scannable Checkbox Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(245, 158, 11, 0.12) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '24px',
          padding: '44px',
          marginBottom: '80px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              <Target size={14} /> Leitura Prática & Direta
            </span>
            <h2 className="font-display" style={{ fontSize: '2.4rem', color: '#ffffff' }}>
              O Que Você Aprenderá no Livro
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            {scannablePoints.map((point, i) => (
              <div 
                key={i} 
                style={{ 
                  background: 'rgba(15, 23, 42, 0.8)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '16px', 
                  padding: '20px', 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '14px' 
                }}
              >
                <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '6px', borderRadius: '50%', flexShrink: 0, marginTop: '2px' }}>
                  <CheckCircle2 size={20} color="#34d399" />
                </div>
                <span style={{ color: '#ffffff', fontSize: '1.02rem', fontWeight: 600, lineHeight: 1.5 }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars Grid */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>
            <Award size={14} /> Metodologia Novaryn
          </span>
          <h3 className="font-display" style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '16px' }}>
            Os 4 Pilares da Gestão Lucrativa
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8' }}>
            Escrito por Henrique Voss para a realidade de quem está atrás do balcão enfrentando impostos, fornecedores e concorrência no Brasil.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
          {pillars.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '32px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {item.icon}
              </div>

              <h4 className="font-display" style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '12px' }}>
                {item.title}
              </h4>

              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
