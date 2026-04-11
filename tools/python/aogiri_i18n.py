"""
Aogiri High School Character Page i18n Script
==============================================
- Instruments all HTML files in aogiri_fansite/characters/ with data-i18n attributes
- Translates Japanese text to 8 languages (casual fan-site tone)
- Chain strategy:
    JA -> EN  (base)
    EN -> DE, FR, ES, PT  (similar language chains - OK)
    JA -> KO  (Japanese/Korean similarity)
    JA -> ZH-Hans, ZH-Hans -> ZH-Hant  (Chinese simplification)
    JA -> ID  (direct)
- Merges output into i18n_indie.js
"""

import json
import re
import time
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString
from deep_translator import GoogleTranslator

CHARS_DIR = Path("aogiri_fansite/characters")
OUTPUT_JS = Path("i18n_indie.js")

# Tags to skip (non-translatable)
SKIP_TAGS = {"script", "style", "meta", "link", "head", "title", "input",
             "button", "select", "option", "svg", "path", "br", "hr"}

# Characters and their file prefixes
CHARS = [
    ("akari",   "石狩あかり"),
    ("chiyomi", "千代浦蝶美"),
    ("etra",    "エトラ"),
    ("garu",    "うる虎がーる"),
    ("ibuki",   "月赴ゐぶき"),
    ("komaru",  "栗駒こまる"),
    ("mashiro", "大代真白"),
    ("moemi",   "萌実"),
    ("mujina",  "八十科むじな"),
    ("natsuki", "水菜月夏希"),
    ("nekuro",  "山黒音玄"),
    ("popura",  "ぷわわぽぷら"),
    ("tamako",  "音霊魂子"),
    ("urame",   "春雨麗女"),
]

# Regex to detect Japanese characters
JA_RE = re.compile(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF]')

# Proper Name Protection Map (Japanese -> Preferred Romaji/Form)
AOGIRI_NAME_MAP = {
    "石狩あかり": "Akari Ishikari",
    "千代浦蝶美": "Chomi Chiyoura",
    "エトラ": "Etra",
    "うる虎がーる": "Urutora Garu",
    "月赴ゐぶき": "Ibuki Tsukiyuki",
    "栗駒こまる": "Komaru Kurikoma",
    "大代真白": "Mashiro Oshiro",
    "萌実": "Moemi",
    "八十科むじな": "Mujina Yasoshina",
    "水菜月夏希": "Natsuki Minazuki",
    "山黒音玄": "Nekuro Yamaguro",
    "ぷわわぽぷら": "Puwawa Popura",
    "音霊魂子": "Tamako Otodama",
    "春雨麗女": "Urame Harusame"
}

# Common literal translations to catch and fix
NAME_FIX_RULES = {
    "Rainha Harusame": "Urame Harusame",
    "Rainha Harusame-senpai": "Urame Harusame-senpai",
    "Rainha Harusame Senpai": "Urame Harusame Senpai",
    "Harusame Reina": "Urame Harusame",
    "Harusame Reijo": "Urame Harusame",
    "Beautiful Woman Harusame": "Urame Harusame",
    "Soul Otodama": "Tamako Otodama",
    "Seele Otodama": "Tamako Otodama",
    "영혼 Otodama": "Tamako Otodama",
    "Sound Soul Child": "Tamako Otodama",
}

