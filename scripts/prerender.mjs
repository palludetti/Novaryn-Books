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

const playCrawlableContent = '<div id="root"><div style="min-height: 100vh; display: flex; flex-direction: column; background: #090D16; color: #f8fafc; font-family: sans-serif;"><header style="padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(9, 13, 22, 0.92);"><div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;"><a href="/" style="color: #ffffff; text-decoration: none; font-weight: 800; font-size: 1.2rem;">A MÁQUINA DE LUCRO DA SUA LOJA</a><nav style="display: flex; gap: 20px;"><a href="/play" style="color: #10b981; text-decoration: none; font-weight: 600;">Novaryn Play</a><a href="/#artigos" style="color: #cbd5e1; text-decoration: none;">Artigos & Estratégias</a></nav></div></header><main style="flex: 1; padding: 60px 20px;"><section style="max-width: 1000px; margin: 0 auto;"><h1 style="color: #ffffff; font-size: 3rem; font-weight: 900; margin-bottom: 24px;">Novaryn Play</h1><p style="color: #cbd5e1; font-size: 1.2rem; line-height: 1.6; margin-bottom: 36px; max-width: 600px;">Unofficial strategy guides and player resources for complex games. Master game mechanics with expert tactics.</p><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;"><div style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px;"><h3 style="color: #ffffff; font-size: 1.25rem; font-weight: 700; margin-bottom: 12px;">HYPERSHOT</h3><p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px;">A comprehensive strategy guide for mastering the game.</p><a href="https://www.amazon.com/dp/B0HHGCFNF9" style="background: linear-gradient(135deg, #FF9900 0%, #FF8C00 100%); color: #000000; font-weight: 700; padding: 12px 14px; border-radius: 8px; text-decoration: none; display: inline-block;">View on Amazon</a></div></div></section></main></div></div>';

playHtml = playHtml.replace('<div id="root"></div>', playCrawlableContent);

const playOutFile = path.join(playDir, 'index.html');
fs.writeFileSync(playOutFile, playHtml, 'utf8');
console.log('Generated ' + playOutFile);

console.log("All static article pages and /play successfully generated!");
