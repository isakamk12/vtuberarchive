import json
import re
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString

ROOT = Path(__file__).resolve().parents[2]
CHAR_ROOT = ROOT / "AppLand" / "characters"
OUTPUT_JSON = ROOT / "appland_extracted_ja.json"

SKIP_CLASSES = {
    "cp-hero-name",
    "cp-hero-en",
    "cp-bg-letter",
    "cp-hero-orb",
}

SKIP_PARENTS = {"script", "style", "head", "meta", "title", "svg", "path"}


def should_skip(node):
    parent = node.parent
    if parent is None:
        return True
    if parent.name in SKIP_PARENTS:
        return True
    classes = set(parent.get("class", []))
    if classes & SKIP_CLASSES:
        return True
    return False


def add_i18n(file_path: Path):
    page_name = file_path.stem
    with file_path.open("r", encoding="utf-8") as f:
        html = f.read()

    soup = BeautifulSoup(html, "html.parser")
    extracted = {}
    count = 1

    # Title
    if soup.title and (soup.title.string is not None):
        key = f"{page_name}_title"
        extracted[key] = soup.title.string.strip()
        soup.title["data-i18n"] = key

    # Collect strings first to avoid mutating while iterating
    strings_to_process = []
    for string in soup.find_all(string=True):
        text = string.strip()
        if not text:
            continue
        if should_skip(string):
            continue
        strings_to_process.append(string)

    for string in strings_to_process:
        text = string.strip()
        key = f"{page_name}_text_{count}"
        extracted[key] = text
        parent = string.parent

        # Count meaningful contents in parent
        meaningful = []
        for c in parent.contents:
            if isinstance(c, NavigableString):
                if c.strip():
                    meaningful.append(c)
            elif getattr(c, "name", None):
                meaningful.append(c)

        if len(meaningful) == 1 and not parent.has_attr("data-i18n"):
            parent["data-i18n"] = key
        else:
            new_span = soup.new_tag("span")
            new_span["data-i18n"] = key
            new_span.string = string
            string.replace_with(new_span)
        count += 1

    # Inject i18n scripts if missing
    scripts = [s.get("src") for s in soup.find_all("script") if s.get("src")]
    i18n_src = "../../../i18n_indie.js"
    setup_src = "../../../setup_i18n.js"
    if i18n_src not in scripts or setup_src not in scripts:
        if i18n_src not in scripts:
            new_script = soup.new_tag("script", src=i18n_src)
            soup.body.append(new_script)
        if setup_src not in scripts:
            new_script = soup.new_tag("script", src=setup_src)
            soup.body.append(new_script)

    file_path.write_text(str(soup), encoding="utf-8")
    return extracted


def main():
    extracted_all = {}
    for file_path in sorted(CHAR_ROOT.glob("*/*.html")):
        extracted = add_i18n(file_path)
        extracted_all.update(extracted)
        print(f"Processed {file_path}, extracted {len(extracted)} text nodes.")

    with OUTPUT_JSON.open("w", encoding="utf-8") as f:
        json.dump(extracted_all, f, ensure_ascii=False, indent=2)

    print(f"Wrote {OUTPUT_JSON}")


if __name__ == "__main__":
    main()
