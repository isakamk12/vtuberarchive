# ============================================================
#  VTuber Archive - Agency Folder Batch Creator
#  Creates: {Folder}/{id}_index.html, {id}.css, {id}_script.js, characters/
# ============================================================

$base = "C:\Users\rpgmi\Documents\GitHub\vtuberarchive"

function Make-Agency {
    param(
        [string]$folder,   # フォルダ名 (例: Noripro)
        [string]$id,       # ファイルIDプレフィックス (例: noripro)
        [string]$name,     # 表示名 (例: のりプロ)
        [string]$nameEn,   # 英語名 (例: Noripro)
        [string]$color,    # ブランドカラー RGB (例: 248, 87, 166)
        [bool]$isChosa = $false   # 調査中フラグ
    )

    $dir = Join-Path $base $folder
    $charDir = Join-Path $dir "characters"

    # ── フォルダ作成 ──
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
    if (-not (Test-Path $charDir)) { New-Item -ItemType Directory -Path $charDir | Out-Null }

    $indexPath = Join-Path $dir "${id}_index.html"
    $cssPath = Join-Path $dir "${id}.css"
    $jsPath = Join-Path $dir "${id}_script.js"
    $charCssPath = Join-Path $charDir "char-base.css"

    # ── 調査中ページ ──
    if ($isChosa) {
        $html = @"
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$name | VTuber Archive</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { min-height: 100vh; background: #050510; color: #fff; font-family: 'Noto Sans JP', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .back { position: fixed; top: 24px; left: 24px; display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.4); text-decoration: none; font-family: 'Orbitron', sans-serif; font-size: 0.7rem; letter-spacing: 0.12em; transition: color 0.2s; }
        .back:hover { color: rgba(255,255,255,0.9); }
        .hero { text-align: center; padding: 60px 20px; }
        h1 { font-family: 'Orbitron', sans-serif; font-size: clamp(1.2rem, 5vw, 2.2rem); color: rgb($color); text-shadow: 0 0 30px rgba($color, 0.4); margin-bottom: 8px; }
        .sub { color: rgba(255,255,255,0.35); font-size: 0.85rem; letter-spacing: 0.2em; margin-bottom: 40px; }
        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border: 1px solid rgba(255,200,60,0.3); border-radius: 8px; background: rgba(255,200,60,0.05); color: #ffc83d; font-family: 'Orbitron', sans-serif; font-size: 0.65rem; letter-spacing: 0.15em; }
        .notice { margin-top: 24px; font-size: 0.75rem; color: rgba(255,255,255,0.3); line-height: 1.8; max-width: 420px; }
    </style>
</head>
<body>
    <a href="../index.html" class="back"><i class="fa-solid fa-chevron-left"></i> BACK TO INDEX</a>
    <div class="hero">
        <h1>$name</h1>
        <p class="sub">$nameEn</p>
        <div class="badge"><i class="fa-solid fa-magnifying-glass"></i> 調査中 — UNDER INVESTIGATION</div>
        <p class="notice">現在の運営状況を調査中のため、このセクターの詳細情報は一時的に非公開としています。<br>情報の確認が取れ次第、順次公開予定です。</p>
    </div>
</body>
</html>
"@
        [System.IO.File]::WriteAllText($indexPath, $html, [System.Text.Encoding]::UTF8)
        Write-Host "[CHOSA] $folder"
        return
    }

    # ── 通常の index.html ──
    $html = @"
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$name | VTuber Archive</title>
    <meta name="description" content="${name}（${nameEn}）の非公式ファンアーカイブ。所属タレントや事務所概要をまとめています。">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;600&family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="${id}.css">
</head>
<body>

    <div class="ag-bg"></div>

    <nav class="ag-nav">
        <a href="../index.html" class="ag-nav-back">
            <i class="fa-solid fa-chevron-left"></i> BACK TO HUB
        </a>
        <div class="ag-nav-logo">$name</div>
        <div class="ag-nav-tag">$nameEn</div>
    </nav>

    <!-- HERO -->
    <section class="ag-hero">
        <div class="ag-hero-bg-text">$nameEn</div>
        <div class="ag-hero-content">
            <div class="ag-eyebrow">VTuber Agency / Production</div>
            <h1 class="ag-hero-name">$name</h1>
            <p class="ag-hero-tagline">$nameEn</p>
            <div class="ag-hero-concept">
                <!-- TODO: 事務所の概要テキストをここに記入 -->
                情報を準備中です。
            </div>
            <div class="ag-hero-stats">
                <div class="ag-stat">
                    <div class="ag-stat-value">—</div>
                    <div class="ag-stat-label">MEMBERS</div>
                </div>
                <div class="ag-stat">
                    <div class="ag-stat-value">—</div>
                    <div class="ag-stat-label">FOUNDED</div>
                </div>
            </div>
        </div>
    </section>

    <div class="ag-container">
        <!-- ABOUT -->
        <section class="ag-section ag-reveal">
            <div class="ag-section-header">
                <span class="ag-section-num">01</span>
                <div>
                    <h2 class="ag-section-title">事務所概要</h2>
                    <span class="ag-section-title-sub">ABOUT</span>
                </div>
                <div class="ag-divider"></div>
            </div>
            <div class="ag-info-grid">
                <div class="ag-info-card">
                    <h3>📋 概要</h3>
                    <p><!-- TODO --></p>
                </div>
                <div class="ag-info-card">
                    <h3>🎯 特徴</h3>
                    <p><!-- TODO --></p>
                </div>
                <div class="ag-info-card">
                    <h3>🔗 リンク</h3>
                    <p><!-- TODO: 公式サイト・SNSへのリンク --></p>
                </div>
            </div>
        </section>

        <!-- ROSTER -->
        <section class="ag-section ag-reveal">
            <div class="ag-section-header">
                <span class="ag-section-num">02</span>
                <div>
                    <h2 class="ag-section-title">所属タレント</h2>
                    <span class="ag-section-title-sub">TALENT ROSTER</span>
                </div>
                <div class="ag-divider"></div>
            </div>

            <div class="ag-member-grid">
                <!-- TODO: メンバーカードをここに追加 -->
                <!-- 例:
                <div class="ag-member-card">
                    <a href="characters/member.html" class="ag-member-name">タレント名</a>
                    <div class="ag-member-read">Romaji Name</div>
                    <p class="ag-member-ep">説明文</p>
                </div>
                -->
                <div class="ag-member-card ag-placeholder">
                    <span class="ag-member-name">— 準備中 —</span>
                    <p class="ag-member-ep">タレント情報を整理中です。</p>
                </div>
            </div>
        </section>
    </div>

    <footer class="ag-footer">
        <div class="ag-footer-logo">$name</div>
        <p>© 2026 VTuber Archive Project. Unofficial fan archive. Not affiliated with $name.</p>
    </footer>

    <script src="${id}_script.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const reveals = document.querySelectorAll('.ag-reveal');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add('active'), i * 100);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
            reveals.forEach(el => observer.observe(el));
        });
    </script>

