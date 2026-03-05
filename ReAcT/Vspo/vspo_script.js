document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // Agent Data List (Extracted from User Input)
    // -------------------------------------------------------------
    const agents = [
        { name: '一ノ瀬うるは', unit: 'Lupinus Virtual Games (LVG)', unitClass: 'lvg', tags: ['Apex Legends', 'PUBG'], desc: '初期から活動しているLVGメンバー。高いエイム力と冷静な判断力でチームを牽引する。', aim: 85, igl: 70, url: 'characters/uruha.html' },
        { name: '花芽すみれ', unit: 'Lupinus Virtual Games (LVG)', unitClass: 'lvg', tags: ['Apex Legends', 'VALORANT'], desc: 'LVGの初期メンバー。FPS全般に対する高い適応力を持ち、常に最前線で戦う。', aim: 80, igl: 60, url: 'characters/sumire.html' },
        { name: '花芽なずな', unit: 'Lupinus Virtual Games (LVG)', unitClass: 'lvg', tags: ['PUBG', 'VALORANT'], desc: 'LVG初期メンバー。妹のすみれと共にFPSシーンを盛り上げる。スナイパーの扱いが得意。', aim: 75, igl: 65, url: 'characters/nazuna.html' },
        { name: '小雀とと', unit: 'Lupinus Virtual Games (LVG)', unitClass: 'lvg', tags: ['Apex Legends', 'FPS'], desc: '初期からのLVGメンバー。マイペースな性格だが、試合では堅実なプレイを見せる。', aim: 70, igl: 75, url: 'characters/toto.html' },

        { name: '胡桃のあ', unit: 'Iris Black Games (IBG)', unitClass: 'ibg', tags: ['Apex Legends', 'VALORANT'], desc: 'IBG所属。圧倒的なエイムセンスとアグレッシブなプレイスタイルで数々の大会で活躍。', aim: 95, igl: 80, url: 'characters/noah.html' },
        { name: '橘ひなの', unit: 'Iris Black Games (IBG)', unitClass: 'ibg', tags: ['Apex Legends', 'VALORANT'], desc: 'IBG所属。チームのムードメーカーでありながら、クラッチプレイを連発する実力者。', aim: 88, igl: 85, url: 'characters/hinano.html' },
        { name: '如月れん', unit: 'Iris Black Games (IBG)', unitClass: 'ibg', tags: ['VALORANT', 'CS:GO'], desc: 'IBG所属。戦術的な動きとIGL（インゲームリーダー）としての能力に長けている。', aim: 75, igl: 90, url: 'characters/ren.html' },

        { name: '兎咲ミミ', unit: 'Cattleya Regina Games (CRG)', unitClass: 'crg', tags: ['Apex Legends', 'Minecraft'], desc: 'CRG所属。可愛らしい声とは裏腹に、FPSでは容赦ない射撃精度を誇る。', aim: 82, igl: 60, url: 'characters/mimi.html' },
        { name: '空澄セナ', unit: 'Cattleya Regina Games (CRG)', unitClass: 'crg', tags: ['Apex Legends', 'FPS'], desc: 'CRG所属。パッションあふれるプレイと声掛けでチームに勢いをもたらす。', aim: 80, igl: 70, url: 'characters/sena.html' },
        { name: '英リサ', unit: 'Cattleya Regina Games (CRG)', unitClass: 'crg', tags: ['Apex Legends', 'League of Legends'], desc: 'CRG所属。FPSだけでなくMOBA等の様々なジャンルを器用にこなすオールラウンダー。', aim: 78, igl: 80, url: 'characters/lisa.html' },

        { name: '神成きゅぴ', unit: 'VSPO! JP', unitClass: 'jp', tags: ['Apex Legends', 'VALORANT'], desc: '圧倒的なフィジカル（反応速度とエイム）を持ち、前線での打ち合いに絶対の自信を持つ。', aim: 90, igl: 50, url: 'characters/qpi.html' },
        { name: '八雲べに', unit: 'VSPO! JP', unitClass: 'jp', tags: ['VALORANT', 'Overwatch'], desc: 'VALORANTに非常に精通しており、高い戦術眼とキャラコントロールで魅せるプレイヤー。', aim: 85, igl: 85, url: 'characters/beni.html' },
        { name: '藍沢エマ', unit: 'VSPO! JP', unitClass: 'jp', tags: ['Apex Legends', 'FPS'], desc: '努力家であり、大会に向けて長時間のスクリムをこなす真面目な姿勢が評価されている。', aim: 75, igl: 60, url: 'characters/ema.html' },
        { name: '紫宮るな', unit: 'VSPO! JP', unitClass: 'jp', tags: ['PUBG', 'Apex Legends'], desc: '落ち着いたトーンと、状況把握能力の高さが光る。サポート役としても優秀。', aim: 80, igl: 75, url: 'characters/runa.html' },
        { name: '猫汰つな', unit: 'VSPO! JP', unitClass: 'jp', tags: ['Apex Legends', 'VALORANT'], desc: '韓国語も堪能。驚異的なプレイスキルを持ち、デビュー直後から数々の大会で伝説を残す。', aim: 95, igl: 80, url: 'characters/tsuna.html' },
        { name: '白波らむね', unit: 'VSPO! JP', unitClass: 'jp', tags: ['Overwatch', 'VALORANT'], desc: '明るく元気なキャラクター性で、チームの空気を常に上向きにするムードメーカー。', aim: 78, igl: 65, url: 'characters/ramune.html' },
        { name: '小森めと', unit: 'VSPO! JP', unitClass: 'jp', tags: ['Apex Legends', 'VALORANT'], desc: '高いコミュニケーション能力と、他グループも含めた広い交友関係を持つ実力派。', aim: 85, igl: 80, url: 'characters/meto.html' },
        { name: '夢野あかり', unit: 'VSPO! JP', unitClass: 'jp', tags: ['FPS', 'Minecraft'], desc: '「あかりん」の愛称で親しまれる。予測不能なプレイと明るい笑い声が特徴。', aim: 70, igl: 50, url: 'characters/akari.html' },
        { name: '夜乃くろむ', unit: 'VSPO! JP', unitClass: 'jp', tags: ['League of Legends', 'FPS'], desc: 'FPSに加え、長時間のLoL配信なども行うハードコアゲーマー。探究心が強い。', aim: 75, igl: 80, url: 'characters/kuromu.html' },
        { name: '紡木こかげ', unit: 'VSPO! JP', unitClass: 'jp', tags: ['FPS', 'Various'], desc: '新世代のVSPOメンバーとして、先輩たちに引けを取らないスキルとポテンシャルを持つ。', aim: 80, igl: 65, url: 'characters/kokage.html' },
        { name: '千燈ゆうひ', unit: 'VSPO! JP', unitClass: 'jp', tags: ['FPS', 'Various'], desc: 'キュートなルックスと、ゲーム中の真剣なトーンのギャップがファンの心を掴む。', aim: 75, igl: 60, url: 'characters/yuhi.html' },
        { name: '龍巻ちせ', unit: 'VSPO! JP', unitClass: 'jp', tags: ['FPS', 'Various'], desc: '加入後すぐにその実力を証明し、大会シーンでも注目されるホープ。', aim: 82, igl: 70, url: 'characters/chise.html' },
        { name: '蝶屋はなび', unit: 'VSPO! JP', unitClass: 'jp', tags: ['FPS', 'Various'], desc: '華やかなビジュアルと、的確な射撃技術を持つ。コミュニケーション能力も高い。', aim: 78, igl: 70, url: 'characters/hanabi.html' },
        { name: '甘結もか', unit: 'VSPO! JP', unitClass: 'jp', tags: ['FPS', 'Various'], desc: 'ふんわりとした雰囲気ながら、いざという時のクラッチ能力に定評がある。', aim: 70, igl: 65, url: 'characters/moka.html' },
        { name: '銀城サイネ', unit: 'VSPO! JP', unitClass: 'jp', tags: ['FPS', 'Various'], desc: 'クールな佇まいと確かなエイムで、後方支援から前線突破までこなす。', aim: 80, igl: 75, url: 'characters/saine.html' },

        { name: 'Remia Aotsuki', unit: 'VSPO! EN', unitClass: 'en', tags: ['CS2', 'FPS'], desc: 'CS2のコミュニティを盛り上げ、自身の武器スキン実装やコラボバーガーを夢見る。', aim: 85, igl: 80, url: 'characters/remia.html' },
        { name: 'Arya Kuroha', unit: 'VSPO! EN', unitClass: 'en', tags: ['FPS', 'Various'], desc: 'サンリオのクロミやポテトチップスブランドとのコラボを目標に掲げる。', aim: 75, igl: 60, url: 'characters/arya.html' },
        { name: 'Riko Solari', unit: 'VSPO! EN', unitClass: 'en', tags: ['FPS', 'Variety'], desc: '自称EN最年少で身長209mという設定を持つ。3Dライブ開催とオリジナルソングが目標。', aim: 70, igl: 65, url: 'characters/riko.html' },
        { name: 'Narin Mikure', unit: 'VSPO! EN', unitClass: 'en', tags: ['VALORANT', 'FPS'], desc: 'オリジナルLo-Fiアルバムのリリースや、VALORANT公式イベントのゲスト出演を目指す。', aim: 80, igl: 75, url: 'characters/narin.html' },
        { name: 'Jira Jisaki', unit: 'VSPO! EN', unitClass: 'en', tags: ['FPS', 'Various'], desc: 'ENブランチを支えるメンバーの一人。高いゲームセンスとユーモアを持つ。', aim: 78, igl: 70, url: 'characters/jira.html' },
        { name: 'Eris Suzukami', unit: 'VSPO! EN', unitClass: 'en', tags: ['FPS', 'Roleplay'], desc: '大規模なチャリティトーナメントの開催を目指す。ゲーマーとVTuberの壁をなくすのが目標。', aim: 82, igl: 85, url: 'characters/eris.html' }
    ];

    // -------------------------------------------------------------
    // DOM Elements
    // -------------------------------------------------------------
    const agentListContainer = document.getElementById('agentList');
    const tabBtns = document.querySelectorAll('.tab-btn');

    const bgName = document.getElementById('bgName');
    const agentNameEl = document.getElementById('agentName');
    const agentUnitEl = document.getElementById('agentUnit');
    const agentProfileEl = document.getElementById('agentProfile');
    const agentGamesEl = document.getElementById('agentGames');

    const statAim = document.getElementById('statAim');
    const statIgl = document.getElementById('statIgl');

    const glitchOverlay = document.getElementById('glitchOverlay');
    const charSilhouette = document.getElementById('charSilhouette');
    let lockInBtn = document.querySelector('.lock-in-btn');

    let currentSelectedId = -1;

    // -------------------------------------------------------------
    // Initialize List
    // -------------------------------------------------------------
    function renderList(filter) {
        agentListContainer.innerHTML = '';

        agents.forEach((agent, index) => {
            if (filter === 'all' || agent.unitClass === filter || (filter === 'jp' && ['lvg', 'ibg', 'crg', 'jp'].includes(agent.unitClass) === false)) {
                // Determine display logic based on complex unit structures
                const isMatch = filter === 'all'
                    || agent.unitClass === filter
                    || (filter === 'jp' && ['lvg', 'ibg', 'crg', 'jp'].includes(agent.unitClass));

                if (!isMatch && filter !== 'all' && (filter !== 'jp' || ['lvg', 'ibg', 'crg', 'jp'].includes(agent.unitClass) === false)) {

                    // Specific matching logic
                    if (filter === 'all') { }
                    else if (filter === agent.unitClass) { }
                    else { return; } // skip
                }

                const item = document.createElement('div');
                item.className = 'agent-item';
                if (index === currentSelectedId) item.classList.add('selected');

                item.innerHTML = `
                    <span class="agent-name">${agent.name.split(' ')[0]}</span>
                    <span class="agent-sub">${agent.unit.split(' ')[0]}</span>
                `;

                item.addEventListener('click', () => selectAgent(agent, index, item));
                agentListContainer.appendChild(item);
            }
        });
    }

    // Tab Filtering
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderList(btn.getAttribute('data-filter'));
        });
    });

    // -------------------------------------------------------------
    // Handle Selection (The "Game Client" feel)
    // -------------------------------------------------------------
    function selectAgent(agent, index, element) {
        // UI Selection State
        document.querySelectorAll('.agent-item').forEach(el => el.classList.remove('selected'));
        if (element) element.classList.add('selected');
        currentSelectedId = index;

        // Trigger Glitch Animation
        glitchOverlay.classList.remove('flash-anim');
        void glitchOverlay.offsetWidth; // trigger reflow
        glitchOverlay.classList.add('flash-anim');

        // Center Hologram Data
        // Use english letters if possible for the big BG text
        const englishMatch = agent.name.match(/[A-Za-z]+/);
        bgName.textContent = englishMatch ? englishMatch[0].toUpperCase() : agent.name.substring(0, 2).toUpperCase();

        // Randomize silhouette color slightly based on name length to feel dynamic
        const hue = (agent.name.length * 20) % 360;
        charSilhouette.style.background = `radial-gradient(ellipse at bottom, hsl(${hue}, 80%, 50%) 0%, transparent 70%)`;

        // Update Spec Panel Data
        agentNameEl.textContent = agent.name;
        agentUnitEl.textContent = agent.unit;

        // Typewriter effect for profile
        typeWriter(agentProfileEl, agent.desc);

        // Tags
        agentGamesEl.innerHTML = '';
        agent.tags.forEach(tag => {
            agentGamesEl.innerHTML += `<span class="game-tag">${tag}</span>`;
        });

        // Stats Bars
        statAim.style.width = '0%';
        statIgl.style.width = '0%';
        setTimeout(() => {
            statAim.style.width = `${agent.aim}%`;
            statIgl.style.width = `${agent.igl}%`;
        }, 100);

        // Enable Lock In button and attach link
        lockInBtn.removeAttribute('disabled');
        lockInBtn.classList.add('active');
        lockInBtn.textContent = 'LOCK IN ' + (englishMatch ? englishMatch[0].toUpperCase() : 'AGENT');

        // Remove old event listeners if any, and add new navigation
        const newBtn = lockInBtn.cloneNode(true);
        lockInBtn.parentNode.replaceChild(newBtn, lockInBtn);
        lockInBtn = newBtn; // Update the reference!
        if (agent.url && agent.url !== '#') {
            lockInBtn.addEventListener('click', () => {
                window.location.href = agent.url;
            });
        }
    }

    // Typewriter Utility
    let typingTimer;
    function typeWriter(element, text) {
        clearInterval(typingTimer);
        element.textContent = '';
        let i = 0;
        typingTimer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingTimer);
            }
        }, 20); // ms per char
    }

    // Initial render
    renderList('all');
});