def apply_gender_fixes(text, lang):
    """Normalize pronouns for Aogiri members (all female)."""
    if lang == 'en':
        # Keep it simple and predictable (avoids changing punctuation/formatting).
        text = re.sub(r'\bHe\b', 'She', text)
        text = re.sub(r'\bhe\b', 'she', text)
        text = re.sub(r'\bHim\b', 'Her', text)
        text = re.sub(r'\bhim\b', 'her', text)
        text = re.sub(r'\bHis\b', 'Her', text)
        text = re.sub(r'\bhis\b', 'her', text)
        text = re.sub(r'\bHimself\b', 'Herself', text)
        text = re.sub(r'\bhimself\b', 'herself', text)
        # De-capitalize mid-sentence artifacts (best-effort).
        text = re.sub(r'([a-z0-9,;:\)\]])\sShe\b', r'\1 she', text)
        text = re.sub(r'([a-z0-9,;:\)\]])\sHer\b', r'\1 her', text)
        text = re.sub(r'([a-z0-9,;:\)\]])\sHerself\b', r'\1 herself', text)
        text = re.sub(r'\(She\b', '(she', text)
        text = re.sub(r'\(Her\b', '(her', text)
        text = re.sub(r'\(Herself\b', '(herself', text)
        return text

    if lang == 'de':
        # Possessives first (longest to shortest), then personal pronouns.
        text = re.sub(r'\bSeinen\b', 'Ihren', text)
        text = re.sub(r'\bseinen\b', 'ihren', text)
        text = re.sub(r'\bSeinem\b', 'Ihrem', text)
        text = re.sub(r'\bseinem\b', 'ihrem', text)
        text = re.sub(r'\bSeines\b', 'Ihres', text)
        text = re.sub(r'\bseines\b', 'ihres', text)
        text = re.sub(r'\bSeiner\b', 'Ihrer', text)
        text = re.sub(r'\bseiner\b', 'ihrer', text)
        text = re.sub(r'\bSeine\b', 'Ihre', text)
        text = re.sub(r'\bseine\b', 'ihre', text)
        text = re.sub(r'\bSein\b', 'Ihr', text)
        text = re.sub(r'\bsein\b', 'ihr', text)

        text = re.sub(r'\bIhn\b', 'Sie', text)
        text = re.sub(r'\bihn\b', 'sie', text)
        text = re.sub(r'\bIhm\b', 'Ihr', text)
        text = re.sub(r'\bihm\b', 'ihr', text)
        text = re.sub(r'\bEr\b', 'Sie', text)
        text = re.sub(r'\ber\b', 'sie', text)
        return text

    if lang == 'fr':
        text = re.sub(r'\bLui-même\b', 'Elle-même', text)
        text = re.sub(r'\blui-même\b', 'elle-même', text)
        text = re.sub(r'\bIl\b', 'Elle', text)
        text = re.sub(r'\bil\b', 'elle', text)
        return text

    return text

def apply_name_fixes(text, lang):
    """Post-process text to fix name translations."""
    if lang == 'ja':
        return text
    
    # Fix specific mis-transcriptions
    if lang == 'zh-Hant':
        text = text.replace("石駱", "石狩")
    
    # Apply general literal fix rules
    for lit, rep in NAME_FIX_RULES.items():
        text = text.replace(lit, rep)

    text = apply_gender_fixes(text, lang)

    # Force full names if they appear in isolation or obvious patterns
    # (Matches any of the values in AOGIRI_NAME_MAP if they were translated)
    # Since we can't know ALL possible translations, we focus on the rule set above.
    
    return text

def has_japanese(text):
    return bool(JA_RE.search(text))

def clean_text(text):
    return " ".join(text.split())

# ----- Step 1: Extract and instrument HTML files -----

all_ja_strings = {}  # key -> ja text

def get_unique_key(char_prefix, base, used_keys):
    """Generate a unique key like char_profile_age, char_profile_age_2 etc."""
    key = f"{char_prefix}_{base}"
    # Sanitize: lowercase, spaces to underscore, remove special chars
    key = re.sub(r'[^\w]', '_', key).lower()
    key = re.sub(r'_+', '_', key).strip('_')
    if key not in used_keys:
        used_keys.add(key)
        return key
    # Make unique by appending counter
    i = 2
    while f"{key}_{i}" in used_keys:
        i += 1
    k = f"{key}_{i}"
    used_keys.add(k)
    return k

def slugify_text(text, max_len=30):
    """Create a short slug from text for use as key suffix."""
    # Remove non-alphanumeric (keeps CJK too for detection)
    slug = re.sub(r'[^\w\s]', '', text, flags=re.UNICODE)
    # Take first few words
    words = slug.split()[:4]
    slug = '_'.join(words)
    # Only keep ascii for the key
    slug = re.sub(r'[^\x00-\x7F]', '', slug)
    slug = re.sub(r'[^\w]', '_', slug).lower().strip('_')
    slug = re.sub(r'_+', '_', slug)
    return slug[:max_len] if slug else "text"

