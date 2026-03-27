/**
 * Aogiri High School Character Page - Language Switcher
 * Reads translations from indie_translations (loaded via i18n_indie.js)
 * and applies them to elements with data-i18n attributes.
 */
(function () {
    'use strict';

    const LANG_KEY = 'vtuber_lang';

    const LANGS = [
        { code: 'ja',       label: '日本語' },
        { code: 'en',       label: 'English' },
        { code: 'de',       label: 'Deutsch' },
        { code: 'fr',       label: 'Français' },
        { code: 'es',       label: 'Español' },
        { code: 'pt',       label: 'Português' },
        { code: 'zh-Hans',  label: '简体中文' },
        { code: 'zh-Hant',  label: '繁體中文' },
        { code: 'ko',       label: '한국어' },
        { code: 'id',       label: 'Bahasa Indonesia' },
    ];

    function getSavedLang() {
        return localStorage.getItem(LANG_KEY) || 'ja';
    }

    function saveLang(code) {
        localStorage.setItem(LANG_KEY, code);
    }

    function applyLanguage(lang) {
        const dict = (window.indie_translations && window.indie_translations[lang])
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
                // Preserve child elements (e.g. <strong>, <a>)
                // Only replace if the element has no child elements with data-i18n
                const hasChildI18n = el.querySelector('[data-i18n]');
                if (!hasChildI18n) {
                    el.textContent = val;
                }
            }
        });

        document.documentElement.lang = lang;

        // Update active state on switcher buttons
        document.querySelectorAll('.aogiri-lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    function buildSwitcher() {
        // Find nav element to attach switcher
        const nav = document.querySelector('nav') || document.querySelector('.u-nav') || document.body;

        const wrapper = document.createElement('div');
        wrapper.className = 'aogiri-lang-switcher';
        wrapper.setAttribute('role', 'navigation');
        wrapper.setAttribute('aria-label', 'Language selector');

        LANGS.forEach(({ code, label }) => {
            const btn = document.createElement('button');
            btn.className = 'aogiri-lang-btn';
            btn.dataset.lang = code;
            btn.textContent = label;
            btn.setAttribute('title', `Switch to ${label}`);
            btn.addEventListener('click', () => {
                saveLang(code);
                applyLanguage(code);
            });
            wrapper.appendChild(btn);
        });

        nav.appendChild(wrapper);
    }

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .aogiri-lang-switcher {
                display: flex;
                flex-wrap: wrap;
                gap: 4px;
                padding: 6px 12px;
                align-items: center;
                font-family: 'Inter', 'Noto Sans JP', sans-serif;
            }
            .aogiri-lang-btn {
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.18);
                color: rgba(255,255,255,0.75);
                border-radius: 4px;
                padding: 3px 8px;
                font-size: 0.68rem;
                font-family: inherit;
                cursor: pointer;
                letter-spacing: 0.03em;
                transition: background 0.18s, color 0.18s, border-color 0.18s;
                white-space: nowrap;
            }
            .aogiri-lang-btn:hover {
                background: rgba(255,255,255,0.18);
                color: #fff;
                border-color: rgba(255,255,255,0.4);
            }
            .aogiri-lang-btn.active {
                background: rgba(255,255,255,0.22);
                color: #fff;
                border-color: rgba(255,255,255,0.5);
                font-weight: 700;
            }
            /* Urame page — dark nav override */
            .urame-page .aogiri-lang-switcher {
                border-top: 1px solid rgba(255,255,255,0.08);
                margin-top: 4px;
            }
            @media (max-width: 600px) {
                .aogiri-lang-switcher { gap: 3px; padding: 4px 8px; }
                .aogiri-lang-btn { font-size: 0.62rem; padding: 2px 6px; }
            }
        `;
        document.head.appendChild(style);
    }

    function init() {
        // Wait for i18n_indie.js to be available
        if (typeof window.indie_translations === 'undefined') {
            // Retry once after a short delay
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
