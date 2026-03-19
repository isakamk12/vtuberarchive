const { createApp, ref, onMounted, onUnmounted, computed } = Vue;

const app = createApp({
    setup() {
        const windowWidth = ref(window.innerWidth);
        const isMobile = computed(() => windowWidth.value <= 768);

        const handleResize = () => {
            windowWidth.value = window.innerWidth;
        };

        const initScrollReveal = () => {
            setTimeout(() => {
                const reveals = document.querySelectorAll('.np-reveal');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry, i) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => entry.target.classList.add('active'), i * 100);
                        }
                    });
                }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
                reveals.forEach(el => observer.observe(el));
            }, 100);
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
            
            // PC版のときだけスクロールアニメーションを有効にする
            if (!isMobile.value) {
                initScrollReveal();
            }
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        // ========== DATA ==========
        const management = [
            { initial: 'ハ', role: 'VTuber / Organizer', name: '渋谷ハル', desc: 'プロジェクトの発起人。<strong>VTuber最協決定戦</strong>の主催者として業界をリードし、競技シーンとエンタメの融合を体現する。' },
            { initial: 'CR', role: 'Esports Team CEO', name: 'Crazy Raccoon<br><small style="font-size:0.7em;opacity:0.6">（おじじ）</small>', desc: '世界的人気プロゲーミングチーム<strong>「Crazy Raccoon」</strong>代表。ゲームを通じたタレント育成とプロモーションの要。' },
            { initial: 'ま', role: 'Artist / Producer', name: 'まふまふ', desc: '紅白出場経験も持つマルチクリエイター。音楽面のトータルプロデュースを担い、タレントの表現力を引き出す。' },
            { initial: 'そ', role: 'Artist / Producer', name: 'そらる', desc: 'ネットシーンを牽引し続けるアーティスト。音楽クリエイターとしての知見を活かし、所属タレントの音楽活動を支える。' }
        ];

        const features = [
            { icon: '🎮', title: 'Esports First — ゲームに特化', desc: '運営陣にeスポーツチームの代表と、Apex Legendsシーンで実績を持つVTuberがいることから、所属タレントは<strong>FPS（Apex Legends・VALORANT）</strong>を得意とするメンバーが多い。競技志向とエンタメ配信を両立する文化がある。', wide: true },
            { icon: '🔓', title: 'Free Culture — 自由な社風', desc: '配信内で運営陣・タレント双方が「<strong>ネオポルテは自由</strong>」と度々発言するほど、個性尊重・タレント主導の風土がある。型にはまらないキャラクター設定が多いのもその表れ。' },
            { icon: '🎵', title: 'Music Support — 音楽活動', desc: 'オーナー陣にアーティストが複数いることで、<strong>歌ってみた制作や音楽活動のサポート体制</strong>が充実。歌を軸にした活動を志望するタレントにとって恵まれた環境。' },
            { icon: '🤝', title: 'Community First — ファンとの距離感', desc: 'タレントとリスナーがフランクにやり取りする雰囲気を大切にしているメンバーが多く、親しみやすいコミュニティ文化を形成している。' }
        ];

        const events = [
            { year: '2025', title: 'Brave Group参画', desc: '<strong>Brave Group</strong>への経営統合により、プロダクション運営体制が強化。国内外への展開やIPプラットフォームの活用が加速した。' },
            { year: '2026.01', title: 'オンラインミュージックショー「PorTune」開催', desc: 'Neo-Porteによる3Dオンラインライブ。最新技術を駆使したパフォーマンスが話題を呼んだ。' },
            { year: '2026.05', title: 'ファンミーティング「UN KNOCK」開催予定', desc: '初のリアルファンミーティングをニッショーホールにて開催。0期生のオフラインイベントや、所属ライバーのソロイベントも続々と決定。' }
        ];

        const generations = [
            {
                id: 'gen0',
                title: '👑 0期生',
                tag: 'Founding Generation',
                talents: [
                    { link: 'characters/hal/hal.html', name: '渋谷ハル', en: 'Shibuya Hal', desc: 'ネオポルテのオーナー兼タレント。<strong>VTuber最協決定戦の主催者</strong>。<strong>Apex Legends</strong>の配信・動画投稿がメイン活動で、過去には競技シーンでも活躍し<strong>世界大会への出場権</strong>を獲得した実力を持つ。', meta1: 'Owner / Player', meta2: '#渋谷ハル' },
                    { link: 'characters/reid/reid.html', name: '白雪レイド', en: 'Shirayuki Reid', desc: '<strong>PUBGなどのゲーム配信</strong>を中心に、弾き語り配信なども行うマルチな活躍を見せる。後輩タレントたちから<strong>「伝説」</strong>と呼ばれるほど慕われ、尊敬を集める存在。', meta1: 'PUBG / 弾き語り', meta2: '#白雪レイド' }
                ]
            },
            {
                id: 'gen1',
                title: '🐾 1期生',
                talents: [
                    { link: 'characters/yui/yui.html', name: '緋月ゆい', en: 'Hizuki Yui', desc: '歌・ゲーム・アニメが好きな「<strong>真面目なギャル</strong>」。相棒のペンギン「ポセイドン」を連れている。', meta1: 'ファン: ポセイ団', meta2: '#緋月ゆい' },
                    { link: 'characters/inu/inu.html', name: '或世イヌ', en: 'Aruse Inu', desc: '<strong>怪盗</strong>。デビュー前に社長の金庫に盗みに入って逮捕されたという設定を持つ。初配信が「<strong>音声50%カット</strong>」でトレンド入りを果たした伝説がある。', meta1: '#或世イヌ', meta2: '#あるせ残業中' },
                    { link: 'characters/niu/niu.html', name: '夜絆ニウ', en: 'Yozuna Niu', desc: '<strong>警備隊長</strong>。ネズミ（デグー）が好き。', meta1: 'ファン: よず仲間', meta2: '#夜絆ニウ' }
                ]
            },
            {
                id: 'gen2',
                title: '🍀 2期生',
                tag: 'Unit: Quattro / クワトロ',
                talents: [
                    { link: 'characters/teto/teto.html', name: '心白てと', en: 'Kohaku Teto', desc: 'エルフの国から来た<strong>ハーフエルフ</strong>。人間との共存を目指している。', meta1: 'ファン: 琥珀糖', meta2: '#心白てと' },
                    { link: 'characters/leo/leo.html', name: '久我レオ', en: 'Kuga Leo', desc: '南の国出身の<strong>掃除屋（殺し屋）</strong>兼英会話の先生。', meta1: 'ファン: レオメイト', meta2: '#久我レオ' },
                    { link: 'characters/toi/toi.html', name: '絲依とい', en: 'Itoi Toi', desc: '屋敷を抜け出してきた<strong>元メイド</strong>。', meta1: 'ファン: といあみ', meta2: '#絲依とい' },
                    { link: null, name: '鱗水', en: 'Urokoumi Sui', desc: 'Quattroのメンバー。', meta1: '#鱗水', meta2: null }
                ]
            },
            {
                id: 'gen3',
                title: '🏢 3期生',
                talents: [
                    { link: 'characters/kazari/kazari.html', name: '瀬尾カザリ', en: 'Ceo Kazari', desc: 'アパレル企業の若き<strong>CEO</strong>。ネオポルテ買収に失敗し、内部から掌握するためにライバーになった。', meta1: '#瀬尾カザリ', meta2: '#CEO営業中' },
                    { link: 'characters/aria/aria.html', name: '昏昏アリア', en: 'Konkon Aria', desc: '<strong>悪魔教祖</strong>。ネオポルテを布教し、大金持ちになって人間界に住むのが夢。', meta1: '#昏昏アリア', meta2: '#アリア布教中' },
                    { link: 'characters/utsuro/utsuro.html', name: '幽乃うつろ', en: 'Kasukano Utsuro', desc: '<strong>幽霊</strong>。ポーチの中に「ワンタン」というペットを幽閉している。', meta1: '#幽乃うつろ', meta2: '#うつろーでぃんぐ' }
                ]
            },
            {
                id: 'gen4',
                title: '💻 4期生',
                talents: [
                    { link: 'characters/eito/eito.html', name: '青桐エイト', en: 'Aogiri Eito', desc: 'サイバーポップな雰囲気の<strong>情報屋</strong>。', meta1: '#青桐エイト', meta2: '#エイト情報収集中' },
                    { link: 'characters/tsurugi/tsurugi.html', name: '柊ツルギ', en: 'Hiiragi Tsurugi', desc: '<strong>勇者</strong>を目指している。', meta1: '#柊ツルギ', meta2: '#ツルギオンライン' }
                ]
            },
            {
                id: 'gen5',
                title: '⛩️ 5期生',
                tag: 'Unit Tag: #しずくも',
                talents: [
                    { link: 'characters/tsukumo/tsukumo.html', name: '八神ツクモ', en: 'Yagami Tsukumo', desc: 'ツクモ神に取り憑かれて<strong>半妖</strong>になった存在。', meta1: 'ファン: 魑魅魍魎', meta2: '#八神ツクモ' },
                    { link: 'characters/shizuku/shizuku.html', name: '白那しずく', en: 'Shirona Shizuku', desc: '神様だった<strong>白蛇に取り憑かれている</strong>。りんごは丸かじり派。', meta1: '#白那しずく', meta2: '🍎💧' },
                    { link: 'characters/shino/shino.html', name: '麻倉シノ', en: 'Asakura Shino', desc: '<strong>脱サラして配信者になった陰陽師</strong>。', meta1: 'ファン: しののめ', meta2: '#麻倉シノ' }
                ]
            },
            {
                id: 'gen6',
                title: '🎲 6期生',
                talents: [
                    { link: 'characters/kuro/kuro.html', name: '日裏クロ', en: 'Hiura Kuro', desc: '<strong>元ギャンブラーの異界人</strong>。借金まみれで逃げている。LoLを<strong>1万時間</strong>プレイした実績を持つ。', meta1: '#日裏クロ', meta2: '#ヒウライブ' },
                    { link: 'characters/ten/ten.html', name: '鬼ヶ谷テン', en: 'Onigaya Ten', desc: '<strong>鬼の図書委員</strong>。', meta1: '#鬼ヶ谷テン', meta2: null },
                    { link: 'characters/amu/amu.html', name: '甘音あむ', en: 'Amane Amu', desc: '<strong>死神</strong>。使い魔の名前は「プリン」ちゃん。イチゴとビールが大好き。夢はオリジナル曲を出すこと。', meta1: 'ファン: あむと 💔⛓', meta2: '#甘音あむ' }
                ]
            },
            {
                id: 'gen7',
                title: '🔮 7期生',
                tag: '初のソロデビュー',
                talents: [
                    { link: 'characters/eni/eni.html', name: '光葉エニ', en: 'Mitsuba Eni', desc: 'ネオポルテ<strong>初のソロデビュー</strong>タレント。占い師に声をかけられてやってきた<strong>元ニート</strong>。挨拶は「ハロー」+「エニ」=「<strong>ハニー</strong>」。', meta1: '#生ヱニ', meta2: '#ミツバヱニ' }
                ]
            }
        ];

        return {
            isMobile,
            management,
            features,
            events,
            generations
        }
    }
});

app.mount('#app');
