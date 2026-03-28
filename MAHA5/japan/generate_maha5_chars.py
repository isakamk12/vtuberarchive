import json
import os

def generate_char_pages():
    with open('talents.json', 'r', encoding='utf-8') as f:
        talents = json.load(f)

    template = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} - MAHA5JAPAN Archive</title>
    <link rel="stylesheet" href="../../maha5.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet">
</head>
<body class="theme-{theme}">
    <div class="container text-center">
        <header>
            <p>MAHA5JAPAN ARCHIVE</p>
            <h1>{name}</h1>
            <p class="english-name">{englishName}</p>
        </header>

        <div class="char-info-grid">
            <aside class="profile-card">
                <h2>PROFILE</h2>
                <div class="profile-details">
                    <p><strong>所属:</strong> {agency}</p>
                    {gen_html}
                    {debut_html}
                    {birthday_html}
                    {age_html}
                    {height_html}
                    {fanmark_html}
                    {fanname_html}
                </div>
                <a href="../../maha5_index.html" class="back-link">← BACK TO INDEX</a>
            </aside>

            <main class="content-area">
                <section class="description-box">
                    <h3>CHARACTER</h3>
                    <p>{description}</p>
                </section>

                <section class="episodes-container">
                    <h3>EPISODES</h3>
                    {episodes_html}
                </section>
            </main>
        </div>
    </div>
</body>
</html>"""

    for t in talents:
        # Save directly in 'characters' as ID.html
        os.makedirs('characters', exist_ok=True)
        file_name = f"{t['id']}.html"
        file_path = os.path.join('characters', file_name)

        gen_html = f"<p><strong>世代:</strong> {t.get('generation')}</p>" if t.get('generation') else ""
        debut_html = f"<p><strong>デビュー:</strong> {t.get('debut')}</p>" if t.get('debut') else ""
        birthday_html = f"<p><strong>誕生日:</strong> {t.get('birthday')}</p>" if t.get('birthday') else ""
        age_html = f"<p><strong>年齢:</strong> {t.get('age')}</p>" if t.get('age') else ""
        height_html = f"<p><strong>身長:</strong> {t.get('height')}</p>" if t.get('height') else ""
        fanmark_html = f"<p><strong>ファンマーク:</strong> {t.get('fanMark')}</p>" if t.get('fanMark') else ""
        fanname_html = f"<p><strong>ファンネーム:</strong> {t.get('fanName')}</p>" if t.get('fanName') else ""

        episodes_html = ""
        for ep in t.get('episodes', []):
            episodes_html += f"""
            <div class="episode-item">
                <div class="episode-title">{ep['title']}</div>
                <div class="episode-content">{ep['content']}</div>
            </div>"""

        html_content = template.format(
            name=t['name'],
            englishName=t['englishName'],
            agency=t['agency'],
            gen_html=gen_html,
            debut_html=debut_html,
            birthday_html=birthday_html,
            age_html=age_html,
            height_html=height_html,
            fanmark_html=fanmark_html,
            fanname_html=fanname_html,
            description=t['description'].replace('\n', '<br>'),
            episodes_html=episodes_html,
            theme=t.get('theme', 'default')
        ).replace('../../maha5.css', '../maha5.css').replace('../../maha5_index.html', '../maha5_index.html')

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Generated: {file_path}")

if __name__ == "__main__":
    generate_char_pages()