</body>
</html>
"@
    [System.IO.File]::WriteAllText($indexPath, $html, [System.Text.Encoding]::UTF8)

    # ── CSS ──
    $css = @"
/* =====================================================
   $name — Agency Archive CSS
   Brand color: rgb($color)
===================================================== */

@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;600&family=Noto+Sans+JP:wght@400;700;900&display=swap');

:root {
    --brand: rgb($color);
    --brand-rgb: $color;
    --bg: #060608;
    --text: #f0f0f5;
    --text-dim: #8090aa;
    --glass: rgba(20, 20, 30, 0.4);
    --border: rgba(255, 255, 255, 0.08);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--text); font-family: 'Inter', 'Noto Sans JP', sans-serif; overflow-x: hidden; line-height: 1.7; }

/* BG */
.ag-bg { position: fixed; inset: 0; z-index: -1; background: radial-gradient(ellipse at 20% 20%, rgba($color, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba($color, 0.05) 0%, transparent 50%); }

/* NAV */
.ag-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; gap: 1.5rem; padding: 1rem 2rem; background: rgba(6, 6, 8, 0.8); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
.ag-nav-back { display: flex; align-items: center; gap: 6px; color: var(--text-dim); text-decoration: none; font-family: 'Orbitron', sans-serif; font-size: 0.7rem; letter-spacing: 0.12em; transition: color 0.2s; }
.ag-nav-back:hover { color: var(--brand); }
.ag-nav-logo { font-family: 'Orbitron', sans-serif; font-weight: 700; color: var(--brand); font-size: 1.1rem; margin-left: auto; }
.ag-nav-tag { font-size: 0.72rem; color: var(--text-dim); letter-spacing: 0.1em; }

/* HERO */
.ag-hero { min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 120px 2rem 4rem; position: relative; overflow: hidden; }
.ag-hero-bg-text { position: absolute; font-family: 'Orbitron', sans-serif; font-size: clamp(6rem, 20vw, 16rem); font-weight: 900; color: transparent; -webkit-text-stroke: 1px rgba($color, 0.06); pointer-events: none; user-select: none; white-space: nowrap; }
.ag-hero-content { position: relative; z-index: 2; max-width: 800px; }
.ag-eyebrow { font-family: 'Orbitron', sans-serif; font-size: 0.72rem; letter-spacing: 0.2em; color: var(--brand); margin-bottom: 1rem; }
.ag-hero-name { font-family: 'Orbitron', sans-serif; font-size: clamp(2.5rem, 7vw, 5rem); font-weight: 900; color: var(--text); line-height: 1.1; margin-bottom: 0.5rem; text-shadow: 0 0 40px rgba($color, 0.3); }
.ag-hero-tagline { font-size: 1rem; color: var(--brand); letter-spacing: 0.15em; margin-bottom: 1.5rem; }
.ag-hero-concept { font-size: 0.95rem; color: var(--text-dim); line-height: 1.9; max-width: 620px; margin-bottom: 2rem; }
.ag-hero-stats { display: flex; gap: 2.5rem; flex-wrap: wrap; }
.ag-stat { display: flex; flex-direction: column; align-items: flex-start; }
.ag-stat-value { font-family: 'Orbitron', sans-serif; font-size: 2rem; font-weight: 700; color: var(--brand); line-height: 1; }
.ag-stat-label { font-size: 0.65rem; color: var(--text-dim); letter-spacing: 0.15em; margin-top: 4px; }

/* CONTAINER */
.ag-container { max-width: 1100px; margin: 0 auto; padding: 2rem 2rem 120px; }

/* SECTION */
.ag-section { margin-bottom: 5rem; opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
.ag-section.active { opacity: 1; transform: none; }
.ag-section-header { display: flex; align-items: center; gap: 1.2rem; margin-bottom: 2.5rem; }
.ag-section-num { font-family: 'Orbitron', sans-serif; font-size: 1rem; color: rgba($color, 0.5); font-weight: 700; }
.ag-section-title { font-family: 'Orbitron', sans-serif; font-size: 1.2rem; font-weight: 700; color: var(--text); }
.ag-section-title-sub { display: block; font-size: 0.65rem; color: var(--text-dim); letter-spacing: 0.2em; margin-top: 2px; }
.ag-divider { flex: 1; height: 1px; background: linear-gradient(to right, rgba($color, 0.3), transparent); }

/* INFO GRID */
.ag-info-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
.ag-info-card { background: var(--glass); border: 1px solid var(--border); border-radius: 12px; padding: 1.8rem; backdrop-filter: blur(10px); transition: border-color 0.3s; }
.ag-info-card:hover { border-color: rgba($color, 0.3); }
.ag-info-card h3 { font-size: 0.95rem; color: var(--brand); margin-bottom: 0.8rem; }
.ag-info-card p { font-size: 0.88rem; color: var(--text-dim); line-height: 1.8; }

/* MEMBER GRID */
.ag-member-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.2rem; }
.ag-member-card { background: var(--glass); border: 1px solid var(--border); border-radius: 10px; padding: 1.5rem; transition: border-color 0.3s, transform 0.3s; cursor: pointer; }
.ag-member-card:hover { border-color: rgba($color, 0.4); transform: translateY(-3px); }
.ag-member-card.ag-placeholder { opacity: 0.4; cursor: default; }
.ag-member-card.ag-placeholder:hover { transform: none; }
.ag-member-name { font-size: 1rem; font-weight: 700; color: var(--brand); text-decoration: none; display: block; margin-bottom: 0.3rem; }
.ag-member-name:hover { text-decoration: underline; }
.ag-member-read { font-size: 0.75rem; color: var(--text-dim); letter-spacing: 0.05em; margin-bottom: 0.6rem; }
.ag-member-ep { font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.7; }

/* FOOTER */
.ag-footer { border-top: 1px solid var(--border); padding: 2.5rem 2rem; text-align: center; }
.ag-footer-logo { font-family: 'Orbitron', sans-serif; font-size: 1.2rem; color: var(--brand); margin-bottom: 0.5rem; }
.ag-footer p { font-size: 0.75rem; color: var(--text-dim); }

@media (max-width: 700px) {
    .ag-hero { padding: 100px 1.2rem 2rem; }
    .ag-container { padding: 1rem 1.2rem 80px; }
    .ag-nav-tag { display: none; }
}
"@
    [System.IO.File]::WriteAllText($cssPath, $css, [System.Text.Encoding]::UTF8)

    # ── JS (reveal + member card click) ──
    $js = @"
// $name — Agency Script
document.addEventListener('DOMContentLoaded', () => {
    // Member card click -> character page
    document.querySelectorAll('.ag-member-card:not(.ag-placeholder)').forEach(card => {
        const link = card.querySelector('a.ag-member-name');
        if (link) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) window.location.href = link.href;
            });
        }
    });
});
"@
    [System.IO.File]::WriteAllText($jsPath, $js, [System.Text.Encoding]::UTF8)

    # ── characters/char-base.css ──
    $charCss = @"
