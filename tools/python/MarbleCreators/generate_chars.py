import json
import os

base_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive\MarbleCreators"
talents_file = os.path.join(base_dir, "talents.json")
output_dir = os.path.join(base_dir, "characters")

template = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} | Marble Creators Archive</title>
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
    <div class="char-bg">
        <div class="char-color-blob"></div>
        <div class="char-bg-glass"></div>
    </div>

    <nav>
        <a href="../marblecreators_index.html" class="char-back">
            <i class="fa-solid fa-arrow-left"></i> BACK TO HUB
        </a>
    </nav>

    <header class="char-hero">
        <div class="char-read">{reading}</div>
        <h1 class="char-name">{name}</h1>
        <div class="char-tags">
            {tags}
        </div>
    </header>

    <main class="char-container">
        <section class="char-section">
            <h2><i class="{icon}"></i> PROFILE</h2>
            <div class="char-profile">
                {profile_items}
            </div>
            <div class="char-bio">
                <p>{bio}</p>
            </div>
        </section>

        <section class="char-section">
            <h2><i class="fa-solid fa-star"></i> EPISODES</h2>
            <div class="char-episodes">
                {episodes}
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
        document.querySelectorAll('.char-section').forEach(el => observer.observe(el));
    </script>
</body>
</html>
"""

def generate():
    with open(talents_file, 'r', encoding='utf-8') as f:
        talents = json.load(f)
    
    for t in talents:
        tags_html = "\n".join([f'<span class="char-tag">{tag}</span>' for tag in t.get('tags', [])])
        
        profile = t.get('profile', {})
        profile_items = ""
        for key, val in profile.items():
            if val:
                profile_items += f'<p><strong>{key.upper()}:</strong> {val}</p>\n'
        
        episodes_html = ""
        for ep in t.get('episodes', []):
            episodes_html += f'''
                <div class="char-episode">
                    <h3>{ep['title']}</h3>
                    <p>{ep['desc']}</p>
                </div>'''
        
        html = template.format(
            name=t['name'],
            reading=t['reading'],
            color=t['color'],
            rgbColor=t['rgbColor'],
            tags=tags_html,
            icon=t['icon'],
            profile_items=profile_items,
            bio=t['bio'],
            episodes=episodes_html
        )
        
        filename = f"{t['id']}.html"
        with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Generated {filename}")

if __name__ == "__main__":
    generate()
