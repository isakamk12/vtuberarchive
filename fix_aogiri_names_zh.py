import json
import re
from pathlib import Path

JS_PATH = Path("c:/Users/rpgmi/Documents/GitHub/vtuberarchive/i18n_indie.js")
content = JS_PATH.read_text(encoding='utf-8')

# Fix Chinese names for Tamako
content = content.replace("灵魂✨💕🎵音玉玉子", "音灵魂子 ✨ 💕 🎵 音灵魂子")
content = content.replace("靈魂✨💕🎵音玉玉子", "音靈魂子 ✨ 💕 🎵 音靈魂子")
content = content.replace("音玉玉子", "音灵魂子")

JS_PATH.write_text(content, encoding='utf-8')
print("Fixed Chinese names in i18n_indie.js")
