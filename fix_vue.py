import os
import glob
from bs4 import BeautifulSoup

base_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive"

directories = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d)) and d not in ['.git', 'js', 'css', 'assets']]

def fix_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    app_div = soup.find('div', id='app')
    body = soup.find('body')
    
    if app_div and body:
        # Find all script tags inside app_div
        scripts = app_div.find_all('script')
        modified = False
        for script in scripts:
            # Move it to the body, strictly after app_div
            script.extract()
            body.append(script)
            modified = True
            
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            return True
            
    return False

for d in directories:
    dir_path = os.path.join(base_dir, d)
    html_files = glob.glob(os.path.join(dir_path, '*_index.html'))
    for html_file in html_files:
        if fix_html_file(html_file):
            print(f"Fixed {d}/{os.path.basename(html_file)}")

print("Fix complete!")
