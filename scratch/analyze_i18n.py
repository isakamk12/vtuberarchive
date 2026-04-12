import json
import re
import os

def analyze_i18n():
    with open('i18n_indie.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the object content between { and }
    start = content.find('{')
    end = content.rfind('}')
    # Note: This is an approximation since it's a giant file, but good for overview
    
    # We want to find keys ending in _title as anchors for sectors
    # Keys look like "al_title", "uomusume_index_title", etc.
    keys = re.findall(r'\"([a-z0-9_]+)_title\"', content)
    unique_prefixes = sorted(list(set(keys)))
    
    print("Found prefixes:")
    for p in unique_prefixes:
        print(f"- {p}")

if __name__ == "__main__":
    analyze_i18n()
