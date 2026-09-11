// Novaryn Play Catalog - Independent Player Guides
export const playCatalog = {
  books: [
    {
      id: 'hypershot-en',
      title: 'HYPERSHOT',
      subtitle: 'Unofficial Player Guide',
      description: 'A comprehensive strategy guide for mastering the game. Covers mechanics, builds, optimal strategies, and advanced techniques.',
      descriptionPt: 'Um guia estratégico completo para dominar o jogo. Aborda mecânicas, builds, estratégias ideais e técnicas avançadas.',
      cover: '/play/covers/hypershot-en.jpg',
      coverPt: '/play/covers/hypershot-pt.jpg',
      status: 'available',
      language: 'en',
      editions: {
        en: {
          asin: 'B0HHGCFNF9',
          amazonUS: 'https://www.amazon.com/dp/B0HHGCFNF9',
          amazonBR: null,
          amazonBRLabel: {
            en: 'Amazon Brazil — Coming soon',
            pt: 'Amazon Brasil — Em breve'
          },
          priceBR: 'R$ 24,90',
          hasKU: true
        },
        pt: {
          asin: 'B0HHG8KK6P',
          amazonUS: null,
          amazonBR: null, // Not yet available
          amazonBRLabel: {
            en: 'Amazon Brazil — Coming soon',
            pt: 'Amazon Brasil — Em breve'
          },
          priceBR: null,
          hasKU: false,
          comingSoon: true,
          englishEdition: 'https://www.amazon.com.br/dp/B0HHGCFNF9' // English edition link
        }
      }
    },
    {
      id: '99-nights-en',
      title: '99 Nights in the Forest',
      subtitle: 'Survival Strategy Guide',
      description: 'Master the wilderness survival mechanics. Learn essential tactics for day/night cycles, resource management, and enemy patterns.',
      descriptionPt: 'Domine a mecânica de sobrevivência na selva. Aprenda táticas essenciais para ciclos dia/noite, gestão de recursos e padrões de inimigos.',
      cover: '/play/covers/99-nights-en.jpg',
      coverPt: '/play/covers/99-nights-en.jpg', // Same cover for both languages
      status: 'available',
      language: 'en',
      editions: {
        en: {
          asin: 'B0HJ3T79QC',
          ebookUS: 'https://www.amazon.com/dp/B0HJ3T79QC',
          ebookBR: 'https://www.amazon.com.br/dp/B0HJ3T79QC',
          paperbackUS: 'https://www.amazon.com/dp/B0HJ4P3TD3',
          amazonUS: 'https://www.amazon.com/dp/B0HJ3T79QC',
          amazonBR: 'https://www.amazon.com.br/dp/B0HJ3T79QC',
          amazonBRDisplay: {
            en: 'Amazon Brazil — English Edition',
            pt: 'Amazon Brasil — Edição em inglês'
          },
          priceBR: null,
          hasKU: false
        },
        pt: {
          asin: 'B0HJ3T79QC',
          ebookUS: 'https://www.amazon.com/dp/B0HJ3T79QC',
          ebookBR: 'https://www.amazon.com.br/dp/B0HJ3T79QC',
          paperbackUS: 'https://www.amazon.com/dp/B0HJ4P3TD3',
          amazonUS: 'https://www.amazon.com/dp/B0HJ3T79QC',
          amazonBR: 'https://www.amazon.com.br/dp/B0HJ3T79QC',
          amazonBRDisplay: {
            en: 'Amazon Brazil — English Edition',
            pt: 'Amazon Brasil — Edição em inglês'
          },
          priceBR: null,
          hasKU: false,
          isEnglishEdition: true // Mark as English edition for PT language
        }
      }
    },
    {
      id: 'steal-an-egg',
      title: 'Steal An Egg',
      subtitle: 'Stealth & Tactics',
      description: 'An advanced guide for precision gameplay. Master stealth mechanics, timing, and perfect execution.',
      descriptionPt: 'Um guia avançado para jogabilidade de precisão. Domine mecânicas de furtividade, timing e execução perfeita.',
      cover: '/play/covers/soon-steal-an-egg.svg',
      coverPt: '/play/covers/soon-steal-an-egg.svg',
      status: 'coming-soon',
      language: 'en',
      editions: {
        en: {
          asin: null,
          amazonUS: null,
          amazonBR: null,
          priceBR: null,
          hasKU: false,
          comingSoon: true
        },
        pt: {
          asin: null,
          amazonUS: null,
          amazonBR: null,
          priceBR: null,
          hasKU: false,
          comingSoon: true
        }
      }
    },
    {
      id: 'animal-hospital',
      title: 'Animal Hospital / Anomaly',
      subtitle: 'Management Guide',
      description: 'Complete strategy guide for managing your facility. Learn optimization, logistics, and complex systems.',
      descriptionPt: 'Guia estratégico completo para gerenciar sua instalação. Aprenda otimização, logística e sistemas complexos.',
      cover: '/play/covers/soon-animal-hospital.svg',
      coverPt: '/play/covers/soon-animal-hospital.svg',
      status: 'coming-soon',
      language: 'en',
      editions: {
        en: {
          asin: null,
          amazonUS: null,
          amazonBR: null,
          priceBR: null,
          hasKU: false,
          comingSoon: true
        },
        pt: {
          asin: null,
          amazonUS: null,
          amazonBR: null,
          priceBR: null,
          hasKU: false,
          comingSoon: true
        }
      }
    }
  ],
  
  disclaimer: {
    en: 'Novaryn Play provides independent strategy guides and player resources. These are unofficial guides not affiliated with game publishers. All game titles and trademarks are property of their respective owners.',
    pt: 'Novaryn Play oferece guias estratégicos independentes e recursos para jogadores. Estes são guias não oficiais não afiliados aos editores dos jogos. Todos os títulos de jogos e marcas registradas são propriedade de seus respectivos proprietários.'
  },

  seo: {
    en: {
      title: 'Novaryn Play — Unofficial Player Guides',
      description: 'Independent, unofficial player guides for the games people actually play. Explore HYPERSHOT, 99 Nights in the Forest and upcoming Novaryn Play releases by Adrian Vossell.',
      keywords: ['player guides', 'strategy guides', 'game guides', 'walkthroughs', 'tips and tricks']
    },
    pt: {
      title: 'Novaryn Play — Guias Independentes para Jogadores',
      description: 'Guias estratégicos independentes e recursos para seus jogos favoritos. Domine mecânicas complexas com táticas especializadas.',
      keywords: ['guias de jogos', 'guias estratégicos', 'walkthroughs', 'dicas e truques']
    }
  }
};

export function getBookById(bookId) {
  return playCatalog.books.find(b => b.id === bookId);
}

export function getAvailableBooks(language = 'en') {
  return playCatalog.books.filter(b => b.status === 'available');
}

export function getComingSoonBooks(language = 'en') {
  return playCatalog.books.filter(b => b.status === 'coming-soon');
}
