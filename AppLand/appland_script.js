/* ============================================================
   APP LAND — appland_script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const languageOrder = ['ja', 'en', 'de', 'fr', 'es', 'pt', 'zh', 'ko', 'id'];
    const languageLabels = {
        ja: '日本語',
        en: 'English',
        de: 'Deutsch',
        fr: 'Francais',
        es: 'Espanol',
        pt: 'Portugues',
        zh: '中文',
        ko: '한국어',
        id: 'Bahasa Indonesia'
    };

    const translations = {
        ja: {
            title: 'APP LAND | VTuber Archive',
            description: 'APP LANDの非公式ファンサイト。所属タレント・概要をまとめたアーカイブ。',
            nav_back: 'BACK TO HUB',
            nav_tag: 'VTuber Production ".LIVE"',
            hero_tagline: 'エンターテイメントとインターネットの未来へ',
            hero_concept: 'Web3.0やメタバースの先駆者として活動するエンターテイメント企業。「電脳少女シロ」をはじめとするVTuberプロダクション<strong>「.LIVE（どっとライブ）」</strong>を運営。YouTubeでの配信活動から楽曲リリース、VR・リアルイベントの企画、企業タイアップまで、最先端のエンタメ体験を幅広く提供しています。',
            stat_active: 'ACTIVE MEMBERS',
            stat_debut: 'DEBUT',
            section_about: '事務所概要',
            section_about_sub: 'ABOUT',
            info_1_title: '🌟 IP開発・プロダクション運営',
            info_1_body: '「電脳少女シロ」筆頭に個性豊かなタレントが所属するVTuberプロダクション<strong>「.LIVE（どっとライブ）」</strong>を運営。配信活動や楽曲リリースなど多岐にわたるサポートを展開します。',
            info_2_title: '🎪 イベント企画・運営',
            info_2_body: 'オンラインからリアルステージまで、所属タレントの魅力を最大限に引き出すイベントを多数企画。ファンと一体になれる熱狂のライブ体験を提供します。',
            info_3_title: '🤝 企業タイアップ・グッズ展開',
            info_3_body: '企業とのコラボレーションや独自タイアップ商品の展開、イベント関連グッズの制作を行い、バーチャルの枠を超えたエンタメビジネスを構築しています。',
            section_roster: '所属タレント',
            section_roster_sub: 'TALENT ROSTER'
        },
        en: {
            title: 'APP LAND | VTuber Archive',
            description: 'An unofficial fan archive for APP LAND and its roster.',
            nav_back: 'BACK TO HUB',
            nav_tag: 'VTuber Production ".LIVE"',
            hero_tagline: 'Toward the future of entertainment and the internet',
            hero_concept: 'An entertainment company at the forefront of Web3.0 and the metaverse. Operates the VTuber production <strong>".LIVE"</strong>, led by Dennou Shoujo Siro. From YouTube streaming to music releases, VR and real-world events, and corporate collaborations, they deliver cutting-edge entertainment experiences.',
            stat_active: 'ACTIVE MEMBERS',
            stat_debut: 'DEBUT',
            section_about: 'Agency Overview',
            section_about_sub: 'ABOUT',
            info_1_title: '🌟 IP Development and Production',
            info_1_body: 'Operates the VTuber production <strong>".LIVE"</strong>, home to unique talents led by Dennou Shoujo Siro. Supports streaming, music releases, and a wide range of activities.',
            info_2_title: '🎪 Event Planning and Production',
            info_2_body: 'Plans events from online programs to live stages, bringing out each talent’s appeal and delivering energetic fan experiences.',
            info_3_title: '🤝 Brand Tie-Ins and Merchandise',
            info_3_body: 'Works on collaborations, tie-in products, and event merchandise to build entertainment beyond the virtual space.',
            section_roster: 'Talent Roster',
            section_roster_sub: 'TALENT ROSTER'
        },
        de: {
            title: 'APP LAND | VTuber Archive',
            description: 'Ein inoffizielles Fan-Archiv fur APP LAND und das Talent-Roster.',
            nav_back: 'ZURUCK ZUM HUB',
            nav_tag: 'VTuber Production ".LIVE"',
            hero_tagline: 'In Richtung Zukunft von Entertainment und Internet',
            hero_concept: 'Ein Entertainment-Unternehmen an der Spitze von Web3.0 und Metaverse. Betreibt die VTuber-Production <strong>".LIVE"</strong>, angefuhrt von Dennou Shoujo Siro. Von YouTube-Streams uber Musikveroffentlichungen bis zu VR- und Live-Events sowie Brand-Kooperationen liefert APP LAND moderne Entertainment-Erlebnisse.',
            stat_active: 'AKTIVE MITGLIEDER',
            stat_debut: 'DEBUT',
            section_about: 'Agentur-Uberblick',
            section_about_sub: 'ABOUT',
            info_1_title: '🌟 IP-Entwicklung und Production',
            info_1_body: 'Betreibt die VTuber-Production <strong>".LIVE"</strong> mit einzigartigen Talenten rund um Dennou Shoujo Siro. Unterstutzt Streams, Musik und vielseitige Aktivitaeten.',
            info_2_title: '🎪 Event-Planung und Produktion',
            info_2_body: 'Plant Events von Online-Programmen bis zu Live-Buhnen und liefert energiegeladene Fan-Erlebnisse.',
            info_3_title: '🤝 Brand-Tie-Ins und Merchandise',
            info_3_body: 'Arbeitet an Kollaborationen, Tie-in-Produkten und Event-Merchandise fur Entertainment uber die virtuelle Welt hinaus.',
            section_roster: 'Talent Roster',
            section_roster_sub: 'TALENT ROSTER'
        },
        fr: {
            title: 'APP LAND | VTuber Archive',
            description: 'Un archive de fans non officielle pour APP LAND et son roster.',
            nav_back: 'RETOUR AU HUB',
            nav_tag: 'VTuber Production ".LIVE"',
            hero_tagline: 'Vers le futur du divertissement et d internet',
            hero_concept: 'Entreprise de divertissement a la pointe du Web3.0 et du metaverse. Gere la production VTuber <strong>".LIVE"</strong>, menee par Dennou Shoujo Siro. Des streams YouTube aux sorties musicales, en passant par les evenements VR et live et les collaborations, APP LAND propose des experiences modernes.',
            stat_active: 'MEMBRES ACTIFS',
            stat_debut: 'DEBUT',
            section_about: 'Presentation de l agence',
            section_about_sub: 'ABOUT',
            info_1_title: '🌟 Developpement IP et production',
            info_1_body: 'Gere la production VTuber <strong>".LIVE"</strong>, avec des talents uniques portes par Dennou Shoujo Siro. Soutient les streams, la musique et de nombreuses activites.',
            info_2_title: '🎪 Evenements et production',
            info_2_body: 'Concoit des evenements en ligne et sur scene pour faire briller les talents et offrir une experience fan energique.',
            info_3_title: '🤝 Collaborations et merchandising',
            info_3_body: 'Travaille sur des collaborations, des produits tie-in et du merch d evenement pour un divertissement au-dela du virtuel.',
            section_roster: 'Talent Roster',
            section_roster_sub: 'TALENT ROSTER'
        },
        es: {
            title: 'APP LAND | VTuber Archive',
            description: 'Archivo de fans no oficial de APP LAND y su roster.',
            nav_back: 'VOLVER AL HUB',
            nav_tag: 'VTuber Production ".LIVE"',
            hero_tagline: 'Hacia el futuro del entretenimiento y de internet',
            hero_concept: 'Empresa de entretenimiento a la vanguardia de Web3.0 y el metaverso. Opera la produccion VTuber <strong>".LIVE"</strong>, liderada por Dennou Shoujo Siro. Desde streams en YouTube hasta lanzamientos musicales, eventos VR y presenciales, y colaboraciones con marcas, APP LAND ofrece experiencias modernas.',
            stat_active: 'MIEMBROS ACTIVOS',
            stat_debut: 'DEBUT',
            section_about: 'Resumen de la agencia',
            section_about_sub: 'ABOUT',
            info_1_title: '🌟 Desarrollo IP y produccion',
            info_1_body: 'Opera la produccion VTuber <strong>".LIVE"</strong>, con talentos unicos liderados por Dennou Shoujo Siro. Apoya streams, musica y diversas actividades.',
            info_2_title: '🎪 Planificacion y produccion de eventos',
            info_2_body: 'Planifica eventos desde programas online hasta escenarios en vivo, resaltando el encanto de los talentos y brindando experiencias energicas.',
            info_3_title: '🤝 Colaboraciones y merchandising',
            info_3_body: 'Trabaja en colaboraciones, productos tie-in y mercancia de eventos para llevar el entretenimiento mas alla de lo virtual.',
            section_roster: 'Talent Roster',
            section_roster_sub: 'TALENT ROSTER'
        },
        pt: {
            title: 'APP LAND | VTuber Archive',
            description: 'Arquivo de fans nao oficial da APP LAND e seu roster.',
            nav_back: 'VOLTAR AO HUB',
            nav_tag: 'VTuber Production ".LIVE"',
            hero_tagline: 'Rumo ao futuro do entretenimento e da internet',
            hero_concept: 'Empresa de entretenimento na linha de frente do Web3.0 e do metaverso. Opera a producao VTuber <strong>".LIVE"</strong>, liderada por Dennou Shoujo Siro. De streams no YouTube a lancamentos musicais, eventos em VR e ao vivo e colaboracoes com marcas, a APP LAND entrega experiencias modernas.',
            stat_active: 'MEMBROS ATIVOS',
            stat_debut: 'DEBUT',
            section_about: 'Visao geral da agencia',
            section_about_sub: 'ABOUT',
            info_1_title: '🌟 Desenvolvimento de IP e producao',
            info_1_body: 'Opera a producao VTuber <strong>".LIVE"</strong>, com talentos unicos liderados por Dennou Shoujo Siro. Apoia streams, musica e varias atividades.',
            info_2_title: '🎪 Planejamento e producao de eventos',
            info_2_body: 'Planeja eventos de programas online a palcos presenciais, destacando o carisma dos talentos e oferecendo experiencias cheias de energia.',
            info_3_title: '🤝 Colaboracoes e merchandising',
            info_3_body: 'Trabalha em colaboracoes, produtos tie-in e merch de eventos para levar o entretenimento alem do virtual.',
            section_roster: 'Talent Roster',
            section_roster_sub: 'TALENT ROSTER'
        },
        zh: {
            title: 'APP LAND | VTuber Archive',
            description: 'APP LAND 的非官方粉丝归档，整理成员与概要。',
            nav_back: '返回 HUB',
            nav_tag: 'VTuber Production ".LIVE"',
            hero_tagline: '走向娱乐与互联网的未来',
            hero_concept: '走在 Web3.0 与元宇宙前沿的娱乐公司，运营由“电脳少女シロ”领衔的 VTuber 企划 <strong>“.LIVE”</strong>。从 YouTube 直播到音乐发行、VR 与线下活动，再到企业合作，持续带来新鲜的娱乐体验。',
            stat_active: '现役成员',
            stat_debut: '出道',
            section_about: '事务所概要',
            section_about_sub: 'ABOUT',
            info_1_title: '🌟 IP 开发与企划运营',
            info_1_body: '运营 VTuber 企划 <strong>“.LIVE”</strong>，聚集以电脳少女シロ为代表的个性成员。支持直播、音乐发行等多种活动。',
            info_2_title: '🎪 活动企划与运营',
            info_2_body: '从线上到线下舞台，策划多种活动，最大化展现成员魅力，带来热烈的现场体验。',
            info_3_title: '🤝 企业联动与周边',
            info_3_body: '推进企业合作、联名商品与活动周边，让娱乐体验不止于虚拟世界。',
            section_roster: '成员列表',
            section_roster_sub: 'TALENT ROSTER'
        },
        ko: {
            title: 'APP LAND | VTuber Archive',
            description: 'APP LAND의 비공식 팬 아카이브. 멤버와 개요를 정리했습니다.',
            nav_back: '허브로 돌아가기',
            nav_tag: 'VTuber Production ".LIVE"',
            hero_tagline: '엔터테인먼트와 인터넷의 미래로',
            hero_concept: 'Web3.0과 메타버스 최전선에서 활동하는 엔터테인먼트 기업. "전뇌소녀 시로"를 중심으로 한 VTuber 프로덕션 <strong>".LIVE"</strong>를 운영합니다. YouTube 방송부터 음악 발매, VR 및 오프라인 이벤트, 기업 콜라보까지 폭넓게 새로운 경험을 제공합니다.',
            stat_active: '활동 멤버',
            stat_debut: '데뷔',
            section_about: '프로덕션 개요',
            section_about_sub: 'ABOUT',
            info_1_title: '🌟 IP 개발 및 프로덕션 운영',
            info_1_body: '"전뇌소녀 시로"를 비롯한 개성 있는 멤버들이 소속된 VTuber 프로덕션 <strong>".LIVE"</strong>를 운영합니다. 방송 활동과 음악 발매 등 다양한 지원을 진행합니다.',
            info_2_title: '🎪 이벤트 기획 및 운영',
            info_2_body: '온라인부터 라이브 스테이지까지 다양한 이벤트를 기획해 멤버의 매력을 극대화하고, 팬과 함께하는 뜨거운 현장 경험을 제공합니다.',
            info_3_title: '🤝 기업 제휴 및 굿즈 전개',
            info_3_body: '기업 콜라보와 제휴 상품, 이벤트 굿즈 제작을 통해 가상에 그치지 않는 엔터테인먼트 비즈니스를 전개합니다.',
            section_roster: '멤버 목록',
            section_roster_sub: 'TALENT ROSTER'
        },
        id: {
            title: 'APP LAND | VTuber Archive',
            description: 'Arsip penggemar tidak resmi untuk APP LAND, merangkum profil dan roster.',
            nav_back: 'KEMBALI KE HUB',
            nav_tag: 'VTuber Production ".LIVE"',
            hero_tagline: 'Menuju masa depan hiburan dan internet',
            hero_concept: 'Perusahaan hiburan yang berada di garis depan Web3.0 dan metaverse. Mengelola produksi VTuber <strong>".LIVE"</strong> yang dipimpin oleh Dennou Shoujo Siro. Dari streaming di YouTube, rilis musik, event VR dan offline, hingga kolaborasi dengan perusahaan, APP LAND menghadirkan pengalaman hiburan yang terus terasa baru.',
            stat_active: 'ANGGOTA AKTIF',
            stat_debut: 'DEBUT',
            section_about: 'Ringkasan Agensi',
            section_about_sub: 'ABOUT',
            info_1_title: '🌟 Pengembangan IP dan Operasional Produksi',
            info_1_body: 'Mengelola produksi VTuber <strong>".LIVE"</strong> yang menaungi talenta unik, dipelopori oleh Dennou Shoujo Siro. Mendukung aktivitas streaming, rilis musik, dan berbagai kegiatan lainnya.',
            info_2_title: '🎪 Perencanaan dan Produksi Event',
            info_2_body: 'Merancang event dari program online hingga panggung live untuk memaksimalkan daya tarik talenta dan memberikan pengalaman fan yang meriah.',
            info_3_title: '🤝 Kolaborasi dan Merchandise',
            info_3_body: 'Mengerjakan kolaborasi, produk tie-in, dan merchandise event untuk membangun hiburan yang melampaui ruang virtual.',
            section_roster: 'Daftar Talenta',
            section_roster_sub: 'TALENT ROSTER'
        }
    };

    let currentLang = localStorage.getItem('appland_lang') || 'ja';
    if (!languageOrder.includes(currentLang)) currentLang = 'ja';

    const titleElement = document.querySelector('title');
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const langSelect = document.getElementById('al-lang-select');

    const getTranslation = (key) => {
        const dict = translations[currentLang] || translations.ja;
        return dict[key] ?? translations.en[key] ?? translations.ja[key] ?? '';
    };

    const applyTranslations = () => {
        document.documentElement.lang = currentLang;
        if (titleElement) titleElement.textContent = getTranslation('title');
        if (descriptionMeta) descriptionMeta.setAttribute('content', getTranslation('description'));
        if (langSelect) langSelect.value = currentLang;
        document.querySelectorAll('[data-i18n]').forEach((node) => {
            node.textContent = getTranslation(node.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-html]').forEach((node) => {
            node.innerHTML = getTranslation(node.getAttribute('data-i18n-html'));
        });
    };

    if (langSelect) {
        langSelect.innerHTML = '';
        languageOrder.forEach((lang) => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = languageLabels[lang] || lang.toUpperCase();
            langSelect.appendChild(option);
        });
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('appland_lang', currentLang);
            applyTranslations();
        });
    }

    applyTranslations();
});


