import json
import os

def generate_pages():
    with open('talents.json', 'r', encoding='utf-8') as f:
        talents = json.load(f)

    with open('../mobile_optimize.js', 'r', encoding='utf-8') as f:
        mobile_script = f.read()

    template = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} | Astraline Archive</title>
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
        <a href="../astraline_index.html" class="char-back">
            <i class="fa-solid fa-feather-pointed"></i> RETURN TO LIBRARY
        </a>
    </nav>

    <header class="char-hero">
        <div class="char-read">{reading}</div>
        <h1 class="char-name">{name}</h1>
        <div class="char-tags">
            <span class="char-tag">{generation}</span>
            {mark_tag}
        </div>
        <p class="char-catchphrase">{catchphrase}</p>
    </header>

    <main class="char-container">
        <section class="char-section">
            <h2>CHARACTER PROFILE</h2>
            <div class="char-profile">
                {profile_fields}
            </div>
            <div class="char-bio" style="margin-top: 3rem; border-top: 1px solid rgba(var(--char-rgb), 0.1); padding-top: 2rem;">
                <p>{description}</p>
            </div>
        </section>

        {episodes_section}
    </main>

    <footer class="char-footer">
        <p>© 2026 VTuber Archive Project. Unofficial Fan Page. Not affiliated with Astraline / Merryweather Media.</p>
    </footer>

    <script src="../../mobile_optimize.js"></script>
    <script>
        // Reveal animation for sections
        const observer = new IntersectionObserver((entries) => {{
            entries.forEach(entry => {{
                if (entry.isIntersecting) {{
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }}
            }});
        }}, {{ threshold: 0.1 }});

        document.querySelectorAll('.char-section').forEach(el => {{
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
            observer.observe(el);
        }});
    </script>
</body>
</html>"""

    if not os.path.exists('characters'):
        os.makedirs('characters')

    for t in talents:
        # Convert hex color to RGB
        hex_color = t['color'].lstrip('#')
        rgb = f"{int(hex_color[0:2], 16)}, {int(hex_color[2:4], 16)}, {int(hex_color[4:6], 16)}"

        mark_tag = ""
        if 'mark' in t['profile']:
            mark_tag = f'<span class="char-tag">{t["profile"]["mark"]}</span>'
        
        profile_fields = ""
        for key, value in t['profile'].items():
            if key == 'mark': continue
            display_key = key.replace('_', ' ').upper()
            profile_fields += f"""<div class="char-field">
                <span class="char-label">{display_key}</span>
                <span class="char-value">{value}</span>
            </div>\n"""

        episodes_section = ""
        if t['episodes']:
            episodes_section = '<section class="char-section">\n<h2>STORY CHAPTERS</h2>\n<div class="char-episodes">\n'
            for ep in t['episodes']:
                episodes_section += f"""<div class="char-episode">
                    <h3>{ep["title"]}</h3>
                    <p>{ep["content"]}</p>
                </div>\n"""
            episodes_section += '</div>\n</section>'

        html_content = template.format(
            name=t['name'],
            reading=t['reading'],
            color=t['color'],
            rgb=rgb,
            generation=t['generation'],
            mark_tag=mark_tag,
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
