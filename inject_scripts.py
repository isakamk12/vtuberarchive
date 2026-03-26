import os

target_files = [
    r'IndieVtubers\characters\Ironmouse\ironmouse.html',
    r'IndieVtubers\characters\KawasakiSui\kawasakisui.html',
    r'IndieVtubers\characters\Mikeneko\mikeneko.html',
    r'IndieVtubers\characters\NiitoWai\niitowai.html',
    r'IndieVtubers\characters\SamekoSaba\samekosaba.html',
    r'IndieVtubers\characters\ShigureUi\shigureui.html'
]

script_tags = """
  <!-- I18N Scripts -->
  <script src="../../../i18n_indie.js"></script>
  <script src="../../../setup_i18n.js"></script>
"""

for file_path in target_files:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
        
    if "setup_i18n.js" not in html:
        html = html.replace('</body>', f'{script_tags}\n</body>')
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
print("Scripts injected.")
