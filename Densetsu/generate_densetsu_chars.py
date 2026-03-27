import json
import os

def generate_pages():
    # Load talents data
    talents_path = os.path.join(os.path.dirname(__file__), 'talents.json')
    with open(talents_path, 'r', encoding='utf-8') as f:
        talents = json.load(f)

    template = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} | Densetsu.EXE Archive</title>
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
        <a href="../densetsu_index.html" class="char-back">
            <i class="fa-solid fa-code-branch"></i> cd ..
        </a>
    </nav>

    <header class="char-hero">
        <div class="dx-terminal-header" style="max-width: 600px; margin: 0 auto 2rem; width: 100%;">
            <span class="dx-term-dot dx-dot-r"></span>
            <span class="dx-term-dot dx-dot-y"></span>
            <span class="dx-term-dot dx-dot-g"></span>
            <div class="dx-term-title" style="font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; color: #94A3B8; margin-left: 10px;">
                profile_viewer --target {id}.exe
            </div>
        </div>
        <div class="char-read">{reading}</div>
        <h1 class="char-name">{name}</h1>
        <div class="char-tags">
            <span class="char-tag">{generation}</span>
            {tags}
        </div>
        <p class="char-catchphrase" style="margin-top: 2rem; font-style: italic; color: var(--char-color); opacity: 0.9; font-family: 'Share Tech Mono', monospace;">
            > {catchphrase}
        </p>
    </header>

    <main class="char-container">
        <section class="char-section">
            <h2><i class="fa-solid fa-user-gear"></i> PROFILE_DATA</h2>
            <div class="char-profile">
                {profile_fields}
            </div>
            <div class="char-bio" style="margin-top: 1.5rem; border-top: 1px solid rgba(var(--char-rgb), 0.2); padding-top: 1.5rem;">
                <p style="color: #E2E8F0;">{description}</p>
            </div>
        </section>

        {episodes_section}
    </main>

    <footer class="char-footer">
        <div style="font-family: 'Orbitron', sans-serif; color: #fff; margin-bottom: 0.5rem; letter-spacing: 1px;">
            Densetsu<span style="color: #FF007F; font-family: 'Share Tech Mono';">.EXE</span>
        </div>
        <p>© 2026 VTuber Archive Project. Unofficial fan archive.</p>
    </footer>

    <script src="../../mobile_optimize.js"></script>
    <script>
        const observer = new IntersectionObserver((entries) => {{
            entries.forEach(entry => {{
                if (entry.isIntersecting) {{
                    entry.target.classList.add('active');
                }}
            }});
        }}, {{ threshold: 0.1 }});
        
        document.querySelectorAll('.char-section').forEach(el => {{
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "all 0.6s ease-out";
            observer.observe(el);
        }});

        // IntersectionObserver addition inside script
        const style = document.createElement('style');
        style.textContent = `
            .char-section.active {{
                opacity: 1 !important;
                transform: translateY(0) !important;
            }}
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>"""

    # Directory for character pages
    char_dir = os.path.join(os.path.dirname(__file__), 'characters')
    if not os.path.exists(char_dir):
        os.makedirs(char_dir)

    # Mapping for profile field keys to Japanese
    field_map = {
        'species': '種族 (SPECIES)',
        'fanName': 'ファンネーム (FAN_NAME)',
        'modeler': 'モデラー (MODELER)',
        'hobbies': '趣味 (HOBBIES)',
        'tags': 'タグ (TAGS)',
        'full_name': 'フルネーム (FULL_NAME)',
        'age': '年齢 (AGE)',
        'height': '身長 (HEIGHT)',
        'likes': '好きなもの (LIKES)',
        'title': '肩書き (TITLE)',
        'birthday': '誕生日 (BIRTHDAY)',
        'origin': '出身 (ORIGIN)',
        'mark': '推しマーク (MARK)',
        'status': 'ステータス (STATUS)',
        'design': 'デザイン (DESIGN)'
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
            episodes_section = '<section class="char-section">\n<h2><i class="fa-solid fa-database"></i> LOG_ENTRIES</h2>\n<div class="char-episodes">\n'
            for ep in t['episodes']:
                episodes_section += f'<div class="char-episode" style="margin-bottom: 2.5rem; border-left: 2px solid var(--char-color); padding-left: 1.5rem; position: relative;">\n'
                episodes_section += f'<h3 style="color: var(--char-color); margin-bottom: 0.8rem; font-family: \'Share Tech Mono\'; letter-spacing: 1px;">[ {ep["title"]} ]</h3>\n'
                episodes_section += f'<p style="color: #CBD5E1; font-size: 0.95rem;">{ep["content"]}</p>\n'
                episodes_section += f'</div>\n'
            episodes_section += '</div>\n</section>'

        html_content = template.format(
            id=t['id'],
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

        file_path = os.path.join(char_dir, f"{t['id']}.html")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Generated {file_path}")

if __name__ == "__main__":
    generate_pages()
