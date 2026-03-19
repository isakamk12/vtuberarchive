/* =========================================
   AOGIRI HIGH SCHOOL FAN SITE SCRIPTS
   v2.0 - Premium Interactions
========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Scroll Reveal Animations (Intersection Observer) --- */
    const revealElements = document.querySelectorAll(
        '.reveal-scale, .reveal-fade, .reveal-up, .reveal-slide-right, .reveal-slide-left, .reveal-3d'
    );

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay class if there's a group delay
                entry.target.classList.add('is-revealed');
                // Optional: stop observing once revealed for one-time animation
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));


    /* --- 2. Magnetic Buttons (Premium Hover Effect) --- */
    const magneticElements = document.querySelectorAll('.magnetic-btn');

    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle movement based on mouse position
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
            // Add a little spring back transition
            btn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            setTimeout(() => {
                btn.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'; // reset to original
            }, 400);
        });
    });


    /* --- 3. 3D Parallax Hero Effect --- */
    const heroVisual = document.querySelector('.hero-visual');
    const parallaxChildren = document.querySelectorAll('.parallax-child');

    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            // Calculate mouse position relative to center of container (-1 to 1)
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

            parallaxChildren.forEach(child => {
                const depth = parseFloat(child.getAttribute('data-depth')) || 0.2;
                const moveX = x * 30 * depth;
                const moveY = y * 30 * depth;

                child.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        heroVisual.addEventListener('mouseleave', () => {
            parallaxChildren.forEach(child => {
                child.style.transform = `translate(0px, 0px)`;
                child.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => {
                    child.style.transition = 'none'; // removing transition for smooth mousemove
                }, 800);
            });
        });
    }


    /* --- 4. Navbar Background on Scroll --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    // Trigger once on load
    window.dispatchEvent(new Event('scroll'));


    /* --- 5. Members Data & Dynamic Generation --- */
    const activeMembers = [
        { id: 'tamako', name: '音霊 魂子', kana: 'おとだま たまこ', color: '#ff6b81', catchphrase: '「スマブラ実況から活動を開始。」', tags: ['#初期メンバー', '#ゲーム', '#ASMR'] },
        { id: 'akari', name: '石狩 あかり', kana: 'いしかり あかり', color: '#ffbd00', catchphrase: '「グループの「歌姫」的存在。」', tags: ['#初期メンバー', '#歌', '#ゲーム'] },
        { id: 'nekuro', name: '山黒 音玄', kana: 'やまぐろ ねくろ', color: '#9b59b6', catchphrase: '「清楚に見えて実は…？」', tags: ['#オタク', '#イラスト'] },
        { id: 'chiyomi', name: '千代浦 蝶美', kana: 'ちようら ちよみ', color: '#ff9ff3', catchphrase: '「握力40kg。文化放送で冠番組を担当。」', tags: ['#アイドル', '#ガンプラ', '#ラジオ'] },
        { id: 'komaru', name: '栗駒 こまる', kana: 'くりこま こまる', color: '#7bed9f', catchphrase: '「合法ロリとは私のこと」', tags: ['#ショタコン', '#ASMR'] },
        { id: 'rieru', name: '我部 りえる', kana: 'がぶ りえる', color: '#70a1ff', catchphrase: '「特定アーティスト（μ\'s、BUMP等）の縛り歌枠。」', tags: ['#VSinger', '#歌枠'] },
        { id: 'etra', name: 'エトラ', kana: 'えとら', color: '#a4b0be', catchphrase: '「見た目は清楚、中身は…」', tags: ['#多声類', '#ヤンデレ'] },
        { id: 'urame', name: '春雨 麗女', kana: 'はるさめ うらめ', color: '#ff4757', catchphrase: '「あおぎり高校のフレディ・マーキュリー。」', tags: ['#酒', '#歌'] },
        { id: 'popura', name: 'ぷわぷわ ぽぷら', kana: 'ぷわぷわ ぽぷら', color: '#ffa502', catchphrase: '「モーションアクターを使わず自ら動くこだわり。」', tags: ['#クリエイティブ', '#3D'] },
        { id: 'moemi', name: '萌実', kana: 'もえみ', color: '#e84393', catchphrase: '「『Moemi\'s Bar』を主宰する酒豪。」', tags: ['#8年以上のベテラン', '#晩酌'] },
        { id: 'ibuki', name: '月赴 ゐぶき', kana: 'つきゆき いぶき', color: '#00d2d3', catchphrase: '「浜松から東京まで自転車出勤を敢行。」', tags: ['#院生', '#自転車', '#動画編集'] },
        { id: 'garu', name: 'うる虎 がーる', kana: 'うるとら がーる', color: '#feca57', catchphrase: '「UE5やRPGツクールでの自作ゲーム製作。」', tags: ['#ゲーム開発', '#格闘ゲーム'] },
        { id: 'mujina', name: '八十科 むじな', kana: 'やそしな むじな', color: '#1dd1a1', catchphrase: '「『やそしなクリニック』の主催。性別不詳。」', tags: ['#美大出身', '#お悩み相談'] }
    ];

    const graduatedMembers = [
        { id: 'mashiro', name: '大代 真白', kana: 'おおしろ ましろ', color: '#a4b0be', catchphrase: '「おむつ、失禁体験などの過激な企画で知られる。」', tags: ['#2025年2月10日卒業'] },
        { id: 'natsuki', name: '水菜月 夏希', kana: 'みなづき なつき', color: '#5352ed', catchphrase: '「歌枠やMAD動画で活躍。」', tags: ['#初期メンバー'] }
    ];

    const createMemberCard = (member, isGraduate = false) => {
        const wrapper = document.createElement('div');
        wrapper.className = `card-wrapper reveal-up ${isGraduate ? 'graduate-card' : ''}`;

        const isRoot = window.location.pathname.endsWith('aogiri_index.html') || window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        const basePath = isRoot ? 'characters/' : '';

        wrapper.onclick = () => { window.location.href = `${basePath}${member.id}.html` };
        wrapper.style.setProperty('--card-color', member.color);

        const tagsHtml = member.tags.map(tag => `<span class="c-tag">${tag}</span>`).join('');

        wrapper.innerHTML = `
            <div class="member-card-3d">
                <div class="card-glare"></div>
                
                <div class="bg-initial" style="color: ${member.color}22">${member.name.charAt(0)}</div>
                
                <div class="card-content-layer">
                    <div class="c-header">
                        <div class="c-initial-small" style="color: ${member.color}; border-color: ${member.color}">
                            ${member.name.charAt(0)}
                        </div>
                        <div class="c-name-group">
                            <div class="c-name">${member.name}</div>
                            <div class="c-kana">${member.kana}</div>
                        </div>
                    </div>
                    
                    <div class="c-body">
                        <div class="c-catchphrase">${member.catchphrase}</div>
                        <div class="c-tags">
                            ${tagsHtml}
                        </div>
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

            const tiltX = y * -15;
            const tiltY = x * 15;

            card3D.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
            contentLayer.style.transform = `translateZ(40px)`;

            const glareX = (e.clientX - rect.left) / rect.width * 100;
            const glareY = (e.clientY - rect.top) / rect.height * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`;
            glare.style.opacity = '1';
        });

        wrapper.addEventListener('mouseleave', () => {
            card3D.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            contentLayer.style.transform = `translateZ(0)`;
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

    const activeGrid = document.getElementById('active-members-grid');
    if (activeGrid) {
        activeMembers.forEach((member, index) => {
            const card = createMemberCard(member);
            card.style.transitionDelay = `${(index % 4) * 0.15}s`;
            activeGrid.appendChild(card);
            revealObserver.observe(card);
        });
    }

    const graduatesGrid = document.getElementById('graduates-grid');
    if (graduatesGrid) {
        graduatedMembers.forEach((member, index) => {
            const card = createMemberCard(member, true);
            card.style.transitionDelay = `${(index % 4) * 0.15}s`;
            graduatesGrid.appendChild(card);
            revealObserver.observe(card);
        });
    }
});


const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

const app = createApp({
    setup() {
        const windowWidth = ref(window.innerWidth);
        const isMobile = computed(() => windowWidth.value <= 768);

        const handleResize = () => {
            windowWidth.value = window.innerWidth;
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        return {
            isMobile
        }
    }
});

app.mount('#app');