/* =====================================================
   $name — Character Page Base CSS
   Brand color: rgb($color)
===================================================== */

:root {
    --c-main: rgb($color);
    --c-main-rgb: $color;
    --c-bg: #060608;
    --c-text: #f0f0f5;
    --c-dim: #8090aa;
    --c-glass: rgba(20, 20, 30, 0.5);
    --c-border: rgba(255, 255, 255, 0.08);
    /* Override per character: */
    --char-color: rgb($color);
    --char-rgb: $color;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { min-height: 100vh; background: var(--c-bg); color: var(--c-text); font-family: 'Inter', 'Noto Sans JP', sans-serif; line-height: 1.7; }
.char-bg { position: fixed; inset: 0; z-index: -1; background: radial-gradient(ellipse at 30% 30%, rgba(var(--char-rgb), 0.1) 0%, transparent 60%); }

.char-back { position: fixed; top: 20px; left: 20px; display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.4); text-decoration: none; font-family: 'Orbitron', sans-serif; font-size: 0.68rem; letter-spacing: 0.1em; transition: color 0.2s; z-index: 100; }
.char-back:hover { color: var(--char-color); }

.char-hero { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; padding: 100px 2rem 3rem; text-align: center; }
.char-name { font-family: 'Orbitron', sans-serif; font-size: clamp(1.8rem, 6vw, 3.5rem); font-weight: 900; color: var(--char-color); text-shadow: 0 0 40px rgba(var(--char-rgb), 0.4); margin-bottom: 0.3rem; }
.char-read { font-size: 0.9rem; color: var(--c-dim); letter-spacing: 0.15em; margin-bottom: 1.5rem; }
.char-tag { display: inline-block; padding: 4px 12px; border: 1px solid rgba(var(--char-rgb), 0.4); border-radius: 20px; font-size: 0.72rem; color: var(--char-color); letter-spacing: 0.1em; margin: 3px; }

