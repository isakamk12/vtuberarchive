document.addEventListener('DOMContentLoaded', () => {
    const languageOrder = ['ja', 'en', 'de', 'fr', 'es', 'pt', 'zh', 'ko', 'id'];
    const pageTranslations = {
        ja: {
            title: 'あおぎり高校 非公式ファンサイト',
            description: '「おもしろければ、何でもあり！」あおぎり高校の魅力を、ゆるっと語る非公式ファンサイト。メンバー紹介や深掘りネタもまとめてます。',
            nav_about: 'About',
            nav_deep_dive: '魅力を深掘り',
            nav_members: 'メンバーリスト',
            hero_subtitle: 'おもしろければ、何でもあり！',
            hero_title_main: 'あおぎり高校',
            hero_title_sub: 'ファンサイト',
            hero_desc: '理想の姿で「好き」を全力で楽しむ、<br/>最高にカオスなVTuberグループの非公式ポータル。',
            hero_cta: 'ゆるっと覗く',
            about_title: 'あおぎり高校とは？',
            about_subtitle: 'AOGIRI HIGH SCHOOL',
            about_body: '都内のどこかにある『あおぎり高校』。<br/>ここには、「理想の姿で『好き』を好きなだけ」楽しみたいメンバーが集まっています。<br/><br/>合言葉は「おもしろければ、何でもあり！」。それぞれの理想のスクールライフを、全力で楽しんでいるんです。',
            deep_title: 'もう少しだけ深掘り！',
            deep_subtitle: 'あおぎり高校のゆるい魅力まとめ',
            feature_1_title: '「ゲーム部」なのにゲーム実況しない！？',
            feature_1_body: 'もともとは「あおぎり高校ゲーム部」からスタート。今はASMR、歌ってみた、ドッキリ、ショート動画まで幅広く挑戦中です。「お前らゲーム部だろｗｗ」ってツッコミも、今やお約束。',
            feature_2_title: '「NGなし」の過激でカオスな企画力',
            feature_2_body: '体を張った企画が多めで、VTuberの常識を軽く飛び越えがち。乗馬マシンでイラスト対決、巨大グローブで本音勝負など、ノリはだいたい全力。',
            feature_3_title: '個性豊かすぎるメンバーと強い絆',
            feature_3_body: '初期メンバーから新入生まで、総勢13名超えの大所帯。先輩後輩の垣根を越えたわちゃわちゃ感と、意外と熱い結束力が魅力です。',
            feature_4_title: '止まらない快進撃！',
            feature_4_body: '登録者100万人突破、企業コラボやカードゲーム化まで勢いが止まりません。2026年には大型オフラインイベントも控えてます。',
            categories_title: 'コンテンツ索引',
            categories_subtitle: 'CONTENT ATTRIBUTES',
            categories_intro: '動画や企画から見えてくる、あおぎり高校のコンテンツタグまとめ',
            category_1_title: '<span class="emoji-pop">🎬</span> 実写企画',
            category_1_body: '滝行、バンジージャンプ、大食い（ピザ、カニ、ケンタッキー）、マウスコンピューター工場見学など。',
            category_2_title: '<span class="emoji-pop">🛠️</span> 検証・技術系',
            category_2_body: 'ガンプラ製作、自作ゲーム開発（UE5、RPGツクール）、AI尋問ゲームなど。',
            category_3_title: '<span class="emoji-pop">🗣️</span> トーク・バラエティ',
            category_3_body: 'NGワード面接、持ち物検査、お悩み相談、ワードセンス大喜利など。',
            category_4_title: '<span class="emoji-pop">🎤</span> 音楽・パフォーマンス',
            category_4_body: '3Dカラオケ大会、アーティスト縛り歌枠、オリジナル楽曲製作裏話など。',
            category_5_title: '<span class="emoji-pop">🎲</span> マダミス・TRPG',
            category_5_body: '「狂気山脈」シリーズなどの物語体験型コンテンツ。',
            members_title: 'メンバーリスト',
            members_subtitle: 'MEMBER DIRECTORY',
            active_members_title: '在校生',
            graduates_title: '卒業生',
            footer_copyright: '© 2026 Aogiri High School Fan Site. Developed with passion.',
            footer_disclaimer: '※本サイトは非公式のファンサイトであり、株式会社viviON及びあおぎり高校公式とは関係ありません。'
        },
        en: {
            title: 'Aogiri High School Unofficial Fan Site',
            description: 'An unofficial fan site that casually dives into Aogiri High School and its anything-goes vibe.',
            nav_about: 'About',
            nav_deep_dive: 'Deep Dive',
            nav_members: 'Members',
            hero_subtitle: 'If it is fun, anything goes!',
            hero_title_main: 'Aogiri High School',
            hero_title_sub: 'Fan Site',
            hero_desc: 'An unofficial portal for a delightfully chaotic VTuber group where everyone gets to enjoy what they love in their ideal form.',
            hero_cta: 'Take a Look',
            about_title: 'What Is Aogiri High School?',
            about_subtitle: 'AOGIRI HIGH SCHOOL',
            about_body: 'Somewhere in Tokyo, there is a place called "Aogiri High School."<br/>It is home to members who want to enjoy what they love as much as they want, in the version of themselves they feel best in.<br/><br/>Their motto is "If it is fun, anything goes!" and they fully lean into the school life they imagine.',
            deep_title: 'Want A Deeper Look?',
            deep_subtitle: 'A casual tour of Aogiri’s charm',
            feature_1_title: 'A "Gaming Club" That Barely Does Game Commentary?!',
            feature_1_body: 'Aogiri High School began as the "Aogiri High School Gaming Club" and then happily wandered into ASMR, song covers, prank projects, shorts, and more.',
            feature_2_title: 'Chaotic, No-Limits Project Planning',
            feature_2_body: 'Their content regularly blows past normal VTuber expectations, turning most uploads into a loud, fun mess.',
            feature_3_title: 'A Cast Overflowing With Personality and Strong Bonds',
            feature_3_body: 'More than 13 members create playful chemistry across seniority lines, with plenty of heartfelt moments too.',
            feature_4_title: 'The Momentum Never Stops',
            feature_4_body: 'With over one million subscribers, major collaborations, and big offline events ahead, the group keeps growing.',
            categories_title: 'Content Index',
            categories_subtitle: 'CONTENT ATTRIBUTES',
            categories_intro: 'A quick list of content tags based on their videos and projects.',
            category_1_title: '<span class="emoji-pop">🎬</span> Live-Action Projects',
            category_1_body: 'Waterfall training, bungee jumping, eating challenges, factory tours, and more.',
            category_2_title: '<span class="emoji-pop">🛠️</span> Experiments and Tech',
            category_2_body: 'Gunpla building, homemade game development, AI interrogation games, and more.',
            category_3_title: '<span class="emoji-pop">🗣️</span> Talk and Variety',
            category_3_body: 'NG-word interviews, bag checks, advice sessions, and wordplay comedy.',
            category_4_title: '<span class="emoji-pop">🎤</span> Music and Performance',
            category_4_body: '3D karaoke tournaments, artist-themed singing streams, and original-song stories.',
            category_5_title: '<span class="emoji-pop">🎲</span> Murder Mystery and TRPG',
            category_5_body: 'Story-driven tabletop experiences including the "Mountains of Madness" series.',
            members_title: 'Member List',
            members_subtitle: 'MEMBER DIRECTORY',
            active_members_title: 'Current Members',
            graduates_title: 'Graduates',
            footer_copyright: '© 2026 Aogiri High School Fan Site. Developed with passion.',
            footer_disclaimer: 'This site is an unofficial fan project and has no affiliation with viviON Inc. or the official Aogiri High School project.'
        },
        de: {
            title: 'Inoffizielle Fanseite der Aogiri High School',
            description: 'Eine lockere, inoffizielle Fanseite uber die Aogiri High School und ihren Alles-ist-erlaubt-Geist.',
            nav_about: 'Uberblick',
            nav_deep_dive: 'Deep Dive',
            nav_members: 'Mitglieder',
            hero_subtitle: 'Wenn es Spass macht, ist alles erlaubt!',
            hero_title_main: 'Aogiri High School',
            hero_title_sub: 'Fanseite',
            hero_desc: 'Ein lockeres, inoffizielles Portal fur eine wunderbar chaotische VTuber-Gruppe, in der alle das ausleben konnen, was sie lieben.',
            hero_cta: 'Kurz reinschauen',
            about_title: 'Was ist die Aogiri High School?',
            about_subtitle: 'AOGIRI HIGH SCHOOL',
            about_body: 'Irgendwo in Tokio gibt es einen Ort namens "Aogiri High School".<br/>Hier treffen sich Leute, die das, was sie lieben, in ihrer idealen Form ganz entspannt ausleben wollen.<br/><br/>Das Motto: "Wenn es Spass macht, ist alles erlaubt!" Genau so locker leben sie hier ihr Wunsch-Schulleben aus.',
            deep_title: 'Noch ein bisschen tiefer?',
            deep_subtitle: 'Der lockere Charme der Aogiri High School',
            feature_1_title: 'Ein "Gaming Club", der kaum Let\'s Plays macht?!',
            feature_1_body: 'Die Gruppe startete als Gaming Club und hat sich dann locker auf ASMR, Coversongs, Pranks und Kurzvideos ausgebreitet.',
            feature_2_title: 'Chaotische Projekte ohne Tabus',
            feature_2_body: 'Ihre Inhalte sprengen regelmaessig die ueblichen VTuber-Erwartungen und machen fast jedes Video zu einer kleinen Party.',
            feature_3_title: 'Starke Bindung und enorme Vielfalt',
            feature_3_body: 'Mehr als 13 Mitglieder sorgen fur verspielte Dynamik und eine starke Einheit, ganz ohne steife Hierarchien.',
            feature_4_title: 'Der Vormarsch stoppt nicht',
            feature_4_body: 'Mit uber einer Million Abonnenten, grossen Kooperationen und neuen Offline-Events wachst die Gruppe locker weiter.',
            categories_title: 'Content-Index',
            categories_subtitle: 'CONTENT ATTRIBUTES',
            categories_intro: 'Eine kurze Sammlung von Content-Tags, die sich aus Videos und Projekten ableiten lassen.',
            category_1_title: '<span class="emoji-pop">🎬</span> Realfilm-Projekte',
            category_1_body: 'Wasserfall-Training, Bungee-Jumping, Essens-Challenges und Werksbesuche.',
            category_2_title: '<span class="emoji-pop">🛠️</span> Experimente und Technik',
            category_2_body: 'Gunpla-Bau, eigene Spiele, KI-Verhorspiele und mehr.',
            category_3_title: '<span class="emoji-pop">🗣️</span> Talk und Variety',
            category_3_body: 'NG-Wort-Interviews, Taschenkontrollen, Beratungsgespraeche und Wortwitz-Comedy.',
            category_4_title: '<span class="emoji-pop">🎤</span> Musik und Performance',
            category_4_body: '3D-Karaoke, Song-Streams mit Kunstlerfokus und Geschichten zu Originalsongs.',
            category_5_title: '<span class="emoji-pop">🎲</span> Murder Mystery und TRPG',
            category_5_body: 'Storygetriebene Tabletop-Erlebnisse wie die "Mountains of Madness"-Reihe.',
            members_title: 'Mitgliederliste',
            members_subtitle: 'MEMBER DIRECTORY',
            active_members_title: 'Aktive Mitglieder',
            graduates_title: 'Graduierte Mitglieder',
            footer_copyright: '© 2026 Aogiri High School Fan Site. Mit Leidenschaft entwickelt.',
            footer_disclaimer: 'Diese Seite ist ein inoffizielles Fanprojekt und nicht mit viviON Inc. oder dem offiziellen Projekt Aogiri High School verbunden.'
        },
        fr: {
            title: 'Site de fans non officielle d\'Aogiri High School',
            description: 'Un site de fans non officiel, plutot detendu, sur Aogiri High School et son esprit sans limites.',
            nav_about: 'A propos',
            nav_deep_dive: 'Approfondir',
            nav_members: 'Membres',
            hero_subtitle: 'Si c\'est amusant, tout est permis !',
            hero_title_main: 'Aogiri High School',
            hero_title_sub: 'Site de fans',
            hero_desc: 'Un portail non officiel, tres chill, pour un groupe de VTubers delicieusement chaotique ou chacun profite a fond de ce qu\'il aime.',
            hero_cta: 'Jeter un oeil',
            about_title: 'Qu\'est-ce qu\'Aogiri High School ?',
            about_subtitle: 'AOGIRI HIGH SCHOOL',
            about_body: 'Quelque part a Tokyo, il existe un lieu appele "Aogiri High School".<br/>Ici, des membres viennent profiter de ce qu\'ils aiment, dans la version ideale d\'eux-memes.<br/><br/>La devise est simple : "Si c\'est amusant, tout est permis !" Et ca se sent.',
            deep_title: 'On creuse un peu ?',
            deep_subtitle: 'Le charme relax d\'Aogiri High School',
            feature_1_title: 'Un "club de jeux video" qui fait a peine du gameplay ?!',
            feature_1_body: 'Le groupe a commence comme gaming club avant d\'ouvrir tranquillement a l\'ASMR, aux reprises, aux pranks et aux shorts.',
            feature_2_title: 'Des projets chaotiques sans limites',
            feature_2_body: 'Leurs contenus depassent souvent les attentes habituelles autour des VTubers, avec un cote tres debride.',
            feature_3_title: 'Des personnalites debordantes et des liens tres forts',
            feature_3_body: 'Plus de 13 membres creent une chimie joueuse et une vraie cohesion, sans se prendre la tete.',
            feature_4_title: 'Une ascension qui ne s\'arrete pas',
            feature_4_body: 'Avec plus d\'un million d\'abonnes, de grosses collabs et de nouveaux events offline, le groupe continue de grandir.',
            categories_title: 'Index des contenus',
            categories_subtitle: 'CONTENT ATTRIBUTES',
            categories_intro: 'Une petite liste de tags de contenu deduits des videos et projets du groupe.',
            category_1_title: '<span class="emoji-pop">🎬</span> Projets en prise de vue reelle',
            category_1_body: 'Ascese sous cascade, saut a l\'elastique, defis de nourriture et visites d\'usine.',
            category_2_title: '<span class="emoji-pop">🛠️</span> Experiences et technique',
            category_2_body: 'Montage de Gunpla, developpement de jeux, jeux d\'interrogatoire par IA, et plus.',
            category_3_title: '<span class="emoji-pop">🗣️</span> Talk et varietes',
            category_3_body: 'Interviews a mots interdits, inspection des sacs, sessions de conseils et humour verbal.',
            category_4_title: '<span class="emoji-pop">🎤</span> Musique et performance',
            category_4_body: 'Tournois de karaoke 3D, streams de chant et anecdotes autour des chansons originales.',
            category_5_title: '<span class="emoji-pop">🎲</span> Murder Mystery et TRPG',
            category_5_body: 'Experiences narratives sur table, comme la serie "Mountains of Madness".',
            members_title: 'Liste des membres',
            members_subtitle: 'MEMBER DIRECTORY',
            active_members_title: 'Membres actuels',
            graduates_title: 'Anciennes membres',
            footer_copyright: '© 2026 Aogiri High School Fan Site. Developpe avec passion.',
            footer_disclaimer: 'Ce site est un projet de fans non officiel et n\'a aucun lien avec viviON Inc. ni le projet officiel Aogiri High School.'
        },
        es: {
            title: 'Sitio de fans no oficial de Aogiri High School',
            description: 'Un sitio de fans no oficial, bien relajado, sobre Aogiri High School y su espiritu de todo vale.',
            nav_about: 'Acerca de',
            nav_deep_dive: 'Mas a fondo',
            nav_members: 'Miembros',
            hero_subtitle: 'Si es divertido, todo vale!',
            hero_title_main: 'Aogiri High School',
            hero_title_sub: 'Sitio de fans',
            hero_desc: 'Un portal no oficial, super chill, para un grupo de VTubers deliciosamente caotico donde cada quien disfruta a su manera.',
            hero_cta: 'Echar un vistazo',
            about_title: 'Que es Aogiri High School?',
            about_subtitle: 'AOGIRI HIGH SCHOOL',
            about_body: 'En algun lugar de Tokio existe un sitio llamado "Aogiri High School".<br/>Alli se juntan miembros que quieren disfrutar lo que les gusta en su version ideal.<br/><br/>El lema es simple: "Si es divertido, todo vale!" y se nota en todo.',
            deep_title: 'Vamos un poco mas a fondo?',
            deep_subtitle: 'El encanto relajado de Aogiri High School',
            feature_1_title: 'Un "club de videojuegos" que casi no hace gameplays?!',
            feature_1_body: 'El grupo comenzo como un gaming club y luego se abrio al ASMR, covers, bromas y shorts.',
            feature_2_title: 'Proyectos caoticos sin limites',
            feature_2_body: 'Su contenido suele romper las expectativas tipicas sobre VTubers y casi siempre termina en fiesta.',
            feature_3_title: 'Personalidades desbordantes y lazos muy fuertes',
            feature_3_body: 'Mas de 13 integrantes crean una quimica super divertida y una cohesion fuerte, sin tanta formalidad.',
            feature_4_title: 'Un ascenso que no se detiene',
            feature_4_body: 'Con mas de un millon de suscriptores, grandes colaboraciones y eventos presenciales, el grupo sigue creciendo.',
            categories_title: 'Indice de contenidos',
            categories_subtitle: 'CONTENT ATTRIBUTES',
            categories_intro: 'Una lista rapida de etiquetas de contenido sacadas de sus videos y proyectos.',
            category_1_title: '<span class="emoji-pop">🎬</span> Proyectos de accion real',
            category_1_body: 'Entrenamiento bajo cascada, bungee jumping, retos de comida y visitas a fabrica.',
            category_2_title: '<span class="emoji-pop">🛠️</span> Experimentos y tecnologia',
            category_2_body: 'Gunpla, desarrollo de juegos, juegos de interrogatorio con IA y mas.',
            category_3_title: '<span class="emoji-pop">🗣️</span> Charla y variedades',
            category_3_body: 'Entrevistas con palabras prohibidas, revision de bolsos, consejos y humor verbal.',
            category_4_title: '<span class="emoji-pop">🎤</span> Musica y performance',
            category_4_body: 'Torneos de karaoke 3D, streams de canto y anecdotas sobre canciones originales.',
            category_5_title: '<span class="emoji-pop">🎲</span> Murder Mystery y TRPG',
            category_5_body: 'Experiencias narrativas de mesa como la serie "Mountains of Madness".',
            members_title: 'Lista de miembros',
            members_subtitle: 'MEMBER DIRECTORY',
            active_members_title: 'Miembros actuales',
            graduates_title: 'Graduadas',
            footer_copyright: '© 2026 Aogiri High School Fan Site. Desarrollado con pasion.',
            footer_disclaimer: 'Este sitio es un proyecto de fans no oficial y no tiene relacion con viviON Inc. ni con el proyecto oficial de Aogiri High School.'
        },
        pt: {
            title: 'Site de fans nao oficial de Aogiri High School',
            description: 'Um site de fans nao oficial, bem de boa, sobre Aogiri High School e seu espirito de vale tudo.',
            nav_about: 'Sobre',
            nav_deep_dive: 'Mais a fundo',
            nav_members: 'Membros',
            hero_subtitle: 'Se for divertido, vale tudo!',
            hero_title_main: 'Aogiri High School',
            hero_title_sub: 'Site de fans',
            hero_desc: 'Um portal nao oficial e bem descontraido para um grupo de VTubers deliciosamente caotico onde cada pessoa curte do seu jeito.',
            hero_cta: 'Dar uma olhada',
            about_title: 'O que e Aogiri High School?',
            about_subtitle: 'AOGIRI HIGH SCHOOL',
            about_body: 'Em algum lugar de Toquio existe um lugar chamado "Aogiri High School".<br/>Ali se reune gente que quer curtir o que gosta na versao ideal de si mesma.<br/><br/>O lema e simples: "Se for divertido, vale tudo!" e eles levam isso a serio.',
            deep_title: 'Bora ir um pouco mais fundo?',
            deep_subtitle: 'O charme leve de Aogiri High School',
            feature_1_title: 'Um "clube de games" que quase nao faz gameplay?!',
            feature_1_body: 'O grupo comecou como gaming club e depois abriu espaco para ASMR, covers, pegadinhas e shorts.',
            feature_2_title: 'Projetos caoticos sem limites',
            feature_2_body: 'O conteudo delas frequentemente passa das expectativas e quase sempre vira bagunca boa.',
            feature_3_title: 'Personalidades transbordantes e lacos fortes',
            feature_3_body: 'Mais de 13 integrantes criam uma quimica divertida e uma coesao forte, sem muita formalidade.',
            feature_4_title: 'Uma ascensao que nao para',
            feature_4_body: 'Com mais de um milhao de inscritos, grandes colaboracoes e eventos presenciais, o grupo continua crescendo.',
            categories_title: 'Indice de conteudo',
            categories_subtitle: 'CONTENT ATTRIBUTES',
            categories_intro: 'Uma lista rapida de tags tiradas dos videos e projetos do grupo.',
            category_1_title: '<span class="emoji-pop">🎬</span> Projetos live-action',
            category_1_body: 'Treino em cachoeira, bungee jump, desafios de comida e visitas a fabrica.',
            category_2_title: '<span class="emoji-pop">🛠️</span> Experimentos e tecnologia',
            category_2_body: 'Gunpla, desenvolvimento de jogos, jogos de interrogatorio com IA e mais.',
            category_3_title: '<span class="emoji-pop">🗣️</span> Conversa e variedades',
            category_3_body: 'Entrevistas com palavras proibidas, revista de bolsas, conselhos e humor verbal.',
            category_4_title: '<span class="emoji-pop">🎤</span> Musica e performance',
            category_4_body: 'Torneios de karaoke 3D, streams de canto e historias sobre musicas originais.',
            category_5_title: '<span class="emoji-pop">🎲</span> Murder Mystery e TRPG',
            category_5_body: 'Experiencias narrativas de mesa como a serie "Mountains of Madness".',
            members_title: 'Lista de membros',
            members_subtitle: 'MEMBER DIRECTORY',
            active_members_title: 'Membros atuais',
            graduates_title: 'Graduadas',
            footer_copyright: '© 2026 Aogiri High School Fan Site. Desenvolvido com paixao.',
            footer_disclaimer: 'Este site e um projeto de fans nao oficial e nao tem ligacao com a viviON Inc. nem com o projeto oficial de Aogiri High School.'
        },
        zh: {
            title: '青桐高校非官方粉丝站',
            description: '一个轻松随意的青桐高校非官方粉丝站，聊聊“只要有趣就什么都行”的精神。',
            nav_about: '关于',
            nav_deep_dive: '深入了解',
            nav_members: '成员',
            hero_subtitle: '只要有趣，什么都可以！',
            hero_title_main: '青桐高校',
            hero_title_sub: '粉丝站',
            hero_desc: '轻松随意的非官方入口，主打超混沌VTuber团体，让大家用最喜欢的姿态享受所爱。',
            hero_cta: '随便看看',
            about_title: '什么是青桐高校？',
            about_subtitle: 'AOGIRI HIGH SCHOOL',
            about_body: '在东京的某个角落，有一所叫“青桐高校”的地方。<br/>这里聚集着想以理想姿态尽情享受所爱的成员们。<br/><br/>口号很简单：“只要有趣，什么都可以！”所以整条路线都很随性。',
            deep_title: '再深挖一点？',
            deep_subtitle: '青桐高校的轻松魅力',
            feature_1_title: '明明是“游戏部”却几乎不做游戏实况？！',
            feature_1_body: '最初是“青桐高校游戏部”，后来一路扩展到ASMR、翻唱、整蛊企划和短视频。',
            feature_2_title: '毫无限制的混沌企划力',
            feature_2_body: '内容经常打破对VTuber的常规想象，几乎每次更新都像一场小狂欢。',
            feature_3_title: '个性爆棚的成员与牢固羁绊',
            feature_3_body: '超过13名成员带来热闹互动和强烈团队感，毕业成员的故事也很让人记住。',
            feature_4_title: '势头完全停不下来',
            feature_4_body: '百万订阅、重磅联动和线下活动一个接一个，团队还在持续变大。',
            categories_title: '内容索引',
            categories_subtitle: 'CONTENT ATTRIBUTES',
            categories_intro: '从视频与企划里整理出来的一串内容标签。',
            category_1_title: '<span class="emoji-pop">🎬</span> 真人企划',
            category_1_body: '瀑布修行、蹦极、美食挑战、工厂参观等。',
            category_2_title: '<span class="emoji-pop">🛠️</span> 实验与技术',
            category_2_body: '高达模型制作、自制游戏开发、AI审讯游戏等。',
            category_3_title: '<span class="emoji-pop">🗣️</span> 脱口秀与综艺',
            category_3_body: '禁语面试、随身物品检查、烦恼咨询和文字梗大喜利等。',
            category_4_title: '<span class="emoji-pop">🎤</span> 音乐与表演',
            category_4_body: '3D卡拉OK大会、主题歌回、原创歌曲幕后故事等。',
            category_5_title: '<span class="emoji-pop">🎲</span> 剧本杀与TRPG',
            category_5_body: '包括“狂气山脉”系列在内的剧情体验型桌面内容。',
            members_title: '成员列表',
            members_subtitle: 'MEMBER DIRECTORY',
            active_members_title: '在籍成员',
            graduates_title: '毕业成员',
            footer_copyright: '© 2026 Aogiri High School Fan Site. 用热情制作。',
            footer_disclaimer: '本网站为非官方粉丝企划，与viviON Inc.及青桐高校官方无关联。'
        },
        ko: {
            title: '아오기리 고교 비공식 팬사이트',
            description: '아오기리 고교와 "재미있으면 뭐든 OK" 정신을 가볍게 소개하는 비공식 팬사이트입니다.',
            nav_about: '소개',
            nav_deep_dive: '더 알아보기',
            nav_members: '멤버',
            hero_subtitle: '재미있다면 뭐든지 가능!',
            hero_title_main: '아오기리 고교',
            hero_title_sub: '팬사이트',
            hero_desc: '초혼돈 VTuber 그룹을 가볍게 소개하는 비공식 포털입니다. 각자 좋아하는 걸 마음껏 즐기는 느낌이에요.',
            hero_cta: '가볍게 보기',
            about_title: '아오기리 고교란?',
            about_subtitle: 'AOGIRI HIGH SCHOOL',
            about_body: '도쿄 어딘가에는 "아오기리 고교"라는 곳이 있어요.<br/>이곳에는 이상적인 모습으로 좋아하는 걸 마음껏 즐기고 싶은 멤버들이 모여 있습니다.<br/><br/>모토는 "재미있다면 뭐든지 가능!" 그래서 분위기도 꽤 자유롭습니다.',
            deep_title: '조금 더 파볼까?',
            deep_subtitle: '아오기리 고교의 편한 매력',
            feature_1_title: '"게임부"인데 게임 실황을 거의 안 한다?!',
            feature_1_body: '원래는 "아오기리 고교 게임부"로 시작했지만 지금은 ASMR, 커버곡, 장난 기획, 쇼츠까지 폭넓게 합니다.',
            feature_2_title: '제한 없는 혼돈의 기획력',
            feature_2_body: '이들의 콘텐츠는 일반적인 VTuber 기대를 자주 넘어가고, 업로드마다 축제 같은 느낌이 납니다.',
            feature_3_title: '개성 넘치는 멤버들과 강한 유대',
            feature_3_body: '13명 넘는 멤버들의 케미가 활기차고, 팀워크도 의외로 탄탄합니다.',
            feature_4_title: '질주가 멈추지 않는다',
            feature_4_body: '백만 구독자, 대형 콜라보, 오프라인 이벤트까지, 지금도 계속 성장 중입니다.',
            categories_title: '콘텐츠 인덱스',
            categories_subtitle: 'CONTENT ATTRIBUTES',
            categories_intro: '영상과 기획에서 뽑아본 콘텐츠 태그 모음이에요.',
            category_1_title: '<span class="emoji-pop">🎬</span> 실사 기획',
            category_1_body: '폭포 수행, 번지점프, 먹방 도전, 공장 견학 등.',
            category_2_title: '<span class="emoji-pop">🛠️</span> 실험과 기술',
            category_2_body: '건프라 제작, 자작 게임 개발, AI 심문 게임 등.',
            category_3_title: '<span class="emoji-pop">🗣️</span> 토크와 버라이어티',
            category_3_body: '금지어 면접, 소지품 검사, 고민 상담, 말장난 예능 등.',
            category_4_title: '<span class="emoji-pop">🎤</span> 음악과 퍼포먼스',
            category_4_body: '3D 가라오케 대회, 테마 가창 방송, 오리지널 곡 비하인드 등.',
            category_5_title: '<span class="emoji-pop">🎲</span> 머더 미스터리와 TRPG',
            category_5_body: '"광기산맥" 시리즈를 포함한 스토리 체험형 테이블탑 콘텐츠.',
            members_title: '멤버 목록',
            members_subtitle: 'MEMBER DIRECTORY',
            active_members_title: '현역 멤버',
            graduates_title: '졸업 멤버',
            footer_copyright: '© 2026 Aogiri High School Fan Site. 열정을 담아 제작.',
            footer_disclaimer: '이 사이트는 비공식 팬 프로젝트이며 viviON Inc. 및 아오기리 고교 공식과 관련이 없습니다.'
        },
        id: {
            title: 'Situs penggemar tidak resmi Aogiri High School',
            description: 'Situs penggemar tidak resmi yang santai buat ngobrol soal Aogiri High School dan semangat "kalau seru, semuanya boleh".',
            nav_about: 'Tentang',
            nav_deep_dive: 'Lebih dalam',
            nav_members: 'Anggota',
            hero_subtitle: 'Kalau seru, semuanya boleh!',
            hero_title_main: 'Aogiri High School',
            hero_title_sub: 'Situs penggemar',
            hero_desc: 'Portal tidak resmi yang santai untuk grup VTuber super kacau, tempat semua orang bisa menikmati hal favoritnya dengan gaya masing-masing.',
            hero_cta: 'Lihat-lihat',
            about_title: 'Apa itu Aogiri High School?',
            about_subtitle: 'AOGIRI HIGH SCHOOL',
            about_body: 'Di suatu sudut Tokyo, ada tempat bernama "Aogiri High School".<br/>Di sini kumpul orang-orang yang mau menikmati hal yang mereka suka dalam versi ideal diri mereka.<br/><br/>Mottonya sederhana: "Kalau seru, semuanya boleh!" Jadi nuansanya santai dan bebas.',
            deep_title: 'Mau ngulik sedikit?',
            deep_subtitle: 'Pesona santai Aogiri High School',
            feature_1_title: 'Katanya "klub game", tapi hampir tidak bikin gameplay?!',
            feature_1_body: 'Grup ini awalnya klub game, lalu melebar ke ASMR, cover lagu, prank, dan video pendek.',
            feature_2_title: 'Ide proyek kacau tanpa batas',
            feature_2_body: 'Konten mereka sering melewati ekspektasi umum tentang VTuber dan hampir tiap unggahan terasa seperti pesta.',
            feature_3_title: 'Anggota penuh kepribadian dan ikatan yang kuat',
            feature_3_body: 'Lebih dari 13 anggota bikin chemistry yang rame dan kebersamaan yang kuat.',
            feature_4_title: 'Lajunya tidak berhenti',
            feature_4_body: 'Dengan lebih dari satu juta subscriber, kolaborasi besar, dan event offline, grup ini terus berkembang.',
            categories_title: 'Indeks konten',
            categories_subtitle: 'CONTENT ATTRIBUTES',
            categories_intro: 'Daftar tag konten yang disusun dari video dan proyek Aogiri High School.',
            category_1_title: '<span class="emoji-pop">🎬</span> Proyek live-action',
            category_1_body: 'Latihan di bawah air terjun, bungee jumping, tantangan makan, dan kunjungan pabrik.',
            category_2_title: '<span class="emoji-pop">🛠️</span> Eksperimen dan teknologi',
            category_2_body: 'Gunpla, pengembangan game, game interogasi AI, dan lainnya.',
            category_3_title: '<span class="emoji-pop">🗣️</span> Obrolan dan variety',
            category_3_body: 'Wawancara kata terlarang, pemeriksaan barang bawaan, sesi konsultasi, dan komedi kata.',
            category_4_title: '<span class="emoji-pop">🎤</span> Musik dan performa',
            category_4_body: 'Turnamen karaoke 3D, stream bernyanyi, dan cerita di balik lagu orisinal.',
            category_5_title: '<span class="emoji-pop">🎲</span> Murder Mystery dan TRPG',
            category_5_body: 'Pengalaman tabletop berbasis cerita seperti seri "Mountains of Madness".',
            members_title: 'Daftar anggota',
            members_subtitle: 'MEMBER DIRECTORY',
            active_members_title: 'Anggota aktif',
            graduates_title: 'Lulusan',
            footer_copyright: '© 2026 Aogiri High School Fan Site. Dikembangkan dengan penuh semangat.',
            footer_disclaimer: 'Situs ini adalah proyek penggemar tidak resmi dan tidak berafiliasi dengan viviON Inc. maupun proyek resmi Aogiri High School.'
        }
    };

    const activeMembers = [
        { id: 'tamako', name: '音霊 魂子', kana: 'おとだま たまこ', nameEn: 'Otodama Tamako', color: '#ff6b81', catchphrase: { ja: '「スマブラ実況から活動を開始。」', en: 'Started her activities with Super Smash Bros. commentary.' }, tags: { ja: ['#初期メンバー', '#ゲーム', '#ASMR'], en: ['#FoundingMember', '#Gaming', '#ASMR'] } },
        { id: 'akari', name: '石狩 あかり', kana: 'いしかり あかり', nameEn: 'Ishikari Akari', color: '#ffbd00', catchphrase: { ja: '「グループの「歌姫」的存在。」', en: 'Often seen as one of the group\'s songstresses.' }, tags: { ja: ['#初期メンバー', '#歌', '#ゲーム'], en: ['#FoundingMember', '#Singing', '#Gaming'] } },
        { id: 'nekuro', name: '山黒 音玄', kana: 'やまぐろ ねくろ', nameEn: 'Yamaguro Nekuro', color: '#9b59b6', catchphrase: { ja: '「清楚に見えて実は…？」', en: 'Looks refined at first glance, but there is always more underneath.' }, tags: { ja: ['#オタク', '#イラスト'], en: ['#Otaku', '#Illustration'] } },
        { id: 'chiyomi', name: '千代浦 蝶美', kana: 'ちようら ちよみ', nameEn: 'Chiyoura Chiyomi', color: '#ff9ff3', catchphrase: { ja: '「握力40kg。文化放送で冠番組を担当。」', en: 'Known for a 40kg grip strength and her own radio program on Bunka Hoso.' }, tags: { ja: ['#アイドル', '#ガンプラ', '#ラジオ'], en: ['#Idol', '#Gunpla', '#Radio'] } },
        { id: 'komaru', name: '栗駒 こまる', kana: 'くりこま こまる', nameEn: 'Kurikoma Komaru', color: '#7bed9f', catchphrase: { ja: '「合法ロリとは私のこと」', en: '"Legal loli" is one of her signature self-descriptions.' }, tags: { ja: ['#ショタコン', '#ASMR'], en: ['#Shotacon', '#ASMR'] } },
        { id: 'rieru', name: '我部 りえる', kana: 'がぶ りえる', nameEn: 'Gabu Rieru', color: '#70a1ff', catchphrase: { ja: '「特定アーティスト（μ\'s、BUMP等）の縛り歌枠。」', en: 'Known for themed singing streams focused on specific artists like μ\'s and BUMP.' }, tags: { ja: ['#VSinger', '#歌枠'], en: ['#VSinger', '#SingingStreams'] } },
        { id: 'etra', name: 'エトラ', kana: 'えとら', nameEn: 'Etra', color: '#a4b0be', catchphrase: { ja: '「見た目は清楚、中身は…」', en: 'Elegant on the surface, but that is only half the story.' }, tags: { ja: ['#多声類', '#ヤンデレ'], en: ['#WideVocalRange', '#Yandere'] } },
        { id: 'urame', name: '春雨 麗女', kana: 'はるさめ うらめ', nameEn: 'Harusame Urame', color: '#ff4757', catchphrase: { ja: '「あおぎり高校のフレディ・マーキュリー。」', en: 'Sometimes called the Freddie Mercury of Aogiri High School.' }, tags: { ja: ['#酒', '#歌'], en: ['#Drinks', '#Singing'] } },
        { id: 'popura', name: 'ぷわぷわ ぽぷら', kana: 'ぷわぷわ ぽぷら', nameEn: 'Puwapuwa Popura', color: '#ffa502', catchphrase: { ja: '「モーションアクターを使わず自ら動くこだわり。」', en: 'Particular about performing movements herself instead of relying on motion actors.' }, tags: { ja: ['#クリエイティブ', '#3D'], en: ['#Creative', '#3D'] } },
        { id: 'moemi', name: '萌実', kana: 'もえみ', nameEn: 'Moemi', color: '#e84393', catchphrase: { ja: '「『Moemi\'s Bar』を主宰する酒豪。」', en: 'A legendary drinker who hosts "Moemi\'s Bar."' }, tags: { ja: ['#8年以上のベテラン', '#晩酌'], en: ['#8YearVeteran', '#NightDrinks'] } },
        { id: 'ibuki', name: '月赴 ゐぶき', kana: 'つきゆき いぶき', nameEn: 'Tsukiyuki Ibuki', color: '#00d2d3', catchphrase: { ja: '「浜松から東京まで自転車出勤を敢行。」', en: 'Famously attempted a bicycle commute from Hamamatsu all the way to Tokyo.' }, tags: { ja: ['#院生', '#自転車', '#動画編集'], en: ['#GraduateStudent', '#Cycling', '#VideoEditing'] } },
        { id: 'garu', name: 'うる虎 がーる', kana: 'うるとら がーる', nameEn: 'Urutora Garu', color: '#feca57', catchphrase: { ja: '「UE5やRPGツクールでの自作ゲーム製作。」', en: 'Creates original games with tools such as UE5 and RPG Maker.' }, tags: { ja: ['#ゲーム開発', '#格闘ゲーム'], en: ['#GameDevelopment', '#FightingGames'] } },
        { id: 'mujina', name: '八十科 むじな', kana: 'やそしな むじな', nameEn: 'Yasoshina Mujina', color: '#1dd1a1', catchphrase: { ja: '「『やそしなクリニック』の主催。性別不詳。」', en: 'Hosts "Yasoshina Clinic" and keeps an intentionally ambiguous persona.' }, tags: { ja: ['#美大出身', '#お悩み相談'], en: ['#ArtSchool', '#AdviceStreams'] } }
    ];

    const graduatedMembers = [
        { id: 'mashiro', name: '大代 真白', kana: 'おおしろ ましろ', nameEn: 'Ooshiro Mashiro', color: '#a4b0be', catchphrase: { ja: '「おむつ、失禁体験などの過激な企画で知られる。」', en: 'Known for extreme projects involving diapers, incontinence-themed bits, and other shock-value concepts.' }, tags: { ja: ['#2025年2月10日卒業'], en: ['#GraduatedFeb102025'] } },
        { id: 'natsuki', name: '水菜月 夏希', kana: 'みなづき なつき', nameEn: 'Minazuki Natsuki', color: '#5352ed', catchphrase: { ja: '「歌枠やMAD動画で活躍。」', en: 'Active in singing streams and MAD-style edited videos.' }, tags: { ja: ['#初期メンバー'], en: ['#FoundingMember'] } }
    ];

    let currentLang = localStorage.getItem('aogiri_lang') || 'ja';
    if (!languageOrder.includes(currentLang)) currentLang = 'ja';
    const titleElement = document.querySelector('title');
    const descriptionMeta = document.querySelector('meta[name="description"]');
    const langSelect = document.getElementById('lang-select');
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
    const getTranslation = (key) => (pageTranslations[currentLang] || pageTranslations.ja)[key] || pageTranslations.en[key] || pageTranslations.ja[key] || '';
    const applyStaticTranslations = () => {
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

    const getLocalizedMember = (member) => currentLang === 'ja'
        ? { name: member.name, subLabel: member.kana, catchphrase: member.catchphrase.ja, tags: member.tags.ja }
        : { name: member.nameEn || member.name, subLabel: member.name, catchphrase: member.catchphrase.en, tags: member.tags.en };

    const createMemberCard = (member, isGraduate = false) => {
        const wrapper = document.createElement('div');
        wrapper.className = `card-wrapper reveal-up ${isGraduate ? 'graduate-card' : ''}`;
        const basePath = (window.location.pathname.endsWith('aogiri_index.html') || window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) ? 'characters/' : '';
        const localized = getLocalizedMember(member);
        wrapper.onclick = () => { window.location.href = `${basePath}${member.id}.html`; };
        wrapper.style.setProperty('--card-color', member.color);
        wrapper.innerHTML = `
            <div class="member-card-3d">
                <div class="card-glare"></div>
                <div class="bg-initial" style="color: ${member.color}22">${localized.name.charAt(0)}</div>
                <div class="card-content-layer">
                    <div class="c-header">
                        <div class="c-initial-small" style="color: ${member.color}; border-color: ${member.color}">${localized.name.charAt(0)}</div>
                        <div class="c-name-group">
                            <div class="c-name">${localized.name}</div>
                            <div class="c-kana">${localized.subLabel}</div>
                        </div>
                    </div>
                    <div class="c-body">
                        <div class="c-catchphrase">${localized.catchphrase}</div>
                        <div class="c-tags">${localized.tags.map((tag) => `<span class="c-tag">${tag}</span>`).join('')}</div>
                    </div>
                </div>
            </div>
        `;
        const card3D = wrapper.querySelector('.member-card-3d');
        const glare = wrapper.querySelector('.card-glare');
        const contentLayer = wrapper.querySelector('.card-content-layer');
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            card3D.style.transform = `perspective(1000px) rotateX(${y * -15}deg) rotateY(${x * 15}deg) scale3d(1.05, 1.05, 1.05)`;
            contentLayer.style.transform = 'translateZ(40px)';
            glare.style.background = `radial-gradient(circle at ${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`;
            glare.style.opacity = '1';
        });
        wrapper.addEventListener('mouseleave', () => {
            card3D.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            contentLayer.style.transform = 'translateZ(0)';
            glare.style.opacity = '0';
            card3D.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            contentLayer.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            glare.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                card3D.style.transition = '';
                contentLayer.style.transition = '';
            }, 500);
        });
        return wrapper;
    };

    const renderMembers = (revealObserver) => {
        [['active-members-grid', activeMembers, false], ['graduates-grid', graduatedMembers, true]].forEach(([id, members, isGraduate]) => {
            const grid = document.getElementById(id);
            if (!grid) return;
            grid.innerHTML = '';
            members.forEach((member, index) => {
                const card = createMemberCard(member, isGraduate);
                card.style.transitionDelay = `${(index % 4) * 0.15}s`;
                grid.appendChild(card);
                revealObserver.observe(card);
            });
        });
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('is-revealed');
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal-scale, .reveal-fade, .reveal-up, .reveal-slide-right, .reveal-slide-left, .reveal-3d').forEach((el) => revealObserver.observe(el));

    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.2}px, ${(e.clientY - rect.top - rect.height / 2) * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            setTimeout(() => { btn.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'; }, 400);
        });
    });

    const heroVisual = document.querySelector('.hero-visual');
    const parallaxChildren = document.querySelectorAll('.parallax-child');
    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            parallaxChildren.forEach((child) => {
                const depth = parseFloat(child.getAttribute('data-depth')) || 0.2;
                child.style.transform = `translate(${x * 30 * depth}px, ${y * 30 * depth}px)`;
            });
        });
        heroVisual.addEventListener('mouseleave', () => {
            parallaxChildren.forEach((child) => {
                child.style.transform = 'translate(0px, 0px)';
                child.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => { child.style.transition = 'none'; }, 800);
            });
        });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
    window.dispatchEvent(new Event('scroll'));

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
            localStorage.setItem('aogiri_lang', currentLang);
            applyStaticTranslations();
            renderMembers(revealObserver);
        });
    }

    applyStaticTranslations();
    renderMembers(revealObserver);
});