# Map of tag type -> base key name
TAG_KEY_MAP = {
    'title': 'title',
    'h1': 'h1',
    'h2': 'h2',
    'h3': 'h3',
    'h4': 'h4',
    'p': 'p',
    'li': 'li',
    'th': 'th',
    'td': 'td',
    'span': 'span',
    'blockquote': 'quote',
    'a': 'link',
    'strong': 'strong',
    'em': 'em',
    'b': 'b',
    'i': 'i',
}

# Elements that may contain text but we prefer to translate their children or text nodes
CONTAINER_TAGS = {'div', 'section', 'main', 'header', 'footer', 'article', 'aside', 'nav', 'table', 'tr', 'ul', 'ol', 'dl',
                  'h1', 'h2', 'h3', 'h4', 'p', 'li', 'td', 'th'}

def clear_existing_i18n(soup):
    """Remove all data-i18n attributes and script tags added by previous runs."""
    for el in soup.find_all(True, attrs={"data-i18n": True}):
        del el['data-i18n']
    
    # Remove our extra span wrappers from previous run
    for el in soup.find_all('span', attrs={"data-i18n": True}):
        # If it was a wrapper we added (no classes, etc.), unwrap it if it's just text
        if not el.get('class') and len(list(el.parents)) > 1:
            # We will handle this in instrument_html instead by clearing EVERYTHING
            pass

    # Remove our extra script tags
    for script in soup.find_all('script', src=True):
        if 'i18n_indie.js' in script['src'] or 'aogiri_char_i18n.js' in script['src']:
            script.decompose()

def instrument_html(html_path, char_prefix):
    """Parse HTML, add data-i18n attrs to Japanese text nodes, return (soup, extracted_dict)."""
    print(f"\n  Processing: {html_path.name}")
    content = html_path.read_text(encoding='utf-8')
    soup = BeautifulSoup(content, 'html.parser')
    
    # Clean up previous run's mess
    clear_existing_i18n(soup)
    
    extracted = {}
    used_keys = set()
    
    # Also handle page title
    title_el = soup.find('title')
    if title_el and has_japanese(title_el.get_text()):
        key = f"{char_prefix}_title"
        used_keys.add(key)
        title_el['data-i18n'] = key
        extracted[key] = clean_text(title_el.get_text())
    
    # Walk all elements.
    # If the element contains OTHER elements, skip it (it's a container).
    # If the element contains ONLY text, and it has Japanese, mark it.
    
    for el in soup.find_all(True):
        if el.name in SKIP_TAGS or el.name in CONTAINER_TAGS:
            continue
            
        # If it's a content tag
        if el.name in TAG_KEY_MAP:
            # Check if it has Japanese
            text = clean_text(el.get_text())
            if not text or not has_japanese(text):
                continue
            
            # If it has ANY child tags, skip it and let the children process
            if el.find(True):
                continue

            # Determine key
            base = TAG_KEY_MAP.get(el.name, 'text')
            slug = slugify_text(text)
            base_key = f"{base}_{slug}" if slug else base
            key = get_unique_key(char_prefix, base_key, used_keys)
            
            el['data-i18n'] = key
            extracted[key] = text
    
    # SECOND PASS: Find text nodes that are direct children of containers
    # and contain Japanese. Wrap them in spans.
    for el in soup.find_all(CONTAINER_TAGS):
        # We need to be careful with nested containers. Only handle direct text.
        for child in list(el.children):
            if isinstance(child, NavigableString):
                val = clean_text(str(child))
                if val and has_japanese(val):
                    # Wrap in a span to make it translatable
                    wrapper = soup.new_tag('span')
                    key = get_unique_key(char_prefix, 'span_text', used_keys)
                    wrapper['data-i18n'] = key
                    wrapper.string = val
                    child.replace_with(wrapper)
                    extracted[key] = val

    # Inject the i18n scripts before </body>
    body = soup.find('body')
    if body:
        # Add scripts at end of body
        for src in ['../../i18n_indie.js', '../../aogiri_char_i18n.js']:
            s = soup.new_tag('script', src=src)
            body.append(s)
    
    # Update <html lang>
    html_tag = soup.find('html')
    if html_tag:
        html_tag['lang'] = 'ja'
    
    return soup, extracted

