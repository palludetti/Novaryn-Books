# HANDOFF — Novaryn Books / Novaryn Play

Documento único para retomar este projeto em outra instância (Claude, ChatGPT, Gemini ou outro computador).
Atualizado em 10/10/2026. Cole este arquivo (ou o link dele no GitHub) no início da nova conversa.

---

## 1. O que é

Site de livros da editora **Novaryn Books**, com dois "braços":

| Selo | Autor (pseudônimo) | Livros | Onde aparece no site |
|---|---|---|---|
| Novaryn Books (varejo/negócios, PT) | **Henrique Voss** | *A Máquina de Lucro da Sua Loja*; *Do Real ao Dólar* | Home, `/livros/do-real-ao-dolar`, `/henrique-voss`, `/artigos/*` |
| Novaryn Play (guias de games, EN/PT) | **Adrian Vossell** | *HYPERSHOT* (EN e PT), *99 Nights in the Forest*; em breve *Steal An Egg* e *Animal Hospital / Anomaly* | `/play` (bilíngue) |

Regra fixa: o nome civil do dono **nunca** aparece para o leitor — só os pseudônimos.

## 2. Onde está tudo

- **Repositório:** https://github.com/palludetti/Novaryn-Books (público), branch `main`
- **Deploy:** Vercel, a cada push na `main`
- **Domínio:** https://metodomaquinadelucro.com.br (registrado no Registro.br)
  - `maquina-de-lucro-theta.vercel.app` redireciona com 301 para o domínio (em `vercel.json`)
- **Google Analytics 4:** `G-8T8ZV0YY6E` (em todas as páginas)
- **Google Search Console:** site acompanhado lá
- Repositório separado do manuscrito do Hypershot: `palludetti/hypershot-player-guide` (privado; commits mais recentes ficaram só locais em `G:\Meu Drive\PROJETOS IA\hypershot-guide`)
- Assets do selo Novaryn Play no Drive: `G:\Meu Drive\PROJETOS IA\LIVROS\NOVARYN PLAY`

## 3. Stack e como rodar

- Vite 5 + React 18, sem router: rotas manuais em `src/App.jsx` (`window.history.pushState`)
- Ícones: `lucide-react`
- Prerender estático (SEO) em `scripts/prerender.mjs`, roda depois do build

```bash
npm ci
npm run dev        # desenvolvimento
npm run build      # vite build + prerender → dist/
npm run preview
```

No Windows existe `RODAR_SITE.bat` para subir local.

Build verificado em 10/10/2026: sem erros, gera home, 11 artigos, `/play`, `/livros/do-real-ao-dolar` e `/henrique-voss`.

## 4. Mapa de arquivos

| Arquivo | Função |
|---|---|
| `src/App.jsx` | Rotas: `/`, `/artigos/:slug`, `/livros/:slug`, `/henrique-voss`, `/play` |
| `src/data/books.js` | Livros do Henrique Voss (links Kindle, KDP paperback EUA, UICLAP) |
| `src/data/articles.js` | Artigos do blog (slug, título, excerpt, corpo) |
| `src/data/playCatalog.js` | Catálogo Novaryn Play: edições EN/PT, ASINs, capas, status `available`/`coming-soon`, rótulos `{ en, pt }` |
| `src/components/play/PlayPage.jsx`, `PlayBookCard.jsx` | Página `/play` e os cartões dos livros |
| `src/components/ProfitCalculator.jsx` | Calculadora de lucro da home |
| `src/components/LeadMagnetModal.jsx`, `AdminLeadsModal.jsx` | Captura de leads |
| `scripts/prerender.mjs` | Gera HTML estático de artigos, livros, autor e `/play` a partir dos arquivos de dados |
| `public/sitemap.xml`, `public/robots.txt` | SEO — atualizar sempre que entrar página nova |
| `vercel.json` | Redirects do domínio antigo e rewrites das rotas estáticas |

## 5. Dados dos livros (referência rápida)

**Novaryn Play — Adrian Vossell**
- HYPERSHOT: Unofficial Player Guide (EN) — ASIN **B0HHGCFNF9** — Live, Amazon US e BR, KDP Select/Kindle Unlimited, R$ 24,90
- HYPERSHOT: Guia Não Oficial do Jogador (PT) — ASIN **B0HHG8KK6P** — paperback PT publicado no KDP; impresso no Brasil indo para o **Clube de Autores**
- 99 Nights in the Forest: The Unofficial Player Guide (2026 Edition) — eBook **B0HJ3T79QC**, paperback **B0HJ4P3TD3**
- Próximos: Steal An Egg; Animal Hospital / Anomaly

