import React, { useState } from 'react';
import { BookOpen, ArrowRight, Clock, User, X } from 'lucide-react';

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "O Perigo de Confundir Movimento com Resultado no Varejo",
      readTime: "5 min de leitura",
      date: "Trecho do Capítulo 1",
      excerpt: "Filas e sacolas saindo da loja chamam atenção, mas a margem de lucro não faz barulho. Descubra por que faturamento recorde não é garantia de caixa positivo.",
      content: `
        <h3>Dirigindo Olhando Apenas o Velocímetro</h3>
        <p>Administrar uma loja olhando apenas para o movimento é como dirigir um carro observando exclusivamente o velocímetro. Você sabe a velocidade, mas desconhece o nível de combustível, ignora a temperatura do motor e não percebe a pressão do óleo.</p>
        
        <p>No livro <strong>A Máquina de Lucro da Sua Loja</strong>, Henrique Voss alerta:</p>
        <blockquote style="border-left: 4px solid #f59e0b; padding-left: 16px; margin: 20px 0; color: #fbbf24; font-style: italic;">
          "Uma loja pode registrar um faturamento recorde e terminar o mês com o caixa apertado. Pode atrair muitos clientes e, mesmo assim, ver o patrimônio diminuir lentamente. É justamente aí que muitos empresários se enganam: confundem atividade com desempenho."
        </blockquote>

        <h3>Os Indicadores Silenciosos</h3>
        <p>As sacolas na mão do cliente fazem barulho, mas os números que realmente sustentam a sua empresa trabalham em silêncio:</p>
        <ul>
          <li><strong>A Margem de Lucro Real:</strong> Não faz barulho no salão de vendas.</li>
          <li><strong>O Capital de Giro:</strong> Não chama o empresário pelo nome.</li>
          <li><strong>O Ticket Médio:</strong> Não acende uma luz de alerta se estiver caindo.</li>
        </ul>
        <p>Resultado não é aquilo que aparece no salão de vendas. Resultado é aquilo que permanece na empresa depois que todas as contas foram pagas.</p>
      `
    },
    {
      id: 2,
      title: "A Diferença Entre Trabalhar Muito e Administrar Bem",
      readTime: "6 min de leitura",
      date: "Estratégia de Gestão",
      excerpt: "A rotina do comerciante brasileiro é intensa: abre a loja, recebe mercadoria, atende clientes e fecha o caixa. Mas quando a operação consome o dia, falta tempo para pensar.",
      content: `
        <h3>A Armadilha do Urgente</h3>
        <p>Existe uma imagem bastante conhecida do comerciante brasileiro: ele chega cedo, abre a loja, recebe mercadorias, atende clientes, resolve problemas, responde mensagens no WhatsApp e vai para casa pensando no dia seguinte.</p>

        <p>Quem vive essa realidade sabe que existe um problema ainda mais perigoso: <strong>falta tempo para pensar</strong>.</p>
        
        <p>Quando a operação ocupa todas as horas do dia, o urgente toma conta da agenda: troca-se uma etiqueta porque o cliente está esperando, negocia-se com um fornecedor porque o boleto vence amanhã. Mas quase nada disso responde à pergunta que realmente determina o futuro da empresa:</p>

        <blockquote style="border-left: 4px solid #10b981; padding-left: 16px; margin: 20px 0; color: #34d399; font-style: italic;">
          "Minha loja está ficando mais forte ou apenas sobrevivendo a mais uma semana?"
        </blockquote>

        <p>Os melhores gestores entendem que administrar não significa apenas resolver o que apareceu hoje. Significa identificar aquilo que, se não for corrigido agora, continuará produzindo os mesmos problemas amanhã.</p>
      `
    },
    {
      id: 3,
      title: "A Ilusão das Respostas Rápidas no Comércio",
      readTime: "4 min de leitura",
      date: "Diagnóstico Empresarial",
      excerpt: "Sempre que o comércio enfrenta um período difícil, surgem soluções prontas: 'Faça uma promoção', 'Invista em anúncios'. Por que toda decisão sem diagnóstico depende de sorte?",
      content: `
        <h3>O Erro do Remédio Sem Exame</h3>
        <p>Imagine um médico que, antes mesmo de pedir exames, receita um medicamento apenas porque reconheceu alguns sintomas. Talvez acerte, talvez não. Se errar, o paciente continuará com a doença original e ainda precisará lidar com os efeitos do tratamento inadequado.</p>

        <p>No varejo acontece exatamente o mesmo:</p>
        <ul>
          <li><strong>Fazer uma promoção:</strong> Pode ser excelente se houver excesso de estoque, mas destrói a rentabilidade se o problema for baixa conversão.</li>
          <li><strong>Investir em anúncios:</strong> Pode trazer fluxo, mas se o atendimento não converter visitantes em compradores, você apenas aumentará o custo de aquisição.</li>
        </ul>

        <p>Nenhuma ferramenta é boa ou ruim por si só. O que determina seu valor é o contexto em que ela é utilizada. Toda decisão tomada sem diagnóstico depende de sorte — e empresas consistentes não podem depender da sorte para crescer.</p>
      `
    },
    {
      id: 4,
      title: "Black Friday: quanto vender a mais para compensar o desconto?",
      readTime: "5 min de leitura",
      date: "Black Friday Lucrativa",
      excerpt: "Um desconto pequeno pode exigir um aumento enorme nas vendas só para manter o mesmo resultado. Veja o que acontece com sua margem na Black Friday.",
      content: `
        <h3>Black Friday não é só vender mais</h3>
        <p>Black Friday costuma ser associada a uma ideia simples: baixar o preço para vender mais.</p>
        <p>O problema é que vender mais não significa, necessariamente, lucrar mais.</p>
        <p>Quando uma loja concede desconto, ela reduz diretamente a margem de contribuição de cada venda. Dependendo da margem original do produto, um desconto aparentemente pequeno pode exigir um aumento muito maior no volume vendido apenas para que o resultado final fique no mesmo lugar.</p>

        <h3>Um exemplo simples</h3>
        <p>Imagine um produto vendido por <strong>R$100</strong>, com custo total de <strong>R$60</strong>.</p>
        <p>Sem desconto, sobram <strong>R$40 de contribuição simplificada por unidade</strong>.</p>
        <p>Agora imagine que a loja dê <strong>10% de desconto</strong>.</p>
        <p>O preço cai para R$90. Mantendo o mesmo custo de R$60, a contribuição cai de R$40 para <strong>R$30 por unidade</strong>.</p>
        <p>Para produzir os mesmos R$40 de contribuição que uma única venda gerava antes, a loja precisa vender aproximadamente <strong>33% mais unidades</strong>.</p>
        <p>E a conta fica muito mais pesada conforme o desconto aumenta:</p>
        <ul>
          <li><strong>Sem desconto:</strong> contribuição de R$40.</li>
          <li><strong>10% de desconto:</strong> contribuição de R$30 — aproximadamente <strong>33% mais unidades</strong> para manter o mesmo resultado.</li>
          <li><strong>20% de desconto:</strong> contribuição de R$20 — é preciso vender <strong>100% mais unidades</strong>.</li>
          <li><strong>30% de desconto:</strong> contribuição de R$10 — é preciso vender <strong>300% mais unidades</strong>.</li>
        </ul>

        <blockquote style="border-left: 4px solid #f59e0b; padding-left: 16px; margin: 20px 0; color: #fbbf24; font-style: italic;">
          "A pergunta não deveria ser apenas 'quanto de desconto vamos dar?', mas 'quanto precisamos vender a mais para que esse desconto faça sentido?'"
        </blockquote>

        <p style="font-size: 0.85rem; color: #94a3b8; margin-top: -10px; margin-bottom: 20px;"><em>*Exemplo didático e simplificado, sem considerar impostos, taxas de cartão, comissão, frete e outros custos variáveis.</em></p>

        <h3>Desconto não é o problema</h3>
        <p>Desconto pode ser uma excelente ferramenta quando existe um objetivo claro.</p>
        <p>Ele pode ajudar a liquidar estoque parado, atrair clientes, aumentar frequência de compra, liberar capital preso em mercadorias ou estimular compras maiores.</p>
        <p>O problema começa quando o desconto deixa de ser uma decisão calculada e vira simplesmente a estratégia padrão da Black Friday.</p>
        <p>Também não devemos olhar apenas para um produto isoladamente.</p>
        <p>Um item de margem baixa pode ser estratégico quando atrai o cliente e gera a venda de outros produtos com margens melhores.</p>
        <p>Nesse caso, vale acompanhar:</p>
        <ul>
          <li><strong>Ticket médio</strong></li>
          <li><strong>Margem total da compra</strong></li>
          <li><strong>Quantidade de itens por venda</strong></li>
          <li><strong>Produtos comprados em conjunto</strong></li>
          <li><strong>Giro de estoque</strong></li>
          <li><strong>Capital investido</strong></li>
          <li><strong>Prazo de pagamento ao fornecedor</strong></li>
        </ul>

        <h3>Estoque também entra na conta</h3>
        <p>Black Friday também é uma decisão de estoque.</p>
        <p>Estoque é dinheiro convertido em mercadoria.</p>
        <p>Se o produto vende, o capital retorna para o caixa. Se não vende, o dinheiro continua parado e muitas vezes a solução acaba sendo um novo desconto.</p>
        <p>Por isso, uma boa Black Friday começa antes da campanha.</p>
        <p>Ela começa entendendo <strong>o que vender, quanto comprar, qual margem proteger e até onde vale reduzir o preço</strong>.</p>
        <p>Uma loja pode terminar a Black Friday comemorando recorde de faturamento e, ao mesmo tempo, ter produzido menos resultado do que imaginava.</p>

        <blockquote style="border-left: 4px solid #10b981; padding-left: 16px; margin: 20px 0; color: #34d399; font-style: italic;">
          "Faturamento não é lucro. Movimento não é resultado."
        </blockquote>

        <p>Antes de definir o desconto que aparecerá na vitrine, faça uma conta simples:</p>
        <p><strong>Depois do desconto, quanto realmente sobra em cada venda e quanto será necessário vender para compensar essa redução?</strong></p>
      `,
      cta: {
        supportText: "Quer testar essa conta com os números da sua própria loja?",
        buttonText: "Simule sua margem na calculadora",
        buttonHref: "#calculadora",
        bookMention: "Esses conceitos fazem parte da abordagem de gestão prática apresentada em A Máquina de Lucro da Sua Loja."
      }
    }
  ];

  const handleCtaClick = (e, href) => {
    setSelectedArticle(null);
    if (href && href.startsWith('#')) {
      e.preventDefault();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  return (
    <section id="artigos" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '16px' }}>
            <BookOpen size={14} /> Trechos & Estratégias do Livro
          </span>
          <h2 className="font-display" style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '16px' }}>
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

              <button 
                className="btn-secondary" 
                onClick={() => setSelectedArticle(art)}
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}
              >
                Ler Artigo Completo <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedArticle(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              {selectedArticle.date}
            </span>

            <h2 className="font-display" style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '16px' }}>
              {selectedArticle.title}
            </h2>

            <div 
              style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }} 
            />

            {/* Modal CTA Footer */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
              {selectedArticle.cta ? (
                <div>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '16px' }}>
                    {selectedArticle.cta.supportText}
                  </p>
                  <a 
                    href={selectedArticle.cta.buttonHref} 
                    target={selectedArticle.cta.buttonHref.startsWith('#') ? '_self' : '_blank'} 
                    rel="noopener noreferrer" 
                    onClick={(e) => handleCtaClick(e, selectedArticle.cta.buttonHref)} 
                    className="btn-gold"
                  >
                    {selectedArticle.cta.buttonText}
                  </a>
                  {selectedArticle.cta.bookMention && (
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '16px', fontStyle: 'italic' }}>
                      {selectedArticle.cta.bookMention}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '16px' }}>
                    Quer dominar todas as estratégias completas de lucratividade?
                  </p>
                  <a href="https://loja.uiclap.com/titulo/ua189875" target="_blank" rel="noopener noreferrer" onClick={() => setSelectedArticle(null)} className="btn-gold">
                    Garantir Meu Exemplar Impresso na UICLAP
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
