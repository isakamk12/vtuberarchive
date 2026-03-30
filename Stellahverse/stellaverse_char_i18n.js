(function () {
    'use strict';
    const LANG_KEY = 'vtuber_lang';
    function getSavedLang() { return localStorage.getItem(LANG_KEY) || 'ja'; }
    function applyLanguage(lang) {
        const dict = (window.stellaverse_translations && window.stellaverse_translations[lang]) || {};
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (el.tagName === 'TITLE') { document.title = dict[key]; }
                else { el.textContent = dict[key]; }
            }
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        applyLanguage(getSavedLang());
    });
})();
