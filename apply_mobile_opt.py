import os
import glob
from bs4 import BeautifulSoup
import re

base_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive"

directories = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d)) and d not in ['.git', 'js', 'css', 'assets', 'NeoPorte']] # Skip NeoPorte since it's already Vue

# Write the global mobile optimize script
with open(os.path.join(base_dir, 'mobile_optimize.js'), 'w', encoding='utf-8') as f:
    f.write('''
// Universal Mobile Optimizer for VTuber Archive
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Hide heavy elements immediately
        const heavyElements = document.querySelectorAll('.bg-wrap, .bg-mesh, .bg-noise, .omni-bg, .stage-bg, .nr-bg, .screen-vignette');
        heavyElements.forEach(el => el.style.display = 'none');
        
        // Inject Banner
        const banner = document.createElement('div');
        banner.style.cssText = 'background: #ffc83d; color: #000; text-align: center; font-size: 0.85rem; padding: 4px; font-weight: 900; position: fixed; bottom: 0; width: 100%; z-index: 9999; box-shadow: 0 -2px 10px rgba(255, 200, 60, 0.4); font-family: Inter, sans-serif;';
        banner.innerHTML = '🚀 スマホ向け軽量モード (Heavy FX Disabled)';
        document.body.appendChild(banner);
        
        // Stop Intersection Observers and Animations globally by throwing a class
        document.body.classList.add('mobile-lite-mode');
    }
});
''')

# Inject script into all agency index.html
for d in directories:
    dir_path = os.path.join(base_dir, d)
    html_files = glob.glob(os.path.join(dir_path, '*_index.html'))
    for html_file in html_files:
        with open(html_file, 'r', encoding='utf-8') as f:
            html = f.read()
            
        if 'mobile_optimize.js' not in html:
            # depth adjustment for script path
            depth = html_file.replace(base_dir, "").count(os.sep) - 1
            path_prefix = '../' * depth
            
            # Injection before </body>
            html = html.replace('</body>', f'<script src="{path_prefix}mobile_optimize.js"></script>\n</body>')
            
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(html)
                
print('Safe mobile optimization injected.')
