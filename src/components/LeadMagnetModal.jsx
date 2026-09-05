import React, { useState } from 'react';
import { X, CheckCircle, BookOpen, Download, Mail, User, Phone, Sparkles, ChevronRight, ShoppingCart, CheckSquare, FileText, BarChart3 } from 'lucide-react';

// Endpoint do Formspree do Caio — cada envio do formulário chega por e-mail.
const LEAD_WEBHOOK_URL = 'https://formspree.io/f/mjyvolrl';

export default function LeadMagnetModal({ isOpen, onClose, initialData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('prefacio'); // 'prefacio' | 'cap1' | 'checklist'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return;

    const newLead = {
      id: Date.now(),
      name,
      email,
      phone,
      date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
      calculatorData: initialData || null
    };

    // Save lead to LocalStorage (mantido como cópia local/backup instantâneo)
    const existingLeads = JSON.parse(localStorage.getItem('maquina_lucro_leads') || '[]');
    localStorage.setItem('maquina_lucro_leads', JSON.stringify([newLead, ...existingLeads]));

    // Envia o lead para o Caio de verdade (e-mail/planilha), fora do navegador do visitante.
    // Sem isso, o lead ficava só salvo no computador de quem preencheu o formulário.
    if (LEAD_WEBHOOK_URL && LEAD_WEBHOOK_URL !== 'COLOQUE_AQUI_SEU_ENDPOINT') {
      fetch(LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      }).catch(() => {
        // Falha de rede não deve travar a experiência do visitante;
        // o lead continua garantido no localStorage como fallback.
      });
    }

    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '850px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 10
          }}
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
                <Sparkles size={14} /> Kit Gratuito do Lojista
              </span>
              <h2 className="font-display" style={{ fontSize: '2.1rem', color: '#ffffff', marginBottom: '10px' }}>
                Receba o Kit de Alavancagem de Lucro
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                Digite seu e-mail para destravar imediatamente os 3 recursos gratuitos no seu navegador:
              </p>
            </div>

            {/* Bundle Benefits Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <BarChart3 size={24} color="#10b981" style={{ margin: '0 auto 8px' }} />
                <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.85rem' }}>1. Calculadora de Lucro</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>Diagnóstico personalizado</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <BookOpen size={24} color="#f59e0b" style={{ margin: '0 auto 8px' }} />
                <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.85rem' }}>2. Prefácio + Cap. 1</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>Leitura na tela liberada</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <CheckSquare size={24} color="#38bdf8" style={{ margin: '0 auto 8px' }} />
                <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.85rem' }}>3. Checklist de Gestão</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>Passo a passo prático</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '550px', margin: '0 auto' }}>
              <div className="form-group">
                <label className="form-label">Seu Nome Completo</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    required 
                    placeholder="Ex: Roberto Silva" 
                    className="form-input" 
                    style={{ paddingLeft: '44px' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Seu Melhor E-mail (onde você quer receber as dicas)</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="email" 
                    required 
                    placeholder="exemplo@sualoja.com.br" 
                    className="form-input" 
                    style={{ paddingLeft: '44px' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp (Opcional)</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="tel" 
                    placeholder="(11) 99999-9999" 
                    className="form-input" 
                    style={{ paddingLeft: '44px' }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <button className="btn-gold" type="submit" style={{ width: '100%', justifyContent: 'center', padding: '16px', marginTop: '12px', fontSize: '1.05rem' }}>
                <Sparkles size={20} /> Destravar Meu Kit Gratuito Agora
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div>
                <span className="badge badge-emerald" style={{ padding: '4px 10px', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <CheckCircle size={12} /> Kit Destravado para {name}
                </span>
                <h3 className="font-display" style={{ color: '#ffffff', fontSize: '1.4rem' }}>
                  A Máquina de Lucro da Sua Loja — Henrique Voss
                </h3>
              </div>

              {/* Navigation Tabs */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setActiveTab('prefacio')}
                  style={{
                    background: activeTab === 'prefacio' ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                    color: activeTab === 'prefacio' ? '#000000' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Prefácio
                </button>
                <button 
                  onClick={() => setActiveTab('cap1')}
                  style={{
                    background: activeTab === 'cap1' ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                    color: activeTab === 'cap1' ? '#000000' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Capítulo 1
                </button>
                <button 
                  onClick={() => setActiveTab('checklist')}
                  style={{
                    background: activeTab === 'checklist' ? '#10b981' : 'rgba(255, 255, 255, 0.05)',
                    color: activeTab === 'checklist' ? '#ffffff' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Checklist
                </button>
              </div>
            </div>

            {/* Reader Content Box */}
            <div style={{
              background: '#090d16',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '32px',
              maxHeight: '480px',
              overflowY: 'auto',
              fontSize: '1.02rem',
              lineHeight: 1.85,
              color: '#e2e8f0',
              fontFamily: activeTab === 'checklist' ? 'sans-serif' : 'serif'
            }}>
              {activeTab === 'prefacio' ? (
                <div>
                  <h2 className="font-display" style={{ color: '#f59e0b', fontSize: '1.8rem', textAlign: 'center', marginBottom: '24px', fontFamily: 'sans-serif' }}>
                    Prefácio
                  </h2>
                  <p style={{ marginBottom: '18px' }}>
                    Há alguns anos, entrei em uma loja logo no início da manhã. A porta de aço ainda estava subindo quando o proprietário me cumprimentou com um sorriso cansado. Enquanto organizava algumas peças na vitrine, comentou quase sem pensar:
                  </p>
                  <blockquote style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '16px', margin: '20px 0', fontStyle: 'italic', color: '#fbbf24' }}>
                    — Se eu conseguisse vender um pouco mais, todos os meus problemas estariam resolvidos.
                  </blockquote>
                  <p style={{ marginBottom: '18px' }}>
                    Não era a primeira vez que eu ouvia aquela frase. Na verdade, já a tinha escutado dezenas de vezes, dita por comerciantes de segmentos completamente diferentes. Mudavam os produtos, a cidade e o tamanho da empresa. A preocupação era sempre parecida.
                  </p>
                  <p style={{ marginBottom: '18px' }}>
                    Foi então que parei de perguntar como uma loja poderia vender mais. Passei a perguntar por que algumas lojas conseguem transformar vendas em lucro enquanto outras apenas transformam trabalho em cansaço.
                  </p>
                  <p style={{ fontWeight: 'bold', color: '#ffffff' }}>
                    Este livro nasceu dessa mudança de perspectiva. Vamos começar.
                  </p>
                </div>
              ) : activeTab === 'cap1' ? (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Capítulo 1</div>
                    <h2 className="font-display" style={{ color: '#ffffff', fontSize: '1.8rem', marginTop: '4px', fontFamily: 'sans-serif' }}>
                      O diagnóstico da sua loja
                    </h2>
                    <p style={{ color: '#f59e0b', fontStyle: 'italic', fontSize: '1.05rem', marginTop: '8px' }}>
                      Antes de procurar soluções, descubra qual é o verdadeiro problema
                    </p>
                  </div>

                  <p style={{ marginBottom: '18px' }}>
                    Na manhã em que Carlos decidiu reorganizar o estoque da sua loja, tinha certeza de que estava resolvendo o principal problema do negócio.
                  </p>
                  <blockquote style={{ background: 'rgba(255, 255, 255, 0.03)', borderLeft: '4px solid #10b981', padding: '16px', margin: '20px 0', color: '#cbd5e1' }}>
                    "Uma loja funciona como um sistema. Quando uma parte perde eficiência, as outras precisam compensar. Um estoque mal planejado pressiona o caixa. O caixa apertado reduz a capacidade de comprar novidades."
                  </blockquote>
                  <p style={{ fontWeight: 'bold', color: '#ffffff' }}>
                    Empresas consistentes não podem depender da sorte para crescer.
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>Recurso Bônus</span>
                    <h2 className="font-display" style={{ color: '#ffffff', fontSize: '1.6rem' }}>
                      Checklist Gratuito de Gestão de Lucro
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                      Aplique estes 5 passos de verificação semanal na sua loja:
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <strong style={{ color: '#34d399' }}>☐ 1. Auditoria de Preço Médio:</strong> Verifique se as taxas do cartão e antecipações estão 100% embutidas no markup de cada peça.
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <strong style={{ color: '#34d399' }}>☐ 2. Trava de Desconto no Balcão:</strong> Defina um teto máximo de 3% para descontos em dinheiro e exija contrapartida de aumento de peça no caixa.
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <strong style={{ color: '#34d399' }}>☐ 3. Giro de Estoque Parado:</strong> Liste todos os produtos parados há mais de 60 dias e monte um combo promocional casado com um produto de curva A.
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <strong style={{ color: '#34d399' }}>☐ 4. Cálculo Semanal de Break-Even:</strong> Saiba exatamente em qual dia do mês sua loja zera os custos e passa a gerar lucro real.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs after reading */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
              <a 
                href="https://loja.uiclap.com/titulo/ua189875" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-gold" 
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.95rem' }}
              >
                <ShoppingCart size={18} /> Comprar Físico (UICLAP)
              </a>
              <a 
                href="https://www.amazon.com/M%C3%81QUINA-LUCRO-SUA-LOJA-Portuguese-ebook/dp/B0HCJYRP6Z/ref=tmm_kin_swatch_0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary" 
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.95rem' }}
              >
                Comprar Kindle (Amazon)
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
