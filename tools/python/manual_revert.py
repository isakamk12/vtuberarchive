import os
import glob
import subprocess
from bs4 import BeautifulSoup

base_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive"

directories = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d)) and d not in ['.git', 'js', 'css', 'assets', 'NeoPorte']]

# 1. Manually revert agency pages so we don't need a scary 'git checkout'
for d in directories:
    dir_path = os.path.join(base_dir, d)
    for html_file in glob.glob(os.path.join(dir_path, '*_index.html')):
        with open(html_file, 'r', encoding='utf-8') as f:
            html = f.read()
            
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove Vue script from head
        vue_script = soup.find('script', src="https://unpkg.com/vue@3/dist/vue.global.js")
        if vue_script: vue_script.extract()
        
        # Remove v-cloak style
        for style in soup.find_all('style'):
            if '[v-cloak]' in style.text:
                style.extract()
                
        # Unwrap #app
        app_div = soup.find('div', id='app')
        if app_div:
            app_div.unwrap()
            
        # Remove mobile mode banner
        banner = soup.find('div', class_='mobile-mode-banner')
        if banner: banner.extract()
        
        # Remove v-if
        for tag in soup.find_all(attrs={"v-if": True}):
            del tag['v-if']
            
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(str(soup))
            
        # Revert JS
        basename = os.path.basename(html_file).replace('_index.html', '')
        js_file = os.path.join(dir_path, f"{basename}_script.js")
        if os.path.exists(js_file):
            with open(js_file, 'r', encoding='utf-8') as f:
                js = f.read()
            if 'const { createApp' in js:
                js = js.split('const { createApp')[0]
                with open(js_file, 'w', encoding='utf-8') as f:
                    f.write(js)

# 2. Safely restore root index.html and script.js from last commit 
def restore_file_from_git(filename):
    result = subprocess.run(['git', 'show', f'HEAD:{filename}'], cwd=base_dir, capture_output=True, text=True, encoding='utf-8')
    if result.returncode == 0:
        with open(os.path.join(base_dir, filename), 'w', encoding='utf-8') as f:
            f.write(result.stdout)
        return result.stdout
    return None

original_index = restore_file_from_git('index.html')
original_script = restore_file_from_git('script.js')