**Novaryn Books — Henrique Voss**
- A Máquina de Lucro da Sua Loja — Kindle, paperback KDP EUA, impresso UICLAP
- Do Real ao Dólar — Kindle Brasil, paperback KDP EUA, impresso UICLAP

## 6. Regras do projeto (não quebrar)

**Trabalho**
- Commits cirúrgicos: um commit por correção lógica, sem mexer em arquivos não relacionados
- Nunca dar push sem ordem direta do dono
- Verificação: build → checagem do HTML gerado → checagem de hidratação do React (Playwright)
- Não alterar sem instrução explícita: `playCatalog.js`, `PlayPage.jsx`, `PlayBookCard.jsx`, `App.jsx`, `sitemap.xml`, `robots.txt`
- O dono alterna entre computadores e IAs: **nunca apagar trabalho existente** por achar que está desatualizado — perguntar antes

**Técnicas**
- Textos bilíngues no catálogo: objetos `{ en, pt }`, resolvidos no componente
- Prerender sempre gerado a partir dos arquivos de dados (nada fixo no script)
- Link da Amazon: URL ativa vira `<a>`; `null` vira texto simples

**Novaryn Play**
- O site nunca vende, baixa ou distribui PDF/EPUB — só apresenta e manda para a Amazon
- `/play` é rota própria; o link para ela fica só no rodapé da home; home principal intacta
- Modo EN: capa `hypershot-en.jpg`, ASIN B0HHGCFNF9, pode citar Kindle Unlimited
- Modo PT: capa `hypershot-pt.jpg`, ASIN B0HHG8KK6P; nunca apontar o ASIN EN como se fosse a edição portuguesa; se oferecer a edição inglesa, rotular "Edição em inglês — Amazon Brasil"
- Keywords no KDP: sem o nome do jogo que já está no título e sem "Roblox"
- Sem Countdown Deal ou Free Promotion por enquanto

**Escrita**
- Textos longos (artigos, capítulos) não podem ter "cara de IA": nada de tom genérico, clichês ou estrutura óbvia de texto gerado

## 7. Estado atual (10/10/2026)

Feito e no ar (`main`, último commit `74776f9`, 09/10/2026):
- Domínio próprio com redirect 301 do `.vercel.app`
- Página do *Do Real ao Dólar* com capa local e link UICLAP; página do autor Henrique Voss; links cruzados entre os livros
- 3 artigos novos a partir do *Do Real ao Dólar* (11 artigos no total)
- GA4 em todas as páginas
- `/play` com CTAs bilíngues e prerender sincronizado com o catálogo

## 8. Pendências

1. **Branch `fix/novaryn-play-catalog-and-routing` não integrada à `main`.** Tem trabalho que não está no ar:
   - rastreamento de cliques (`src/utils/tracking.js`)
   - parâmetro `?lang=en|pt` para link direto na língua certa
   - imagem OG própria do `/play` (`public/og/og-play.png`) e capa do 99 Nights em resolução maior
   - correção de proporção das capas
   ⚠️ Ela é mais antiga que a `main` em alguns pontos (o diff contra a `main` remove artigos e entradas do sitemap). **Não fazer merge direto**: trazer as mudanças por cherry-pick ou à mão, conferir artigos/sitemap, rodar build e verificar.
2. Branch `feature/article-seo-routes` — já integrada; pode ser apagada se quiser.
3. Conferir no Search Console a troca de domínio (enviar o sitemap do domínio novo).
4. Novaryn Play: publicar impresso PT do Hypershot pelo Clube de Autores; atualizar `playCatalog.js` quando Steal An Egg / Animal Hospital saírem.
5. Manuscrito do Hypershot: commits locais em `G:\...\hypershot-guide` ainda sem push para `palludetti/hypershot-player-guide`.

## 9. Prompt para começar a nova instância

> Estou continuando o projeto Novaryn Books / Novaryn Play. O contexto completo está em HANDOFF.md no repositório https://github.com/palludetti/Novaryn-Books. Leia esse arquivo primeiro, siga as regras da seção 6 e me diga o que entendeu antes de mexer em qualquer coisa. Nada de push sem eu pedir.
