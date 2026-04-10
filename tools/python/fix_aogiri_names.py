import json
import re
from pathlib import Path

JS_PATH = Path("c:/Users/rpgmi/Documents/GitHub/vtuberarchive/i18n_indie.js")
content = JS_PATH.read_text(encoding='utf-8')

FIXES = [
    ("石駱", "石狩"),
    ("Rainha Harusame", "Urame Harusame"),
    ("Rainha Harusame-senpai", "Urame Harusame-senpai"),
    ("Rainha Harusame Senpai", "Urame Harusame Senpai"),
    ("Harusame Reina", "Urame Harusame"),
    ("Harusame Reijo", "Urame Harusame"),
    ("Harusame Rainha", "Urame Harusame"),
    ("Soul ✨ 💕 🎵 Otodama Tamako", "Otodama Tamako ✨ 💕 🎵 Otodama Tamako"),
    ("영혼 ✨ 💕 🎵 음영혼자 Otodama Tamako", "타마코 오토다마 ✨ 💕 🎵 오토다마 타마코"),
    ("Seele ✨ 💕 🎵 Otodama Tamako", "Otodama Tamako ✨ 💕 🎵 Otodama Tamako"),
    ("Soul ✨ 💕 🎵 Otodama Tamako", "Otodama Tamako ✨ 💕 🎵 Otodama Tamako"),
]

for old, new in FIXES:
    content = content.replace(old, new)

# Targeted regex for "Soul" followed by symbols and then Otodama
content = re.sub(r'Soul( [✨💕🎵 ]+)Otodama Tamako', r'Otodama Tamako\1Otodama Tamako', content)
content = re.sub(r'영혼( [✨💕🎵 ]+)음영혼자 Otodama Tamako', r'타마코 오토다마\1오토다마 타마코', content)
content = re.sub(r'Seele( [✨💕🎵 ]+)Otodama Tamako', r'Otodama Tamako\1Otodama Tamako', content)

JS_PATH.write_text(content, encoding='utf-8')
print("Fixed names in i18n_indie.js")
