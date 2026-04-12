document.addEventListener("DOMContentLoaded", () => {
    /**
     * i18n Registry & Merger Logic
     * Support for multiple translation sources for modularity.
     */
    
    // Default language list if 'langs' is not defined elsewhere
    const defaultLangs = {
        "ja": "日本語",
        "en": "English",
        "es": "Español",
        "zh-Hans": "简体中文",
        "zh-Hant": "繁體中文",
        "ko": "한국어"
    };

    // Use globally defined 'langs' or our default
    const langList = (typeof langs !== 'undefined') ? langs : defaultLangs;

    /**
     * Collect and Merge all available translation sources.
     * These can be:
     * 1. window.VT_I18N_OBJECTS (preferred modular registry)
     * 2. window.indie_translations (legacy / mega-file)
     * 3. window.translations (root UI)
     */
    function getMergedDictionary(lang) {
        let merged = {};
        
        // List of sources to check and merge (later sources override earlier ones)
        const sources = [];
        
        if (typeof translations !== 'undefined') sources.push(translations);
        if (typeof indie_translations !== 'undefined') sources.push(indie_translations);
        if (window.VT_I18N_OBJECTS && Array.isArray(window.VT_I18N_OBJECTS)) {
            sources.push(...window.VT_I18N_OBJECTS);
        }

        sources.forEach(source => {
            const dict = source[lang] || source['ja'];
            if (dict) {
                Object.assign(merged, dict);
            }
        });

        return merged;
    }

    const userLang = localStorage.getItem('vt_archive_lang') || 'ja';
    
    // Setup language switcher
    const existingSelect = document.getElementById('al-lang-select');

    function setupSelector(selectEl) {
        // Clear and rebuild options
        selectEl.innerHTML = '';
        Object.entries(langList).forEach(([code, label]) => {
            const opt = document.createElement('option');
            opt.value = code;
            opt.textContent = label;
            if (code === userLang) opt.selected = true;
            selectEl.appendChild(opt);
        });

        selectEl.addEventListener('change', (e) => {
            const selected = e.target.value;
            localStorage.setItem('vt_archive_lang', selected);
            applyLanguage(selected);
        });
    }

    if (existingSelect) {
        setupSelector(existingSelect);
    } else {
        // Create a default switcher if it doesn't exist
        const navContainer = document.querySelector('nav') || document.body;
        const container = document.createElement('div');
        container.className = 'lang-switcher-container';
        container.style.cssText = 'display:flex; align-items:center; gap:0.5rem; margin-left:auto; flex-shrink:0; padding-left:1rem;';
        
        const langSelect = document.createElement('select');
        langSelect.className = 'lang-switcher';
        langSelect.style.cssText = 'padding:5px 10px; background:rgba(0,0,0,0.7); color:#fff; border:1px solid #444; border-radius:4px; cursor:pointer; font-family:inherit;';

        setupSelector(langSelect);
        container.appendChild(langSelect);
        navContainer.appendChild(container);
    }

    function applyLanguage(lang) {
        const dict = getMergedDictionary(lang);
        if (Object.keys(dict).length === 0) return;
        
        // Text translations (data-i18n)
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

        // HTML translations (data-i18n-html)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        document.documentElement.lang = lang;
    }

    // Initial apply
    applyLanguage(userLang);
});