.char-container { max-width: 800px; margin: 0 auto; padding: 1rem 2rem 80px; }
.char-section { margin-bottom: 3rem; background: var(--c-glass); border: 1px solid var(--c-border); border-radius: 14px; padding: 2rem; backdrop-filter: blur(10px); }
.char-section h2 { font-family: 'Orbitron', sans-serif; font-size: 0.85rem; color: var(--char-color); letter-spacing: 0.15em; margin-bottom: 1.2rem; }
.char-section p, .char-section li { font-size: 0.9rem; color: rgba(255,255,255,0.65); line-height: 1.9; }
.char-section ul { padding-left: 1.2rem; }

.char-footer { border-top: 1px solid var(--c-border); padding: 2rem; text-align: center; font-size: 0.75rem; color: var(--c-dim); }
"@
    [System.IO.File]::WriteAllText($charCssPath, $charCss, [System.Text.Encoding]::UTF8)

    Write-Host "[OK]    $folder"
}

# ============================================================
#  事務所リスト  [フォルダ, ID, 表示名, 英語名, RGB色, 調査中]
# ============================================================
$agencies = @(
    # JP 稼働中
    @("Engg", "engg", "えのぐ", "enogu", "255, 180, 50", $false),
    @("KizunaAI", "kizunaai", "キズナアイ", "Kizuna AI", "255, 105, 180", $false),
    @("AppLand", "appland", "APP LAND", "appland", "80, 200, 120", $false),
    @("RKMusic", "rkmusic", "RK Music", "RK Music", "255, 80, 80", $false),
    @("ChoShibuya", "choshibuya", "超渋谷計画", "Cho Shibuya Keikaku", "160, 60, 255", $false),
    @("FirstStage", "firststage", "FIRST STAGE PRODUCTION", "First Stage Production", "255, 160, 20", $false),
    @("NexuStella", "nexustella", "NexuStella", "NexuStella", "100, 180, 255", $false),
    @("Milliproo", "millipro", "ミリプロ", "Million Production", "255, 215, 0", $false),
    @("StarFacet", "starfacet", "Star Facet Production", "Star Facet Production", "160, 230, 190", $false),
    @("TrillionStage", "trillionstage", "トリリオンステージ", "Trillion Stage", "255, 120, 60", $false),
    @("Uomusume", "uomusume", "うおむすめ", "Uomusume", "100, 200, 255", $false),
    @("Airy", "airy", "エアリープロダクション", "Airy Production", "135, 206, 235", $false),
    @("AKAVirtual", "akavirtual", "AKA Virtual", "AKA Virtual", "220, 20, 60", $false),
    @("Enilis", "enilis", "ENILIS VLiver", "ENILIS Project", "100, 255, 200", $false),
    @("KemonoFriendsV", "kemono", "けものフレンズV", "Kemono Friends V", "255, 180, 80", $false),
    @("Synthemaniacs", "synth", "シンセマニアクス", "Synthemaniacs", "50, 255, 200", $false),
    @("Specialite", "specialite", "すぺしゃりて", "Specialite", "255, 160, 200", $false),
    @("Nyantazia", "nyantazia", "にゃんたじあ！", "Nyantazia", "255, 150, 200", $false),
    @("HakoNect", "hakonect", "ハコネクト", "HakoNect", "80, 230, 180", $false),
    @("Balus", "balus", "Balus", "Balus", "255, 100, 140", $false),
    @("Valiv", "valiv", "vα-liv", "Va-liv", "180, 100, 255", $false),
    @("Buijidai", "buijidai", "ぶいじだい", "Buijidai", "255, 100, 80", $false),
    @("VBOX", "vbox", "VBOX", "VBOX", "60, 180, 255", $false),
    @("VRegion", "vregion", "VRegion", "VRegion", "100, 255, 160", $false),
    @("VOne", "vone", "ぶいわんプロダクション", "V-One Production", "255, 130, 50", $false),
    @("Marble", "marble", "Marble Creators", "Marble Creators", "200, 200, 255", $false),
    @("Mahoroba", "mahoroba", "まほろば", "Mahoroba", "220, 180, 255", $false),
    @("MiRise", "mirise", "Mi-RiSE", "Mi-RiSE", "100, 220, 255", $false),
    @("Mewlive", "mewlive", "MEWLIVE", "MEWLIVE", "255, 180, 200", $false),
    @("Universe", "universe", "ユニバースプロダクション", "Universe Production", "80, 100, 255", $false),
    @("Unireido", "unireido", "ゆにれいど！", "Unireido", "255, 200, 80", $false),
    @("LethalPlan", "lethalplan", "りーさるぷらん", "Lethal Plan", "80, 255, 150", $false),
    @("ProjectNebula", "nebula", "PROJECT NEBULA", "Project Nebula", "80, 60, 200", $false),
    @("ProForma", "proforma", "ProForma Production", "ProForma Production", "180, 180, 200", $false),
    @("VASE", "vase", "VASE", "VASE", "180, 255, 180", $false),
    @("VOMSProject", "voms", "VOMS project", "VOMS project", "100, 220, 140", $false),

    # GLOBAL 稼働中
    @("ThreeAM", "threeam", "3AM", "3AM", "80, 100, 200", $false),
    @("Astraline", "astraline", "Astraline", "Astraline", "100, 150, 255", $false),
    @("DensetsuEXE", "densetsu", "Densetsu.EXE", "Densetsu EXE", "50, 255, 100", $false),
    @("MAHA5", "maha5", "MAHA5", "MAHA5", "255, 60, 100", $false),
    @("MythicTalent", "mythic", "Mythic Talent", "Mythic Talent", "200, 100, 255", $false),
    @("MugenLive", "mugenlive", "Mugen Live", "Mugen Live", "60, 255, 220", $false),
    @("StellarVerse", "stellarverse", "Stellar Verse Productions", "Stellar Verse", "150, 200, 255", $false),
    @("VandU", "vandu", "V&U", "V and U", "255, 180, 80", $false),
    @("VOLs", "vols", "VOLs", "VOLs", "80, 200, 255", $false),

    # 調査中
    @("Utatane", "utatane", "うたたねプロダクション", "Utatane Production", "180, 140, 255", $true),
    @("NsArk", "nsark", "N'sARK", "NsARK", "70, 130, 200", $true),
    @("GuildCQ", "guildcq", "Guild CQ", "Guild CQ", "200, 160, 80", $true),
    @("NanaHapi", "nanahapi", "ななはぴ", "NanaHapi", "255, 200, 100", $true),
    @("Nextopia", "nextopia", "ねくすとぴあ", "Nextopia", "100, 160, 255", $true),
    @("Valtra", "valtra", "VALTRA", "VALTRA", "140, 80, 255", $true),
    @("Vebop", "vebop", "Vebop Project", "Vebop Project", "255, 200, 50", $true),
    @("Vlash", "vlash", "Vlash", "Vlash", "255, 80, 60", $true),
    @("Promisu", "promisu", "PROMISU", "PROMISU", "255, 140, 100", $true),
    @("VEXZ", "vexz", "VEXZ", "VEXZ", "255, 100, 200", $true),
    @("Bondlive", "bondlive", "bondlive", "Bondlive", "255, 220, 120", $true),
    @("MAHA5Japan", "maha5japan", "MAHA5JAPAN", "MAHA5 Japan", "255, 80, 120", $true),
    @("MeStage", "mestage", "MeSTAGE", "MeSTAGE", "255, 160, 220", $true),
    @("MicoLiz", "micoliz", "MicoLiz", "MicoLiz", "200, 100, 255", $true),
    @("Musubime", "musubime", "MUSUBIME", "MUSUBIME", "160, 255, 200", $true),
    @("UniVirtual", "univirtual", "UniVIRTUAL", "UniVIRTUAL", "150, 200, 255", $true),
    @("Lovebox", "lovebox", "ラブボックス", "LoveBox", "255, 100, 150", $true),
    @("Rebon", "rebon", "re;BON", "reBON", "255, 140, 180", $true),
    @("Luminaria", "luminaria", "Luminaria Production", "Luminaria Production", "200, 240, 255", $true),
    @("ArriVirtual", "arrivirtual", "Arri Virtual", "Arri Virtual", "180, 255, 200", $true),
    @("AStars", "astars", "AStars production", "AStars production", "255, 230, 80", $true)
)

$ok = 0
$skip = 0
foreach ($a in $agencies) {
    $indexCheck = Join-Path $base "$($a[0])\$($a[1])_index.html"
    if ((Test-Path $indexCheck) -and -not $true) {
        Write-Host "[SKIP]  $($a[0]) (already exists)"
        $skip++
    }
    else {
        Make-Agency -folder $a[0] -id $a[1] -name $a[2] -nameEn $a[3] -color $a[4] -isChosa $a[5]
        $ok++
    }
}

Write-Host ""
Write-Host "Done! Created: $ok  Skipped: $skip"
