import os
import re
from collections import defaultdict

def map_prefixes_to_folders():
    mapping = defaultdict(set)
    # Search for all HTML files
    for root, dirs, files in os.walk('.'):
        if '.git' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    # Find data-i18n="prefix_..."
                    prefixes = re.findall(r'data-i18n=\"([a-z0-9_]+?)_', content)
                    for p in prefixes:
                        # Clean prefix (stop at first underscore usually, but some have double)
                        # Actually, let's just map the exact prefix before the underscore
                        if p:
                            mapping[p].add(root)
                except Exception as e:
                    pass

    print("--- Prefix to Folder Mapping ---")
    for prefix in sorted(mapping.keys()):
        folders = sorted(list(mapping[prefix]))
        print(f"{prefix}: {', '.join(folders)}")

if __name__ == "__main__":
    map_prefixes_to_folders()
