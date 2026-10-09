/**
 * Catálogo e Metadados Oficiais da área Novaryn Play (Selo Novaryn Books).
 *
 * REGRAS EDITORIAIS E DE NEGÓCIO:
 * 1. Autor de todos os títulos: Adrian Vossell.
 * 2. Cada livro possui edições por idioma (ASIN, capa, formato, links).
 * 3. Quando o leitor escolhe PT, o card exibe a edição em português se existir.
 *    Se não existir (caso de 99 Nights), usa a edição em inglês com badge explicativo "Edição em inglês".
 * 4. kindleUnlimited é definido por edição:
 *    - 99 Nights (EN): true (inscrito no KDP Select com direitos mundiais).
 *    - HYPERSHOT (EN): true (inscrito no KDP Select).
 *    - HYPERSHOT (PT): false (não inscrito no KDP Select — não anunciar indevidamente).
 * 5. Títulos não publicados (Steal An Egg, Animal Hospital): marcados como "Em Produção" (Coming Next),
 *    sem inventar ASINs ou botões de compra.
 * 6. Capas servidas localmente em /play/covers/ (sem hotlink de CDNs externos sujeitos a bloqueio).
 */

export const SITE_URL = 'https://maquina-de-lucro-theta.vercel.app';
export const PLAY_PATH = '/play';

export const playBooks = [
  {
    id: '99-nights',
    title: '99 Nights in the Forest',
    author: 'Adrian Vossell',
    editions: {
      en: {
        lang: 'en',
        asin: 'B0HJ3T79QC',
        cover: '/play/covers/99-nights-en.jpg',
        subtitle: 'The Unofficial Player Guide (2026 Edition)',
        kindleUnlimited: true,
        links: {
          us: 'https://www.amazon.com/dp/B0HJ3T79QC',
          br: 'https://www.amazon.com.br/dp/B0HJ3T79QC',
          print: 'https://www.amazon.com/dp/B0HJ4P3TD3'
        }
      }
      // Edição em português não existe. O catálogo em PT utiliza a edição em inglês com aviso.
    },
    description: {
      en: 'Survive the forest one night at a time. Resource routes, camp planning, threat reading and the decisions that quietly decide a run — from night 1 to night 99.',
      pt: 'Sobreviva à floresta noite após noite. Rotas de recursos, montagem de acampamento, leitura de ameaças e as decisões que definem uma run em silêncio — da noite 1 à noite 99.'
    }
  },
  {
    id: 'hypershot',
    title: 'HYPERSHOT',
    author: 'Adrian Vossell',
    editions: {
      en: {
        lang: 'en',
        asin: 'B0HHGCFNF9',
        cover: '/play/covers/hypershot-en.jpg',
        subtitle: 'Unofficial Player Guide',
        kindleUnlimited: true,
        links: {
          us: 'https://www.amazon.com/dp/B0HHGCFNF9',
          br: 'https://www.amazon.com.br/dp/B0HHGCFNF9',
          print: null
        }
      },
      pt: {
        lang: 'pt',
        asin: 'B0HHG8KK6P',
        cover: '/play/covers/hypershot-pt.jpg',
        subtitle: 'Guia Não Oficial do Jogador',
        kindleUnlimited: false, // Edição PT não está no KDP Select
        links: {
          us: null, // Foco do leitor brasileiro na loja Amazon Brasil
          br: 'https://www.amazon.com.br/dp/B0HHG8KK6P',
          print: null
        }
      }
    },
    description: {
      en: 'Aim, movement and decision-making for fast shooter matches. Loadouts, abilities, sensitivity and FOV — and the habits that separate consistent players from lucky ones.',
      pt: 'Mira, movimentação e decisão em partidas rápidas de tiro. Loadouts, habilidades, sensibilidade e FOV — e os hábitos que separam quem é consistente de quem só teve sorte.'
    }
  }
];

export const playComingNext = [
  {
    id: 'steal-an-egg',
    mark: 'S',
    title: 'Steal An Egg',
    subtitle: 'The Unofficial Player Guide: 2026 Edition',
    author: 'Adrian Vossell'
  },
  {
    id: 'animal-hospital',
    mark: 'A',
    title: 'Animal Hospital / Anomaly',
    subtitle: 'Management Guide',
    author: 'Adrian Vossell'
  }
];

/**
 * Resolve a edição apropriada para o idioma selecionado.
 * Retorna { edition, fallback: boolean }.
 */
export function resolveEdition(book, lang) {
  const edition = book.editions[lang];
  if (edition) return { edition, fallback: false };
  return { edition: book.editions.en, fallback: true };
}

export const playCopy = {
  en: {
    htmlLang: 'en',
    kicker: 'A Novaryn Books imprint',
    title: 'NOVARYN PLAY',
    tagline: 'Unofficial player guides for the games people actually play. Written to be read once and used for a season.',
    published: 'Published',
    comingNext: 'Coming Next',
    inProduction: 'In production',
    buyAmazon: 'Amazon',
    buyPaperback: 'Paperback',
    brSoon: 'Amazon Brasil — coming soon',
    englishEdition: 'English edition',
    ku: 'Kindle Unlimited',
    backToHome: '← Novaryn Books',
    disclaimer: 'Independent, unofficial guides. Not affiliated with, authorised by, or endorsed by the developers or publishers of the games covered. All game names and trademarks belong to their respective owners.',
    noDownloads: 'Digital editions are sold through Amazon Kindle. This site offers no downloads, files or digital sales.',
    seoTitle: 'Novaryn Play — Unofficial Player Guides | Novaryn Books',
    seoDescription: 'Novaryn Play is the games imprint of Novaryn Books: unofficial player guides for 99 Nights in the Forest and HYPERSHOT, written by Adrian Vossell.'
  },
  pt: {
    htmlLang: 'pt-BR',
    kicker: 'Um selo da Novaryn Books',
    title: 'NOVARYN PLAY',
    tagline: 'Guias não oficiais para os jogos que as pessoas realmente jogam. Feitos para serem lidos uma vez e usados por uma temporada.',
    published: 'Publicados',
    comingNext: 'Em Breve',
    inProduction: 'Em produção',
    buyAmazon: 'Amazon',
    buyPaperback: 'Impresso',
    brSoon: 'Amazon Brasil — em breve',
    englishEdition: 'Edição em inglês',
    ku: 'Kindle Unlimited',
    backToHome: '← Novaryn Books',
    disclaimer: 'Guias independentes e não oficiais. Sem vínculo, autorização ou endosso dos desenvolvedores ou publicadoras dos jogos abordados. Nomes e marcas dos jogos pertencem a seus respectivos donos.',
    noDownloads: 'As edições digitais são vendidas pela Amazon Kindle. Este site não oferece download, arquivos nem venda digital.',
    seoTitle: 'Novaryn Play — Guias Não Oficiais de Jogos | Novaryn Books',
    seoDescription: 'Novaryn Play é o selo de games da Novaryn Books: guias não oficiais de 99 Nights in the Forest e HYPERSHOT, escritos por Adrian Vossell.'
  }
};

export const playCatalog = {
  books: playBooks,
  comingNext: playComingNext,
  copy: playCopy
};
