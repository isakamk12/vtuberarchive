/**
 * Nijisanji Archive - Multi-language Script (Phase 1: EN, DE, FR)
 * Dynamic Scrollable Switcher Implementation
 */

const translations = {
    ja: {
        nav_home: "ホーム",
        nav_nijisanji: "にじさんじ",
        hero_subtitle: "[ アーカイブ・データベース ]",
        report_legacy_title: "運営実績と継続性",
        report_legacy_text: "本アーカイブでは過去の組織的変遷やトラブルも記録していますが、<strong>最も重要なのは「様々な試練を乗り越え、現在まで運営が継続し、タレントたちが輝き続けている」という事実</strong>です。ファンとの絆や、試行錯誤を通じて培われた運営ノウハウこそが、この機関の真の価値です。",
        report_overview_title: "概要",
        report_overview_subtitle: "Anycolorにおける「にじさんじ」タレントポートフォリオの構造的分析と網羅的名簿",
        report_overview_text: "バーチャルライバー業界において、Anycolor株式会社が運営する「にじさんじ」プロジェクトは、そのタレント数の多さと多様なユニット展開において、類を見ない巨大なポートフォリオを形成している。2018年の発足当初から現在に至るまで、その膨張は止まる所を知らない。",
        roster_title: "所属ライザー名簿",
        graduated: "卒業",
        lang_name: "日本語"
    },
    en: {
        nav_home: "HOME",
        nav_nijisanji: "NIJISANJI",
        hero_subtitle: "[ The Virtual Library ]",
        report_legacy_title: "Legacy & Resilience",
        report_legacy_text: "While this archive records organizational shifts and past challenges, the heart of the matter remains: <strong>despite every trial, the project endures, and the talents continue to shine</strong>. The bond with fans and the expertise gained through trial and error are the true treasures of this agency.",
        report_overview_title: "The Landscape",
        report_overview_subtitle: "A comprehensive structural analysis of NIJISANJI's vast talent portfolio under Anycolor Inc.",
        report_overview_text: "In the VTuber industry, the NIJISANJI project stands as a titan. Starting from the original '1st Gen' in 2018, it has grown into a massive ecosystem of diverse units and labels. As of late 2024, it continues to lead the industry through constant evolution and expansion.",
        roster_title: "THE VIRTUAL STARS",
        graduated: "Graduated",
        lang_name: "English"
    },
    de: {
        nav_home: "START",
        nav_nijisanji: "NIJISANJI",
        hero_subtitle: "[ Das Virtuelle Archiv ]",
        report_legacy_title: "Erbe & Beständigkeit",
        report_legacy_text: "Dieses Archiv hält zwar die organisatorischen Veränderungen fest, aber das Wichtigste bleibt: <strong>Trotz aller Prüfungen glänzen die Talente weiterhin</strong>. Die tiefe Verbindung zu den Fans und das über Jahre gewonnene Know-how sind der wahre Kern dieser Institution.",
        report_overview_title: "Überblick",
        report_overview_subtitle: "Strukturelle Analyse und vollständiges Verzeichnis des NIJISANJI-Portfolios von Anycolor Inc.",
        report_overview_text: "In der Welt der VTuber ist NIJISANJI ein Gigant. Was 2018 mit nur wenigen Mitgliedern begann, hat sich zu einem beispiellosen Netzwerk entwickelt. Die ständige Innovation und das Wachstum machen die Agency zu einem Vorreiter der virtuellen Unterhaltung.",
        roster_title: "DIE VIRTUELLEN STARS",
        graduated: "Abschluss",
        lang_name: "Deutsch"
    },
    fr: {
        nav_home: "ACCUEIL",
        nav_nijisanji: "NIJISANJI",
        hero_subtitle: "[ La Bibliothèque Virtuelle ]",
        report_legacy_title: "Héritage & Continuité",
        report_legacy_text: "Bien que cette archive retrace les évolutions et les défis passés, l'essentiel demeure : <strong>au-delà des épreuves, les talents continuent d'illuminer la scène</strong>. Le lien indéfectible avec les fans et l'expertise acquise au fil du temps constituent la véritable valeur de cette agence.",
        report_overview_title: "Vue d'ensemble",
        report_overview_subtitle: "Analyse structurelle et répertoire exhaustif du vaste catalogue NIJISANJI chez Anycolor Inc.",
        report_overview_text: "Dans l'univers des VTubers, NIJISANJI s'impose comme une référence incontournable. Depuis ses débuts en 2018, le projet a su créer un écosystème unique, regroupant une multitude de talents et d'unités qui redéfinissent l'avenir du divertissement virtuel.",
        roster_title: "LES ÉTOILES VIRTUELLES",
        graduated: "Diplômé",
        lang_name: "Français"
    }
};

