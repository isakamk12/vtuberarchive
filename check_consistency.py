import os
import re

def check_consistency(root_dir):
    agencies = [d for d in os.listdir(root_dir) if os.path.isdir(os.path.join(root_dir, d)) and not d.startswith('.')]
    
    report = []
    
    for agency in agencies:
        char_dir = os.path.join(root_dir, agency, 'characters')
        if not os.path.exists(char_dir):
            continue
        
        # Determine if it's folder-per-char or file-per-char
        items = os.listdir(char_dir)
        html_files = []
        is_flat = False
        
        folders = [d for d in items if os.path.isdir(os.path.join(char_dir, d))]
        if folders:
            for folder in folders:
                folder_path = os.path.join(char_dir, folder)
                files = [f for f in os.listdir(folder_path) if f.endswith('.html')]
                for f in files:
                    html_files.append(os.path.join(folder_path, f))
        else:
            is_flat = True
            html_files = [os.path.join(char_dir, f) for f in items if f.endswith('.html')]
            
        if not html_files:
            continue
            
        # Sample the first file to get a "baseline"
        def get_structure(filepath):
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Check for basic tags/classes
                    nav = re.search(r'<nav[^>]*class=["\']([^"\']+)["\']', content)
                    hero = re.search(r'<section[^>]*class=["\']([^"\']+)["\']', content)
                    css = re.findall(r'<link[^>]*href=["\']([^"\']+\.css)["\']', content)
                    js = re.findall(r'<script[^>]*src=["\']([^"\']+\.js)["\']', content)
                    return {
                        'nav': nav.group(1) if nav else None,
                        'hero': hero.group(1) if hero else None,
                        'css': sorted(css),
                        'js': sorted(js)
                    }
            except:
                return None

        baseline = None
        for i in range(min(5, len(html_files))):
            baseline = get_structure(html_files[i])
            if baseline: break
            
        if not baseline:
            continue
            
        deviants = []
        for filepath in html_files:
            struct = get_structure(filepath)
            if struct != baseline:
                deviants.append((os.path.relpath(filepath, root_dir), struct))
        
        if deviants:
            report.append({
                'agency': agency,
                'baseline': baseline,
                'deviants': deviants
            })
            
    return report

if __name__ == "__main__":
    results = check_consistency('.')
    for entry in results:
        print(f"Agency: {entry['agency']}")
        print(f"  Baseline CSS: {entry['baseline']['css']}")
        print(f"  Baseline JS: {entry['baseline']['js']}")
        print(f"  Deviants found: {len(entry['deviants'])}")
        for dev_path, dev_struct in entry['deviants'][:5]:
            print(f"    - {dev_path}")
            if dev_struct:
                if dev_struct['css'] != entry['baseline']['css']:
                    print(f"      CSS Diff: {dev_struct['css']}")
                if dev_struct['js'] != entry['baseline']['js']:
                    print(f"      JS Diff: {dev_struct['js']}")
        if len(entry['deviants']) > 5:
            print("    ...")
        print("-" * 20)
