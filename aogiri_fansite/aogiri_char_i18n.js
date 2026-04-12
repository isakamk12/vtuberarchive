/**
 * Aogiri High School Character Page - Language Switcher
 * Reads translations from indie_translations (loaded via i18n_indie.js)
 * and applies them to elements with data-i18n attributes.
 */
(function () {
    'use strict';

    const LANG_KEY = 'vt_archive_lang';

    const LANGS = [
        { code: 'ja',       label: 'JP (日本語)' },
        { code: 'en',       label: 'EN (English)' },
        { code: 'no',       label: 'NO (Norsk)' },
        { code: 'sv',       label: 'SV (Svenska)' },
        { code: 'fi',       label: 'FI (Suomi)' },
        { code: 'fil',      label: 'FIL (Filipino)' },
        { code: 'de',       label: 'DE (Deutsch)' },
        { code: 'fr',       label: 'FR (Français)' },
        { code: 'es',       label: 'ES (Español)' },
        { code: 'pt',       label: 'PT (Português)' },
        { code: 'zh-Hans',  label: 'ZH (简体中文)' },
        { code: 'zh-Hant',  label: 'ZH (繁體中文)' },
        { code: 'ko',       label: 'KO (한국어)' },
        { code: 'id',       label: 'ID (Bahasa Indonesia)' },
    ];

    function getSavedLang() {
        return localStorage.getItem(LANG_KEY) || 'ja';
    }

    function saveLang(code) {
        localStorage.setItem(LANG_KEY, code);
    }

    function applyLanguage(lang) {
        const dict = (window.indie_translations && window.indie_translations[lang])
            || (window.indie_translations && window.indie_translations[lang.split('-')[0]])
            || (window.indie_translations && window.indie_translations['ja'])
            || {};

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (!dict[key]) return;

            const val = dict[key];
            if (el.tagName === 'TITLE') {
                document.title = val;
            } else if (el.tagName === 'META') {
                el.setAttribute('content', val);
            } else {
                const hasChildI18n = el.querySelector('[data-i18n]');
                if (!hasChildI18n) {
                    el.textContent = val;
                }
            }
        });

        document.documentElement.lang = lang;

        // Update active state on switcher
        const select = document.querySelector('.aogiri-lang-select');
        if (select) select.value = lang;
    }

    function buildSwitcher() {
        const nav = document.querySelector('.nav-container') || document.querySelector('nav') || document.body;

        const wrapper = document.createElement('div');
        wrapper.className = 'aogiri-lang-wrapper';
        
        const select = document.createElement('select');
        select.className = 'aogiri-lang-select';
        select.setAttribute('aria-label', 'Language selector');

        LANGS.forEach(({ code, label }) => {
            const opt = document.createElement('option');
            opt.value = code;
            opt.textContent = label;
            select.appendChild(opt);
        });

        select.addEventListener('change', (e) => {
            const code = e.target.value;
            saveLang(code);
            applyLanguage(code);
        });

        wrapper.appendChild(select);
        nav.appendChild(wrapper);
    }

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .aogiri-lang-wrapper {
                margin-left: auto;
                padding-left: 15px;
            }
            .aogiri-lang-select {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: rgba(255, 255, 255, 0.9);
                border-radius: 4px;
                padding: 4px 8px;
                font-size: 0.75rem;
                font-family: inherit;
                cursor: pointer;
                outline: none;
                transition: border-color 0.2s, background 0.2s;
            }
            .aogiri-lang-select:hover {
                border-color: rgba(255, 255, 255, 0.4);
                background: rgba(255, 255, 255, 0.1);
            }
            .aogiri-lang-select option {
                background: #1a1a1a;
                color: #fff;
            }
            @media (max-width: 600px) {
                .aogiri-lang-wrapper { padding-left: 0; margin-top: 5px; width: 100%; }
                .aogiri-lang-select { width: 100%; font-size: 0.7rem; }
            }
        `;
        document.head.appendChild(style);
    }

    function init() {
        if (typeof window.indie_translations === 'undefined') {
            setTimeout(init, 150);
            return;
        }
        injectStyles();
        buildSwitcher();
        applyLanguage(getSavedLang());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