# 3. Apply perfect Vue injection to index.html and script.js natively in Python
if original_index:
    html = original_index
    html = html.replace('    <script src="i18n.js"></script>\n</head>', '''    <script src="i18n.js"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        [v-cloak] { display: none; }
        .mobile-mode-banner {
            background: #ffc83d; color: #000; text-align: center; font-size: 0.85rem; padding: 4px; font-weight: 900;
            position: fixed; bottom: 0; width: 100%; z-index: 9999; box-shadow: 0 -2px 10px rgba(255, 200, 60, 0.4); font-family: 'Inter', sans-serif;
        }
    </style>
</head>''')
    html = html.replace('<body>', '<body>\n    <div id="app" v-cloak>')
    html = html.replace('<div class="omni-bg">', '<div class="omni-bg" v-if="!isMobile">')
    
    old_grid = '''        <!-- 3D Card Grid -->
        <div class="datapanel-grid" id="agencyGrid">
            <!-- Cards injected via JS -->
        </div>'''
    
    new_grid = '''        <!-- 3D Card Grid -->
        <div class="datapanel-grid" id="agencyGrid">
            <!-- Vue v-for -->
            <a :href="agency.url" class="datapanel" v-for="agency in filteredAgencies" :key="agency.name" :style="'--card-color: ' + agency.color">
                <div class="panel-glow"></div>
                <div class="panel-content">
                    <div class="panel-header">
                        <div class="panel-icon">{{ agency.icon }}</div>
                        <div class="panel-tags">
                            <span class="tag" v-for="tag in agency.resolvedTags" :key="tag">{{ tag }}</span>
                        </div>
                    </div>
                    <div class="panel-body">
                        <h2 class="panel-title">{{ t(agency, 'name') }}</h2>
                        <div class="panel-subtitle">{{ agency.sub }}</div>
                        <p class="panel-desc">{{ t(agency, 'desc') }}</p>
                    </div>
                    <div class="panel-system">
                        <span class="status-dot"></span>
                        <span class="status-text">ACTIVE</span>
                    </div>
                </div>
            </a>
        </div>'''
    html = html.replace(old_grid, new_grid)
    
    html = html.replace('    <!-- Script -->\n    <script src="script.js"></script>\n</body>', '''        <div v-if="isMobile" class="mobile-mode-banner">🚀 Mobile Light Mode (Powered by Vue Virtual DOM)</div>
    </div> <!-- /#app -->

    <!-- Script -->
    <script src="script.js"></script>
</body>''')

    with open(os.path.join(base_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)

if original_script:
    import re
    agencies_match = re.search(r'(const agencies = \[.*?\n        \}\];)\n', original_script, re.DOTALL)
    translations_match = re.search(r'(const translations = \{.*?\n    \};)\n', original_script, re.DOTALL)

    if agencies_match and translations_match:
        agencies_str = agencies_match.group(1)
        translations_str = translations_match.group(1)
        vue_script = f'''const {{ createApp, ref, computed, onMounted, onUnmounted }} = Vue;

{translations_str}

{agencies_str}

const app = createApp({{
    setup() {{
        const windowWidth = ref(window.innerWidth);
        const isMobile = computed(() => windowWidth.value <= 768);
        const currentLang = ref(localStorage.getItem('vt_archive_lang') || 'ja');
        const filterMode = ref('all');
        const searchQuery = ref('');
        const totalAgencies = ref(agencies.length);

        const handleResize = () => {{ windowWidth.value = window.innerWidth; }};

        onMounted(() => {{
            window.addEventListener('resize', handleResize);
            const langSelect = document.getElementById('langSelect');
            if(langSelect) {{
                langSelect.value = currentLang.value;
                langSelect.addEventListener('change', (e) => {{
                    currentLang.value = e.target.value;
                    localStorage.setItem('vt_archive_lang', currentLang.value);
                }});
            }}
            setupFxLayers();
        }});

        onUnmounted(() => {{ window.removeEventListener('resize', handleResize); }});

        const t = (item, field) => {{
            const postfix = currentLang.value === 'ja' ? '' : '_' + currentLang.value.split('-')[0];
            return item[field + postfix] || item[field] || '';
        }};

        const filteredAgencies = computed(() => {{
            let results = agencies;
            if (filterMode.value !== 'all') results = results.filter(item => item.filter === filterMode.value);
            if (searchQuery.value) {{
                const q = searchQuery.value.toLowerCase();
                results = results.filter(item =>
                    item.name.toLowerCase().includes(q) ||
                    item.sub.toLowerCase().includes(q) ||
                    (item.desc && item.desc.toLowerCase().includes(q)) ||
                    (item.resolvedTags && item.resolvedTags.some(tag => tag.toLowerCase().includes(q)))
                );
            }}
            totalAgencies.value = results.length;
            return results;
        }});

        const setFilter = (mode) => {{ filterMode.value = mode; }};

        const setupFxLayers = () => {{
            if (isMobile.value) return; 
            const fxLayer = document.createElement('div');
            fxLayer.className = 'fx-layer';
            fxLayer.id = 'fxLayer';
            document.body.appendChild(fxLayer);
            
            const stageBg = document.createElement('div');
            stageBg.className = 'stage-bg';
            stageBg.setAttribute('aria-hidden', 'true');
            document.body.appendChild(stageBg);

            requestAnimationFrame(() => {{ document.body.classList.add('is-ready'); }});
        }};

        return {{ isMobile, currentLang, filterMode, searchQuery, filteredAgencies, setFilter, t, totalAgencies }};
    }}
}});

agencies.forEach(item => {{ item.resolvedTags = item.tags || []; }});
app.mount('#app');
'''
        with open(os.path.join(base_dir, 'script.js'), 'w', encoding='utf-8') as f:
            f.write(vue_script)

print('Clean rollback and fix completed without altering Git index.')