def translate_safe(translator, text, retries=3):
    """Translate with retries. Returns original text on failure."""
    text = text.strip()
    if not text:
        return text
    for attempt in range(retries):
        try:
            result = translator.translate(text)
            if result:
                return result
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1.5)
            else:
                print(f"    [WARN] Translation failed: {e}")
    return text  # fallback to source

# ----- Step 2: Translate -----

def translate_all(ja_dict):
    """Translate all strings using the chain strategy, using cache if available."""
    print("\n=== TRANSLATING ===")
    
    # Load cache
    cache = {}
    cache_path = Path("aogiri_translations.json")
    if cache_path.exists():
        try:
            cache = json.loads(cache_path.read_text(encoding='utf-8'))
            print(f"  Loaded cache from {cache_path}")
        except:
            print("  [WARN] Could not load cache")

    # Mapping of JA text -> translations across all languages
    # result['en'][key] = text
    # We want: text_cache[ja_text] = { 'en': '...', 'de': '...', ... }
    text_cache = {}
    if 'ja' in cache:
        for key, ja_text in cache['ja'].items():
            text_cache[ja_text] = {lang: cache[lang][key] for lang in cache if key in cache[lang]}

    result = {'ja': dict(ja_dict)}
    
    BATCH_SLEEP = 0.05  # Optimized for faster batch processing

    def get_translated_dict(target_lang, source_lang='ja', parent_lang_dict=None):
        out = {}
        label = f"{source_lang} -> {target_lang}"
        print(f"  Processing {label} (Batch mode)...")
        
        source_data = parent_lang_dict if parent_lang_dict is not None else ja_dict
        
        # 1. Identify missing translations
        keys_to_translate = []
        texts_to_translate = []
        
        for key, ja_text in ja_dict.items():
            # Check cache BY JAPANESE TEXT
            if ja_text in text_cache and target_lang in text_cache[ja_text]:
                val = text_cache[ja_text][target_lang]
                out[key] = apply_name_fixes(val, target_lang)
            else:
                keys_to_translate.append(key)
                texts_to_translate.append(source_data[key].strip())
        
        # 2. Translate in batches
        if texts_to_translate:
            # Map language codes for deep-translator
            t_code = target_lang
            if t_code == 'zh-Hans': t_code = 'zh-CN'
            elif t_code == 'zh-Hant': t_code = 'zh-TW'
            elif t_code == 'fil': t_code = 'tl'
            
            s_code = source_lang
            if s_code == 'zh-Hans': s_code = 'zh-CN'
            elif s_code == 'zh-Hant': s_code = 'zh-TW'
            
            translator = GoogleTranslator(source=s_code, target=t_code)
            
            BATCH_SIZE = 40 # Conservative batch size
            for i in range(0, len(texts_to_translate), BATCH_SIZE):
                batch_texts = texts_to_translate[i:i+BATCH_SIZE]
                batch_keys = keys_to_translate[i:i+BATCH_SIZE]
                
                print(f"    Batch {i//BATCH_SIZE + 1}/{(len(texts_to_translate)-1)//BATCH_SIZE + 1}...", flush=True)
                try:
                    translated = translator.translate_batch(batch_texts)
                    for k, t in zip(batch_keys, translated):
                        t = apply_name_fixes(t, target_lang)
                        out[k] = t
                        # Update cache
                        ja_t = ja_dict[k]
                        if ja_t not in text_cache: text_cache[ja_t] = {}
                        text_cache[ja_t][target_lang] = t
                except Exception as e:
                    print(f"      [WARN] Batch failed: {e}. Falling back to source.", flush=True)
                    for k, txt in zip(batch_keys, batch_texts):
                        out[k] = txt
                
                time.sleep(2.0) # Increased delay to avoid 429 Too Many Requests

        # Fill in any missing from ja_dict (safety)
        for key in ja_dict:
            if key not in out:
                out[key] = source_data[key]
                
        return out

    # Translation Chain with Incremental Merging
    print("\n--- Translating Chain ---")
    
    # JA -> EN
    result['en'] = get_translated_dict('en', 'ja')
    merge_into_indie_js({'en': result['en']})
    
    # EN -> DE, FR, ES, NO, SV, FI, RU, PL, FIL
    for lang in ['de', 'fr', 'es', 'no', 'sv', 'fi', 'ru', 'pl', 'fil']:
        result[lang] = get_translated_dict(lang, 'en', result['en'])
        
    # ES -> PT
    result['pt'] = get_translated_dict('pt', 'es', result['es'])
    
    # JA -> ZH-Hans, ZH-Hant, KO, ID
    result['zh-Hans'] = get_translated_dict('zh-Hans', 'ja')
    
    result['zh-Hant'] = get_translated_dict('zh-Hant', 'zh-Hans', result['zh-Hans'])
    
    for lang in ['ko', 'id']:
        result[lang] = get_translated_dict(lang, 'ja')
    
    return result

