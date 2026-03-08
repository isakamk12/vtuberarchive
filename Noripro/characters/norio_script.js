const tamakiData = {
    name: "犬山たまき",
    sub: "1.0M_SUBS_CELEBRATION",
    desc: "「はーい、ご主人様！わんたま～！」<br>世界を股にかけ活躍する男の娘VTuber。1000回を超える伝説のコラボと、100万人を魅了するトーク力でVTuber界の頂点を目指す。",
    icon: "fa-solid fa-dog",
    episodes: [
        { tag: "UNICORN_PROF", title: "ユニコーン大学教授", text: "ガチ恋勢（ユニコーン）の生態を熟知し、彼らを解説・指導する独自の立ち位置を確立。" },
        { tag: "OFFICIAL_CLIP", title: "公認「見どころ！チャンネル」", text: "愛と職人技を持つ伝説の切り抜き師を公認化。2025年だけで8913万再生を記録する最強の協力体制。" }
    ],
    bio: "<strong>BIRTHDAY:</strong> 06.01 / <strong>AGE:</strong> 17歳（公称）<p style='margin-top: 20px;'>元々は佃煮のりおの看板キャラクターとして誕生。2018年にVTuberデビュー。頭の「制御装置君」によって中身を封印している。</p>"
};

const norioData = {
    name: "佃煮のりお",
    sub: "MANGA_CREATOR_&_CEO",
    desc: "「永遠の17歳、佃煮のりおです！」<br>のりプロ代表にして現役漫画家。高校生デビューからアニメ化、結婚、そして事務所設立まで、その行動力と手腕は業界屈指。",
    icon: "fa-solid fa-pen-nib",
    episodes: [
        { tag: "MARRIAGE_LEGEND", title: "トイレ結婚事件", text: "婚姻届提出の際、緊張のあまりトイレへ。戻った時には旦那様が手続きを済ませ、トイレの中で結婚が成立していた。" },
        { tag: "TAX_OFFICE", title: "税務署と300万円", text: "高校時代に貯めた300万の同人貯金。成人後に税務署から呼び出され、追徴課税を払った苦労話は語り草。" },
        { tag: "REVENGE", title: "メンシ1000人退会と3Dリベンジ", text: "結婚発表で1000人退会。しかし3Dライブで1200人の新規獲得し、実力でファンを呼び戻した伝説。" }
    ],
    bio: "<strong>BIRTHDAY:</strong> 04.16 / <strong>OCCUPATION:</strong> 社長/漫画家<p style='margin-top: 20px;'>漫画『ひめゴト』で商業デビュー。現在は『のりプロ』の司令塔として、所属タレントのプロデュースに全力を注いでいる。</p>"
};

function setMode(mode) {
    const data = mode === 'tamaki' ? tamakiData : norioData;
    const body = document.body;

    // Update Mode class
    body.classList.remove('mode-tamaki', 'mode-norio');
    body.classList.add(`mode-${mode}`);

    // Update Buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === mode);
    });

    // Update Content with Animation
    const hero = document.querySelector('.hero');
    const stats = document.querySelector('.stats-bar');
    const grid = document.querySelector('.main-grid');

    [hero, stats, grid].forEach(el => {
        if (el) {
            el.style.opacity = 0;
            el.style.transform = 'translateY(10px)';
            el.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        }
    });

    setTimeout(() => {
        document.getElementById('main-name').innerText = data.name;
        document.getElementById('sub-title').innerText = data.sub;
        document.getElementById('hero-desc').innerHTML = data.desc;
        document.getElementById('hero-icon').className = data.icon;
        document.getElementById('bio-content').innerHTML = data.bio;

        // Episodes
        const epContainer = document.getElementById('episode-content');
        epContainer.innerHTML = data.episodes.map((ep, i) => `
            <div class="episode-card cp-reveal active" style="transition-delay: ${i * 0.1}s">
                <span class="ep-tag">#${ep.tag}</span>
                <strong>${ep.title}</strong>
                <p>${ep.text}</p>
            </div>
        `).join('');

        // Back link color
        const color = mode === 'tamaki' ? 'var(--color-tamaki)' : 'var(--color-norio)';
        document.getElementById('back-link').style.color = color;

        [hero, stats, grid].forEach(el => {
            if (el) {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }
        });
    }, 300);
}

// Stats counter animation (simple)
document.addEventListener('DOMContentLoaded', () => {
    console.log("TAMAKI & NORIO DUAL ARCHIVE INITIALIZED.");

    // Initialize interaction observer for reveals
    const options = { threshold: 0.05, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, options);

    document.querySelectorAll('.cp-reveal, .cp-panel-reveal').forEach(el => observer.observe(el));
});
