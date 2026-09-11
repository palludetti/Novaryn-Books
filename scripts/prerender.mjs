import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articles } from '../src/data/articles.js';
import { playCatalog } from '../src/data/playCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found! Run 'vite build' first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

console.log("Generating static pre-rendered HTML for " + articles.length + " articles and /play...");

for (const article of articles) {
  const articleDir = path.join(distDir, 'artigos', article.slug);
  fs.mkdirSync(articleDir, { recursive: true });

  const canonicalUrl = 'https://maquina-de-lucro-theta.vercel.app/artigos/' + article.slug;
  const fullTitle = article.seoTitle + ' | A Máquina de Lucro da Sua Loja';

  // Custom SEO Tags
  const seoTags = [
    '<title>' + fullTitle + '</title>',
    '<meta name="description" content="' + article.metaDescription.replace(/"/g, '&quot;') + '">',
    '<link rel="canonical" href="' + canonicalUrl + '">',
    '<meta property="og:type" content="article">',
    '<meta property="og:title" content="' + fullTitle.replace(/"/g, '&quot;') + '">',
    '<meta property="og:description" content="' + article.metaDescription.replace(/"/g, '&quot;') + '">',
    '<meta property="og:url" content="' + canonicalUrl + '">',
    '<meta property="og:site_name" content="A Máquina de Lucro da Sua Loja">',
    '<meta property="og:image" content="https://maquina-de-lucro-theta.vercel.app/og/og-home.png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:type" content="image/png">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + fullTitle.replace(/"/g, '&quot;') + '">',
    '<meta name="twitter:description" content="' + article.metaDescription.replace(/"/g, '&quot;') + '">',
    '<meta name="twitter:image" content="https://maquina-de-lucro-theta.vercel.app/og/og-home.png">'
  ].join('\n    ');

  // Strip from the home template all tags that will be replaced by article-specific ones
  let html = template;
  // Remove <title>
  html = html.replace(/<title>.*?<\/title>/is, '');
  // Remove meta description (home version)
  html = html.replace(/[ \t]*<meta name="description"[^>]*\/>\n?/gi, '');
  // Remove canonical (home version)
  html = html.replace(/[ \t]*<link rel="canonical"[^>]*\/>\n?/gi, '');
  // Remove all og: meta tags (type, title, description, url, site_name, image, image:width, image:height, image:type)
  html = html.replace(/[ \t]*<meta property="og:[^"]*"[^>]*\/>\n?/gi, '');
  // Remove all twitter: meta tags (card, title, description, image)
  html = html.replace(/[ \t]*<meta name="twitter:[^"]*"[^>]*\/>\n?/gi, '');

  // Inject article-specific SEO tags before </head>
  html = html.replace('</head>', '    ' + seoTags + '\n  </head>');

  // Pre-rendered Crawlable Content inside Root for 100% Raw HTML Indexability
  const ctaHtml = article.cta 
    ? '<p style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 18px;">' + article.cta.supportText + '</p><a href="' + article.cta.buttonHref + '" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000000; font-weight: 800; padding: 14px 28px; border-radius: 9999px; text-decoration: none; display: inline-block;">' + article.cta.buttonText + '</a>'
    : '<p style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 18px;">Quer dominar todas as estratégias completas de lucratividade?</p><a href="https://loja.uiclap.com/titulo/ua189875" target="_blank" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000000; font-weight: 800; padding: 14px 28px; border-radius: 9999px; text-decoration: none; display: inline-block;">Garantir Meu Exemplar Impresso na UICLAP</a>';

  const crawlableContent = '<div id="root"><div style="min-height: 100vh; display: flex; flex-direction: column; background: #090D16; color: #f8fafc; font-family: sans-serif;"><header style="padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(9, 13, 22, 0.92);"><div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;"><a href="/" style="color: #ffffff; text-decoration: none; font-weight: 800; font-size: 1.2rem;">A MÁQUINA DE LUCRO DA SUA LOJA</a><nav style="display: flex; gap: 20px;"><a href="/#calculadora" style="color: #cbd5e1; text-decoration: none;">Calculadora de Lucro</a><a href="/#artigos" style="color: #cbd5e1; text-decoration: none;">Artigos & Estratégias</a></nav></div></header><main style="flex: 1; padding: 60px 20px;"><article style="max-width: 820px; margin: 0 auto; background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px 40px;"><div style="display: flex; justify-content: space-between; margin-bottom: 20px;"><span style="color: #34d399; font-weight: 600; text-transform: uppercase; font-size: 0.85rem;">' + article.date + '</span><span style="color: #94a3b8; font-size: 0.9rem;">' + article.readTime + '</span></div><h1 class="font-display article-page-title" style="color: #ffffff; margin-bottom: 24px;">' + article.title + '</h1><p style="font-size: 1.15rem; color: #94a3b8; line-height: 1.7; margin-bottom: 36px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); font-style: italic;">' + article.excerpt + '</p><div style="font-size: 1.05rem; color: #cbd5e1; line-height: 1.85;">' + article.content + '</div><div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">' + ctaHtml + '</div></article></main></div></div>';

  html = html.replace('<div id="root"></div>', crawlableContent);

  const outFile = path.join(articleDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
  console.log('Generated ' + outFile);
}

// Helper: Escape HTML content
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate /play pre-rendered page
const playDir = path.join(distDir, 'play');
fs.mkdirSync(playDir, { recursive: true });

const playCanonicalUrl = 'https://maquina-de-lucro-theta.vercel.app/play';
const playSeoEn = playCatalog.seo.en;
const playSeoTitle = playSeoEn.title;
const playDescription = playSeoEn.description;

const playSeoTags = [
  '<title>' + playSeoTitle + '</title>',
  '<meta name="description" content="' + playDescription.replace(/"/g, '&quot;') + '">',
  '<link rel="canonical" href="' + playCanonicalUrl + '">',
  '<meta property="og:type" content="website">',
  '<meta property="og:title" content="' + playSeoTitle.replace(/"/g, '&quot;') + '">',
  '<meta property="og:description" content="' + playDescription.replace(/"/g, '&quot;') + '">',
  '<meta property="og:url" content="' + playCanonicalUrl + '">',
  '<meta property="og:image" content="https://maquina-de-lucro-theta.vercel.app/og/novaryn-play.jpg">',
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:type" content="image/jpeg">',
  '<meta name="twitter:card" content="summary_large_image">',
  '<meta name="twitter:title" content="' + playSeoTitle.replace(/"/g, '&quot;') + '">',
  '<meta name="twitter:description" content="' + playDescription.replace(/"/g, '&quot;') + '">',
  '<meta name="twitter:image" content="https://maquina-de-lucro-theta.vercel.app/og/novaryn-play.jpg">'
].join('\n    ');

let playHtml = template;
playHtml = playHtml.replace(/<title>.*?<\/title>/is, '');
playHtml = playHtml.replace(/[ \t]*<meta name="description"[^>]*\/>\n?/gi, '');
playHtml = playHtml.replace(/[ \t]*<link rel="canonical"[^>]*\/>\n?/gi, '');
playHtml = playHtml.replace(/[ \t]*<meta property="og:[^"]*"[^>]*\/>\n?/gi, '');
playHtml = playHtml.replace(/[ \t]*<meta name="twitter:[^"]*"[^>]*\/>\n?/gi, '');

playHtml = playHtml.replace('</head>', '    ' + playSeoTags + '\n  </head>');

// Dynamically generate crawlable content from playCatalog
const availableBooks = playCatalog.books.filter(b => b.status === 'available');
const comingSoonBooks = playCatalog.books.filter(b => b.status === 'coming-soon');

// Helper: Render book card HTML
function renderBookCardHtml(book) {
  const edition = book.editions.en || {};
  const cover = book.cover;
  const title = escapeHtml(book.title);
  const subtitle = escapeHtml(book.subtitle);
  const description = escapeHtml(book.description);
  
  let ctaHtml = '';
  
  // Amazon US
  if (edition.amazonUS) {
    ctaHtml += '<a href="' + edition.amazonUS + '" style="background: linear-gradient(135deg, #ff9900, #ff8800); color: #0f1419; font-weight: 700; padding: 10px 12px; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Amazon US</a>';
  }
  
  // Amazon BR (link or text)
  if (edition.amazonBR) {
    const brLabel = (edition.amazonBRDisplay && typeof edition.amazonBRDisplay === 'object') 
      ? edition.amazonBRDisplay.en 
      : edition.amazonBRDisplay || 'Amazon Brasil';
    ctaHtml += '<a href="' + edition.amazonBR + '" style="background: linear-gradient(135deg, #ff9900, #ff8800); color: #0f1419; font-weight: 700; padding: 10px 12px; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">' + escapeHtml(brLabel) + '</a>';
  } else if (edition.amazonBRLabel) {
    const brLabel = (edition.amazonBRLabel && typeof edition.amazonBRLabel === 'object')
      ? edition.amazonBRLabel.en
      : edition.amazonBRLabel;
    ctaHtml += '<div style="padding: 10px 12px; background: rgba(255, 153, 0, 0.1); border: 1px solid rgba(255, 153, 0, 0.3); color: #ff9900; text-align: center; border-radius: 6px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">' + escapeHtml(brLabel) + '</div>';
  }
  
  // Kindle Unlimited mention
  let kuHtml = '';
  if (edition.hasKU) {
    kuHtml = '<p style="color: #94a3b8; font-size: 0.85rem; margin-top: 8px;">Included in Kindle Unlimited</p>';
  }
  
  return '<div style="background: linear-gradient(135deg, #1a202c 0%, #0f1419 100%); border: 1px solid rgba(255, 153, 0, 0.15); border-radius: 12px; overflow: hidden; padding: 20px;">' +
         '<img src="' + cover + '" alt="' + title + ' Cover" style="width: 100%; max-width: 200px; margin-bottom: 16px; border-radius: 8px; aspect-ratio: 2/3;">' +
         '<h3 style="color: #ffffff; font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">' + title + '</h3>' +
         '<p style="color: #10b981; font-size: 0.9rem; margin-bottom: 8px; font-weight: 600;">' + subtitle + '</p>' +
         '<p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 12px;">by Adrian Vossell</p>' +
         '<p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">' + description + '</p>' +
         '<div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 8px;">' + ctaHtml + '</div>' +
         kuHtml +
         '</div>';
}

// Helper: Render coming-soon card
function renderComingSoonCardHtml(book) {
  const title = escapeHtml(book.title);
  const subtitle = escapeHtml(book.subtitle);
  
  return '<div style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(9, 13, 22, 0.6) 100%); border: 1px solid rgba(255, 153, 0, 0.1); border-radius: 12px; padding: 20px; opacity: 0.65; text-align: center;">' +
         '<h3 style="color: #ffffff; font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">' + title + '</h3>' +
         '<p style="color: #10b981; font-size: 0.9rem; margin-bottom: 8px; font-weight: 600;">' + subtitle + '</p>' +
         '<p style="color: #94a3b8; font-size: 0.9rem; margin-top: 12px;">In Production</p>' +
         '</div>';
}

const availableBooksHtml = availableBooks.map(renderBookCardHtml).join('');
const comingSoonBooksHtml = comingSoonBooks.map(renderComingSoonCardHtml).join('');
const disclaimerText = escapeHtml(playCatalog.disclaimer.en);

const playCrawlableContent = '<div id="root"><div style="min-height: 100vh; display: flex; flex-direction: column; background: #090D16; color: #f8fafc; font-family: sans-serif;"><header style="padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(9, 13, 22, 0.92);"><div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;"><div><p style="color: #94a3b8; font-size: 0.8rem; margin: 0; text-transform: uppercase; letter-spacing: 0.05em;">Novaryn Books</p><a href="/" style="color: #ffffff; text-decoration: none; font-weight: 800; font-size: 1.1rem;">Novaryn Play</a></div><nav style="display: flex; gap: 20px;"><a href="/play" style="color: #10b981; text-decoration: none; font-weight: 600;">Guides</a><a href="/#artigos" style="color: #cbd5e1; text-decoration: none;">Articles</a></nav></div></header><main style="flex: 1; padding: 60px 20px;"><section style="max-width: 1200px; margin: 0 auto;"><h1 style="color: #ffffff; font-size: 2.5rem; font-weight: 900; margin-bottom: 8px;">Novaryn Play</h1><p style="color: #10b981; font-size: 1rem; font-weight: 600; margin-bottom: 24px;">Strategy Guides</p><p style="color: #cbd5e1; font-size: 1rem; line-height: 1.6; margin-bottom: 48px; max-width: 700px;">Independent, unofficial player guides for the games people actually play. Explore detailed strategy resources and tactical breakdowns.</p><h2 style="color: #ffffff; font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; margin-top: 48px;">Published</h2><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; margin-bottom: 48px;">' + availableBooksHtml + '</div>' +
(comingSoonBooks.length > 0 ? '<h2 style="color: #ffffff; font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; margin-top: 48px;">Coming Next</h2><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; margin-bottom: 48px;">' + comingSoonBooksHtml + '</div>' : '') +
'<div style="background: rgba(255, 153, 0, 0.05); border: 1px solid rgba(255, 153, 0, 0.2); border-radius: 12px; padding: 24px; margin-top: 48px;"><p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.6; margin: 0;">' + disclaimerText + '</p></div></section></main><footer style="padding: 40px 20px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(9, 13, 22, 0.6);"><div style="max-width: 1200px; margin: 0 auto; text-align: center;"><p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">&copy; 2026 Novaryn Books. All rights reserved.</p></div></footer></div></div>';

playHtml = playHtml.replace('<div id="root"></div>', playCrawlableContent);

const playOutFile = path.join(playDir, 'index.html');
fs.writeFileSync(playOutFile, playHtml, 'utf8');
console.log('Generated ' + playOutFile);

console.log("All static article pages and /play successfully generated!");
