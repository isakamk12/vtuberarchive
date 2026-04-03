/**
 * Tsukino Mito - Character Page Script (i18n PoC)
 */

const mitoTranslations = {
    ja: {
        back_to_db: "データベースに戻る",
        char_jp_name: "月ノ美兎",
        catchphrase: "「起立！ 気をつけ！ こんにちは、月ノ美兎です」",
        sec_intro: "INTRODUCTION",
        intro_text: "にじさんじの「顔」であり、VTuber界の先駆者。学級委員を務める清楚な高校生…のはずが、洗濯機の上で配信を行ったり、雑草を食べたエピソードを語ったりと、その人間性は極めてパンクでサブカルチャーへの造詣が深い。ニコニコ動画やFlash時代のインターネット文化を背景に持ち、彼女の生み出す「笑い」は常に予測不能なエネルギーに満ちている。",
        lang_name: "日本語"
    },
    en: {
        back_to_db: "BACK TO DATABASE",
        char_jp_name: "Tsukino Mito",
        catchphrase: "Stand up! Bow! Hello, I'm Tsukino Mito!",
        sec_intro: "INTRODUCTION",
        intro_text: "The 'face' of Nijisanji and a pioneer of the VTuber industry. Nominally a prim and proper class representative, her personality is actually extremely punk and deeply rooted in subculture. With a background in early internet culture, the humor she creates is always filled with unpredictable energy.",
        lang_name: "English"
    },
    de: {
        back_to_db: "ZURÜCK ZUR DATENBANK",
        char_jp_name: "Tsukino Mito",
        catchphrase: "Aufstehen! Verbeugen! Hallo, ich bin Tsukino Mito!",
        sec_intro: "EINLEITUNG",
        intro_text: "Das Gesicht von Nijisanji und eine Pionierin der VTuber-Szene. Eigentlich eine ordentliche Klassensprecherin, doch ihr Charakter ist tief in der Subkultur verwurzelt und subversiv. Ihr Humor ist unberechenbar und voller Energie.",
        lang_name: "Deutsch"
    },
    fr: {
        back_to_db: "RETOUR À LA BASE",
        char_jp_name: "Tsukino Mito",
        catchphrase: "Levez-vous ! Inclinez-vous ! Bonjour, c'est Tsukino Mito !",
        sec_intro: "PRÉSENTATION",
        intro_text: "L'icône de Nijisanji et une pionnière de l'industrie VTuber. Derrière son image de déléguée de classe modèle se cache une personnalité punk et une profonde connaissance de la culture web. Son humour imprévisible déborde d'énergie.",
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

        const langs = Object.keys(mitoTranslations);
        const currentIndex = langs.indexOf(this.currentLang);

        container.innerHTML = `
            <div class="i18n-dial-wrapper">
                <div class="i18n-dial-label">CHARACTER LOCALE</div>
                <div class="i18n-dial-viewport">
                    <div class="i18n-dial-list" id="i18n-dial-list">
                        ${langs.map(l => `<div class="i18n-dial-item ${l === this.currentLang ? 'active' : ''}" data-lang="${l}">${mitoTranslations[l].lang_name}</div>`).join('')}
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

            const viewport = list.parentElement;
            viewport.addEventListener('wheel', (e) => {
                e.preventDefault();
                const langs = Object.keys(mitoTranslations);
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
        const langData = mitoTranslations[this.currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (langData[key]) {
                const icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' ' + langData[key]));
                } else {
                    el.textContent = langData[key];
                }
            }
        });
        
        document.title = (this.currentLang === 'ja' ? '月ノ美兎' : 'Tsukino Mito') + " | NIJISANJI ARCHIVE";
    }
}

// Initial apply
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18nManager();
    
    // Intersection Observer for Scroll Reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
