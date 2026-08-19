import React from 'react';
import { UserCheck, Award, ShieldCheck, BookOpen } from 'lucide-react';

export default function AuthorSection() {
  return (
    <section style={{ padding: '70px 0', background: 'rgba(15, 23, 42, 0.6)' }}>
      <div className="container">
        <div className="glass-card" style={{ padding: '48px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'center' }}>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
              padding: '4px',
              margin: '0 auto 20px',
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.25)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <UserCheck size={56} color="#fbbf24" />
              </div>
            </div>
            <h3 className="font-display" style={{ fontSize: '1.4rem', color: '#ffffff' }}>Henrique Voss</h3>
            <span style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 700 }}>Especialista em Gestão & Varejo</span>
          </div>

          <div>
            <span className="badge badge-gold" style={{ marginBottom: '16px' }}>
              <Award size={14} /> Sobre o Autor
            </span>
            <h2 className="font-display" style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '16px' }}>
              Conheça Henrique Voss
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong>Henrique Voss</strong> reúne anos de experiência em gestão empresarial, processos e varejo para apresentar um método prático e objetivo focado em aumentar a lucratividade das empresas.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Sua obra visa retirar o empresário da armadilha da rotina operacional exaustiva e ensiná-lo a tomar decisões estratégicas baseadas em indicadores reais de margem, precificação correta e fluxo de caixa sustentável.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
