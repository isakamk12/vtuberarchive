document.addEventListener("DOMContentLoaded", () => {
  // Use indie_translations loaded from i18n_indie.js
  if (typeof indie_translations === 'undefined') return;

  const userLang = localStorage.getItem('vt_archive_lang') || 'ja';
  
  // Inject language selector into the navigation if possible
  const navContainer = document.querySelector('nav') || document.body;
  const langSelectContainer = document.createElement('div');
  langSelectContainer.className = 'lang-switcher-container';
  langSelectContainer.style.display = 'flex';
  langSelectContainer.style.alignItems = 'center';
  langSelectContainer.style.gap = '0.5rem';
  langSelectContainer.style.marginLeft = 'auto';
  langSelectContainer.style.flexShrink = '0';
  langSelectContainer.style.paddingLeft = '1rem';
  
  const langSelect = document.createElement('select');
  langSelect.className = 'lang-switcher';
  langSelect.style.padding = '5px 10px';
  langSelect.style.background = 'rgba(0,0,0,0.7)';
  langSelect.style.color = '#fff';
  langSelect.style.border = '1px solid #444';
  langSelect.style.borderRadius = '4px';
  langSelect.style.cursor = 'pointer';
  langSelect.style.fontFamily = 'inherit';

  const langs = {
    'ja': '日本語',
    'en': 'English',
    'en-GB': 'English (UK)',
    'en-AU': 'English (Australia)',
    'en-IE': 'English (Ireland)',
    'es': 'Español',
    'es-419': 'Español (LatAm)',
    'pt': 'Português',
    'pt-BR': 'Português (Brasil)',
    'fr': 'Français',
    'fr-CA': 'Français (Canada)',
    'de': 'Deutsch',
    'it': 'Italiano',
    'ru': 'Русский',
    'pl': 'Polski',
    'no': 'Norsk',
    'sv': 'Svenska',
    'fi': 'Suomi',
    'fil': 'Filipino',
    'zh-Hans': '简体中文',
    'zh-Hant': '繁體中文',
    'ko': '한국어',
    'id': 'Bahasa Indonesia'
  };

  Object.entries(langs).forEach(([code, label]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = label;
    if (code === userLang) opt.selected = true;
    langSelect.appendChild(opt);
  });

  langSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    localStorage.setItem('vt_archive_lang', selected);
    applyLanguage(selected);
  });

  langSelectContainer.appendChild(langSelect);
  navContainer.appendChild(langSelectContainer);

  function applyLanguage(lang) {
    const dict = indie_translations[lang] || indie_translations['ja'];
    if (!dict) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'META') {
          el.setAttribute('content', dict[key]);
        } else if (el.tagName === 'TITLE') {
          document.title = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
    document.documentElement.lang = lang;
  }

  // Initial apply
  applyLanguage(userLang);
});
