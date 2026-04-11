import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOURCE_JSON = ROOT / "appland_extracted_ja.json"
I18N_JS = ROOT / "i18n_indie.js"


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


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--from-lang", required=True)
    parser.add_argument("--to-langs", required=True)
    args = parser.parse_args()

    if not SOURCE_JSON.exists():
        raise RuntimeError("appland_extracted_ja.json not found. Run appland_i18n.py first.")

    keys = json.loads(SOURCE_JSON.read_text(encoding="utf-8")).keys()
    i18n_data = load_i18n_js(I18N_JS)

    from_lang = args.from_lang
    if from_lang not in i18n_data:
        raise RuntimeError(f"Missing source language: {from_lang}")

    for lang in [s.strip() for s in args.to_langs.split(",") if s.strip()]:
        if lang not in i18n_data:
            i18n_data[lang] = {}
        for key in keys:
            if key in i18n_data[from_lang]:
                i18n_data[lang][key] = i18n_data[from_lang][key]

    save_i18n_js(I18N_JS, i18n_data)
    print("Cloned AppLand keys.")


if __name__ == "__main__":
    main()
