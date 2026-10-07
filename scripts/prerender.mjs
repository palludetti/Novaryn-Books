import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articles } from '../src/data/articles.js';
import { playBooks, playComingNext, playCopy, resolveEdition } from '../src/data/playCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

const SITE = 'https://maquina-de-lucro-theta.vercel.app';

if (!fs.existsSync(templatePath)) {
  console.error("dist/index.html not found! Run 'vite build' first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

console.log("Generating static pre-rendered HTML for " + articles.length + " articles and /play...");

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

const esc = (s) => String(s).replace(/"/g, '&quot;');

// Helper: Strip Home SEO tags from template
function stripHomeSeo(html) {
  return html
    .replace(/<title>.*?<\/title>/is, '')
    .replace(/[ \t]*<meta name="description"[^>]*\/>\n?/gi, '')
    .replace(/[ \t]*<link rel="canonical"[^>]*\/>\n?/gi, '')
    .replace(/[ \t]*<meta property="og:[^"]*"[^>]*\/>\n?/gi, '')
    .replace(/[ \t]*<meta name="twitter:[^"]*"[^>]*\/>\n?/gi, '');
}

// 1. Gera páginas estáticas dos artigos
for (const article of articles) {
  const articleDir = path.join(distDir, 'artigos', article.slug);
  fs.mkdirSync(articleDir, { recursive: true });

  const canonicalUrl = SITE + '/artigos/' + article.slug;
  const fullTitle = article.seoTitle + ' | A Máquina de Lucro da Sua Loja';

  const seoTags = [
    '<title>' + fullTitle + '</title>',
    '<meta name="description" content="' + article.metaDescription.replace(/"/g, '&quot;') + '">',
    '<link rel="canonical" href="' + canonicalUrl + '">',
    '<meta property="og:type" content="article">',
    '<meta property="og:title" content="' + fullTitle.replace(/"/g, '&quot;') + '">',
    '<meta property="og:description" content="' + article.metaDescription.replace(/"/g, '&quot;') + '">',
    '<meta property="og:url" content="' + canonicalUrl + '">',
    '<meta property="og:site_name" content="A Máquina de Lucro da Sua Loja">',
    '<meta property="og:image" content="' + SITE + '/og/og-home.png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:type" content="image/png">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + fullTitle.replace(/"/g, '&quot;') + '">',
    '<meta name="twitter:description" content="' + article.metaDescription.replace(/"/g, '&quot;') + '">',
    '<meta name="twitter:image" content="' + SITE + '/og/og-home.png">'
  ].join('\n    ');

  let html = stripHomeSeo(template);
  html = html.replace('</head>', '    ' + seoTags + '\n  </head>');

  const ctaHtml = article.cta 
    ? '<p style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 18px;">' + article.cta.supportText + '</p><a href="' + article.cta.buttonHref + '" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000000; font-weight: 800; padding: 14px 28px; border-radius: 9999px; text-decoration: none; display: inline-block;">' + article.cta.buttonText + '</a>'
    : '<p style="color: #ffffff; font-size: 1.1rem; font-weight: 600; margin-bottom: 18px;">Quer dominar todas as estratégias completas de lucratividade?</p><a href="https://loja.uiclap.com/titulo/ua189875" target="_blank" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000000; font-weight: 800; padding: 14px 28px; border-radius: 9999px; text-decoration: none; display: inline-block;">Garantir Meu Exemplar Impresso na UICLAP</a>';

  const crawlableContent = '<div id="root"><div style="min-height: 100vh; display: flex; flex-direction: column; background: #090D16; color: #f8fafc; font-family: sans-serif;"><header style="padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(9, 13, 22, 0.92);"><div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;"><a href="/" style="color: #ffffff; text-decoration: none; font-weight: 800; font-size: 1.2rem;">A MÁQUINA DE LUCRO DA SUA LOJA</a><nav style="display: flex; gap: 20px;"><a href="/#calculadora" style="color: #cbd5e1; text-decoration: none;">Calculadora de Lucro</a><a href="/#artigos" style="color: #cbd5e1; text-decoration: none;">Artigos & Estratégias</a></nav></div></header><main style="flex: 1; padding: 60px 20px;"><article style="max-width: 820px; margin: 0 auto; background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px 40px;"><div style="display: flex; justify-content: space-between; margin-bottom: 20px;"><span style="color: #34d399; font-weight: 600; text-transform: uppercase; font-size: 0.85rem;">' + article.date + '</span><span style="color: #94a3b8; font-size: 0.9rem;">' + article.readTime + '</span></div><h1 class="font-display article-page-title" style="color: #ffffff; margin-bottom: 24px;">' + article.title + '</h1><p style="font-size: 1.15rem; color: #94a3b8; line-height: 1.7; margin-bottom: 36px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); font-style: italic;">' + article.excerpt + '</p><div style="font-size: 1.05rem; color: #cbd5e1; line-height: 1.85;">' + article.content + '</div><div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">' + ctaHtml + '</div></article></main></div></div>';

  html = html.replace('<div id="root"></div>', crawlableContent);

  const outFile = path.join(articleDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
  console.log('Generated ' + outFile);
}

// 2. Gera página pré-renderizada de /play
console.log('Generating static pre-rendered HTML for /play...');

const playLang = 'en';
const playT = playCopy[playLang];
const playUrl = SITE + '/play';

const playSeo = [
  '<title>' + playT.seoTitle + '</title>',
  '<meta name="description" content="' + esc(playT.seoDescription) + '">',
  '<link rel="canonical" href="' + playUrl + '">',
  '<meta property="og:type" content="website">',
  '<meta property="og:title" content="' + esc(playT.seoTitle) + '">',
  '<meta property="og:description" content="' + esc(playT.seoDescription) + '">',
  '<meta property="og:url" content="' + playUrl + '">',
  '<meta property="og:site_name" content="Novaryn Books">',
  '<meta property="og:image" content="' + SITE + '/og/og-play.png">',
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:type" content="image/png">',
  '<meta name="twitter:card" content="summary_large_image">',
  '<meta name="twitter:title" content="' + esc(playT.seoTitle) + '">',
  '<meta name="twitter:description" content="' + esc(playT.seoDescription) + '">',
  '<meta name="twitter:image" content="' + SITE + '/og/og-play.png">',
].join('\n    ');

const playBooksHtml = playBooks
  .map((book) => {
    const { edition, fallback } = resolveEdition(book, playLang);
    const links = [
      edition.links.br ? { href: edition.links.br, label: 'Amazon BR' } : null,
      edition.links.us ? { href: edition.links.us, label: 'Amazon US' } : null,
      edition.links.print ? { href: edition.links.print, label: 'Paperback' } : null,
    ].filter(Boolean);

    const linksHtml = links.length
      ? links
          .map(
            (l) =>
              '<a href="' + l.href + '" target="_blank" rel="noopener noreferrer" style="color:#ff9d2e;text-decoration:none;margin-right:16px;font-weight:700;">' +
              l.label +
              '</a>'
          )
          .join('')
      : '';
    const soonHtml = edition.links.br ? '' : '<span style="color:#6b7789;">' + playT.brSoon + '</span>';
    const kuHtml = edition.kindleUnlimited ? '<span style="color:#ff9d2e;font-size:0.8rem;font-weight:700;">' + playT.ku + '</span> ' : '';
    const langHtml = fallback ? '<span style="color:#98a3b5;font-size:0.8rem;">' + playT.englishEdition + '</span>' : '';

    return (
      '<article style="background:#1a202c;border:1px solid #2a3341;border-radius:14px;padding:20px;margin-bottom:24px;display:flex;gap:18px;align-items:flex-start;">' +
      '<img src="' + edition.cover + '" alt="' + esc(book.title) + ' Cover" width="124" height="186" style="border-radius:6px;box-shadow:0 8px 22px rgba(0,0,0,0.45);flex:none;">' +
      '<div style="min-width:0;flex:1;">' +
      '<h3 style="color:#e8ecf3;margin:0 0 4px;font-size:1.1rem;font-weight:700;">' + escapeHtml(book.title) + '</h3>' +
      '<p style="color:#98a3b5;margin:0 0 8px;font-size:0.85rem;">' + escapeHtml(edition.subtitle) + ' — Adrian Vossell</p>' +
      '<p style="margin:0 0 8px;">' + kuHtml + langHtml + '</p>' +
      '<p style="color:#98a3b5;line-height:1.6;margin:0 0 12px;font-size:0.9rem;">' + escapeHtml(book.description[playLang]) + '</p>' +
      '<p style="margin:0;">' + linksHtml + soonHtml + '</p>' +
      '</div>' +
      '</article>'
    );
  })
  .join('');

const playSoonHtml = playComingNext
  .map(
    (item) =>
      '<article style="background:#1a202c;border:1px solid #2a3341;border-radius:14px;padding:20px;margin-bottom:16px;display:flex;gap:18px;align-items:center;">' +
      '<div style="width:124px;height:186px;border-radius:6px;border:1px dashed #2a3341;background:#12161f;display:flex;align-items:center;justify-content:center;color:#3b4657;font-size:1.8rem;font-weight:800;flex:none;">' + escapeHtml(item.mark) + '</div>' +
      '<div>' +
      '<h3 style="color:#e8ecf3;margin:0;font-size:1.1rem;font-weight:700;">' + escapeHtml(item.title) + '</h3>' +
      '<p style="color:#98a3b5;margin:4px 0 0;font-size:0.8rem;">' + escapeHtml(item.subtitle || '') + '</p>' +
      '<span style="display:inline-block;margin-top:10px;padding:3px 9px;border-radius:9999px;background:rgba(255,157,46,0.12);color:#ff9d2e;font-size:0.7rem;font-weight:700;text-transform:uppercase;">' + escapeHtml(playT.inProduction) + '</span>' +
      '</div>' +
      '</article>'
  )
  .join('');

const playContent =
  '<div id="root"><div style="min-height:100vh;background:#0d1117;color:#e8ecf3;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.55;">' +
  '<header style="padding:16px 24px;border-bottom:1px solid #2a3341;background:#0d1117;">' +
  '<div style="max-width:1120px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;">' +
  '<a href="/" style="color:#98a3b5;text-decoration:none;font-weight:600;font-size:0.85rem;">' + playT.backToHome + '</a>' +
  '</div>' +
  '</header>' +
  '<main style="max-width:1120px;margin:0 auto;padding:64px 20px;">' +
  '<p style="color:#98a3b5;letter-spacing:0.18em;text-transform:uppercase;font-size:0.75rem;margin:0 0 10px;font-weight:600;">' + playT.kicker + '</p>' +
  '<h1 style="color:#e8ecf3;font-size:2.8rem;margin:0;font-weight:800;line-height:1.05;">NOVARYN <span style="color:#ff9d2e;">PLAY</span></h1>' +
  '<p style="color:#98a3b5;max-width:56ch;line-height:1.6;font-size:1rem;margin:14px 0 0;">' + playT.tagline + '</p>' +
  '<h2 style="color:#e8ecf3;font-size:0.85rem;letter-spacing:0.16em;text-transform:uppercase;margin:48px 0 20px;font-weight:700;">' + playT.published + '</h2>' +
  '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:20px;">' + playBooksHtml + '</div>' +
  '<h2 style="color:#e8ecf3;font-size:0.85rem;letter-spacing:0.16em;text-transform:uppercase;margin:48px 0 20px;font-weight:700;">' + playT.comingNext + '</h2>' +
  '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));gap:20px;">' + playSoonHtml + '</div>' +
  '<footer style="margin-top:48px;padding-top:24px;border-top:1px solid #2a3341;color:#98a3b5;font-size:0.8rem;line-height:1.6;display:flex;flex-wrap:wrap;gap:12px 28px;">' +
  '<p style="margin:0;max-width:64ch;">' + playT.disclaimer + '</p><p style="margin:0;max-width:64ch;">' + playT.noDownloads + '</p>' +
  '</footer>' +
  '</main></div></div>';

let playHtml = stripHomeSeo(template);
playHtml = playHtml.replace('<html lang="pt-BR">', '<html lang="' + playT.htmlLang + '">');
playHtml = playHtml.replace('</head>', '    ' + playSeo + '\n  </head>');
playHtml = playHtml.replace('<div id="root"></div>', playContent);

const playDir = path.join(distDir, 'play');
fs.mkdirSync(playDir, { recursive: true });
fs.writeFileSync(path.join(playDir, 'index.html'), playHtml, 'utf8');
console.log('Generated ' + path.join(playDir, 'index.html'));

console.log("All static article pages and /play successfully generated!");
