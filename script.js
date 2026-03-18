document.addEventListener('DOMContentLoaded', () => {
    const agencyGrid = document.getElementById('agencyGrid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const totalAgenciesEl = document.getElementById('totalAgencies');
    const emptyState = document.getElementById('emptyState');
    const langSelect = document.getElementById('langSelect');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let currentLang = localStorage.getItem('vt_archive_lang') || 'ja';

    const agencies = [

        // ── 個人勢 ──
        {
            name: "個人勢 VTuber",
            name_en: "Independent VTubers",
            name_es: "VTubers Independientes",
            name_zh: "个人势 VTuber",
            name_ko: "개인세 버츄얼 유튜버",
            sub: "Independent",
            filter: "indie",
            color: "255, 142, 83",
            icon: "I",
            url: "IndieVtubers/indie_index.html",
            tags: ["Agency"],
            desc: "MyHoloTVはVTuberプロジェクト。アイドル・ゲームが特徴。公式サイトで活動情報が整理されている。",
            desc_en: "MyHoloTV is a VTuber project. Known for idol and gaming. The site organizes activity information.",
            desc_es: "MyHoloTV is a proyecto VTuber. Destaca por idol y los juegos. El sitio organiza la información de actividades.",
            desc_zh: "MyHoloTV是VTuber 项目。以偶像与游戏为特色。官网整理了活动信息。",
            desc_ko: "마이홀로TV (MyHoloTV)는 VTuber 프로젝트입니다. 아이돌 및 게임이(가) 특징입니다. 공식 사이트에서 활동 정보가 정리되어 있습니다."
        },

        // ── JAPAN (稼働中) ──

        {
            name: "あおぎり高校",
            name_en: "Aogiri High School",
            name_es: "Aogiri High School",
            name_zh: "青桐高校",
            name_ko: "아오기리 고교",
            sub: "Aogiri High School",
            filter: "major",
            color: "17, 153, 142",
            icon: "A",
            url: "aogiri_fansite/aogiri_index.html",
            tags: ["Comedy", "Shorts"],
            desc: "都内の中小規模事務所からスタートし、現在は独自のコメディ路線で盤石な人気を誇っている。公式サイトでは各部員の詳細なプロフィールが閲覧可能。",
            desc_en: "Started as a small group in Tokyo, they're now loved for their unique comedy style. Check out their member profiles!",
            desc_es: "Comenzaron como un pequeño grupo en Tokio; ahora son amados por su estilo de comedia único. ¡Mira sus perfiles!",
            desc_zh: "从东京都内的中小规模事务所起步，现在凭借独特的喜剧路线拥有着稳固的人气。官网可以查看各成员的详细档案。",
            desc_ko: "도쿄의 중소규모 사무소에서 시작해, 현재는 독자적인 코미디 노선으로 확고한 인기를 자랑합니다. 공식 사이트에서 멤버들의 상세 프로필을 확인할 수 있습니다."
        },
        {
            name: "APP LAND", sub: "アップランド", filter: "corporate", color: "80, 200, 120", icon: "A", url: "AppLand/appland_index.html", tags: ["Agency", "JP"],
            desc: "電脳少女シロをはじめとする老舗。独自の技術力とバラエティ豊かな所属タレントが特徴で、公式サイトの更新も継続されている。",
            desc_en: "A long-standing agency home to Cyber Girl Siro. Known for unique tech and diverse talents with a constantly updated site.",
            desc_es: "Una agencia veterana hogar de Cyber Girl Siro. Conocida por su tecnología única y talentos diversos con un sitio actualizado.",
            desc_zh: "以电脑少女小白（Siro）为代表的老牌事务所。以独特的技术实力和丰富多样的所属艺人为特征，官网持续更新中。",
            desc_ko: "전뇌소녀 시로를 비롯한 유서 깊은 곳입니다. 독자적인 기술력과 다채로운 소속 탤런트가 특징이며 공식 사이트도 꾸준히 업데이트됩니다."
        },
        {
            name: "RK Music",
            name_en: "RK Music",
            name_es: "RK Music",
            name_zh: "RK Music",
            name_ko: "RK Music",
            sub: "アールケーミュージック",
            filter: "corporate",
            color: "255, 80, 80",
            icon: "R",
            url: "RKMusic/rkmusic_index.html",
            tags: ["Music", "JP"],
            desc: "音楽特化型の事務所。所属シンガーのクオリティが高く、アーティストとしてのブランディングが公式サイトからも読み取れる。",
            desc_en: "A music-focused agency. Their singers are high-quality artists, as seen on their well-branded official site.",
            desc_es: "Una agencia centrada en la música. Sus cantantes son artistas de alta calidad, como se ve en su sitio oficial bien posicionado.",
            desc_zh: "音乐特化型事务所。所属歌手质量极高，从官网也能感受到其作为艺术家的品牌塑造。",
            desc_ko: "음악 특화형 사무소입니다. 소속 싱어들의 퀄리티가 높으며, 아티스트로서의 브랜딩이 공식 사이트에서도 잘 드러납니다."
        },
        {
            name: "うおむすめ",
            name_en: "Uomusume",
            name_es: "Uomusume",
            name_zh: "鱼娘 (Uomusume)",
            name_ko: "우오무스메",
            sub: "Uomusume",
            filter: "indie",
            color: "100, 200, 255",
            icon: "U",
            url: "Uomusume/uomusume_index.html",
            tags: ["Variety", "JP"],
            desc: "魚をモチーフにした個性派プロジェクト。独自のニッチな層を掴んでおり、現在も活動を継続中。",
            desc_en: "A unique project with a fish motif. They've captured a niche audience and remain active today.",
            desc_es: "Un proyecto único con temática de peces. Han captado una audiencia de nicho y siguen activos hoy en día.",
            desc_zh: "以鱼为主题的个性派项目。抓住了独特的细分受众，目前仍在持续活动中。",
            desc_ko: "생선을 모티브로 한 개성파 프로젝트입니다. 독자적인 니치 시장을 공략하고 있으며, 현재도 활동을 계속하고 있습니다."
        },
        {
            name: "エアリープロダクション",
            name_en: "Airy Production",
            name_es: "Airy Production",
            name_zh: "Airy Production",
            name_ko: "에어리 프로덕션",
            sub: "Airy Production",
            filter: "indie",
            color: "135, 206, 235",
            icon: "A",
            url: "Airylee/airylee_index.html",
            tags: ["Agency", "JP"],
            desc: "複数の期生を擁し、着実に規模を拡大している。公式サイトはモダンな設計で、タレントごとのスケジュール確認も容易だ。",
            desc_en: "Steadily expanding with multiple generations. Their modern site makes it easy to check talent schedules.",
            desc_es: "Expandiéndose constantemente con múltiples generaciones. Su sitio moderno facilita la consulta de horarios de talentos.",
            desc_zh: "拥有多期成员，规模正在稳步扩大。官网设计现代，便于查看每位艺人的直播日程。",
            desc_ko: "여러 기수를 보유하고 있으며 꾸준히 규모를 확장하고 있습니다. 공식 사이트는 모던한 설계로 탤런트별 스케줄 확인이 용이합니다."
        },
        {
            name: "AKA Virtual",
            name_en: "AKA Virtual",
            name_es: "AKA Virtual",
            name_zh: "AKA Virtual",
            name_ko: "AKA 버추얼",
            sub: "AKAバーチャル",
            filter: "indie",
            color: "220, 20, 60",
            icon: "A",
            url: "AKAVirtual/akavirtual_index.html",
            tags: ["Agency", "JP"],
            desc: "3D技術に強みを持ち、グローバルな展開も見据えた運営を行っている。公式サイトは多言語対応が進んでいる。",
            desc_en: "Strong in 3D tech with a global outlook. Their official site features extensive multi-language support.",
            desc_es: "Fuertes en tecnología 3D con una visión global. Su sitio oficial cuenta con un amplio soporte multiidioma.",
            desc_zh: "在3D技术方面具有优势，并在运营中着眼于全球化发展。官方网站的多语言支持正在完善中。",
            desc_ko: "3D 기술에 강점이 있으며 글로벌 전개를 염두에 두고 운영하고 있습니다. 공식 사이트는 다국어 대응이 잘 되어 있습니다."
        },
        {
            name: "ENILIS VLiver",
            name_en: "ENILIS Project",
            name_es: "ENILIS Project",
            name_zh: "ENILIS Project",
            name_ko: "에닐리스 프로젝트",
            sub: "ENILIS Project",
            filter: "indie",
            color: "100, 255, 200",
            icon: "E",
            url: "Enilis/enilis_index.html",
            tags: ["Agency", "JP"],
            desc: "配信プラットフォームと密接に連携したプロジェクト。比較的新しい組織だが、精力的な募集とデビューを繰り返している。",
            desc_en: "A project closely linked with streaming platforms. Despite being new, they're actively recruiting and debuting talent.",
            desc_es: "Un proyecto estrechamente vinculado con las plataformas de streaming. Aunque es nuevo, reclutan y debutan talentos activamente.",
            desc_zh: "与直播平台紧密联动的项目。虽然是一个相对较新的组织，但正在积极进行招募和成员出道。",
            desc_ko: "방송 플랫폼과 밀접하게 연계된 프로젝트입니다. 비교적 신생 조직이지만 정력적인 모집과 데뷔를 반복하고 있습니다."
        },
        {
            name: "えのぐ",
            name_en: "enogu",
            name_es: "enogu",
            name_zh: "enogu",
            name_ko: "에노구",
            sub: "enogu",
            filter: "corporate",
            color: "255, 180, 50",
            icon: "E",
            url: "Enogu/enogu_index.html",
            tags: ["Music", "Idol"],
            desc: "VRアイドルグループとして独自の地位を築いている。公式サイトはライブ情報やディスコグラフィの整理が非常に丁寧だ。",
            desc_en: "Holds a unique position as a VR idol group. Their site beautifully organizes live information and discography.",
            desc_es: "Mantiene una posición única como grupo de idols de VR. Su sitio organiza de forma excelente la información en vivo y discografía.",
            desc_zh: "作为VR偶像团体建立了独特的地位。官方网站对Live信息和作品目录的整理非常细致。",
            desc_ko: "VR 아이돌 그룹으로서 독자적인 지위를 구축하고 있습니다. 공식 사이트는 라이브 정보와 디스코그래피 정리가 매우 정중합니다."
        },
        {
            name: "KAMITSUBAKI", sub: "神椿スタジオ / THINKR", filter: "corporate", color: "123, 67, 151", icon: "K", url: "Kamitsubaki/kamitsubaki_index.html", tags: ["Virtual Art", "Music"],
            desc: "音楽と物語を融合させた独特の世界観を持つ。公式サイトは非常に芸術性が高く、所属する歌唱魔女たちの情報が詳細に記されている。",
            desc_en: "Fuses music and storytelling into a unique world. Their highly artistic site details the 'Witches' of their musical roster.",
            desc_es: "Fusiona música y narrativa en un mundo único. Su sitio altamente artístico detalla a las 'Brujas' de su elenco musical.",
            desc_zh: "融合了音乐与故事的独特世界观。官网艺术感极高，详细记载了所属“歌唱魔女”们的信息。",
            desc_ko: "음악과 이야기를 융합한 독특한 세계관을 가집니다. 공식 사이트는 예술성이 매우 높으며 소속된 '가창 마녀'들의 정보가 상세히 기록되어 있습니다."
        },
        {
            name: "キズナアイ",
            name_en: "Kizuna AI",
            name_es: "Kizuna AI",
            name_zh: "绊爱 (Kizuna AI)",
            name_ko: "키즈나 아이",
            sub: "Kizuna AI",
            filter: "corporate",
            color: "255, 105, 180",
            icon: "K",
            url: "KizunaAI/kizunaai_index.html",
            tags: ["Legend", "Pioneer"],
            desc: "現在はスリープ（活動休止）中ではあるが、公式サイトおよびプロジェクトとしての基盤は維持されており、関連展開も続いている。",
            desc_en: "Currently on 'sleep' (hiatus), but the foundation of the project and official site remains with ongoing related developments.",
            desc_es: "Actualmente en 'sueño' (hiato), pero la base del proyecto y el sitio oficial se mantienen con desarrollos relacionados en curso.",
            desc_zh: "虽然目前处于休眠（活动停止）中，但官方网站和以此为核心的项目基础仍在维持，相关活动也在持续开展。",
            desc_ko: "현재는 슬립(활동 휴지) 중이지만, 공식 사이트 및 프로젝트로서의 기반은 유지되고 있으며 관련 전개도 계속되고 있습니다."
        },
        {
            name: "けものフレンズV",
            name_en: "Kemono Friends V",
            name_es: "Kemono Friends V",
            name_zh: "兽娘动物园V (Kemono Friends V)",
            name_ko: "케모노 프렌즈 V",
            sub: "けもフレVぷろじぇくと",
            filter: "indie",
            color: "255, 180, 80",
            icon: "K",
            url: "KemonoV/kemonov_index.html",
            tags: ["Media Mix", "JP"],
            desc: "メディアミックスの強みを活かした運営。公式サイトでは既存のIPと連動したタレント紹介が行われている。",
            desc_en: "Operated by leveraging the strength of media-mix. The site features talent introductions linked with the existing IP.",
            desc_es: "Operado aprovechando la fuerza del media-mix. El sitio presenta introducciones de talentos vinculadas con la IP existente.",
            desc_zh: "发挥多媒体联动优势进行运营。官方网站上有与现有IP联动的艺人介绍。",
            desc_ko: "미디어 믹스의 강점을 살린 운영입니다. 공식 사이트에서는 기존 IP와 연동된 탤런트 소개가 이루어지고 있습니다."
        },
        {
            name: "シンセマニアクス",
            name_en: "Synthemaniacs",
            name_es: "Synthemaniacs",
            name_zh: "Synthemaniacs",
            name_ko: "신세매니악스",
            sub: "Synthemaniacs",
            filter: "indie",
            color: "50, 255, 200",
            icon: "S",
            url: "Synthmaniacs/synthmaniacs_index.html",
            tags: ["Music", "Synth"],
            desc: "音楽制作に重きを置いたグループ。クリエイターとタレントの距離が近く、公式サイトでも楽曲紹介が中心となっている。",
            desc_en: "A group focused on music production. Creators and talent are close, and the site highlights their musical works.",
            desc_es: "Un grupo centrado en la producción musical. Los creadores y talentos están cerca, y el sitio destaca sus obras musicales.",
            desc_zh: "重视音乐制作的团体。创作者与艺人之间的距离很近，官方网站也以乐曲介绍为中心。",
            desc_ko: "음악 제작에 중점을 둔 그룹입니다. 크리에이터와 탤런트의 거리가 가까우며 공식 사이트에서도 악곡 소개가 중심입니다."
        },
        {
            name: "深層組",
            name_en: "Shinsogumi",
            name_es: "Shinsogumi",
            name_zh: "深层组 (Shinsogumi)",
            name_ko: "심층조",
            sub: "Shinsogumi",
            filter: "indie",
            color: "135, 0, 0",
            icon: "S",
            url: "Shinsogumi/shinsogumi_index.html",
            tags: ["Underground"],
            desc: "独自の世界観とファンコミュニティを持つ。公式サイトはアンダーグラウンドな雰囲気を守りつつ、最新情報を発信している。",
            desc_en: "Has a unique worldview and fan community. The site maintains an underground vibe while posting the latest updates.",
            desc_es: "Tiene un mundo y una comunidad de fans únicos. El sitio mantiene un ambiente underground mientras publica las últimas actualizaciones.",
            desc_zh: "拥有独特的世界观和粉丝社区。官方网站在保持地下氛围的同时，发布着最新信息。",
            desc_ko: "독자적인 세계관과 팬 커뮤니티를 가지고 있습니다. 공식 사이트는 언더그라운드 분위기를 유지하면서 최신 정보를 발신하고 있습니다."
        },
        {
            name: "Star Facet Production",
            name_en: "Star Facet Production",
            name_es: "Star Facet Production",
            name_zh: "Star Facet Production",
            name_ko: "스타 파셋 프로덕션",
            sub: "スターファセット",
            filter: "corporate",
            color: "200, 255, 220",
            icon: "S",
            url: "StarFacet/starfacet_index.html",
            tags: ["Agency", "JP"],
            desc: "個性を重視したタレント展開が特徴。公式サイトでは各メンバーの特技や配信スタイルが細かく分類されている。",
            desc_en: "Characterized by talent development that emphasizes individuality. The site categorizes members by skills and styles.",
            desc_es: "Desarrollo de talentos que enfatiza la individualidad. El sitio categoriza a los miembros por habilidades y estilos.",
            desc_zh: "以重视个性的艺人发展为特征。官方网站对各成员的特长和直播风格进行了详细分类。",
            desc_ko: "개성을 중시한 탤런트 전개가 특징입니다. 공식 사이트에서는 각 멤버의 특기나 방송 스타일이 세세하게 분류되어 있습니다."
        },
        {
            name: "すぺしゃりて",
            name_en: "Specialite",
            name_es: "Specialite",
            name_zh: "Specialite",
            name_ko: "스페셜리테",
            sub: "Specialite",
            filter: "indie",
            color: "255, 160, 200",
            icon: "S",
            url: "Specialite/specialite_index.html",
            tags: ["Idol", "JP"],
            desc: "ゲーム実況や特定のジャンルに特化したタレントを擁する。公式サイトのデザインは視認性が高く、情報の検索性に優れている。",
            desc_en: "Home to talent specializing in gaming and niche genres. Their highly visible site is great for finding info.",
            desc_es: "Hogar de talentos especializados en gaming y géneros de nicho. Su sitio altamente visible es excelente para buscar info.",
            desc_zh: "拥有专注于游戏实况或特定领域的艺人。官网设计视觉识别度高，信息检索非常便捷。",
            desc_ko: "게임 실황이나 특정 장르에 특화된 탤런트를 보유하고 있습니다. 공식 사이트 디자인은 가독성이 높고 정보 검색이 용이합니다."
        },
        {
            name: "超渋谷計画",
            name_en: "Cho Shibuya Project",
            name_es: "Proyecto Cho Shibuya",
            name_zh: "超涩谷计划 (Cho Shibuya)",
            name_ko: "초시부야 계획",
            sub: "Cho Shibuya Keikaku",
            filter: "corporate",
            color: "160, 60, 255",
            icon: "S",
            url: "ChoShibuya/choshibuya_index.html",
            tags: ["Tokyo", "Music"],
            desc: "都市文化と連動したユニークなプロジェクト。公式サイトでは渋谷という街を舞台にした活動報告が掲載されている。",
            desc_en: "A unique project linked with urban culture. Their site features reports of activities set in the city of Shibuya.",
            desc_es: "Un proyecto único vinculado con la cultura urbana. Su sitio presenta informes de actividades en la ciudad de Shibuya.",
            desc_zh: "与城市文化联动的独特项目。官方网站刊载了以涩谷这一街区为舞台的活动报告。",
            desc_ko: "도시 문화와 연동된 유니크한 프로젝트입니다. 공식 사이트에서는 시부야라는 거리를 무대로 한 활동 보고가 게재되어 있습니다."
        },
        {
            name: "トリリオンステージ",
            name_en: "Trillion Stage",
            name_es: "Trillion Stage",
            name_zh: "Trillion Stage",
            name_ko: "트릴리온 스테이지",
            sub: "Trillion Stage",
            filter: "corporate",
            color: "255, 120, 60",
            icon: "T",
            url: "TrillionStage/trillionstage_index.html",
            tags: ["Agency", "JP"],
            desc: "多角的なエンターテインメント展開を目指す事務所。公式サイトのニュース更新頻度が高く、運営の活発さが伺える。",
            desc_en: "An agency aiming for multi-faceted entertainment. Their frequent news updates show a very active operation.",
            desc_es: "Una agencia que busca el entretenimiento multifacético. Sus frecuentes noticias muestran una operación muy activa.",
            desc_zh: "旨在进行多方位娱乐发展的事务所。官方网站新闻更新频率高，可以看出运营非常活跃。",
            desc_ko: "다각적인 엔터테인먼트 전개를 목표로 하는 사무소입니다. 공식 사이트의 뉴스 업데이트 빈도가 높아 운영의 활발함을 엿볼 수 있습니다."
        },
        {
            name: "ななしいんく",
            name_en: "774inc.",
            name_es: "774inc.",
            name_zh: "Nanashi Ink",
            name_ko: "나나시잉크",
            sub: "774inc.",
            filter: "indie",
            color: "252, 234, 187",
            icon: "7",
            url: "Nanashi/nanashi_index.html",
            tags: ["Variety"],
            desc: "大手の一角として長年君臨。グループ統合を経て、現在は公式サイトで一括したタレント管理とイベント告知が行われている。",
            desc_en: "A longtime major player. Following a group merger, their site now handles unified talent management and event info.",
            desc_es: "Un veterano jugador importante. Tras una fusión grupal, su sitio ahora maneja la gestión unificada de talentos e info de eventos.",
            desc_zh: "作为行业巨头的一角长年屹立不倒。经过品牌整理后，现在通过官方网站进行统一的艺人管理和活动预告。",
            desc_ko: "오랫동안 메이저의 한 축으로 군림해 왔습니다. 그룹 통합을 거쳐 현재는 공식 사이트에서 일괄적인 탤런트 관리와 이벤트 공지가 이루어집니다."
        },
        {
            name: "にじさんじ",
            name_en: "NIJISANJI",
            name_es: "NIJISANJI",
            name_zh: "彩虹社 (NIJISANJI)",
            name_ko: "니지산지",
            sub: "NIJISANJI",
            filter: "major",
            color: "255, 65, 108",
            icon: "N",
            url: "Nijisanji/nijisanji_index.html",
            tags: ["Pop", "Streamer"],
            desc: "業界最大手の一つ。公式サイトは膨大な所属ライバーのデータベースとなっており、検索機能や公式グッズ販売への導線が非常に強固だ。",
            desc_en: "One of the industry's largest. Their site is a massive database of Liver profiles with integrated shops.",
            desc_es: "Uno de los más grandes. Su sitio es una base de datos masiva de perfiles de Liver con tiendas integradas.",
            desc_zh: "行业巨头之一。官方网站是庞大的所属主播数据库，具有完善的检索功能和周边贩售入口。",
            desc_ko: "업계 최대 규모 중 하나입니다. 공식 사이트는 방대한 소속 라이버 데이터베이스이며, 굿즈 판매 연동도 매우 강력합니다."
        },
        {
            name: "にゃんたじあ！",
            name_en: "Nyantazia",
            name_es: "Nyantazia",
            name_zh: "Nyantazia",
            name_ko: "냥타지아!",
            sub: "Nyantazia",
            filter: "indie",
            color: "255, 150, 200",
            icon: "N",
            url: "Nyantasia/nyantasia_index.html",
            tags: ["Cute", "JP"],
            desc: "猫をモチーフにしたコンセプトが明確な事務所。公式サイトは可愛らしいデザインで統一され、ファン向けのコンテンツが充実している。",
            desc_en: "An agency with a clear cat motif concept. Their cute site is unified in design and full of fan content.",
            desc_es: "Una agencia con un concepto claro de temática gatuna. Su sitio lindo tiene un diseño unificado y mucho contenido para fans.",
            desc_zh: "以猫为主题、理念明确的事务所。官方网站统一采用可爱设计，面向粉丝的内容非常充实。",
            desc_ko: "고양이를 모티브로 한 컨셉이 명확한 사무소입니다. 공식 사이트는 귀여운 디자인으로 통일되어 있으며 팬들을 위한 콘텐츠가 충실합니다."
        },
        {
            name: "NeoPorte", sub: "ネオポルテ", filter: "corporate", color: "221, 24, 24", icon: "N", url: "NeoPorte/neoporte_index.html", tags: ["Esports", "Gaming", "JP"],
            desc: "ゲームと配信のプロフェッショナルが設立。公式サイトはゲーマー向けのクールなデザインで、大会実績などが詳しく掲載されている。",
            desc_en: "Founded by gaming and streaming pros. Their cool, gamer-centric site highlights tournament achievements and talent info.",
            desc_es: "Fundada por profesionales del gaming y streaming. Su sitio centrado en gamers destaca logros en torneos e info de talentos.",
            desc_zh: "由游戏和直播领域的专业人士设立。官网采用面向游戏玩家的酷炫设计，详细刊载了大赛成绩等信息。",
            desc_ko: "게임과 방송 전문가들이 설립했습니다. 공식 사이트는 게이머를 위한 쿨한 디자인이며 대회 실적 등이 상세히 게재되어 있습니다."
        },
        {
            name: "NexuStella",
            name_en: "NexuStella",
            name_es: "NexuStella",
            name_zh: "NexuStella",
            name_ko: "넥서스텔라",
            sub: "ネクサステラ",
            filter: "corporate",
            color: "100, 180, 255",
            icon: "N",
            url: "NexuStella/nexustella_index.html",
            tags: ["Agency", "JP"],
            desc: "メディア大手のバックアップを受けるプロジェクト。公式サイトは情報公開の透明性が高く、企業としての信頼性が厚い。",
            desc_en: "A project backed by media giants. Their official site offers transparent information, reflecting strong corporate reliability.",
            desc_es: "Un proyecto respaldado por gigantes de los medios. Su sitio oficial ofrece información transparente, reflejando una sólida confiabilidad corporativa.",
            desc_zh: "拥有大型媒体背景支持的项目。官方网站的信息公开透明度高，体现了作为企业的深厚信誉。",
            desc_ko: "대형 미디어의 백업을 받는 프로젝트입니다. 공식 사이트는 정보 공개의 투명성이 높으며 기업으로서의 신뢰성이 두텁습니다."
        },
        {
            name: "のりプロ",
            name_en: "Noripro",
            name_es: "Noripro",
            name_zh: "海苔Pro (Noripro)",
            name_ko: "노리프로",
            sub: "Noripro",
            filter: "indie",
            color: "248, 87, 166",
            icon: "N",
            url: "Noripro/noripro_index.html",
            tags: ["Manga", "Creator"],
            desc: "漫画家佃煮のりお氏がプロデュース。公式サイトではタレント活動だけでなく、ボイスやグッズの展開が非常に活発に告知されている。",
            desc_en: "Produced by manga artist Norio Tsukudani. Their site features active updates on talent activities, voices, and goods.",
            desc_es: "Producido por la mangaka Norio Tsukudani. Su sitio destaca por las actividades de sus talentos, voces y merchandising.",
            desc_zh: "由漫画家佃煮海苔男担任制作人。官网不仅有艺人活动，语音和周边商品的发布也十分活跃。",
            desc_ko: "만화가 츠くだ니 노리오 씨가 프로듀스합니다. 공식 사이트에서는 탤런트 활동뿐만 아니라 보이스, 굿즈 전개가 활발히 공지됩니다."
        },
        {
            name: "ハコネクト",
            name_en: "Haconect",
            name_es: "Haconect",
            name_zh: "Haconect",
            name_ko: "하코넥트",
            sub: "Haconect",
            filter: "indie",
            color: "80, 230, 180",
            icon: "H",
            url: "Haconect/haconect_index.html",
            tags: ["Agency", "JP"],
            desc: "着実にファンを増やしている中堅。公式サイトは各タレントの配信スケジュールがカレンダー形式で確認できるようになっている。",
            desc_en: "A mid-sized agency steadily growing its fanbase. Their site features talent schedules in a convenient calendar format.",
            desc_es: "Una agencia de tamaño medio que aumenta constantemente su base de fans. Su sitio presenta horarios de talentos en un práctico formato de calendario.",
            desc_zh: "稳步增加粉丝的中坚事务所。官方网站通过日历形式展示各艺人的直播日程，便于查看。",
            desc_ko: "꾸준히 팬을 늘려가고 있는 중견 사무소입니다. 공식 사이트에서는 각 탤런트의 방송 스케줄을 캘린더 형식으로 확인할 수 있습니다."
        },
        {
            name: "Balus",
            name_en: "Balus",
            name_es: "Balus",
            name_zh: "Balus",
            name_ko: "발스",
            sub: "Balus",
            filter: "indie",
            color: "255, 100, 140",
            icon: "B",
            url: "Balus/balus_index.html",
            tags: ["Idol", "JP"],
            desc: "技術提供からタレント運営まで幅広く行う。公式サイトは法人向けの情報も充実しており、業界内での立ち位置が明確。",
            desc_en: "Broadly involved from tech provision to talent management. Their site provides extensive corporate info, showing a clear industry position.",
            desc_es: "Involucrados ampliamente desde la provisión de tecnología hasta la gestión de talentos. Su sitio ofrece amplia info corporativa, mostrando una posición clara en la industria.",
            desc_zh: "涉及从技术提供到艺人运营的广泛领域。官方网站的企业面向信息也很充实，在行业内的定位非常明确。",
            desc_ko: "기술 제공부터 탤런트 운영까지 폭넓게 활동합니다. 공식 사이트는 법인용 정보도 충실하며 업계 내에서의 위치가 명확합니다."
        },
        {
            name: "Palette Project",
            name_en: "Palette Project",
            name_es: "Palette Project",
            name_zh: "Palette Project",
            name_ko: "팔레트 프로젝트",
            sub: "パレプロ",
            filter: "indie",
            color: "0, 242, 254",
            icon: "P",
            url: "PaletteProject/paletteproject_index.html",
            tags: ["Idol", "Music"],
            desc: "アイドル活動に特化したグループ。公式サイトはライブ写真や動画が多用されており、パフォーマンスの熱量が伝わる構成だ。",
            desc_en: "A group specializing in idol activities. Their site uses many live photos and videos, conveying the high energy of their performances.",
            desc_es: "Un grupo especializado en actividades de idols. Su sitio usa muchas fotos y videos en vivo, transmitiendo la alta energía de sus actuaciones.",
            desc_zh: "专注于偶像活动的团体。官方网站大量使用了Live照片和视频，其构思能够传达出演出时的热度。",
            desc_ko: "아이돌 활동에 특화된 그룹입니다. 공식 사이트는 라이브 사진과 영상을 많이 사용하여 퍼포먼스의 열량이 느껴지는 구성입니다."
        },
        {
            name: "VEE",
            name_en: "VEE",
            name_es: "VEE",
            name_zh: "VEE",
            name_ko: "VEE",
            sub: "ヴィー / Sony Music",
            filter: "corporate",
            color: "203, 45, 62",
            icon: "V",
            url: "VEE/vee_index.html",
            tags: ["Sony", "Variety"],
            desc: "ソニー・ミュージックによる大型プロジェクト。公式サイトは非常に洗練されており、所属タレントの多様性が強調されている。",
            desc_en: "A large-scale project by Sony Music. Their highly sophisticated site highlights the broad diversity of their talent roster.",
            desc_es: "Un proyecto a gran escala de Sony Music. Su sitio altamente sofisticado destaca la amplia diversidad de su elenco de talentos.",
            desc_zh: "由索尼音乐推出的超大型项目。官方网站设计十分洗练，强调了所属艺人的多样性。",
            desc_ko: "소니 뮤직의 대형 프로젝트입니다. 공식 사이트는 매우 세련되었으며 소속 탤런트의 다양성이 강조되어 있습니다."
        },
        {
            name: "FIRST STAGE PRODUCTION",
            name_en: "FIRST STAGE PRODUCTION",
            name_es: "FIRST STAGE PRODUCTION",
            name_zh: "FIRST STAGE PRODUCTION",
            name_ko: "퍼스트 스테이지 프로덕션",
            sub: "ファーストステージ",
            filter: "corporate",
            color: "255, 160, 20",
            icon: "F",
            url: "FirstStage/firststage_index.html",
            tags: ["Agency", "JP"],
            desc: "新進気鋭の事務所として急速にメンバーを増やしている。公式サイトのデザインも新しさを感じさせ、勢いがある。",
            desc_en: "An up-and-coming agency rapidly expanding its membership. The site design feels fresh and full of momentum.",
            desc_es: "Una agencia emergente que expande rápidamente su membresía. El diseño del sitio se siente fresco y lleno de impulso.",
            desc_zh: "作为新锐事务所，成员数量正在迅速增加。官方网站的设计也充满新鲜感，势头强劲。",
            desc_ko: "신진기예의 사무소로서 급속하게 멤버를 늘리고 있습니다. 공식 사이트의 디자인도 새로움이 느껴지며 기세가 좋습니다."
        },
        {
            name: "vα-liv",
            name_en: "vα-liv",
            name_es: "vα-liv",
            name_zh: "vα-liv",
            name_ko: "브이얼라이브 (vα-liv)",
            sub: "ヴイアライヴ",
            filter: "indie",
            color: "180, 100, 255",
            icon: "V",
            url: "Valiv/valiv_index.html",
            tags: ["Idol", "JP"],
            desc: "バンダイナムコによるアイドル育成プロジェクト。公式サイトではオーディションの進捗やファンの投票結果などが公開されている。",
            desc_en: "An idol training project by Bandai Namco. Their site shares audition progress and fan voting results.",
            desc_es: "Un proyecto de entrenamiento de idols de Bandai Namco. Su sitio comparte el progreso de las audiciones y los resultados de las votaciones de los fans.",
            desc_zh: "万代南梦宫推出的偶像培养项目。官网上公开了选拔进度以及粉丝投票结果等信息。",
            desc_ko: "반다이 남코의 아이돌 육성 프로젝트입니다. 공식 사이트에서는 오디션 진행 상황이나 팬 투표 결과 등이 공개되어 있습니다."
        },
        {
            name: "Varium",
            name_en: "Varium",
            name_es: "Varium",
            name_zh: "Varium",
            name_ko: "바리움 (Varium)",
            sub: "ぶいありうむっ！",
            filter: "indie",
            color: "252, 203, 144",
            icon: "V",
            url: "Varium/varium_index.html",
            tags: ["Magic", "Gaming"],
            desc: "「かわいい」を前面に押し出したプロデュース。公式サイトはファンシーな色使いで、各メンバーのビジュアル紹介に力が入れられている。",
            desc_en: "A production that puts 'kawaii' (cute) front and center. Their site features fancy colors and focuses on member visuals.",
            desc_es: "Una producción que pone lo 'kawaii' (lindo) al frente. Su sitio presenta colores fantasía y se centra en los visuales de los miembros.",
            desc_zh: "主打“可爱”路线的偶像企划。官方网站配色华丽，在各成员的视觉呈现上非常用心。",
            desc_ko: "'귀여움'을 전면에 내세운 프로듀스입니다. 공식 사이트는 팬시한 색감을 사용하며 각 멤버의 비주얼 소개에 힘을 쏟고 있습니다."
        },
        {
            name: "ぶいじ時代",
            name_en: "V-Jidai",
            name_es: "V-Jidai",
            name_zh: "V时代 (V-Jidai)",
            name_ko: "V지대",
            sub: "Vuijidai",
            filter: "indie",
            color: "255, 100, 80",
            icon: "V",
            url: "Buijidai/buijidai_index.html",
            tags: ["Agency", "JP"],
            desc: "独自のコンセプトを持つ新興事務所。公式サイトの構築が進んでおり、タレントの個性に合わせた紹介ページが特徴。",
            desc_en: "A rising agency with a unique concept. Their site is evolving with personalized introduction pages for each talent.",
            desc_es: "Una agencia emergente con un concepto único. Su sitio está evolucionando con páginas de introducción personalizadas para cada talento.",
            desc_zh: "拥有独特概念的新兴事务所。官方网站正在完善中，特点是根据艺人个性定制的介绍页面。",
            desc_ko: "독자적인 컨셉을 가진 신흥 사무소입니다. 공식 사이트 구축이 진행 중이며 탤런트의 개성에 맞춘 소개 페이지가 특징입니다."
        },
        {
            name: "ぶいすぽっ！",
            name_en: "VSPO!",
            name_es: "VSPO!",
            name_zh: "VSPO!",
            name_ko: "브이스포!",
            sub: "VSPO!",
            filter: "major",
            color: "142, 45, 226",
            icon: "V",
            url: "Vspo/vspo_index.html",
            tags: ["Esports", "FPS"],
            desc: "ゲーム実況とeスポーツに特化した超人気グループ。公式サイトは競技シーンの記録や各メンバーのデバイス情報なども網羅されている。",
            desc_en: "A super popular group focusing on gaming and esports. You can find their match records and gear info here!",
            desc_es: "Un grupo súper popular centrado en el gaming y los eSports. ¡Incluye récords de partidas e info de periféricos!",
            desc_zh: "专注于游戏实况和电子竞技的超人气团体。官网涵盖了竞技场景记录及各成员的外设信息。",
            desc_ko: "게임 실황과 e스포츠에 특화된 초인기 그룹입니다. 공식 사이트에는 경기 기록과 멤버들의 장비 정보까지 망라되어 있습니다."
        },
        {
            name: "VBOX",
            name_en: "VBOX",
            name_es: "VBOX",
            name_zh: "VBOX",
            name_ko: "VBOX",
            sub: "ぶいぼっくす",
            filter: "indie",
            color: "60, 180, 255",
            icon: "V",
            url: "VBOX/vbox_index.html",
            tags: ["Agency", "JP"],
            desc: "多様なタレントを抱えるマルチな事務所。公式サイトはシンプルながらも必要な情報が整理されており、使い勝手が良い。",
            desc_en: "A versatile agency with a diverse roster. Their simple, well-organized site is very user-friendly.",
            desc_es: "Una agencia versátil con un elenco diverso. Su sitio simple y bien organizado es muy fácil de usar.",
            desc_zh: "拥有多样化艺人的综合性事务所。官方网站虽然简洁，但必要信息整理得井井有条，使用体验良好。",
            desc_ko: "다양한 탤런트를 보유한 멀티 사무소입니다. 공식 사이트는 심플하면서도 필요한 정보가 잘 정리되어 있어 이용하기 편리합니다."
        },
        {
            name: "VRegion",
            name_en: "VRegion",
            name_es: "VRegion",
            name_zh: "VRegion",
            name_ko: "브이리전 (VRegion)",
            sub: "ブイリージョン",
            filter: "indie",
            color: "100, 255, 160",
            icon: "V",
            url: "VRegion/vregion_index.html",
            tags: ["Regional", "JP"],
            desc: "地域活性化をテーマにした珍しいプロジェクト。公式サイトでは担当地域ごとの活動報告や特産品の紹介などが並ぶ。",
            desc_en: "A unique project themed around regional revitalization. The site features activity reports and local specialties by region.",
            desc_es: "Un proyecto único centrado en la revitalización regional. El sitio presenta informes de actividades y especialidades locales por región.",
            desc_zh: "以地域振兴为主题的稀有项目。官网上按负责区域列出了活动报告和特产介绍等内容。",
            desc_ko: "지역 활성화를 테마로 한 이색적인 프로젝트입니다. 공식 사이트에서는 담당 지역별 활동 보고나 특산품 소개 등이 나열되어 있습니다."
        },
        {
            name: "ぶいわんプロダクション",
            name_en: "V-One Production",
            name_es: "V-One Production",
            name_zh: "V-One Production",
            name_ko: "브이원 프로덕션",
            sub: "V-One Production",
            filter: "indie",
            color: "255, 130, 50",
            icon: "V",
            url: "VOne/vone_index.html",
            tags: ["Agency", "JP"],
            desc: "個々のタレントの自由度を尊重する運営。公式サイトでは各々の個性を活かした自由な発信が奨励されている。",
            desc_en: "An operation that respects individual talent freedom. Their site encourages unique and free artistic expression.",
            desc_es: "Una operación que respeta la libertad individual del talento. Su sitio fomenta la expresión artística única y libre.",
            desc_zh: "尊重每位艺人自由度的运营模式。官网上鼓励艺人们发挥各自个性进行自由的内容发布。",
            desc_ko: "개별 탤런트의 자유도를 존중하는 운영입니다. 공식 사이트에서는 각자의 개성을 살린 자유로운 소통이 권장되고 있습니다."
        },
        {
            name: "PROJECT NEBULA",
            name_en: "PROJECT NEBULA",
            name_es: "PROJECT NEBULA",
            name_zh: "PROJECT NEBULA",
            name_ko: "프로젝트 네뷸라",
            sub: "プロジェクトネビュラ",
            filter: "indie",
            color: "80, 60, 200",
            icon: "P",
            url: "ProjectNebula/projectnebula_index.html",
            tags: ["Agency", "JP"],
            desc: "SF的な世界観を背景に持つ。公式サイトの設定資料ページなどは読み応えがあり、ファンを飽きさせない。",
            desc_en: "Features a sci-fi worldview. Their site includes extensive world-building lore that keeps fans engaged.",
            desc_es: "Presenta un mundo de ciencia ficción. Su sitio incluye extensos materiales de ambientación que mantienen interesados a los fans.",
            desc_zh: "具有科幻世界观背景。官方网站上的设定资料页等内容非常充实，能够带给粉丝持久的新鲜感。",
            desc_ko: "SF적인 세계관을 배경으로 합니다. 공식 사이트의 설정 자료 페이지 등은 읽을거리가 풍부하여 팬들을 지루하지 않게 합니다."
        },
        {
            name: "ProForma Production",
            name_en: "ProForma Production",
            name_es: "ProForma Production",
            name_zh: "ProForma Production",
            name_ko: "프로포마 프로덕션",
            sub: "プロフォーマ",
            filter: "indie",
            color: "180, 180, 200",
            icon: "P",
            url: "ProFormaNova/proformanova_index.html",
            tags: ["Agency", "JP"],
            desc: "技術的な完成度を求めるプロフェッショナル集団。公式サイトはスペック重視の記載が多く、技術者目線でも興味深い。",
            desc_en: "A professional group seeking technical perfection. Their site is filled with spec-heavy details, fascinating even from a tech perspective.",
            desc_es: "Un grupo profesional que busca la perfección técnica. Su sitio está lleno de detalles técnicos, fascinantes incluso desde una perspectiva tecnológica.",
            desc_zh: "追求技术完成度的专业集团。官方网站有很多针对性能参数的描述，从技术人员的角度来看也非常有趣。",
            desc_ko: "기술적인 완성도를 추구하는 전문가 집단입니다. 공식 사이트는 스펙 중시의 기재가 많아 기술자 시선에서도 흥미롭습니다."
        },
        {
            name: "VASE",
            name_en: "VASE",
            name_es: "VASE",
            name_zh: "VASE",
            name_ko: "VASE",
            sub: "ヴェイス",
            filter: "indie",
            color: "180, 255, 180",
            icon: "V",
            url: "VASE/vase_index.html",
            tags: ["Agency", "JP"],
            desc: "多彩なバックグラウンドを持つタレントが所属。公式サイトは芸能事務所としての側面も強く、幅広いメディア展開をサポートしている。",
            desc_en: "Home to talent with diverse backgrounds. Their site emphasizes their role as a talent agency supporting broad media expansion.",
            desc_es: "Hogar de talentos con diversos orígenes. Su sitio enfatiza su papel como agencia de talentos, apoyando una amplia expansión mediática.",
            desc_zh: "所属艺人具有多种背景。官方网站也体现了其作为艺人事务所的一面，支持广泛的媒体发展。",
            desc_ko: "다채로운 배경을 가진 탤런트들이 소속되어 있습니다. 공식 사이트는 연예 기획사로서의 측면도 강하며 폭넓은 미디어 전개를 지원하고 있습니다."
        },
        {
            name: "VOMS project",
            name_en: "VOMS project",
            name_es: "VOMS project",
            name_zh: "VOMS project",
            name_ko: "VOMS 프로젝트",
            sub: "GYARI",
            filter: "indie",
            color: "100, 220, 140",
            icon: "V",
            url: "VOMS/voms_index.html",
            tags: ["Individual", "JP"],
            desc: "イラストレーターGYARI氏による個人主導のプロジェクト。公式サイトは独特のアートスタイルで統一され、情報がミニマルにまとまっている。",
            desc_en: "A project led by illustrator GYARI. Their site is unified by a unique art style and presents information in a minimal way.",
            desc_es: "Un proyecto liderado por el ilustrador GYARI. Su sitio está unificado por un estilo artístico único y presenta la información de forma minimalista.",
            desc_zh: "由插画家GYARI发起的个人主导项目。官方网站统一采用独特艺术风格，信息简洁明了。",
            desc_ko: "일러스트레이터 GYARI 씨가 주도하는 개인 프로젝트입니다. 공식 사이트는 독특한 아트 스타일로 통일되어 있으며 정보가 미니멀하게 정리되어 있습니다."
        },
        {
            name: "ホロライブプロダクション",
            name_en: "hololive production",
            name_es: "hololive production",
            name_zh: "hololive production",
            name_ko: "홀로라이브 프로덕션",
            sub: "hololive production",
            filter: "major",
            color: "0, 210, 255",
            icon: "H",
            url: "Hololive/hololive_index.html",
            tags: ["Idol", "Music"],
            desc: "世界的人気を誇るVTuberグループ。公式サイトは世界中のファンに対応した多言語展開が完璧で、情報の網羅性に優れている。",
            desc_en: "A world-famous VTuber group. Their site features perfect multi-language support for fans worldwide.",
            desc_es: "Un grupo VTuber de fama mundial. Su sitio cuenta con un soporte multiidioma perfecto para fans de todo el mundo.",
            desc_zh: "享誉全球的VTuber团体。官网完美支持多语言，面向全球粉丝，信息全面性极佳。",
            desc_ko: "전 세계적으로 인기를 끌고 있는 버추얼 유튜버 그룹입니다. 전 세계 팬들을 위한 다국어 지원이 완벽하며 정보의 포괄성은 세계 최고 수준입니다."
        },
        {
            name: "Marble Creators",
            name_en: "Marble Creators",
            name_es: "Marble Creators",
            name_zh: "Marble Creators",
            name_ko: "마블 크리에이터즈",
            sub: "マーブルクリエイターズ",
            filter: "indie",
            color: "200, 200, 255",
            icon: "M",
            url: "MarbleCreators/marblecreators_index.html",
            tags: ["Creator", "JP"],
            desc: "クリエイターの支援に重きを置く。公式サイトではタレントだけでなく、その背後にいる制作者の情報も大切に扱われている。",
            desc_en: "Emphasizes supporting creators. Their site values info about the producers behind the talent as much as the talent themselves.",
            desc_es: "Enfatiza el apoyo a los creadores. Su sitio valora la información sobre los productores detrás de los talentos tanto como a los talentos mismos.",
            desc_zh: "重心在于支持创作者。官方网站上不仅有艺人信息，也非常重视其幕后制作者的信息介绍。",
            desc_ko: "크리에이터 지원에 중점을 둡니다. 공식 사이트에서는 탤런트뿐만 아니라 그 뒤에 있는 제작자들의 정보도 소중히 다루고 있습니다."
        },
        {
            name: "まほろば",
            name_en: "Mahoroba",
            name_es: "Mahoroba",
            name_zh: "まほろば (Mahoroba)",
            name_ko: "마호로바",
            sub: "Mahoroba",
            filter: "indie",
            color: "220, 180, 255",
            icon: "M",
            url: "Mahoroba/mahoroba_index.html",
            tags: ["Variety", "JP"],
            desc: "日本文化や和風のコンセプトを取り入れた事務所。公式サイトのビジュアルは和を意識した美しい装丁となっている。",
            desc_en: "An agency incorporating Japanese culture and themes. Their site features a beautiful design inspired by traditional aesthetics.",
            desc_es: "Una agencia que incorpora la cultura y temas japoneses. Su sitio presenta un hermoso diseño inspirado en la estética tradicional.",
            desc_zh: "融入日本文化和和风理念的事务所。官方网站的视觉设计采用了注重和风美感的精致装帧。",
            desc_ko: "일본 문화와 화풍 컨셉을 도입한 사무소입니다. 공식 사이트 비주얼은 화(和)를 의식한 아름다운 장정으로 꾸며져 있습니다."
        },
        {
            name: "Mi→RiSE",
            name_en: "Mi→RiSE",
            name_es: "Mi→RiSE",
            name_zh: "Mi→RiSE",
            name_ko: "미라이즈 (Mi→RiSE)",
            sub: "みらいず",
            filter: "indie",
            color: "100, 220, 255",
            icon: "M",
            url: "MiRiSE/mirise_index.html",
            tags: ["Agency", "JP"],
            desc: "次世代のスター発掘を目指す。公式サイトは若年層を意識したポップなデザインで、オーディション情報が目立つ配置になっている。",
            desc_en: "Aims to discover next-generation stars. Their site features a pop design for younger audiences, highlighting audition info.",
            desc_es: "Busca descubrir estrellas de la próxima generación. Su sitio presenta un diseño pop para audiencias jóvenes, destacando la info de audiciones.",
            desc_zh: "旨在发掘次世代明星。官方网站采用面向年轻群体的流行设计，试镜招募信息被放置在显眼位置。",
            desc_ko: "차세대 스타 발굴을 목표로 합니다. 공식 사이트는 젊은 층을 의식한 팝한 디자인이며 오디션 정보가 눈에 띄게 배치되어 있습니다."
        },
        {
            name: "ミリプロ",
            name_en: "Million Production",
            name_es: "Million Production",
            name_zh: "Million Production",
            name_ko: "밀리프로 (Million Production)",
            sub: "Milipro",
            filter: "indie",
            color: "255, 215, 0",
            icon: "M",
            url: "Milipro/milipro_index.html",
            tags: ["Idol", "Agency"],
            desc: "急成長中の個人勢出身者が中心の組織。公式サイトは手作り感がありつつも、熱量の高いファンベースに支えられている。",
            desc_en: "Centered around rapidly growing former independent talent. Their site has a DIY feel and is backed by a passionate fanbase.",
            desc_es: "Centrado en talentos anteriormente independientes en rápido crecimiento. Su sitio tiene un toque artesanal y cuenta con una base de fans apasionada.",
            desc_zh: "以迅速成长的个人势出生艺人为核心的组织。官方网站虽然有某种“手工感”，但得到了高热度粉丝群体的鼎力支持。",
            desc_ko: "급성장 중인 개인세 출신들이 중심인 조직입니다. 공식 사이트는 정감 어린 느낌이면서도 열량 높은 팬덤의 지지를 받고 있습니다."
        },
        {
            name: "MEWLIVE",
            name_en: "MEWLIVE",
            name_es: "MEWLIVE",
            name_zh: "MEWLIVE",
            name_ko: "미우라이브 (MEWLIVE)",
            sub: "みゅ～らいぶ",
            filter: "indie",
            color: "255, 180, 200",
            icon: "M",
            url: "MEWLIVE/mewlive_index.html",
            tags: ["Idol", "JP"],
            desc: "音楽とライブパフォーマンスを軸にする。公式サイトは音源の視聴機能などが充実しており、音楽好きに優しい。",
            desc_en: "Centers on music and live performances. Their site features robust audio previews, catering to music lovers.",
            desc_es: "Se centra en la música y las actuaciones en vivo. Su sitio presenta sólidas vistas previas de audio, ideal para amantes de la música.",
            desc_zh: "以音乐和Live演出为核心。官方网站的试听功能等内容非常完备，对音乐爱好者非常友好。",
            desc_ko: "음악과 라이브 퍼포먼스를 축으로 합니다. 공식 사이트는 음원 시청 기능 등이 충실하여 음악 팬들에게 친숙합니다."
        },
        {
            name: "ユニバースプロダクション",
            name_en: "Universe Production",
            name_es: "Universe Production",
            name_zh: "Universe Production",
            name_ko: "유니버스 프로덕션",
            sub: "Universe Production",
            filter: "indie",
            color: "80, 100, 255",
            icon: "U",
            url: "UniverseProduction/universe_index.html",
            tags: ["Agency", "JP"],
            desc: "多角的なタレントマネジメントを行う。公式サイトはビジネスライクで整理されており、企業案件などの相談窓口も分かりやすい。",
            desc_en: "Conducts multi-faceted talent management. Their professional, organized site makes business inquiries easy to navigate.",
            desc_es: "Realiza una gestión de talentos multifacética. Su sitio profesional y organizado facilita la navegación para consultas comerciales.",
            desc_zh: "进行多方位艺人管理。官方网站设计严谨专业，商务合作等咨询窗口也非常清晰明了。",
            desc_ko: "다각적인 탤런트 매니지먼트를 수행합니다. 공식 사이트는 비즈니스적으로 잘 정리되어 있으며 기업 협업 등의 상담 창구도 알기 쉽습니다."
        },
        {
            name: "ゆにれいど！",
            name_en: "Uniraid!",
            name_es: "Uniraid!",
            name_zh: "Uniraid!",
            name_ko: "유니레이드!",
            sub: "Uniraid!",
            filter: "indie",
            color: "255, 200, 80",
            icon: "Y",
            url: "Uniraid/uniraid_index.html",
            tags: ["Variety", "JP"],
            desc: "協力プレイや絆をテーマにしたグループ。公式サイトではメンバー間の関係性を示す相関図などが公開されることもある。",
            desc_en: "A group themed around cooperative play and bonds. Their site sometimes features relationship charts showing member connections.",
            desc_es: "Un grupo centrado en el juego cooperativo y los vínculos. Su sitio a veces presenta cuadros de relaciones que muestran las conexiones entre los miembros.",
            desc_zh: "以多人协作和羁绊为主题的团体。官方网站有时会公开展示成员间关系的关联图。",
            desc_ko: "협력 플레이나 유대감을 테마로 한 그룹입니다. 공식 사이트에서는 멤버 간의 관계성을 보여주는 상관도 등이 공개되기도 합니다."
        },
        {
            name: "RIOT MUSIC",
            name_en: "RIOT MUSIC",
            name_es: "RIOT MUSIC",
            name_zh: "RIOT MUSIC",
            name_ko: "라이엇 뮤직 (RIOT MUSIC)",
            sub: "Brave Group / ライオット",
            filter: "corporate",
            color: "241, 39, 17",
            icon: "R",
            url: "RIOTMusic/riotmusic_index.html",
            tags: ["Music", "Live"],
            desc: "バーチャルアーティストの音楽制作を極める。公式サイトは各アーティストのディスコグラフィが非常に詳しく、音質のこだわりなども語られている。",
            desc_en: "Masters of music production for virtual artists. Their site details each artist's discography and commitment to sound quality.",
            desc_es: "Maestros de la producción musical para artistas virtuales. Su sitio detalla la discografía de cada artista y su compromiso con la calidad del sonido.",
            desc_zh: "深耕虚拟艺人音乐制作。官方网站详细列出了各艺人的作品目录，并探讨了对音质的极致追求。",
            desc_ko: "버추얼 아티스트의 음악 제작을 극한으로 추구합니다. 공식 사이트는 각 아티스트의 디스코그래피가 매우 상세하며 음질에 대한 고집 등도 엿볼 수 있습니다."
        },
        {
            name: "Re:AcT",
            name_en: "Re:AcT",
            name_es: "Re:AcT",
            name_zh: "Re:AcT",
            name_ko: "리액트 (Re:AcT)",
            sub: "リアクト",
            filter: "indie",
            color: "150, 251, 196",
            icon: "R",
            url: "ReAcT/react_index.html",
            tags: ["Music", "Gaming"],
            desc: "アイドルとアーティストの融合。公式サイトは長年の運営実績を活かした安定感のあるデザインで、所属人数も多い。",
            desc_en: "A fusion of idols and artists. Their site has a stable design backed by years of experience and a large roster.",
            desc_es: "Una fusión de idols y artistas. Su sitio tiene un diseño estable respaldado por años de experiencia y un gran elenco.",
            desc_zh: "偶像与艺术家的融合。官方网站设计稳定大方，体现了长年的运营积淀，所属成员人数也较多。",
            desc_ko: "아이돌과 아티스트의 융합을 지향합니다. 공식 사이트는 오랜 운영 실적을 살린 안정감 있는 디자인이며 소속 인원도 많습니다."
        },
        {
            name: "りーさるぷらん",
            name_en: "Lethal Plan",
            name_es: "Lethal Plan",
            name_zh: "绝杀计划 (Lethal Plan)",
            name_ko: "리설 플랜",
            sub: "Lethal Plan",
            filter: "indie",
            color: "80, 255, 150",
            icon: "R",
            url: "LethalPlan/lethalplan_index.html",
            tags: ["Agency", "JP"],
            desc: "対戦格闘ゲームなどのハードなジャンルに特化した新興勢力。公式サイトはゲーム画面を意識した攻撃的なデザイン。",
            desc_en: "A rising force specializing in hard genres like fighting games. Their site features an aggressive design inspired by game UI.",
            desc_es: "Una fuerza emergente especializada en géneros duros como los juegos de lucha. Su sitio presenta un diseño agresivo inspirado en la interfaz de los juegos.",
            desc_zh: "专注于格斗游戏等硬核领域的新兴力量。官方网站采用了带有对抗感的、让人联想到游戏画面的设计。",
            desc_ko: "대전 격투 게임 등 하드한 장르에 특화된 신흥 세력입니다. 공식 사이트는 게임 화면을 의식한 공격적인 디자인이 특징입니다."
        },
        {
            name: "Brave Group",
            sub: "ブレイブグループ",
            filter: "corporate",
            color: "255, 140, 0",
            icon: "B",
            url: "BraveGroup/bravegroup_index.html",
            tags: ["Corporate", "HQ"],
            desc: "数多くの人気事務所を傘下に持つ巨大持ち株会社。公式サイトは企業情報がメインだが、各プロジェクトへのポータルとして機能している。",
            desc_en: "A massive holding company for many popular agencies. Their site serves as a portal to various VTuber projects.",
            desc_es: "Una enorme empresa matriz para muchas agencias populares. Su sitio sirve como portal para varios proyectos VTuber.",
            desc_zh: "旗下拥有众多人气事务所的巨型持股公司。官网以企业信息为主，同时也作为各项目的入口枢纽。",
            desc_ko: "수많은 인기 사무소를 산하에 둔 거대 지주 회사입니다. 공식 사이트는 기업 정보가 메인이지만 각 프로젝트의 포털 역할을 합니다."
        },
        {
            name: "HIMEHINA",
            name_en: "HIMEHINA",
            name_es: "HIMEHINA",
            name_zh: "HIMEHINA",
            name_ko: "히메히나 (HIMEHINA)",
            sub: "ヒメヒナ / Studio LaRa",
            filter: "corporate",
            color: "255, 105, 180",
            icon: "H",
            url: "Himehina/himehina_index.html",
            tags: ["Music", "Live"],
            desc: "田中ヒメと鈴木ヒナによるユニットおよびその運営組織。公式サイトはファンクラブとの連携が非常に深く、独自コンテンツが満載。",
            desc_en: "A unit of Tanaka Hime and Suzuki Hina with their management. Their site is deeply linked with the fan club, offering vast unique content.",
            desc_es: "Una unidad de Tanaka Hime y Suzuki Hina con su gestión. Su sitio está profundamente vinculado con el club de fans, ofreciendo un vasto contenido único.",
            desc_zh: "由田中姬和铃木雏组成的组合及其运营组织。官方网站与粉丝俱乐部的联动非常紧密，满载各种专属内容。",
            desc_ko: "다나카 히메와 스즈키 히나에 의한 유닛 및 운영 조직입니다. 공식 사이트는 팬클럽과의 연계가 매우 깊으며 독자 콘텐츠가 가득합니다."
        },

        // ── GLOBAL (稼働中) ──
        {
            name: "3AM",
            sub: "スリーエーエム",
            filter: "global",
            color: "80, 100, 200",
            icon: "3",
            url: "3AM/3am_index.html",
            tags: ["EN", "Agency"],
            desc: "夜の時間帯をターゲットにしたコンセプト。公式サイトは英語で運営され、深夜帯の配信スケジュールが中心。",
            desc_en: "A project targeting late-night viewers with English-first content and schedules.",
            desc_es: "Un proyecto enfocado en espectadores nocturnos con contenido y horarios centrados en el inglés.",
            desc_zh: "以深夜时段为目标的企划。官网以英语运营，主要提供深夜时段的直播大厅。",
            desc_ko: "심야 시간대를 타겟으로 한 컨셉입니다. 공식 사이트는 영어로 운영되며 심야 시간대 방송 스케줄이 중심입니다."
        },
        {
            name: "Astraline",
            name_en: "Astraline",
            name_es: "Astraline",
            name_zh: "Astraline",
            name_ko: "아스트랄라인 (Astraline)",
            sub: "アストラライン",
            filter: "global",
            color: "100, 150, 255",
            icon: "A",
            url: "Astraline/astraline_index.html",
            tags: ["EN", "Agency"],
            desc: "宇宙や近未来を想起させるデザインの公式サイト。英語圏のリスナーに特化したコンテンツを展開している。",
            desc_en: "A site designed with a sci-fi and near-future aesthetic. It focuses on content for English-speaking audiences.",
            desc_es: "Un sitio diseñado con una estética de ciencia ficción y un futuro cercano. Se centra en contenido para audiencias de habla inglesa.",
            desc_zh: "官方网站设计让人联想到宇宙与近未来。正在开展专门针对英语圈观众的内容。",
            desc_ko: "우주나 근미래를 연상시키는 디자인의 공식 사이트입니다. 영어권 리스너에게 특화된 콘텐츠를 전개하고 있습니다."
        },
        {
            name: "Densetsu.EXE",
            name_en: "Densetsu.EXE",
            name_es: "Densetsu.EXE",
            name_zh: "Densetsu.EXE",
            name_ko: "전설 (Densetsu.EXE)",
            sub: "デンセツ",
            filter: "global",
            color: "50, 255, 100",
            icon: "D",
            url: "Densetsu/densetsu_index.html",
            tags: ["EN", "Gaming"],
            desc: "日本のサブカルチャーをリスペクトした海外事務所。公式サイトは英語だが、日本のファンにも親しみやすいデザイン。",
            desc_en: "An overseas agency that respects Japanese subculture. Their site is in English but features a design familiar to Japanese fans.",
            desc_es: "Una agencia extranjera que respeta la subcultura japonesa. Su sitio está en inglés pero presenta un diseño familiar para los fans japoneses.",
            desc_zh: "致敬日本次文化的海外事务所。官方网站虽然是英语，但采用了日本粉丝也会感到亲切的设计。",
            desc_ko: "일본의 서브컬처를 존중하는 해외 사무소입니다. 공식 사이트는 영어지만 일본 팬들에게도 친숙한 디자인입니다."
        },
        {
            name: "MAHA5",
            name_en: "MAHA5",
            name_es: "MAHA5",
            name_zh: "MAHA5",
            name_ko: "마하판차 (MAHA5)",
            sub: "マハパンチャ",
            filter: "global",
            color: "255, 60, 100",
            icon: "M",
            url: "MAHA5/maha5_index.html",
            tags: ["MY", "Idol"],
            desc: "インドネシアを拠点とする最大手。公式サイトはインドネシア語と英語で、現地の文化に根ざした活動を報告している。",
            desc_en: "A major player based in Indonesia. Their site is in Indonesian and English, reporting on activities rooted in local culture.",
            desc_es: "Un jugador importante con sede en Indonesia. Su sitio está en indonesio e inglés, informando sobre actividades arraigadas en la cultura local.",
            desc_zh: "以印度尼西亚为基地的当地最大事务所。官方网站采用印尼语和英语，发布植根于当地文化的活动报告。",
            desc_ko: "인도네시아를 거점으로 하는 최대 사무소입니다. 공식 사이트는 인도네시아어와 영어로 운영되며 현지 문화에 기반한 활동을 보고하고 있습니다."
        },
        {
            name: "Mythic Talent",
            name_en: "Mythic Talent",
            name_es: "Mythic Talent",
            name_zh: "Mythic Talent",
            name_ko: "미식 탤런트 (Mythic Talent)",
            sub: "ミシックタレント",
            filter: "global",
            color: "200, 100, 255",
            icon: "M",
            url: "MythicTalent/mythic_index.html",
            tags: ["EN", "Agency"],
            desc: "大規模なタレントマネジメントエージェンシー。公式サイトはプロフェッショナルな印象で、多数のクリエイターを支援。",
            desc_en: "A large-scale talent management agency. Their site project a professional image and supports many creators.",
            desc_es: "Una agencia de gestión de talentos a gran escala. Su sitio proyecta una imagen profesional y apoya a muchos creadores.",
            desc_zh: "大规模的艺人管理经纪公司。官方网站给人以专业的印象，为众多创作者提供支持。",
            desc_ko: "대규모 탤런트 매니지먼트 에이전시입니다. 공식 사이트는 전문적인 인상을 주며 수많은 크리에이터를 지원하고 있습니다."
        },
        {
            name: "Mugen Live",
            name_en: "Mugen Live",
            name_es: "Mugen Live",
            name_zh: "Mugen Live",
            name_ko: "무겐 라이브 (Mugen Live)",
            sub: "ムゲンライブ",
            filter: "global",
            color: "60, 255, 220",
            icon: "M",
            url: "MugenLive/mugenlive_index.html",
            tags: ["Asia", "Agency"],
            desc: "アジア圏での展開に力を入れる。公式サイトはシンプルで、各タレントのSNSリンクが整理されている。",
            desc_en: "Focuses on expansion across Asia. Their site is simple, with organized social media links for each talent.",
            desc_es: "Se centra en la expansión por Asia. Su sitio es sencillo, con enlaces a redes sociales organizados para cada talento.",
            desc_zh: "致力于在亚洲地区的发展。官方网站设计简洁，整理了各艺人的社交账号链接。",
            desc_ko: "아시아 권역에서의 전개에 힘을 쓰고 있습니다. 공식 사이트는 심플하며 각 탤런트의 SNS 링크가 잘 정리되어 있습니다."
        },
        {
            name: "Phase Connect",
            name_en: "Phase Connect",
            name_es: "Phase Connect",
            name_zh: "Phase Connect",
            name_ko: "페이즈 커넥트 (Phase Connect)",
            sub: "フェイズ・コネクト",
            filter: "global",
            color: "63, 43, 150",
            icon: "P",
            url: "PhaseConnect/phaseconnect_index.html",
            tags: ["EN", "Agency", "Variety"],
            desc: "英語圏で独特の存在感を放つ。公式サイトは各メンバーのプロフィールが非常に詳しく、海外のミームにも対応している。",
            desc_en: "Has a unique presence in the English-speaking world. Their site features highly detailed member profiles and embraces international memes.",
            desc_es: "Tiene una presencia única en el mundo de habla inglesa. Su sitio presenta perfiles de miembros muy detallados y adopta memes internacionales.",
            desc_zh: "在英语圈拥有独特的存在感。官方网站上各位成员的介绍非常详尽，也融入了海外的网络迷因。",
            desc_ko: "영어권에서 독특한 존재감을 발산합니다. 공식 사이트는 각 멤버의 프로필이 매우 상세하며 해외 밈(meme)에도 대응하고 있습니다."
        },
        {
            name: "Stellar Verse Productions",
            name_en: "Stellar Verse Productions",
            name_es: "Stellar Verse Productions",
            name_zh: "Stellar Verse Productions",
            name_ko: "스텔라 버스 (Stellar Verse)",
            sub: "ステラバース",
            filter: "global",
            color: "150, 200, 255",
            icon: "S",
            url: "StellarVerse/svp_index.html",
            tags: ["EN", "Agency"],
            desc: "物語性を重視した海外プロジェクト。公式サイトでは独自の物語世界の設定が英語で綴られている。",
            desc_en: "An overseas project emphasizing storytelling. Their site features unique world-building lore written in English.",
            desc_es: "Un proyecto extranjero que enfatiza la narración de historias. Su sitio presenta una ambientación única escrita en inglés.",
            desc_zh: "重视叙事性的海外企划。官方网站上用英语撰写了独特的故事情节设定。",
            desc_ko: "이야기성을 중시하는 해외 프로젝트입니다. 공식 사이트에서는 독자적인 이야기 세계의 설정이 영어로 쓰여 있습니다."
        },
        {
            name: "StelLive",
            name_en: "StelLive",
            name_es: "StelLive",
            name_zh: "StelLive",
            name_ko: "스텔라이브 (StelLive)",
            sub: "ステルライブ / KR",
            filter: "global",
            color: "102, 166, 255",
            icon: "S",
            url: "StelLive/stellive_index.html",
            tags: ["KR", "Music"],
            desc: "韓国を拠点に強力なファンベースを持つ。公式サイトは韓国語中心だが、ビジュアルの質の高さで海外からも注目されている。",
            desc_en: "Has a powerful fanbase based in Korea. While the site is primarily in Korean, the high visual quality attracts international attention.",
            desc_es: "Tiene una base de fans poderosa con sede en Corea. Aunque el sitio está principalmente en coreano, la alta calidad visual atrae la atención internacional.",
            desc_zh: "以韩国为据点拥有强大的粉群。官方网站以韩语为主，但凭借极高的视觉质量也受到了海外的关注。",
            desc_ko: "한국을 거점으로 강력한 팬덤을 보유하고 있습니다. 공식 사이트는 한국어 중심이지만 비주얼 퀄리티가 높아 해외에서도 주목받고 있습니다."
        },
        {
            name: "V&U",
            name_en: "V&U",
            name_es: "V&U",
            name_zh: "V&U",
            name_ko: "V&U",
            sub: "バーチャル＆ユー",
            filter: "global",
            color: "255, 180, 80",
            icon: "V",
            url: "VnU/vnu_index.html",
            tags: ["EN", "Agency"],
            desc: "英語圏のタレントを数多く擁する。公式サイトはスタイリッシュで、各タレントの個性的なビジュアルが引き立つ。",
            desc_en: "Home to many English-speaking talents. Their stylish site makes each talent's unique visuals stand out.",
            desc_es: "Hogar de muchos talentos de habla inglesa. Su sitio elegante hace que las visuales únicas de cada talento destaquen.",
            desc_zh: "拥有众多英语圈艺人。官方网站风格时尚，突出了各位艺人充满个性的视觉形象。",
            desc_ko: "영어권 탤런트들을 다수 보유하고 있습니다. 공식 사이트는 스타일리시하며 각 탤런트의 개성 넘치는 비주얼이 돋보입니다."
        },
        {
            name: "V4Mirai",
            name_en: "V4Mirai",
            name_es: "V4Mirai",
            name_zh: "V4Mirai",
            name_ko: "브이포미라이 (V4Mirai)",
            sub: "ブイフォーミライ / Brave Group",
            filter: "global",
            color: "0, 114, 255",
            icon: "V",
            url: "V4Mirai/v4mirai_index.html",
            tags: ["Brave Group", "EN"],
            desc: "Brave Groupの海外展開ブランド。公式サイトは日本語と英語のハイブリッドで、国内外の架け橋となっている。",
            desc_en: "Brave Group's international brand. Their site is a hybrid of Japanese and English, serving as a bridge between domestic and global markets.",
            desc_es: "La marca internacional de Brave Group. Su sitio es un híbrido de japonés e inglés, sirviendo de puente entre los mercados locales y globales.",
            desc_zh: "Brave Group的海外拓展品牌。官方网站采用日语和英语双语形式，成为了国内外交流的桥梁。",
            desc_ko: "Brave Group의 해외 전개 브랜드입니다. 공식 사이트는 일본어와 영어의 하이브리드 구성으로 국내외의 가교 역할을 하고 있습니다."
        },
        {
            name: "VOLs",
            name_en: "VOLs",
            name_es: "VOLs",
            name_zh: "VOLs",
            name_ko: "볼즈 (VOLs)",
            sub: "ヴォルズ",
            filter: "global",
            color: "80, 200, 255",
            icon: "V",
            url: "VOLs/vols_index.html",
            tags: ["EN", "Agency"],
            desc: "独自の技術を用いた配信を売りとする。公式サイトはテクノロジーに詳しくない層にも分かりやすい解説を載せいている。",
            desc_en: "Features streams using proprietary technology. Their site provides easy-to-understand explanations even for those not tech-savvy.",
            desc_es: "Ofrece transmisiones con tecnología propia. Su sitio ofrece explicaciones fáciles de entender incluso para quienes no son expertos en tecnología.",
            desc_zh: "以采用独特技术的直播为卖点。官方网站为不熟悉技术的群体也提供了简单易懂的说明。",
            desc_ko: "독자적인 기술을 이용한 방송을 강점으로 합니다. 공식 사이트는 기술에 익숙하지 않은 층에게도 알기 쉬운 해설을 제공합니다."
        },
        {
            name: "VShojo",
            name_en: "VShojo",
            name_es: "VShojo",
            name_zh: "VShojo",
            name_ko: "브이쇼죠 (VShojo)",
            sub: "ヴイショウジョ / US",
            filter: "global",
            color: "255, 126, 179",
            icon: "V",
            url: "VShojo/vshojo_index.html",
            tags: ["EN", "JP"],
            desc: "米国を拠点とするタレントファーストのエージェンシー。公式サイトはタレントごとの自由度が高く、個々のブランドが尊重されている。",
            desc_en: "A US-based talent-first agency that empowers creators to build their own unique brands.",
            desc_es: "Una agencia con sede en EE. UU. que prioriza al talento, permitiéndoles crear sus propias marcas únicas.",
            desc_zh: "总部位于美国的艺人至上型事务所。官网给予艺人极高的自由度，充分尊重个人品牌。",
            desc_ko: "미국에 본사를 둔 탤런트 중심 에이전시입니다. 공식 사이트는 탤런트별 자유도가 높으며 개별 브랜드를 존중합니다."
        },
        {
            name: "A-SOUL",
            name_en: "A-SOUL",
            name_es: "A-SOUL",
            name_zh: "A-SOUL",
            name_ko: "A-SOUL",
            sub: "アーソウル / CN",
            filter: "global",
            color: "195, 20, 50",
            icon: "A",
            url: "ASOUL/asoul_index.html",
            tags: ["CN", "3D Idol"],
            desc: "中国のテック巨頭によるプロジェクト。公式サイト（主に中国国内向け）は3D技術の粋を集めた豪華な仕様。",
            desc_en: "A project by a Chinese tech giant. Their site (mainly for domestic China) features a luxurious design showcasing the pinnacle of 3D technology.",
            desc_es: "Un proyecto de un gigante tecnológico chino. Su sitio (principalmente para China nacional) presenta un diseño lujoso que muestra el pináculo de la tecnología 3D.",
            desc_zh: "由中国技术巨头发起的项目。其官方网站（主要面向中国国内）集3D技术之大成，规格极其豪华。",
            desc_ko: "중국 테크 거물에 의한 프로젝트입니다. 공식 사이트(주로 중국 국내용)는 3D 기술의 정수를 모은 호화로운 사양입니다."
        },
        {
            name: "Globie",
            name_en: "Globie",
            name_es: "Globie",
            name_zh: "Globie",
            name_ko: "글로비 (Globie)",
            sub: "グロービー / EU",
            filter: "global",
            color: "255, 215, 0",
            icon: "G",
            url: "Globie/globie_index.html",
            tags: ["EU", "Agency"],
            desc: "欧州市場をメインターゲットとしたプロジェクト。公式サイトは多様な言語や文化への配慮が見られ、国際色豊か。",
            desc_en: "A project primarily targeting the European market. Their site shows consideration for various languages and cultures, with a rich international flair.",
            desc_es: "Un proyecto dirigido principalmente al mercado europeo. Su sitio muestra consideración por diversos idiomas y culturas, con un rico aire internacional.",
            desc_zh: "以欧洲市场为主要目标的项目。官方网站考虑到了多种语言和文化，国际化色彩浓厚。",
            desc_ko: "유럽 시장을 메인 타겟으로 하는 프로젝트입니다. 공식 사이트는 다양한 언어와 문화에 대한 배려가 돋보이며 국제적인 색채가 풍부합니다."
        },

        // ── 追加分（内容反映） ──
        {
            name: "うたたねプロダクション",
            name_en: "Utatane Production",
            name_es: "Utatane Production",
            name_zh: "Utatane Production",
            name_ko: "우타타네 프로덕션 (Utatane Production)",
            sub: "Utatane Production",
            filter: "indie",
            color: "180, 140, 255",
            icon: "U",
            url: "UtataneProduction/utatane_index.html",
            tags: ["Agency", "Music", "Creator"],
            desc: "うたたねプロダクションはVTuberプロダクション。音楽・クリエイター支援が特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "Utatane Production is a VTuber production. Known for music and creator support. The site lists the talent roster.",
            desc_es: "Utatane Production es una producción VTuber. Destaca por la música y apoyo a creadores. El sitio muestra el roster de talentos.",
            desc_zh: "Utatane Production是VTuber 制作公司。以音乐与创作者支持为特色。官网可查看成员名单。",
            desc_ko: "우타타네 프로덕션 (Utatane Production)는 VTuber 프로덕션입니다. 음악 및 크리에이터 지원이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "N'sARK",
            name_en: "N'sARK",
            name_es: "N'sARK",
            name_zh: "N'sARK",
            name_ko: "엔즈아크 (N'sARK)",
            sub: "エヌズアーク",
            filter: "indie",
            color: "70, 130, 200",
            icon: "N",
            url: "NsARK/nsark_index.html",
            tags: ["Music", "Gaming", "Tech"],
            desc: "N'sARKはVTuberプロジェクト。音楽・ゲームが特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "N'sARK is a VTuber project. Known for music and gaming. The site lists the talent roster.",
            desc_es: "N'sARK es una proyecto VTuber. Destaca por la música y los juegos. El sitio muestra el roster de talentos.",
            desc_zh: "N'sARK是VTuber 项目。以音乐与游戏为特色。官网可查看成员名单。",
            desc_ko: "엔즈아크 (N'sARK)는 VTuber 프로젝트입니다. 음악 및 게임이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "Guild CQ",
            name_en: "Guild CQ",
            name_es: "Guild CQ",
            name_zh: "Guild CQ",
            name_ko: "길드 CQ (Guild CQ)",
            sub: "ギルドシーキュー",
            filter: "indie",
            color: "200, 160, 80",
            icon: "G",
            url: "GuildCQ/guildcq_index.html",
            tags: ["Music", "Gaming", "Worldbuilding"],
            desc: "Guild CQはVTuberプロジェクト。音楽・ゲームが特徴。公式サイトで世界観や企画背景が語られている。",
            desc_en: "Guild CQ is a VTuber project. Known for music and gaming. The site highlights lore and project background.",
            desc_es: "Guild CQ es una proyecto VTuber. Destaca por la música y los juegos. El sitio destaca la historia y el contexto del proyecto.",
            desc_zh: "Guild CQ是VTuber 项目。以音乐与游戏为特色。官网强调世界观与企划背景。",
            desc_ko: "길드 CQ (Guild CQ)는 VTuber 프로젝트입니다. 음악 및 게임이(가) 특징입니다. 공식 사이트에서 세계관과 기획 배경을 소개합니다."
        },
        {
            name: "ななはぴ",
            name_en: "NanaHapi",
            name_es: "NanaHapi",
            name_zh: "NanaHapi",
            name_ko: "나나하피 (NanaHapi)",
            sub: "NanaHapi",
            filter: "indie",
            color: "255, 200, 100",
            icon: "7",
            url: "NanaHapi/nanahapi_index.html",
            tags: ["Agency", "Music", "3D"],
            desc: "ななはぴはVTuberプロダクション。音楽・3Dが特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "NanaHapi is a VTuber production. Known for music and 3D. The site lists the talent roster.",
            desc_es: "NanaHapi es una producción VTuber. Destaca por la música y 3D. El sitio muestra el roster de talentos.",
            desc_zh: "NanaHapi是VTuber 制作公司。以音乐与3D为特色。官网可查看成员名单。",
            desc_ko: "나나하피 (NanaHapi)는 VTuber 프로덕션입니다. 음악 및 3D이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "ねくすとぴあ",
            name_en: "Nextopia",
            name_es: "Nextopia",
            name_zh: "Nextopia",
            name_ko: "넥스토피아 (Nextopia)",
            sub: "Nextopia",
            filter: "indie",
            color: "100, 160, 255",
            icon: "N",
            url: "Nextopia/nextopia_index.html",
            tags: ["Music", "Corporate"],
            desc: "ねくすとぴあはVTuberプロジェクト。音楽が特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "Nextopia is a VTuber project. Known for music. The site lists the talent roster.",
            desc_es: "Nextopia es una proyecto VTuber. Destaca por la música. El sitio muestra el roster de talentos.",
            desc_zh: "Nextopia是VTuber 项目。以音乐为特色。官网可查看成员名单。",
            desc_ko: "넥스토피아 (Nextopia)는 VTuber 프로젝트입니다. 음악이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "VALTRA",
            name_en: "VALTRA",
            name_es: "VALTRA",
            name_zh: "VALTRA",
            name_ko: "발트라 (VALTRA)",
            sub: "ヴァルトラ",
            filter: "indie",
            color: "140, 80, 255",
            icon: "V",
            url: "VALTRA/valtra_index.html",
            tags: ["Agency", "Gaming", "Worldbuilding"],
            desc: "VALTRAはVTuber事務所。ゲーム・世界観が特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "VALTRA is a VTuber agency. Known for gaming and worldbuilding. The site lists the talent roster.",
            desc_es: "VALTRA es una agencia VTuber. Destaca por los juegos y construcción de mundo. El sitio muestra el roster de talentos.",
            desc_zh: "VALTRA是VTuber 事务所。以游戏与世界观为特色。官网可查看成员名单。",
            desc_ko: "발트라 (VALTRA)는 VTuber 에이전시입니다. 게임 및 세계관이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "Vebop Project",
            name_en: "Vebop Project",
            name_es: "Vebop Project",
            name_zh: "Vebop Project",
            name_ko: "비밥 프로젝트 (Vebop Project)",
            sub: "ヴィバップ",
            filter: "indie",
            color: "255, 200, 50",
            icon: "V",
            url: "VebopProject/vebop_index.html",
            tags: ["Music", "Corporate"],
            desc: "Vebop ProjectはVTuberプロジェクト。音楽が特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "Vebop Project is a VTuber project. Known for music. The site lists the talent roster.",
            desc_es: "Vebop Project es una proyecto VTuber. Destaca por la música. El sitio muestra el roster de talentos.",
            desc_zh: "Vebop Project是VTuber 项目。以音乐为特色。官网可查看成员名单。",
            desc_ko: "비밥 프로젝트 (Vebop Project)는 VTuber 프로젝트입니다. 음악이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "Vlash",
            name_en: "Vlash",
            name_es: "Vlash",
            name_zh: "Vlash",
            name_ko: "브래쉬 (Vlash)",
            sub: "ブラッシュ",
            filter: "global",
            color: "255, 80, 60",
            icon: "V",
            url: "Vlash/vlash_index.html",
            tags: ["Corporate"],
            desc: "VlashはVTuberプロジェクト。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "Vlash is a VTuber project. The site lists the talent roster.",
            desc_es: "Vlash es una proyecto VTuber. El sitio muestra el roster de talentos.",
            desc_zh: "Vlash是VTuber 项目。官网可查看成员名单。",
            desc_ko: "브래쉬 (Vlash)는 VTuber 프로젝트입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "PROMISU",
            name_en: "PROMISU",
            name_es: "PROMISU",
            name_zh: "PROMISU",
            name_ko: "프로미스 (PROMISU)",
            sub: "プロミス",
            filter: "global",
            color: "255, 140, 100",
            icon: "P",
            url: "PROMISU/promisu_index.html",
            tags: ["3D", "Multilingual", "Variety"],
            desc: "PROMISUはグローバルなVTuberプロジェクト。3D・多言語が特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "PROMISU is a global VTuber project. Known for 3D and multilingual focus. The site lists the talent roster.",
            desc_es: "PROMISU es una proyecto VTuber global. Destaca por 3D y enfoque multilingüe. El sitio muestra el roster de talentos.",
            desc_zh: "PROMISU是全球的VTuber 项目。以3D与多语言为特色。官网可查看成员名单。",
            desc_ko: "프로미스 (PROMISU)는 글로벌 VTuber 프로젝트입니다. 3D 및 다국어이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "VEXZ",
            name_en: "VEXZ",
            name_es: "VEXZ",
            name_zh: "VEXZ",
            name_ko: "벡스 (VEXZ)",
            sub: "ヴェクス",
            filter: "global",
            color: "255, 100, 200",
            icon: "V",
            url: "VEXZ/vexz_index.html",
            tags: ["Music", "3D", "Tech"],
            desc: "VEXZはVTuberプロジェクト。音楽・3Dが特徴。公式サイトで世界観や企画背景が語られている。",
            desc_en: "VEXZ is a VTuber project. Known for music and 3D. The site highlights lore and project background.",
            desc_es: "VEXZ es una proyecto VTuber. Destaca por la música y 3D. El sitio destaca la historia y el contexto del proyecto.",
            desc_zh: "VEXZ是VTuber 项目。以音乐与3D为特色。官网强调世界观与企划背景。",
            desc_ko: "벡스 (VEXZ)는 VTuber 프로젝트입니다. 음악 및 3D이(가) 특징입니다. 공식 사이트에서 세계관과 기획 배경을 소개합니다."
        },
        {
            name: "bondlive",
            name_en: "bondlive",
            name_es: "bondlive",
            name_zh: "bondlive",
            name_ko: "본드라이브 (bondlive)",
            sub: "ボンドライブ",
            filter: "indie",
            color: "255, 220, 120",
            icon: "B",
            url: "bondlive/bondlive_index.html",
            tags: ["Agency", "Gaming", "Live"],
            desc: "bondliveは日本のVTuber事務所。ゲーム・ライブ/イベントが特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "bondlive is a Japan-based VTuber agency. Known for gaming and live events. The site lists the talent roster.",
            desc_es: "bondlive es una agencia VTuber con base en Japón. Destaca por los juegos y eventos en vivo. El sitio muestra el roster de talentos.",
            desc_zh: "bondlive是日本的VTuber 事务所。以游戏与直播/活动为特色。官网可查看成员名单。",
            desc_ko: "본드라이브 (bondlive)는 일본 기반의 VTuber 에이전시입니다. 게임 및 라이브/이벤트이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "MAHA5JAPAN",
            name_en: "MAHA5JAPAN",
            name_es: "MAHA5JAPAN",
            name_zh: "MAHA5JAPAN",
            name_ko: "마하판차 재팬 (MAHA5JAPAN)",
            sub: "マハパンチャ JP",
            filter: "global",
            color: "255, 80, 120",
            icon: "M",
            url: "MAHA5JAPAN/maha5_index.html",
            tags: ["Agency", "JP", "Corporate"],
            desc: "MAHA5JAPANは日本のVTuber事務所。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "MAHA5JAPAN is a Japan-based VTuber agency. The site lists the talent roster.",
            desc_es: "MAHA5JAPAN es una agencia VTuber con base en Japón. El sitio muestra el roster de talentos.",
            desc_zh: "MAHA5JAPAN是日本的VTuber 事务所。官网可查看成员名单。",
            desc_ko: "마하판차 재팬 (MAHA5JAPAN)는 일본 기반의 VTuber 에이전시입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "MeSTAGE",
            name_en: "MeSTAGE",
            name_es: "MeSTAGE",
            name_zh: "MeSTAGE",
            name_ko: "미스테 (MeSTAGE)",
            sub: "みいすて",
            filter: "indie",
            color: "255, 160, 220",
            icon: "M",
            url: "MeSTAGE/mestage_index.html",
            tags: ["Music", "Esports"],
            desc: "MeSTAGEはVTuberプロジェクト。音楽・eスポーツが特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "MeSTAGE is a VTuber project. Known for music and esports. The site lists the talent roster.",
            desc_es: "MeSTAGE es una proyecto VTuber. Destaca por la música y los esports. El sitio muestra el roster de talentos.",
            desc_zh: "MeSTAGE是VTuber 项目。以音乐与电竞为特色。官网可查看成员名单。",
            desc_ko: "미스테 (MeSTAGE)는 VTuber 프로젝트입니다. 음악 및 e스포츠이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "MicoLiz",
            name_en: "MicoLiz",
            name_es: "MicoLiz",
            name_zh: "MicoLiz",
            name_ko: "미코리스 (MicoLiz)",
            sub: "ミコリス",
            filter: "indie",
            color: "200, 100, 255",
            icon: "M",
            url: "MicoLiz/micoliz_index.html",
            tags: ["Worldbuilding"],
            desc: "MicoLizはVTuberプロジェクト。世界観が特徴。公式サイトで世界観や企画背景が語られている。",
            desc_en: "MicoLiz is a VTuber project. Known for worldbuilding. The site highlights lore and project background.",
            desc_es: "MicoLiz es una proyecto VTuber. Destaca por construcción de mundo. El sitio destaca la historia y el contexto del proyecto.",
            desc_zh: "MicoLiz是VTuber 项目。以世界观为特色。官网强调世界观与企划背景。",
            desc_ko: "미코리스 (MicoLiz)는 VTuber 프로젝트입니다. 세계관이(가) 특징입니다. 공식 사이트에서 세계관과 기획 배경을 소개합니다."
        },
        {
            name: "MUSUBIME△",
            name_en: "MUSUBIME△",
            name_es: "MUSUBIME△",
            name_zh: "MUSUBIME△",
            name_ko: "무스비메 (MUSUBIME△)",
            sub: "むすびめ",
            filter: "indie",
            color: "160, 255, 200",
            icon: "M",
            url: "MUSUBIME/musubime_index.html",
            tags: ["Gaming", "Tech", "Creator"],
            desc: "MUSUBIME△はVTuberプロジェクト。ゲーム・技術が特徴。公式サイトで募集・オーディション情報が掲載される。",
            desc_en: "MUSUBIME△ is a VTuber project. Known for gaming and technology. Recruitment and audition info appears on the site.",
            desc_es: "MUSUBIME△ es una proyecto VTuber. Destaca por los juegos y la tecnología. El sitio publica información de reclutamiento y audiciones.",
            desc_zh: "MUSUBIME△是VTuber 项目。以游戏与技术为特色。官网发布招募/甄选信息。",
            desc_ko: "무스비메 (MUSUBIME△)는 VTuber 프로젝트입니다. 게임 및 기술이(가) 특징입니다. 공식 사이트에 모집/오디션 정보가 올라옵니다."
        },
        {
            name: "UniVIRTUAL",
            name_en: "UniVIRTUAL",
            name_es: "UniVIRTUAL",
            name_zh: "UniVIRTUAL",
            name_ko: "유니버추얼 (UniVIRTUAL)",
            sub: "ユニバーチャル",
            filter: "indie",
            color: "150, 200, 255",
            icon: "U",
            url: "UniVIRTUAL/univirtual_index.html",
            tags: ["Agency", "Music", "Gaming"],
            desc: "UniVIRTUALはVTuber事務所。音楽・ゲームが特徴。公式サイトに楽曲やディスコグラフィ情報がまとまっている。",
            desc_en: "UniVIRTUAL is a VTuber agency. Known for music and gaming. Music and discography details are compiled on the site.",
            desc_es: "UniVIRTUAL es una agencia VTuber. Destaca por la música y los juegos. La música y la discografía están recopiladas en el sitio.",
            desc_zh: "UniVIRTUAL是VTuber 事务所。以音乐与游戏为特色。官网汇总了音乐与作品信息。",
            desc_ko: "유니버추얼 (UniVIRTUAL)는 VTuber 에이전시입니다. 음악 및 게임이(가) 특징입니다. 공식 사이트에 음악과 디스코그래피 정보가 정리되어 있습니다."
        },
        {
            name: "ラブボックス",
            name_en: "LoveBox",
            name_es: "LoveBox",
            name_zh: "ラブボックス (LoveBox)",
            name_ko: "러브박스",
            sub: "LoveBox",
            filter: "indie",
            color: "255, 100, 150",
            icon: "L",
            url: "LoveBox/lovebox_index.html",
            tags: ["Agency", "Idol"],
            desc: "ラブボックスはVTuberプロダクション。アイドルが特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "LoveBox is a VTuber production. Known for idol. The site lists the talent roster.",
            desc_es: "LoveBox es una producción VTuber. Destaca por idol. El sitio muestra el roster de talentos.",
            desc_zh: "ラブボックス (LoveBox)是VTuber 制作公司。以偶像为特色。官网可查看成员名单。",
            desc_ko: "러브박스는 VTuber 프로덕션입니다. 아이돌이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "re;BON",
            name_en: "re;BON",
            name_es: "re;BON",
            name_zh: "re;BON",
            name_ko: "리본 (re;BON)",
            sub: "リボン",
            filter: "indie",
            color: "255, 140, 180",
            icon: "R",
            url: "reBON/rebon_index.html",
            tags: ["Agency", "Creator", "Corporate"],
            desc: "re;BONはVTuber事務所。クリエイター支援が特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "re;BON is a VTuber agency. Known for creator support. The site lists the talent roster.",
            desc_es: "re;BON es una agencia VTuber. Destaca por apoyo a creadores. El sitio muestra el roster de talentos.",
            desc_zh: "re;BON是VTuber 事务所。以创作者支持为特色。官网可查看成员名单。",
            desc_ko: "리본 (re;BON)는 VTuber 에이전시입니다. 크리에이터 지원이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "Luminaria Production",
            name_en: "Luminaria Production",
            name_es: "Luminaria Production",
            name_zh: "Luminaria Production",
            name_ko: "루미나리아 프로덕션 (Luminaria Production)",
            sub: "るみぷろ",
            filter: "indie",
            color: "200, 240, 255",
            icon: "L",
            url: "LuminariaProduction/luminaria_index.html",
            tags: ["Agency", "Music", "Gaming"],
            desc: "Luminaria ProductionはVTuber事務所。音楽・ゲームが特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "Luminaria Production is a VTuber agency. Known for music and gaming. The site lists the talent roster.",
            desc_es: "Luminaria Production es una agencia VTuber. Destaca por la música y los juegos. El sitio muestra el roster de talentos.",
            desc_zh: "Luminaria Production是VTuber 事务所。以音乐与游戏为特色。官网可查看成员名单。",
            desc_ko: "루미나리아 프로덕션 (Luminaria Production)는 VTuber 에이전시입니다. 음악 및 게임이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "Arri Virtual",
            name_en: "Arri Virtual",
            name_es: "Arri Virtual",
            name_zh: "Arri Virtual",
            name_ko: "아리 버추얼 (Arri Virtual)",
            sub: "アリバーチャル",
            filter: "global",
            color: "180, 255, 200",
            icon: "A",
            url: "ArriVirtual/arrivirtual_index.html",
            tags: ["Agency", "Global"],
            desc: "Arri VirtualはグローバルなVTuber事務所。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "Arri Virtual is a global VTuber agency. The site lists the talent roster.",
            desc_es: "Arri Virtual es una agencia VTuber global. El sitio muestra el roster de talentos.",
            desc_zh: "Arri Virtual是全球的VTuber 事务所。官网可查看成员名单。",
            desc_ko: "아리 버추얼 (Arri Virtual)는 글로벌 VTuber 에이전시입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "AStars production",
            name_en: "AStars production",
            name_es: "AStars production",
            name_zh: "AStars production",
            name_ko: "에이스타즈 (AStars production)",
            sub: "エースターズ",
            filter: "global",
            color: "255, 230, 80",
            icon: "A",
            url: "AStarsProduction/astars_index.html",
            tags: ["Agency", "Global", "Corporate"],
            desc: "AStars productionはグローバルなVTuber事務所。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "AStars production is a global VTuber agency. The site lists the talent roster.",
            desc_es: "AStars production es una agencia VTuber global. El sitio muestra el roster de talentos.",
            desc_zh: "AStars production是全球的VTuber 事务所。官网可查看成员名单。",
            desc_ko: "에이스타즈 (AStars production)는 글로벌 VTuber 에이전시입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "ChromaSHIFT",
            name_en: "ChromaSHIFT",
            name_es: "ChromaSHIFT",
            name_zh: "ChromaSHIFT",
            name_ko: "크로마시프트 (ChromaSHIFT)",
            sub: "クロマシフト",
            filter: "global",
            color: "255, 8, 68",
            icon: "C",
            url: "ChromaSHIFT/chromashift_index.html",
            tags: ["Agency", "Multilingual", "Variety"],
            desc: "ChromaSHIFTはグローバルなVTuber事務所。多言語・バラエティが特徴。公式サイトで所属タレントの一覧が確認できる。",
            desc_en: "ChromaSHIFT is a global VTuber agency. Known for multilingual focus and variety content. The site lists the talent roster.",
            desc_es: "ChromaSHIFT es una agencia VTuber global. Destaca por enfoque multilingüe y contenido variado. El sitio muestra el roster de talentos.",
            desc_zh: "ChromaSHIFT是全球的VTuber 事务所。以多语言与多样内容为特色。官网可查看成员名单。",
            desc_ko: "크로마시프트 (ChromaSHIFT)는 글로벌 VTuber 에이전시입니다. 다국어 및 버라이어티이(가) 특징입니다. 공식 사이트에서 소속 멤버를 확인할 수 있습니다."
        },
        {
            name: "PRISM Project",
            name_en: "PRISM Project",
            name_es: "PRISM Project",
            name_zh: "PRISM Project",
            name_ko: "프리즘 프로젝트 (PRISM Project)",
            sub: "プリズム / Sony Music",
            filter: "global",
            color: "79, 172, 254",
            icon: "P",
            url: "PrismProject/prismproject_index.html",
            tags: ["Agency"],
            desc: "PRISM ProjectはVTuberプロジェクト。公式サイトで活動情報が整理されている。",
            desc_en: "PRISM Project is a VTuber project. The site organizes activity information.",
            desc_es: "PRISM Project es una proyecto VTuber. El sitio organiza la información de actividades.",
            desc_zh: "PRISM Project是VTuber 项目。官网整理了活动信息。",
            desc_ko: "프리즘 프로젝트 (PRISM Project)는 VTuber 프로젝트입니다. 공식 사이트에서 활동 정보가 정리되어 있습니다."
        },
        {
            name: "Production Kawaii",
            name_en: "Production Kawaii",
            name_es: "Production Kawaii",
            name_zh: "Production Kawaii",
            name_ko: "프로덕션 카와이 (Production Kawaii)",
            sub: "プロダクション・カワイイ",
            filter: "global",
            color: "255, 154, 158",
            icon: "P",
            url: "ProductionKawaii/productionkawaii_index.html",
            tags: ["Agency", "Music", "Idol"],
            desc: "Production KawaiiはグローバルなVTuber事務所。音楽・アイドルが特徴。公式サイトで世界観や企画背景が語られている。",
            desc_en: "Production Kawaii is a global VTuber agency. Known for music and idol. The site highlights lore and project background.",
            desc_es: "Production Kawaii es una agencia VTuber global. Destaca por la música y idol. El sitio destaca la historia y el contexto del proyecto.",
            desc_zh: "Production Kawaii是全球的VTuber 事务所。以音乐与偶像为特色。官网强调世界观与企划背景。",
            desc_ko: "프로덕션 카와이 (Production Kawaii)는 글로벌 VTuber 에이전시입니다. 음악 및 아이돌이(가) 특징입니다. 공식 사이트에서 세계관과 기획 배경을 소개합니다."
        },
        {
            name: "AkioAIR",
            name_en: "AkioAIR",
            name_es: "AkioAIR",
            name_zh: "AkioAIR",
            name_ko: "아키오에어 (AkioAIR)",
            sub: "アキオエアー",
            filter: "global",
            color: "70, 130, 180",
            icon: "A",
            url: "AkioAIR/akioair_index.html",
            tags: ["Agency", "Music", "Gaming"],
            desc: "AkioAIRは台湾のVTuber事務所。音楽・ゲームが特徴。公式サイトに楽曲やディスコグラフィ情報がまとまっている。",
            desc_en: "AkioAIR is a Taiwan-based VTuber agency. Known for music and gaming. Music and discography details are compiled on the site.",
            desc_es: "AkioAIR es una agencia VTuber con base en Taiwán. Destaca por la música y los juegos. La música y la discografía están recopiladas en el sitio.",
            desc_zh: "AkioAIR是台湾的VTuber 事务所。以音乐与游戏为特色。官网汇总了音乐与作品信息。",
            desc_ko: "아키오에어 (AkioAIR)는 대만 기반의 VTuber 에이전시입니다. 음악 및 게임이(가) 특징입니다. 공식 사이트에 음악과 디스코그래피 정보가 정리되어 있습니다."
        },
        {
            name: "CyberLive",
            name_en: "CyberLive",
            name_es: "CyberLive",
            name_zh: "CyberLive",
            name_ko: "사이버라이브 (CyberLive)",
            sub: "サイバーライブ",
            filter: "global",
            color: "0, 255, 255",
            icon: "C",
            url: "CyberLive/cyberlive_index.html",
            tags: ["Agency", "Music", "Idol"],
            desc: "CyberLiveは台湾のVTuber事務所。音楽・アイドルが特徴。公式サイトに楽曲やディスコグラフィ情報がまとまっている。",
            desc_en: "CyberLive is a Taiwan-based VTuber agency. Known for music and idol. Music and discography details are compiled on the site.",
            desc_es: "CyberLive es una agencia VTuber con base en Taiwán. Destaca por la música y idol. La música y la discografía están recopiladas en el sitio.",
            desc_zh: "CyberLive是台湾的VTuber 事务所。以音乐与偶像为特色。官网汇总了音乐与作品信息。",
            desc_ko: "사이버라이브 (CyberLive)는 대만 기반의 VTuber 에이전시입니다. 음악 및 아이돌이(가) 특징입니다. 공식 사이트에 음악과 디스코그래피 정보가 정리되어 있습니다."
        },
        {
            name: "Tsunderia",
            name_en: "Tsunderia",
            name_es: "Tsunderia",
            name_zh: "Tsunderia",
            name_ko: "츤데리아 (Tsunderia)",
            sub: "ツンデリア",
            filter: "global",
            color: "255, 99, 71",
            icon: "T",
            url: "Tsunderia/tsunderia_index.html",
            tags: ["Agency"],
            desc: "TsunderiaはVTuberプロジェクト。公式サイトで活動情報が整理されている。",
            desc_en: "Tsunderia is a VTuber project. The site organizes activity information.",
            desc_es: "Tsunderia es una proyecto VTuber. El sitio organiza la información de actividades.",
            desc_zh: "Tsunderia是VTuber 项目。官网整理了活动信息。",
            desc_ko: "츤데리아 (Tsunderia)는 VTuber 프로젝트입니다. 공식 사이트에서 활동 정보가 정리되어 있습니다."
        },
        {
            name: "MyHoloTV",
            name_en: "MyHoloTV",
            name_es: "MyHoloTV",
            name_zh: "MyHoloTV",
            name_ko: "마이홀로TV (MyHoloTV)",
            sub: "マイホロティービー / MY",
            filter: "global",
            color: "32, 178, 170",
            icon: "M",
            url: "MyHoloTV/myholotv_index.html",
            tags: ["Idol", "Gaming", "Esports"],
            desc: "MyHoloTVはVTuberプロジェクト。アイドル・ゲームが特徴。公式サイトで活動情報が整理されている。",
            desc_en: "MyHoloTV is a VTuber project. Known for idol and gaming. The site organizes activity information.",
            desc_es: "MyHoloTV es una proyecto VTuber. Destaca por idol y los juegos. El sitio organiza la información de actividades.",
            desc_zh: "MyHoloTV是VTuber 项目。以偶像与游戏为特色。官网整理了活动信息。",
            desc_ko: "마이홀로TV (MyHoloTV)는 VTuber 프로젝트입니다. 아이돌 및 게임이(가) 특징입니다. 공식 사이트에서 활동 정보가 정리되어 있습니다."
        },

    ];

    const MAX_CARD_TAGS = 5;
    const BLOCKED_TAGS = new Set(['CR-Mafu', 'Coffee']);
    const INVESTIGATING_TAG = '整備中';
    const agencyTagTranslations = {
        '3D': { ja: '3D', en: '3D', es: '3D', zh: '3D', ko: '3D' },
        '3D Idol': { ja: '3Dアイドル', en: '3D Idol', es: 'Idol 3D', zh: '3D偶像', ko: '3D 아이돌' },
        'Agency': { ja: '事務所', en: 'Agency', es: 'Agencia', zh: '事务所', ko: '에이전시' },
        'Asia': { ja: 'アジア', en: 'Asia', es: 'Asia', zh: '亚洲', ko: '아시아' },
        'Brave Group': { ja: 'Brave Group', en: 'Brave Group', es: 'Brave Group', zh: 'Brave Group', ko: 'Brave Group' },
        'Comedy': { ja: 'コメディ', en: 'Comedy', es: 'Comedia', zh: '喜剧', ko: '코미디' },
        'Corporate': { ja: '企業', en: 'Corporate', es: 'Corporativo', zh: '企业', ko: '기업' },
        'Creator': { ja: 'クリエイター', en: 'Creator', es: 'Creador', zh: '创作者', ko: '크리에이터' },
        'CN': { ja: '中国圏', en: 'CN', es: 'CN', zh: '中文', ko: '중국어권' },
        'Cute': { ja: 'キュート', en: 'Cute', es: 'Cute', zh: '可爱', ko: '큐트' },
        'EN': { ja: '英語圏', en: 'EN', es: 'EN', zh: '英语', ko: '영어권' },
        'Esports': { ja: 'eスポーツ', en: 'Esports', es: 'eSports', zh: '电子竞技', ko: 'e스포츠' },
        'EU': { ja: '欧州', en: 'EU', es: 'EU', zh: '欧洲', ko: '유럽' },
        'FPS': { ja: 'FPS', en: 'FPS', es: 'FPS', zh: '第一人称射击', ko: 'FPS' },
        'Gaming': { ja: 'ゲーム', en: 'Gaming', es: 'Gaming', zh: '游戏', ko: '게임' },
        'Global': { ja: 'グローバル', en: 'Global', es: 'Global', zh: '全球', ko: '글로벌' },
        'HQ': { ja: '本部', en: 'HQ', es: 'Sede', zh: '总部', ko: '본부' },
        'Holdings': { ja: '持株会社', en: 'Holdings', es: 'Holding', zh: '控股', ko: '지주사' },
        'Idol': { ja: 'アイドル', en: 'Idol', es: 'Idol', zh: '偶像', ko: '아이돌' },
        'Indie': { ja: '個人勢', en: 'Indie', es: 'Indie', zh: '个人势', ko: '인디' },
        'Individual': { ja: '個人', en: 'Individual', es: 'Individual', zh: '个人', ko: '개인' },
        'JP': { ja: '日本', en: 'JP', es: 'JP', zh: '日本', ko: '일본' },
        'KR': { ja: '韓国圏', en: 'KR', es: 'KR', zh: '韩语', ko: '한국어권' },
        'Legend': { ja: '伝説級', en: 'Legend', es: 'Leyenda', zh: '传奇', ko: '레전드' },
        'Live': { ja: 'ライブ', en: 'Live', es: 'Directo', zh: '直播', ko: '라이브' },
        'Manga': { ja: 'マンガ', en: 'Manga', es: 'Manga', zh: '漫画', ko: '만화' },
        'Media Mix': { ja: 'メディアミックス', en: 'Media Mix', es: 'Media Mix', zh: '多媒体联动', ko: '미디어 믹스' },
        'Magic': { ja: 'マジック', en: 'Magic', es: 'Magia', zh: '魔法', ko: '마법' },
        'Multilingual': { ja: '多言語', en: 'Multilingual', es: 'Multilingue', zh: '多语言', ko: '다국어' },
        'Music': { ja: '音楽', en: 'Music', es: 'Música', zh: '音乐', ko: '음악' },
        'MY': { ja: 'マレーシア', en: 'MY', es: 'MY', zh: '马来西亚', ko: '말레이시아' },
        'Pioneer': { ja: '先駆', en: 'Pioneer', es: 'Pionero', zh: '先驱', ko: '개척자' },
        'Platform': { ja: '配信基盤', en: 'Platform', es: 'Plataforma', zh: '平台', ko: '플랫폼' },
        'Pop': { ja: 'ポップ', en: 'Pop', es: 'Pop', zh: '流行', ko: '팝' },
        'Regional': { ja: '地域密着', en: 'Regional', es: 'Regional', zh: '地区', ko: '지역' },
        'Shorts': { ja: 'ショート動画', en: 'Shorts', es: 'Cortos', zh: '短视频', ko: '쇼츠' },
        'Sony': { ja: 'ソニー', en: 'Sony', es: 'Sony', zh: '索尼', ko: '소니' },
        'Streamer': { ja: '配信者', en: 'Streamer', es: 'Streamer', zh: '主播', ko: '스트리머' },
        'Synth': { ja: 'シンセ', en: 'Synth', es: 'Sinte', zh: '合成器', ko: '신스' },
        'Tech': { ja: '技術', en: 'Tech', es: 'Tecnología', zh: '技术', ko: '기술' },
        'Tokyo': { ja: '東京', en: 'Tokyo', es: 'Tokio', zh: '东京', ko: '도쿄' },
        'In Progress': { ja: '整備中', en: 'In Progress', es: 'En progreso', zh: '整理中', ko: '정비 중' },
        'Underground': { ja: 'アンダーグラウンド', en: 'Underground', es: 'Subterráneo', zh: '地下', ko: '언더그라운드' },
        'Variety': { ja: 'バラエティ', en: 'Variety', es: 'Variedad', zh: '综合', ko: '버라이어티' },
        'Virtual Art': { ja: 'バーチャルアート', en: 'Virtual Art', es: 'Arte Virtual', zh: '虚拟艺术', ko: '버추얼 아트' },
        'Worldbuilding': { ja: '世界観', en: 'Worldbuilding', es: 'Construcción de mundo', zh: '世界观', ko: '세계관' }
    };
    const ALLOWED_AGENCY_TAGS = new Set([
        ...Object.keys(agencyTagTranslations),
        INVESTIGATING_TAG,
        'Defunct'
    ]);
    const inferredAgencyTagRules = [
        { tag: 'Agency', match: (agency, text) => agency.name !== '個人勢 VTuber' && ['major', 'corporate', 'global'].includes(agency.filter) },
        { tag: 'Corporate', match: (_agency, text) => /持ち株会社|corporate|company/i.test(text) },
        { tag: 'Holdings', match: (_agency, text) => /持ち株会社|holding company|holdings/i.test(text) },
        { tag: 'Music', match: (_agency, text) => /音楽|music|singer|discography|song|vsinger/i.test(text) },
        { tag: 'Idol', match: (_agency, text) => /アイドル|idol/i.test(text) },
        { tag: 'Comedy', match: (_agency, text) => /コメディ|comedy|お笑い/i.test(text) },
        { tag: 'Shorts', match: (_agency, text) => /ショート|shorts?/i.test(text) },
        { tag: 'Variety', match: (_agency, text) => /バラエティ|variety|多様|diverse|diversity/i.test(text) },
        { tag: 'Gaming', match: (_agency, text) => /ゲーム|gaming|gamer|gameplay|実況/i.test(text) },
        { tag: 'Esports', match: (_agency, text) => /eスポーツ|esports|tournament|大会|fps/i.test(text) },
        { tag: '3D', match: (_agency, text) => /3d|xr|vr|モーション/i.test(text) },
        { tag: 'Tech', match: (_agency, text) => /技術|technology|tech|platform/i.test(text) },
        { tag: 'Multilingual', match: (_agency, text) => /多言語|multilingual|trilingual|bilingual|language support/i.test(text) },
        { tag: 'Global', match: (agency, text) => agency.filter === 'global' || /グローバル|global|international|海外/i.test(text) },
        { tag: 'Regional', match: (_agency, text) => /地域|ご当地|regional|local/i.test(text) },
        { tag: 'Media Mix', match: (_agency, text) => /メディアミックス|media mix|既存のip|linked with the existing ip/i.test(text) },
        { tag: 'Virtual Art', match: (_agency, text) => /芸術|artistic|virtual art|アート/i.test(text) },
        { tag: 'Worldbuilding', match: (_agency, text) => /世界観|物語|storytelling|worldview|narrative/i.test(text) },
        { tag: 'Creator', match: (_agency, text) => /クリエイター|creator|漫画|manga/i.test(text) },
        { tag: 'Platform', match: (_agency, text) => /配信プラットフォーム|platform/i.test(text) },
        { tag: 'Live', match: (_agency, text) => /ライブ|live information|concert/i.test(text) },
        { tag: 'Pioneer', match: (_agency, text) => /老舗|pioneer|先駆/i.test(text) }
    ];

    function buildAgencyTagHaystack(agency) {
        return [
            agency.name,
            agency.sub,
            agency.desc,
            agency.desc_en,
            agency.desc_es,
            agency.desc_zh,
            agency.desc_ko
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
    }

    function translateAgencyTag(tag) {
        const baseLang = currentLang.split('-')[0];
        return agencyTagTranslations[tag]?.[baseLang] || agencyTagTranslations[tag]?.[currentLang] || tag;
    }

    function resolveAgencyTags(agency) {
        const sourceTags = Array.isArray(agency.tags) ? agency.tags : [];
        if (sourceTags.includes(INVESTIGATING_TAG)) {
            return [INVESTIGATING_TAG];
        }

        const haystack = buildAgencyTagHaystack(agency);
        const resolved = [];
        const dropped = [];

        const addTag = (tag) => {
            if (!tag || resolved.length >= MAX_CARD_TAGS || BLOCKED_TAGS.has(tag) || !ALLOWED_AGENCY_TAGS.has(tag) || resolved.includes(tag)) {
                if (tag && (BLOCKED_TAGS.has(tag) || !ALLOWED_AGENCY_TAGS.has(tag))) {
                    dropped.push(tag);
                }
                return;
            }
            resolved.push(tag);
        };

        sourceTags.forEach(addTag);
        inferredAgencyTagRules.forEach((rule) => {
            if (resolved.length < MAX_CARD_TAGS && rule.match(agency, haystack)) {
                addTag(rule.tag);
            }
        });

        if (sourceTags.length > MAX_CARD_TAGS || dropped.length > 0) {
            console.debug('[tag-debug]', agency.name, {
                source: sourceTags,
                resolved,
                dropped
            });
        }

        return resolved.slice(0, MAX_CARD_TAGS);
    }

    agencies.forEach((agency) => {
        agency.resolvedTags = resolveAgencyTags(agency);
    });

    // Total Count Update
    totalAgenciesEl.textContent = agencies.length;

    // Render Function
    function renderAgencies(data) {
        agencyGrid.innerHTML = '';

        if (data.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        data.forEach((agency, index) => {
            const card = document.createElement('div');
            const tags = agency.resolvedTags || [];
            const isDefunct = tags.includes('Defunct');
            card.className = `datapanel-card fade-in${isDefunct ? ' card-defunct' : ''}`;
            card.style.animationDelay = `${index * 0.05}s`;
            card.style.setProperty('--brand-rgb', agency.color);

            // Build Tags HTML
            let tagsHTML = '';
            if (tags.length > 0) {
                tagsHTML = `<div class="card-tags">
                    ${tags.map(tag => {
                    let cls = 'card-tag';
                    let displayTag = translateAgencyTag(tag);

                    if (tag === 'Defunct') {
                        cls += ' tag-defunct';
                        displayTag = (currentLang.split('-')[0] === 'en') ? 'Defunct' : '活動終了';
                    }
                    if (tag === INVESTIGATING_TAG) {
                        cls += ' tag-chosa';
                        displayTag = translateAgencyTag('In Progress');
                    }
                    return `<span class="${cls}">${displayTag}</span>`;
                }).join('')}
                </div>`;
            }

            // Resolve Localized Name and Description
            const baseLang = currentLang.split('-')[0];
            const localizedName = agency[`name_${baseLang}`] || agency[`name_${currentLang}`];
            const displayName = localizedName || agency.name;

            const localizedDesc = agency[`desc_${baseLang}`] || agency[`desc_${currentLang}`];
            const description = localizedDesc || agency.desc;
            const shortDesc = description
                ? (description.length > 72 ? description.substring(0, 72) + '…' : description)
                : '';

            card.innerHTML = `
                <div class="card-glare"></div>
                <div class="card-content">
                    <h3 class="card-title" style="color: rgb(${agency.color})">${displayName}</h3>
                    <p class="card-sub">${agency.sub}</p>
                    ${shortDesc ? `<p class="card-desc">${shortDesc}</p>` : ''}
                </div>
                ${tagsHTML}
                <div class="card-watermark">${agency.icon}</div>
            `;

            // 3D Tilt (hover only)
            if (canHover) {
                let bounds;
                card.addEventListener('mouseenter', () => {
                    bounds = card.getBoundingClientRect();
                    card.style.transition = 'none';
                });
                card.addEventListener('mousemove', (e) => {
                    if (!bounds) bounds = card.getBoundingClientRect();
                    const calcX = e.clientX - bounds.left - bounds.width / 2;
                    const calcY = e.clientY - bounds.top - bounds.height / 2;
                    const intensity = 15;
                    const rotateX = (calcY / (bounds.height / 2)) * -intensity;
                    const rotateY = (calcX / (bounds.width / 2)) * intensity;
                    const glareX = (e.clientX - bounds.left) / bounds.width * 100;
                    const glareY = (e.clientY - bounds.top) / bounds.height * 100;
                    const glareEl = card.querySelector('.card-glare');
                    if (glareEl) glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15), transparent 50%)`;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                });
                card.addEventListener('mouseleave', () => {
                    bounds = null;
                    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                    const glareEl = card.querySelector('.card-glare');
                    if (glareEl) glareEl.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.0), transparent 50%)`;
                });
            }

            card.addEventListener('pointerdown', () => {
                card.classList.add('is-pressed');
            });
            card.addEventListener('pointerup', () => {
                card.classList.remove('is-pressed');
            });
            card.addEventListener('pointercancel', () => {
                card.classList.remove('is-pressed');
            });
            card.addEventListener('click', () => {
                if (agency.url && agency.url !== '#') {
                    navigateWithTransition(agency.url);
                } else if (tags.includes(INVESTIGATING_TAG)) {
                    alert(translations[currentLang].alert_investigating);
                } else {
                    alert(translations[currentLang].alert_not_active);
                }
            });

            agencyGrid.appendChild(card);
        });
    }

    // Initial Render
    renderAgencies(agencies);

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            const searchTerm = searchInput.value.toLowerCase().trim();
            filterAndSearch(filterValue, searchTerm);
        });
    });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        filterAndSearch(activeFilter, searchTerm);
    });

    function filterAndSearch(filterMode, query) {
        let results = agencies;
        if (filterMode !== 'all') {
            results = results.filter(item => item.filter === filterMode);
        }
        if (query) {
            results = results.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.sub.toLowerCase().includes(query) ||
                (item.desc && item.desc.toLowerCase().includes(query)) ||
                (item.resolvedTags && item.resolvedTags.some(tag => tag.toLowerCase().includes(query)))
            );
        }
        renderAgencies(results);
    }

    // --- i18n Logic ---
    function applyTranslations(lang) {
        currentLang = lang;
        const t = translations[lang];
        if (!t) return;

        // Update elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                // Preserve icon if it exists
                const icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' ' + t[key]));
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key]) {
                el.placeholder = t[key];
            }
        });

        // Re-render agencies to update descriptions
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterAndSearch(activeFilter, searchTerm);
    }

    langSelect.value = currentLang;
    langSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('vt_archive_lang', selectedLang);
        applyTranslations(selectedLang);
    });

    // Initial Translation Load
    applyTranslations(currentLang);

    // --- Interaction Effects & Transitions ---
    function setupFxLayers() {
        const fxLayer = document.createElement('div');
        fxLayer.className = 'fx-layer';
        fxLayer.id = 'fxLayer';
        document.body.appendChild(fxLayer);

        const stageBg = document.createElement('div');
        stageBg.className = 'stage-bg';
        stageBg.setAttribute('aria-hidden', 'true');
        document.body.appendChild(stageBg);

        const stageOverlay = document.createElement('div');
        stageOverlay.className = 'stage-overlay';
        stageOverlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(stageOverlay);

        const transitionLayer = document.createElement('div');
        transitionLayer.className = 'page-transition';
        transitionLayer.id = 'pageTransition';
        document.body.appendChild(transitionLayer);

        requestAnimationFrame(() => {
            document.body.classList.add('is-ready');
        });

        return { fxLayer, transitionLayer };
    }

    function setupCursorGlow(fxLayer) {
        if (!canHover) return;

        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        fxLayer.appendChild(glow);

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;

        const speed = 0.22;

        const animate = () => {
            currentX += (targetX - currentX) * speed;
            currentY += (targetY - currentY) * speed;
            glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            requestAnimationFrame(animate);
        };

        document.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return;
            targetX = e.clientX;
            targetY = e.clientY;
            glow.classList.add('is-active');
        });

        document.addEventListener('pointerleave', () => {
            glow.classList.remove('is-active');
        });

        animate();
    }

    function setupPenlightTrail(fxLayer) {
        if (prefersReducedMotion) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'penlight-canvas';
        fxLayer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let trails = [];
        let lastTime = performance.now();

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener('resize', resize);

        const addPoint = (x, y) => {
            trails.push({
                x,
                y,
                vx: 0,
                vy: 0,
                life: 1,
                width: 1.2
            });
            if (trails.length > 80) {
                trails = trails.slice(trails.length - 80);
            }
        };

        document.addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return;
            addPoint(e.clientX, e.clientY);
        });

        document.addEventListener('pointerdown', (e) => {
            if (e.pointerType !== 'touch') return;
            addPoint(e.clientX, e.clientY);
        }, { passive: true });

        const animate = (now) => {
            const dt = Math.min((now - lastTime) / 16.67, 2);
            lastTime = now;

            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'lighter';
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (let i = 1; i < trails.length; i += 1) {
                const prev = trails[i - 1];
                const curr = trails[i];
                const alpha = Math.min(prev.life, curr.life);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(210, 250, 255, ${0.35 * alpha})`;
                ctx.lineWidth = prev.width;
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(curr.x, curr.y);
                ctx.stroke();
            }

            for (let i = 0; i < trails.length; i += 1) {
                const p = trails[i];
                p.life -= 0.03 * dt;
                p.width = Math.max(0.6, p.width - 0.01 * dt);
            }

            trails = trails.filter(p => p.life > 0);
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }

    function spawnTouchRipple(fxLayer, x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'touch-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        fxLayer.appendChild(ripple);
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    function setupTouchEffects(fxLayer) {
        document.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'touch') {
                spawnTouchRipple(fxLayer, e.clientX, e.clientY);
            }
        }, { passive: true });
    }

    function navigateWithTransition(url) {
        if (!url) return;
        if (prefersReducedMotion) {
            window.location.href = url;
            return;
        }

        const layer = document.getElementById('pageTransition');
        if (layer) {
            layer.classList.add('is-active');
            setTimeout(() => {
                window.location.href = url;
            }, 720);
        } else {
            window.location.href = url;
        }
    }

    const { fxLayer } = setupFxLayers();
    setupCursorGlow(fxLayer);
    setupPenlightTrail(fxLayer);
    setupTouchEffects(fxLayer);
});

