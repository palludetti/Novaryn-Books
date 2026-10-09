/**
 * Sistema leve de medição de cliques para a Amazon na Novaryn Play.
 * 
 * Atende às seguintes regras:
 * 1. Não depende de serviços externos, pixels ou ferramentas contratadas.
 * 2. Grava cada clique no localStorage (buffer dos últimos 50 cliques) para auditoria e validação local.
 * 3. Dispara um CustomEvent ('novaryn:amazon_click') para permitir integração futura com analytics.
 * 4. Silencioso contra exceções para nunca interromper a navegação do usuário.
 */

const STORAGE_KEY = 'novaryn_play_clicks';
const MAX_STORED_EVENTS = 50;

/**
 * Registra um clique em link de compra da Amazon.
 * @param {Object} params
 * @param {string} params.bookId - ID do livro (ex: '99-nights', 'hypershot')
 * @param {string} params.lang - Idioma da interface ('en' | 'pt')
 * @param {string} params.format - Formato ('ebook' | 'paperback')
 * @param {string} params.store - Loja ('BR' | 'US')
 * @param {string} params.href - URL de destino na Amazon
 */
export function trackAmazonClick({ bookId, lang, format, store, href }) {
  try {
    const payload = {
      event: 'amazon_click',
      bookId,
      lang,
      format: format || 'ebook',
      store: store || 'US',
      href,
      timestamp: new Date().toISOString()
    };

    // 1. Armazena no localStorage para validação/auditoria
    if (typeof window !== 'undefined' && window.localStorage) {
      let clicks = [];
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        clicks = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(clicks)) clicks = [];
      } catch (err) {
        clicks = [];
      }

      clicks.push(payload);
      if (clicks.length > MAX_STORED_EVENTS) {
        clicks = clicks.slice(-MAX_STORED_EVENTS);
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clicks));
    }

    // 2. Dispara CustomEvent para a janela
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('novaryn:amazon_click', { detail: payload }));
    }

    // 3. Log informativo no console em desenvolvimento
    if (typeof console !== 'undefined' && console.log) {
      console.log('[Novaryn Play Click Event]', payload);
    }
  } catch (error) {
    // Falha silenciosa para não travar navegação
  }
}

/**
 * Retorna os cliques registrados no localStorage (para validação / testes).
 * @returns {Array<Object>}
 */
export function getTrackedClicks() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }
  } catch (e) {
    return [];
  }
  return [];
}

/**
 * Retorna um sumário consolidado dos cliques registrados localmente
 * agrupados por livro, idioma, formato e loja.
 * @returns {Object}
 */
export function getClickSummary() {
  const clicks = getTrackedClicks();
  const summary = {
    total: clicks.length,
    byBook: {},
    byLang: {},
    byFormat: {},
    byStore: {}
  };

  for (const c of clicks) {
    summary.byBook[c.bookId] = (summary.byBook[c.bookId] || 0) + 1;
    summary.byLang[c.lang] = (summary.byLang[c.lang] || 0) + 1;
    summary.byFormat[c.format] = (summary.byFormat[c.format] || 0) + 1;
    summary.byStore[c.store] = (summary.byStore[c.store] || 0) + 1;
  }

  return summary;
}

// Expõe helpers no objeto window para consulta direta no console do navegador
if (typeof window !== 'undefined') {
  window.novarynPlay = {
    getClicks: getTrackedClicks,
    getSummary: getClickSummary
  };
}
