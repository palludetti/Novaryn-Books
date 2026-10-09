// Livros de Henrique Voss. Fonte única para a página de cada livro,
// a página do autor, os blocos de "Livros do autor" e o prerender.

export const author = {
  name: 'Henrique Voss',
  slug: 'henrique-voss',
  role: 'Comerciante e autor',
  shortBio:
    'Dono de uma loja de roupa masculina no interior de São Paulo. Escreve sobre margem, estoque, preço e caixa a partir do próprio balcão — e sobre como testar negócios para o mercado americano sem apostar o que não pode perder.',
  bio: [
    'Henrique Voss é dono de uma loja de roupa masculina no interior de São Paulo. Escreve sobre gestão prática para pequenos e médios negócios: margem, estoque, precificação, vendas e operação, tratados como decisões do dia a dia e não como teoria.',
    'Em A Máquina de Lucro da Sua Loja, organiza esse raciocínio em um método para o lojista brasileiro parar de confundir vender mais com lucrar mais. Em Do Real ao Dólar, aplica a mesma disciplina a outra pergunta: como testar se uma ideia de negócio para o mercado americano se sustenta, antes de colocar dinheiro nela.',
    'Os dois livros são publicados pela Novaryn Books.'
  ]
};

export const books = [
  {
    slug: 'a-maquina-de-lucro-da-sua-loja',
    title: 'A Máquina de Lucro da Sua Loja',
    subtitle: 'O método para aumentar o lucro sem depender apenas de vender mais',
    cover: '/book_cover.jpg',
    // A página principal do site já é a página deste livro.
    pagePath: '/#comprar',
    url: 'https://metodomaquinadelucro.com.br/',
    tagline: 'Para o lojista que fatura bem e mesmo assim termina o mês com o caixa apertado.',
    description:
      'Um guia prático de varejo para pequenas e médias lojas no Brasil: margem, preço, estoque, atendimento e números lidos do jeito certo, para aumentar o lucro líquido sem gastar mais em anúncio nem queimar margem com desconto.',
    formats: [
      { label: 'Kindle (Amazon Brasil)', href: 'https://www.amazon.com.br/dp/B0HCJYRP6Z', primary: true },
      { label: 'Impresso (UICLAP)', href: 'https://loja.uiclap.com/titulo/ua189875' },
      { label: 'Paperback (Amazon EUA)', href: 'https://www.amazon.com/dp/6502262554' }
    ],
    isbn: null,
    datePublished: '2026-08-01'
  },
  {
    slug: 'do-real-ao-dolar',
    title: 'Do Real ao Dólar',
    subtitle: 'Como validar um negócio pra vender em dólar sem sair do Brasil — antes de investir um centavo',
    cover: '/do-real-ao-dolar-cover.jpg',
    pagePath: '/livros/do-real-ao-dolar',
    url: 'https://metodomaquinadelucro.com.br/livros/do-real-ao-dolar',
    tagline: 'Você não precisa de sorte pra vender em dólar do Brasil. Precisa de disciplina pra testar antes de apostar.',
    description:
      'A internet está cheia de gente prometendo que dá pra faturar em dólar dormindo. Este livro não é sobre isso. É o método que Henrique Voss usa para decidir, antes de comprometer dinheiro, se uma ideia de venda para o mercado americano merece virar negócio.',
    intro: [
      'Henrique Voss é dono de uma loja de roupa masculina no interior de São Paulo. Nos últimos anos, testou — com a própria planilha aberta — como validar um negócio para vender ao mercado americano sem perder dinheiro no caminho.',
      'Em Do Real ao Dólar ele mostra o processo real: a conta que vem antes da empolgação, o teste mais barato possível e o momento de admitir que uma ideia não fecha.'
    ],
    learn: [
      'Como calcular o custo total de um produto vendido em dólar — não só o preço de fábrica.',
      'Como testar fornecedor, produto e marca com o menor investimento possível.',
      'Quando escalar, quando pausar e quando é hora de admitir que não vai dar certo.'
    ],
    forWho: [
      'Quem tem uma ideia de produto para vender nos Estados Unidos e ainda não sabe se a conta fecha.',
      'Lojista ou pequeno empresário que quer uma fonte de receita em dólar sem largar o negócio atual.',
      'Quem já viu promessa de "renda em dólar" demais e quer um caminho com números, não com hype.'
    ],
    notFor:
      'Não é um livro de enriquecimento rápido nem um passo a passo de plataforma. É um método de decisão.',
    formats: [
      { label: 'Kindle (Amazon Brasil)', note: 'Incluído no Kindle Unlimited', href: 'https://www.amazon.com.br/dp/B0H1TKP45Y', primary: true },
      { label: 'Impresso (UICLAP)', href: 'https://loja.uiclap.com/titulo/ua200103' },
      { label: 'Paperback (Amazon EUA)', href: 'https://www.amazon.com/dp/B0HHWG86NB' }
    ],
    pages: 39,
    datePublished: '2026-09-04',
    seoTitle: 'Do Real ao Dólar — Como validar um negócio pra vender em dólar sem sair do Brasil',
    metaDescription:
      'Livro de Henrique Voss: como calcular o custo real de vender em dólar, testar produto e fornecedor gastando pouco e decidir quando escalar ou desistir. Kindle e paperback.'
  }
];

export function getBookBySlug(slug) {
  return books.find((b) => b.slug === slug);
}
