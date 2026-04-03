import os
import re
from collections import Counter

def analyze_structure():
    root = "."
    agencies = [d for d in os.listdir(root) if os.path.isdir(os.path.join(root, d)) and not d.startswith('.')]
    
    overall_report = []

    for agency in agencies:
        char_dir = os.path.join(root, agency, 'characters')
        if not os.path.exists(char_dir):
            continue
            
        html_files = []
        for r, d, f in os.walk(char_dir):
            for file in f:
                if file.endswith('.html'):
                    html_files.append(os.path.join(r, file))
        
        if not html_files:
            continue
            
        structures = []
        for filepath in html_files:
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Key indicators of "Unified" vs "Custom"
                    has_char_base = "char-base" in content
                    has_i18n = "i18n" in content
                    # Count CSS files
                    css_count = len(re.findall(r'<link[^>]*href=["\']([^"\']+\.css)["\']', content))
                    # Check for inline styles
                    has_inline_style = "<style>" in content
                    
                    structures.append({
                        'path': filepath,
                        'has_char_base': has_char_base,
                        'has_i18n': has_i18n,
                        'css_count': css_count,
                        'has_inline_style': has_inline_style
                    })
            except:
                pass
        
        # Determine the "majority" for this agency
        if not structures: continue
        
        keys = ['has_char_base', 'has_i18n', 'css_count', 'has_inline_style']
        stats = {}
        for k in keys:
            stats[k] = Counter([s[k] for s in structures]).most_common(1)[0][0]
            
        deviants = []
        for s in structures:
            if any(s[k] != stats[k] for k in keys):
                deviants.append(s['path'])
        
        overall_report.append({
            'agency': agency,
            'total': len(structures),
            'baseline': stats,
            'deviants': deviants
        })
        
    return overall_report

if __name__ == "__main__":
    report = analyze_structure()
    print("# Agency Consistency Report")
    for r in report:
        if r['deviants']:
            print(f"## Agency: {r['agency']}")
            print(f"- Total Characters: {r['total']}")
            print(f"- Baseline: {r['baseline']}")
            print(f"- **Outliers found: {len(r['deviants'])}**")
            for d in r['deviants'][:10]:
                print(f"  - {d}")
            if len(r['deviants']) > 10:
                print(f"  - ... and {len(r['deviants']) - 10} more")
            print("\n")
        else:
            # Check if this agency's baseline is weird
            if not r['baseline']['has_char_base']:
                print(f"## Agency: {r['agency']} (ENTIRELY CUSTOM)")
                print(f"- This agency does not use `char-base.css` at all.")
                print(f"- Baseline: {r['baseline']}\n")
