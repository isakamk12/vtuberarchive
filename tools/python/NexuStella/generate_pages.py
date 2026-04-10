import os
import json

def generate_pages():
    # Load 100% Unique, High-Density Data from JSON
    talents_file = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive\NexuStella\talents.json"
    
    if not os.path.exists(talents_file):
        print(f"Error: {talents_file} not found.")
        return

    with open(talents_file, 'r', encoding='utf-8') as f:
        talents = json.load(f)

    output_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive\NexuStella\characters"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    template = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} — NexuStella</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;800&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="char-base.css">
    <style>
        :root {{
            --char-color: {color};
            --char-glow: {color}8c;
            --char-color-soft: {color}14;
            --char-border: {color}4d;
        }}
    </style>
</head>
<body>
    <div class="cp-bg">
        <div class="cp-bg-stars"></div>
        <div class="cp-bg-aurora"></div>
    </div>
    
    <nav class="cp-nav">
        <a href="../nexustella_index.html" class="cp-back"><i class="fa-solid fa-chevron-left"></i> BACK TO NEXUSTELLA</a>
        <span class="cp-nav-gen">{group}</span>
    </nav>

    <section class="cp-hero">
        <div class="cp-hero-motif"><i class="fa-solid {motif}"></i></div>
        <div class="cp-hero-content">
            <div class="cp-gen-label">
                <i class="fa-solid fa-star"></i> NEXUSTELLA // {group}
            </div>
            <h1 class="cp-hero-name">{name}</h1>
            <p class="cp-chara-desc">{desc}</p>
            <div class="cp-tags">
                {tags_html}
            </div>
        </div>
    </section>

    <div class="cp-section cp-reveal">
        <h2 class="cp-section-title">PROFILE</h2>
        <div class="cp-grid">
            <div class="cp-card">
                <h3><i class="fa-solid fa-address-card"></i> 基本情報</h3>
                <p><strong>誕生日:</strong> {birthday}</p>
                <p><strong>所属ユニット:</strong> {group}</p>
            </div>
            <div class="cp-card">
                <h3><i class="fa-solid fa-heart"></i> タレント紹介</h3>
                <p>{bio}</p>
            </div>
            <div class="cp-card">
                <h3><i class="fa-solid fa-users"></i> ファンデータ</h3>
                <p><strong>ファンマーク:</strong> {fan_mark}</p>
                <p><strong>ファンネーム:</strong> {fan_name}</p>
            </div>
        </div>
    </div>

    <div class="cp-section cp-reveal">
        <h2 class="cp-section-title">HISTORY & EPISODES</h2>
        <div class="cp-timeline">
            {episodes_html}
        </div>
    </div>

    <footer class="cp-footer">
        <p>© 2026 NexuStella Fan Archive — 非公式ファンサイト</p>
    </footer>
    <script>
        document.addEventListener('DOMContentLoaded', () => {{
            const reveals = document.querySelectorAll('.cp-reveal');
            const observer = new IntersectionObserver(entries => {{
                entries.forEach(entry => {{
                    if (entry.isIntersecting) entry.target.classList.add('active');
                }});
            }}, {{ threshold: 0.1 }});
            reveals.forEach(el => observer.observe(el));
        }});
    </script>
</body>
</html>"""

    for talent in talents:
        tags_html = "".join([f'<span class="cp-tag">{tag}</span>\n' for tag in talent['tags']])
        
        episodes_html = ""
        for ep in talent['episodes']:
            episodes_html += f'<div class="cp-episode"><div class="cp-episode-title">{ep["title"]}</div><p>{ep["text"]}</p></div>\n'
        
        fan_data = talent.get('fan_data', {"mark": "???", "name": "???"})

        html_content = template.format(
            name=talent['name'],
            group=talent['group'],
            motif=talent['motif'],
            color=talent['color'],
            birthday=talent['birthday'],
            desc=talent['desc'],
            bio=talent['bio'],
            tags_html=tags_html,
            episodes_html=episodes_html,
            fan_mark=fan_data['mark'],
            fan_name=fan_data['name']
        )
        
        filename = f"{talent['id']}.html"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Generated (Mega HIGH-DENSITY): {filename}")

if __name__ == "__main__":
    generate_pages()
