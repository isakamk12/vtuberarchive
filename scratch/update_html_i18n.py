import os
import re

# We need to know which prefix is used in each file to inject the right scripts
def update_html_files():
    for root, dirs, files in os.walk('.'):
        if any(x in root for x in ['.git', 'node_modules', '.venv']): continue
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if 'i18n_indie.js' not in content:
                        continue
                    
                    # 1. Identify all prefixes used in this file
                    prefixes = sorted(list(set(re.findall(r'data-i18n=\"([a-z0-9_]+?)_', content))))
                    
                    # 2. Build the new script tags
                    new_scripts = []
                    for p in prefixes:
                        # Find the actual path of [p]_i18n.js
                        # (We assume the splitter script put them in the right places)
                        # We use relative paths from current 'root'
                        # For simplicity, we'll search the filesystem for where we just wrote them
                        # But actually, we can just look for them in 'root' or parents.
                        
                        target_file = f"{p}_i18n.js"
                        
                        # Search for target_file upwards or in current dir
                        found_rel_path = None
                        temp_root = root
                        while temp_root != '.':
                            test_path = os.path.join(temp_root, target_file)
                            if os.path.exists(test_path):
                                found_rel_path = os.path.relpath(test_path, root).replace('\\', '/')
                                break
                            temp_root = os.path.dirname(temp_root)
                        # Root check
                        if not found_rel_path and os.path.exists(target_file):
                            found_rel_path = os.path.relpath(target_file, root).replace('\\', '/')
                            
                        if found_rel_path:
                            # Avoid duplicates
                            script_tag = f'<script src="{found_rel_path}"></script>'
                            if script_tag not in new_scripts:
                                new_scripts.append(script_tag)

                    if not new_scripts:
                        print(f"No local i18n files found for {path}, keeping indie for safety.")
                        continue

                    # 3. Replace the indie_translations tag
                    # Matches <script src="...i18n_indie.js"></script>
                    new_content = re.sub(r'<script src="[^"]*i18n_indie\.js"></script>', "\n    ".join(new_scripts), content)
                    
                    if new_content != content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {path}")
                        
                except Exception as e:
                    print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    update_html_files()