class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem('nijisanji_lang') || 'ja';
        this.init();
    }

    init() {
        this.renderSwitcher();
        this.updateDOM();
        this.setupEventListeners();
    }

    renderSwitcher() {
        const container = document.getElementById('i18n-switcher-container');
        if (!container) return;

        const langs = Object.keys(translations);
        const currentIndex = langs.indexOf(this.currentLang);

        container.innerHTML = `
            <div class="i18n-dial-wrapper">
                <div class="i18n-dial-label">NETWORK LOCALE</div>
                <div class="i18n-dial-viewport">
                    <div class="i18n-dial-list" id="i18n-dial-list">
                        ${langs.map(l => `<div class="i18n-dial-item ${l === this.currentLang ? 'active' : ''}" data-lang="${l}">${translations[l].lang_name}</div>`).join('')}
                    </div>
                </div>
                <div class="i18n-dial-indicator"></div>
            </div>
        `;

        this.positionDial(currentIndex);
    }

    positionDial(index) {
        const list = document.getElementById('i18n-dial-list');
        if (list) {
            // Each item is roughly 30px high in the CSS
            const offset = index * -30;
            list.style.transform = `translateY(${offset}px)`;
        }
    }

    setupEventListeners() {
        const list = document.getElementById('i18n-dial-list');
        if (list) {
            list.addEventListener('click', (e) => {
                const item = e.target.closest('.i18n-dial-item');
                if (item) {
                    const lang = item.dataset.lang;
                    this.switchLanguage(lang);
                }
            });

            // Allow mouse wheel scrolling
            const viewport = list.parentElement;
            viewport.addEventListener('wheel', (e) => {
                e.preventDefault();
                const langs = Object.keys(translations);
                let newIndex = langs.indexOf(this.currentLang);
                if (e.deltaY > 0) newIndex++;
                else newIndex--;

                if (newIndex >= 0 && newIndex < langs.length) {
                    this.switchLanguage(langs[newIndex]);
                }
            }, { passive: false });
        }
    }

    switchLanguage(lang) {
        if (this.currentLang === lang) return;
        this.currentLang = lang;
        localStorage.setItem('nijisanji_lang', lang);
        
        this.updateDOM();
        this.renderSwitcher();
    }

    updateDOM() {
        const langData = translations[this.currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (!key) return;
            const val = langData[key];
            if (typeof val !== 'string') return;
            el.textContent = val;
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18nHtml;
            if (!key) return;
            const val = langData[key];
            if (typeof val !== 'string') return;
            el.innerHTML = val;
        });

        // Update graduated tags specifically
        document.querySelectorAll('.status-tag').forEach(tag => {
            if (tag.textContent.trim().toLowerCase() === 'graduated' || tag.textContent.trim() === '卒業' || tag.textContent.trim() === 'Abschluss' || tag.textContent.trim() === 'Diplômé') {
                tag.textContent = langData.graduated;
            }
        });
        
        // Update document title if needed
        document.title = (this.currentLang === 'ja' ? 'NIJISANJI' : 'NIJISANJI') + " - VTuber Archive Premium";
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18nManager();
});
