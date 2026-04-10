import json
import os

def generate_pages():
    with open('talents.json', 'r', encoding='utf-8') as f:
        talents = json.load(f)

    template = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} | 3AMアーカイブ</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="char-base.css">
    <style>
        :root {{
            --char-color: {color};
            --char-rgb: {rgb};
        }}
    </style>
</head>
<body>
    <div class="char-bg"></div>

    <nav>
        <a href="../3am_index.html" class="char-back">
            <i class="fa-solid fa-skull"></i> 脱出する (ESCAPE)
        </a>
    </nav>

    <header class="char-hero">
        <div class="char-read">{reading}</div>
        <h1 class="char-name">{name}</h1>
        <div class="char-tags">
            <span class="char-tag">{generation}</span>
            {tags}
        </div>
        <p class="char-catchphrase" style="margin-top: 2rem; font-style: italic; color: var(--char-color); opacity: 0.8;">{catchphrase}</p>
    </header>

    <main class="char-container">
        <section class="char-section">
            <h2>プロフィール (PROFILE)</h2>
            <div class="char-profile">
                {profile_fields}
            </div>
            <div class="char-bio" style="margin-top: 1.5rem; border-top: 1px dashed #444; padding-top: 1.5rem;">
                <p>{description}</p>
            </div>
        </section>

        {episodes_section}
    </main>

    <footer class="char-footer">
        <p>© 2026 VTuber Archive Project. 非公式ファンページ。</p>
    </footer>

    <script src="../../mobile_optimize.js"></script>
    <script>
        const observer = new IntersectionObserver((entries) => {{
            entries.forEach(entry => {{
                if (entry.isIntersecting) entry.target.style.opacity = "1";
            }});
        }}, {{ threshold: 0.1 }});
        document.querySelectorAll('.char-section').forEach(el => {{
            el.style.opacity = "0";
            el.style.transition = "opacity 0.8s ease-out";
            observer.observe(el);
        }});
    </script>
</body>
</html>"""

    if not os.path.exists('characters'):
        os.makedirs('characters')

    # Mapping for profile field keys to Japanese
    field_map = {
        'species': '種族',
        'fanName': 'ファンネーム',
        'modeler': 'モデラー',
        'hobbies': '趣味',
        'tags': 'タグ',
        'full_name': 'フルネーム',
        'age': '年齢',
        'height': '身長',
        'likes': '好きなもの',
        'title': '肩書き',
        'birthday': '誕生日',
        'origin': '出身',
        'mark': '推しマーク',
        'status': 'ステータス',
        'design': 'デザイン'
    }

    for t in talents:
        # Convert hex color to RGB
        hex_color = t['color'].lstrip('#')
        rgb = f"{int(hex_color[0:2], 16)}, {int(hex_color[2:4], 16)}, {int(hex_color[4:6], 16)}"

        tags_html = ""
        if 'mark' in t['profile']:
            tags_html += f'<span class="char-tag">{t["profile"]["mark"]}</span>'
        
        profile_fields = ""
        for key, value in t['profile'].items():
            if key in ['mark']: continue
            display_key = field_map.get(key, key.replace('_', ' ').upper())
            profile_fields += f'<p><strong>{display_key}:</strong> {value}</p>\n'

        episodes_section = ""
        if t['episodes']:
            episodes_section = '<section class="char-section">\n<h2>エピソード (EPISODES)</h2>\n<div class="char-episodes">\n'
            for ep in t['episodes']:
                episodes_section += f'<div class="char-episode" style="margin-bottom: 2rem; border-left: 3px solid var(--char-color); padding-left: 1.5rem;">\n<h3 style="color: var(--char-color); margin-bottom: 0.5rem; font-family: \'Rubik Glitch\';">{ep["title"]}</h3>\n<p>{ep["content"]}</p>\n</div>\n'
            episodes_section += '</div>\n</section>'

        html_content = template.format(
            name=t['name'],
            reading=t['reading'],
            color=t['color'],
            rgb=rgb,
            generation=t['generation'],
            tags=tags_html,
            catchphrase=t['catchphrase'],
            profile_fields=profile_fields,
            description=t['description'],
            episodes_section=episodes_section
        )

        file_path = f"characters/{t['id']}.html"
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Generated {file_path}")

if __name__ == "__main__":
    generate_pages()
