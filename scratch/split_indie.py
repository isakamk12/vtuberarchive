import json
import re
import os
from collections import defaultdict

# Mapping prefix to directory (informed by map_usage.py)
# If a prefix is not here, we will try to find it dynamically
PRIMARY_MAPPING = {
    "al": "AppLand",
    "uomusume": "Uomusume",
    "status": ".",
    "opening": ".",
    "filter": ".",
    "alert": ".",
    "roster": "Nijisanji",
    "report": "Nijisanji"
}

def get_target_dir(prefix, usage_map):
    if prefix in PRIMARY_MAPPING:
        return PRIMARY_MAPPING[prefix]
    if prefix in usage_map:
        # Pick the most specific or first folder found
        folders = usage_map[prefix]
        if folders:
            # Prefer subfolders over root if multiple found
            sorted_folders = sorted(list(folders), key=len, reverse=True)
            return sorted_folders[0]
    return None

def split_i18n():
    # 1. Load the big file
    with open('i18n_indie.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the object start/end
    start_idx = content.find('{')
    end_idx = content.rfind('}')
    obj_str = content[start_idx:end_idx+1]
    
    # We can't easily json.loads if it has trailing commas or JS specifics, 
    # but i18n_indie.js looks like a pure object. Let's try simple regex or careful parsing.
    # Actually, it's safer to use a regex to extract language blocks.
    
    langs = ["ja", "en", "es", "zh-Hans", "zh-Hant", "ko", "it", "fr", "de", "pl", "pt", "ru"]
    data = defaultdict(lambda: defaultdict(dict)) # prefix -> lang -> {key: val}
    
    # Regex to find "lang": { ... }
    for lang in langs:
        pattern = rf'"{lang}":\s*{{(.*?)\n\s*}},?\n'
        match = re.search(pattern, obj_str, re.DOTALL)
        if match:
            block = match.group(1)
            # Find all "key": "val" in this block
            entries = re.findall(r'"([a-z0-9_]+)":\s*"(.*?)"', block)
            for key, val in entries:
                # Identify prefix
                prefix_match = re.match(r'^([a-z0-9]+)_', key)
                if prefix_match:
                    prefix = prefix_match.group(1)
                    data[prefix][lang][key] = val
                else:
                    data["misc"][lang][key] = val

    # 2. Get usage map again for dynamic placement
    usage_map = defaultdict(set)
    for root, dirs, files in os.walk('.'):
        if any(x in root for x in ['.git', 'node_modules', '.venv']): continue
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        c = f.read()
                    prefixes = re.findall(r'data-i18n=\"([a-z0-9_]+?)_', c)
                    for p in prefixes:
                        usage_map[p].add(root)
                except: pass

    # 3. Write files
    for prefix, lang_entries in data.items():
        target_dir = get_target_dir(prefix, usage_map)
        if not target_dir:
            print(f"Skipping {prefix}: No target directory found.")
            continue
        
        filename = f"{prefix}_i18n.js"
        target_path = os.path.join(target_dir, filename)
        
        # Prepare content
        obj_name = f"{prefix}_translations"
        output = f"const {obj_name} = " + json.dumps(lang_entries, ensure_ascii=False, indent=2) + ";\n\n"
        output += "if (typeof window !== 'undefined') {\n"
        output += f"    window.{obj_name} = {obj_name};\n"
        output += "    window.VT_I18N_OBJECTS = window.VT_I18N_OBJECTS || [];\n"
        output += f"    window.VT_I18N_OBJECTS.push({obj_name});\n"
        output += "}\n"
        
        os.makedirs(target_dir, exist_ok=True)
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"Wrote {target_path}")

if __name__ == "__main__":
    split_i18n()