# ----- Step 3: Merge into i18n_indie.js -----

def merge_into_indie_js(new_translations):
    """Load existing i18n_indie.js, merge new keys, write back."""
    existing = {}
    if OUTPUT_JS.exists():
        content = OUTPUT_JS.read_text(encoding='utf-8')
        # Extract the JSON object
        match = re.search(r'const indie_translations\s*=\s*(\{.*\});', content, re.DOTALL)
        if match:
            try:
                existing = json.loads(match.group(1))
            except json.JSONDecodeError:
                print("  [WARN] Could not parse existing i18n_indie.js; starting fresh for aogiri keys.")
    
    # Merge: add new keys to each language dict
    for lang, strings in new_translations.items():
        if lang not in existing:
            existing[lang] = {}
        existing[lang].update(strings)
    
    # Write back
    js_content = "const indie_translations = " + json.dumps(existing, ensure_ascii=False, indent=2) + ";\n"
    js_content += "if (typeof module !== 'undefined' && module.exports) { module.exports = indie_translations; }\n"
    js_content += "if (typeof window !== 'undefined') { window.indie_translations = indie_translations; }\n"
    
    OUTPUT_JS.write_text(js_content, encoding='utf-8')
    print(f"  Wrote {OUTPUT_JS} ({OUTPUT_JS.stat().st_size // 1024}KB)")

# ----- Main -----

def main():
    print("=" * 60)
    print("Aogiri High School i18n Pipeline")
    print("=" * 60)
    
    all_extracted = {}
    instrumented_files = {}
    
    print("\n=== STEP 1: INSTRUMENTING HTML FILES ===")
    for char_id, char_name in CHARS:
        html_path = CHARS_DIR / f"{char_id}.html"
        if not html_path.exists():
            print(f"  [SKIP] {html_path} not found")
            continue
        soup, extracted = instrument_html(html_path, char_id)
        all_extracted.update(extracted)
        instrumented_files[html_path] = soup
        print(f"    Extracted {len(extracted)} strings from {char_id}.html")
    
    print(f"\n  Total unique strings: {len(all_extracted)}")
    
    # Save extracted Japanese strings for reference
    ref_path = Path("aogiri_ja_extracted.json")
    ref_path.write_text(json.dumps(all_extracted, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"  Saved reference: {ref_path}")
    
    print("\n=== STEP 2: WRITING UPDATED HTML (Restoring Layout) ===")
    for html_path, soup in instrumented_files.items():
        # BeautifulSoup may add/remove DOCTYPE; preserve original structure
        html_path.write_text(str(soup), encoding='utf-8')
        print(f"  Wrote: {html_path}")
    
    # Merge initial JA strings so the language switcher works for Japanese at least
    merge_into_indie_js({'ja': all_extracted})
    
    print("\n=== STEP 3: TRANSLATING (May take a few minutes) ===")
    translations = translate_all(all_extracted)
    
    # Save translation reference
    trans_path = Path("aogiri_translations.json")
    trans_path.write_text(json.dumps(translations, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"  Saved translations: {trans_path}")
    
    print("\n=== STEP 4: MERGING INTO i18n_indie.js ===")
    merge_into_indie_js(translations)
    
    print("\n=== DONE ===")
    print(f"  {len(instrumented_files)} HTML files updated")
    print(f"  {len(all_extracted)} strings processed")
    print("  Language switcher now uses granular attributes and layout is restored.")

if __name__ == "__main__":
    main()
