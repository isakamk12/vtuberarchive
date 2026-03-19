import os
import glob
from bs4 import BeautifulSoup
import re

base_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive"

# Find all agency directories (ignoring root and script folders)
directories = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d)) and d not in ['.git', 'js', 'css', 'assets']]

vue_script_template = """
const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

const app = createApp({
    setup() {
        const windowWidth = ref(window.innerWidth);
        const isMobile = computed(() => windowWidth.value <= 768);

        const handleResize = () => {
            windowWidth.value = window.innerWidth;
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        return {
            isMobile
        }
    }
});

app.mount('#app');
"""

def process_html_file(filepath, js_filename):
    with open(filepath, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Check if already processed
    if 'vue@3' in html_content:
        return False

    soup = BeautifulSoup(html_content, 'html.parser')

    # 1. Inject Vue CDN in head
    head = soup.find('head')
    if head:
        vue_script = soup.new_tag('script', src="https://unpkg.com/vue@3/dist/vue.global.js")
        head.append(vue_script)
        
        # Add basic mobile banner style
        style_tag = soup.new_tag('style')
        style_tag.string = "[v-cloak] { display: none; } "
        head.append(style_tag)

    # 2. Wrap body content in <div id="app" v-cloak>
    body = soup.find('body')
    if body:
        # Create wrapper
        app_div = soup.new_tag('div', id='app')
        app_div['v-cloak'] = ''
        
        # Move all children of body into app_div
        # Exclude script tags at the very bottom if possible, or just move everything
        children = list(body.children)
        for child in children:
            app_div.append(child)
            
        # Add mobile optimization to heavy bg tags heuristically
        for bg in app_div.find_all(class_=re.compile(r'bg|background|noise|mesh|orb', re.I)):
            # Don't overwrite if it already has v-if
            if not bg.has_attr('v-if'):
                bg['v-if'] = '!isMobile'
                
        # Add the mobile banner
        banner = soup.new_tag('div', **{'class': 'mobile-mode-banner', 'v-if': 'isMobile'})
        banner['style'] = 'background: #ffc83d; color: #000; text-align: center; font-size: 0.85rem; padding: 4px; font-weight: 900; position: fixed; bottom: 0; width: 100%; z-index: 9999; box-shadow: 0 -2px 10px rgba(255, 200, 60, 0.4);'
        banner.string = "🚀 Mobile Light Mode (Powered by Vue Virtual DOM)"
        app_div.append(banner)

        body.append(app_div)

    # Convert back to HTML
    new_html = str(soup)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_html)
    return True

def process_js_file(js_filepath):
    # Just append or create the Vue mount script
    if os.path.exists(js_filepath):
        with open(js_filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            if 'createApp' in content:
                return # Already has vue
    else:
        content = ""
        
    with open(js_filepath, 'w', encoding='utf-8') as f:
        f.write(content + "\n" + vue_script_template)

for d in directories:
    dir_path = os.path.join(base_dir, d)
    # find html files
    html_files = glob.glob(os.path.join(dir_path, '*_index.html'))
    for html_file in html_files:
        basename = os.path.basename(html_file).replace('_index.html', '')
        js_file = os.path.join(dir_path, f"{basename}_script.js")
        
        if process_html_file(html_file, js_file):
            process_js_file(js_file)
            print(f"Processed {d}/{os.path.basename(html_file)}")

print("Migration complete!")
