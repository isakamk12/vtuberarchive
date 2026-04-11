import argparse
import json
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parents[2]
SOURCE_JSON = ROOT / "appland_extracted_ja.json"
I18N_JS = ROOT / "i18n_indie.js"

TARGETS = {
    "en": "en",
    "en-GB": "en",
    "en-AU": "en",
    "en-IE": "en",
    "es": "es",
    "es-419": "es",
    "pt": "pt",
    "pt-BR": "pt",
    "fr": "fr",
    "fr-CA": "fr",
    "zh-Hans": "zh-CN",
    "zh-Hant": "zh-TW",
    "ko": "ko",
    "de": "de",
    "it": "it",
    "ru": "ru",
    "pl": "pl",
    "no": "no",
    "sv": "sv",
    "fi": "fi",
    "fil": "tl",
    "id": "id",
}


def load_i18n_js(path: Path):
    text = path.read_text(encoding="utf-8")
    marker = "const indie_translations"
    start_idx = text.find(marker)
    if start_idx == -1:
        raise RuntimeError("Could not find indie_translations marker")
    brace_start = text.find("{", start_idx)
    if brace_start == -1:
        raise RuntimeError("Could not find opening brace for indie_translations")

    depth = 0
    end_idx = None
    for i in range(brace_start, len(text)):
        ch = text[i]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                end_idx = i + 1
                break
    if end_idx is None:
        raise RuntimeError("Could not find matching closing brace for indie_translations")

    json_text = text[brace_start:end_idx]
    data = json.loads(json_text)
    return data


def save_i18n_js(path: Path, data):
    js_content = "const indie_translations = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
    js_content += "if (typeof module !== 'undefined' && module.exports) { module.exports = indie_translations; }\n"
    js_content += "if (typeof window !== 'undefined') { window.indie_translations = indie_translations; }\n"
    path.write_text(js_content, encoding="utf-8")


def translate_batch_safe(translator, texts):
    try:
        return translator.translate_batch(texts)
    except Exception:
        results = []
        for t in texts:
            try:
                results.append(translator.translate(t))
            except Exception:
                results.append(t)
        return results


def base_lang(code: str) -> str:
    if code in ("zh-Hans", "zh-Hant"):
        return "zh"
    return code.split("-")[0]


def translate_lang(lang, target, keys, values, i18n_data, chunk_size, source_code):
    print(f"Translating {lang}...")
    translator = GoogleTranslator(source=source_code, target=target)
    translated_all = []
    for i in range(0, len(values), chunk_size):
        chunk = values[i:i + chunk_size]
        translated_chunk = translate_batch_safe(translator, chunk)
        translated_all.extend(translated_chunk)
        print(f"  {lang}: {min(i + chunk_size, len(values))}/{len(values)}")

    if lang not in i18n_data:
        i18n_data[lang] = {}
    for key, text in zip(keys, translated_all):
        i18n_data[lang][key] = text


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--lang", help="translate only one language key (e.g., en)")
    parser.add_argument("--source-lang", default="ja", help="source language key to translate from (default: ja)")
    parser.add_argument("--chunk", type=int, default=80, help="batch size")
    parser.add_argument("--start", type=int, default=0, help="start index for partial translation")
    parser.add_argument("--count", type=int, default=0, help="number of items to translate (0 = all)")
    args = parser.parse_args()

    if not SOURCE_JSON.exists():
        raise RuntimeError("appland_extracted_ja.json not found. Run appland_i18n.py first.")

    ja_data = json.loads(SOURCE_JSON.read_text(encoding="utf-8"))
    i18n_data = load_i18n_js(I18N_JS)

    if "ja" not in i18n_data:
        i18n_data["ja"] = {}

    # Merge ja first
    i18n_data["ja"].update(ja_data)

    keys = list(ja_data.keys())
    source_lang = args.source_lang
    if source_lang != "ja":
        if source_lang not in i18n_data:
            raise RuntimeError(f"Missing source language: {source_lang}")
        source_dict = i18n_data[source_lang]
        values = [source_dict.get(k, ja_data[k]) for k in keys]
    else:
        values = [ja_data[k] for k in keys]

    source_code = base_lang(source_lang) if source_lang != "ja" else "auto"

    if args.lang:
        if args.lang not in TARGETS:
            raise RuntimeError(f"Unknown lang: {args.lang}")
        start = max(0, args.start)
        end = len(keys) if args.count <= 0 else min(len(keys), start + args.count)
        slice_keys = keys[start:end]
        slice_values = values[start:end]
        translate_lang(args.lang, TARGETS[args.lang], slice_keys, slice_values, i18n_data, args.chunk, source_code)
    else:
        for lang, target in TARGETS.items():
            translate_lang(lang, target, keys, values, i18n_data, args.chunk, source_code)

    save_i18n_js(I18N_JS, i18n_data)
    print("Merged translations into i18n_indie.js")


if __name__ == "__main__":
    main()
