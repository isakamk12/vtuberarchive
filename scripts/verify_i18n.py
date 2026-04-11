import json

FILENAME = 'i18n_indie.js'

def verify():
    with open(FILENAME, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if the content is valid JS-like (contains const indie_translations = { ... };)
    if 'const indie_translations = {' not in content:
        print("ERROR: indie_translations not found")
        return

    # Extract the object part
    start = content.find('{')
    end = content.rfind('}')
    obj_str = content[start:end+1]
    
    # Try to find specific keys in different sections
    langs = ["ja", "en", "es", "zh-Hans", "zh-Hant", "ko"]
    for lang in langs:
        marker = f'"{lang}":'
        if marker in content:
            print(f"FOUND language block: {lang}")
            # Check for one Uomusume key
            if "uomusume_index_title" in content[content.find(marker):content.find(marker)+2000]: # check start of block
                 print(f"  - Uomusume keys found in {lang}")
            else:
                 print(f"  - Uomusume keys MISSING in {lang}")
        else:
            print(f"MISSING language block: {lang}")

if __name__ == "__main__":
    verify()
