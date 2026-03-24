import json
import os

# Base directory for VASE
BASE_DIR = r'c:\Users\rpgmi\Documents\GitHub\vtuberarchive\VASE'
CHARS_DIR = os.path.join(BASE_DIR, 'characters')
TALENTS_JSON = os.path.join(BASE_DIR, 'talents.json')

# Ensure characters directory exists
os.makedirs(CHARS_DIR, exist_ok=True)

# Load talent data
with open(TALENTS_JSON, 'r', encoding='utf-8') as f:
    talents = json.load(f)

# HTML Template
TEMPLATE = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} | VASE Archive</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="char-base.css">
    <style>
        :root {{
            --char-color: {color};
            --char-rgb: {rgbColor};
        }}
    </style>
</head>
<body>
    <div class="char-bg"></div>

    <nav>
        <a href="../vase_index.html" class="char-back">
            <i class="fa-solid fa-arrow-left"></i> BACK TO HUB
        </a>
    </nav>

    <header class="char-hero">
        <div class="char-read">{reading}</div>
        <h1 class="char-name">{name}</h1>
        <div class="char-tags">
            {tags_html}
        </div>
    </header>

    <main class="char-container">
        <section class="char-section reveal">
            <h2><i class="{icon}"></i> PROFILE</h2>
            <div class="char-profile">
                {profile_html}
            </div>
            <div class="char-bio">
                <p>{bio}</p>
            </div>
        </section>

        <section class="char-section reveal">
            <h2><i class="fa-solid fa-star"></i> EPISODES</h2>
            <div class="char-episodes">
                {episodes_html}
            </div>
        </section>
    </main>

    <footer class="char-footer">
        <p>© 2026 VTuber Archive Project. Unofficial Fan Page.</p>
    </footer>

    <script src="../../mobile_optimize.js"></script>
    <script>
        const observer = new IntersectionObserver((entries) => {{
            entries.forEach(entry => {{
                if (entry.isIntersecting) entry.target.classList.add('active');
            }});
        }}, {{ threshold: 0.1 }});
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
</body>
</html>
"""

for talent in talents:
    # Prepare tags
    tags_html = "\n            ".join([f'<span class="char-tag">{tag}</span>' for tag in talent['tags']])
    
    # Prepare profile
    profile_html = ""
    for key, value in talent['profile'].items():
        profile_html += f'<p><strong>{key.upper()}:</strong> {value}</p>\n                '
    
    # Prepare episodes
    episodes_html = ""
    for ep in talent['episodes']:
        episodes_html += f"""
                <div class="char-episode">
                    <h3>{ep['title']}</h3>
                    <p>{ep['desc']}</p>
                </div>"""

    # Generate full HTML
    html_content = TEMPLATE.format(
        name=talent['name'],
        reading=talent['reading'],
        color=talent['color'],
        rgbColor=talent['rgbColor'],
        tags_html=tags_html,
        icon=talent['icon'],
        profile_html=profile_html.strip(),
        bio=talent['bio'],
        episodes_html=episodes_html.strip()
    )

    # Save to file
    file_path = os.path.join(CHARS_DIR, f"{talent['id']}.html")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"Generated: {file_path}")

print("All character pages generated successfully.")
