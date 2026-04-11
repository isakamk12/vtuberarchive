import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CHAR_ROOT = ROOT / "AppLand" / "characters"

DOCTYPE_RE = re.compile(r'^\ufeff?\s*<span[^>]*>\s*<!DOCTYPE[^>]*>\s*</span>\s*', re.I | re.S)
COMMENT_SPAN_RE = re.compile(r'<span[^>]*>\s*<!--.*?-->\s*</span>', re.S)


def clean_file(path: Path):
    text = path.read_text(encoding="utf-8")
    text = DOCTYPE_RE.sub("<!DOCTYPE html>\n", text)
    text = COMMENT_SPAN_RE.sub("", text)
    path.write_text(text, encoding="utf-8")


def main():
    for file_path in sorted(CHAR_ROOT.glob("*/*.html")):
        clean_file(file_path)
        print(f"Cleaned {file_path}")


if __name__ == "__main__":
    main()
