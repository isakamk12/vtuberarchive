import json
from deep_translator import GoogleTranslator

# Load the extracted Japanese strings
with open('extracted_ja.json', 'r', encoding='utf-8') as f:
    ja_data = json.load(f)

# Define target languages
targets = {
    'en': 'en',
    'es': 'es',
    'zh-Hans': 'zh-CN',
    'zh-Hant': 'zh-TW',
    'ko': 'ko',
    'de': 'de',
    'fr': 'fr',
    'id': 'id'
}

translations = {
    'ja': ja_data
}

print("Translating to en...")
translator = GoogleTranslator(source='ja', target='en')
en_dict = {}
for key, text in ja_data.items():
    if not text.strip():
        en_dict[key] = text
        continue
    try:
        en_dict[key] = translator.translate(text)
    except Exception as e:
        en_dict[key] = f"[en] {text}"
translations['en'] = en_dict

# Mock translations for other languages for faster experiment
for lang_key in ['es', 'zh-Hans', 'zh-Hant', 'ko', 'de', 'fr', 'id']:
    print(f"Mocking {lang_key}...")
    lang_dict = {}
    for key, text in ja_data.items():
        if not text.strip():
            lang_dict[key] = text
            continue
        lang_dict[key] = f"[{lang_key}] {text}"
    translations[lang_key] = lang_dict

# Output to JS format
js_content = "const indie_translations = " + json.dumps(translations, ensure_ascii=False, indent=2) + ";\n"
js_content += "if (typeof module !== 'undefined' && module.exports) { module.exports = indie_translations; }\n"
js_content += "if (typeof window !== 'undefined') { window.indie_translations = indie_translations; }\n"

with open('i18n_indie.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Translation complete. Saved to i18n_indie.js")
