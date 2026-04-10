import sys
import re

# ------------- Fix index.html -------------
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Inject Vue CDN in head
if 'vue.global.js' not in html:
    html = html.replace('    <script src="i18n.js"></script>\n</head>', '''    <script src="i18n.js"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        [v-cloak] { display: none; }
        .mobile-mode-banner {
            background: #ffc83d; color: #000; text-align: center;
            font-size: 0.85rem; padding: 4px; font-weight: 900;
            position: fixed; bottom: 0; width: 100%; z-index: 9999;
            box-shadow: 0 -2px 10px rgba(255, 200, 60, 0.4); font-family: 'Inter', sans-serif;
        }
    </style>
</head>''')

# 2. Wrap body with #app
if 'id="app"' not in html:
    html = html.replace('<body>', '<body>\n    <div id="app" v-cloak>')

# 3. Add mobile optimization to omni-bg
html = html.replace('<div class="omni-bg">', '<div class="omni-bg" v-if="!isMobile">')

# 4. Replace agencyGrid inner content with Vue v-for
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

# 5. Close #app wrapper BEFORE script tag
if '</div> <!-- /#app -->' not in html:
    html = html.replace('    <!-- Script -->\n    <script src="script.js"></script>\n</body>', '''        <div v-if="isMobile" class="mobile-mode-banner">🚀 Mobile Light Mode (Powered by Vue Virtual DOM)</div>
    </div> <!-- /#app -->

    <!-- Script -->
    <script src="script.js"></script>
</body>''')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# ------------- Fix script.js -------------
with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

if 'const app = createApp' not in text:
    agencies_match = re.search(r'(const agencies = \[.*?\n        \}\];)\n', text, re.DOTALL)
    translations_match = re.search(r'(const translations = \{.*?\n    \};)\n', text, re.DOTALL)

    if agencies_match and translations_match:
        agencies_str = agencies_match.group(1)
        translations_str = translations_match.group(1)
        
        vue_script = f'''
const {{ createApp, ref, computed, onMounted, onUnmounted }} = Vue;

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

        const handleResize = () => {{
            windowWidth.value = window.innerWidth;
        }};

        onMounted(() => {{
            window.addEventListener('resize', handleResize);
            // Re-apply language on load
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

        onUnmounted(() => {{
            window.removeEventListener('resize', handleResize);
        }});

        // t function for translations
        const t = (item, field) => {{
            const postfix = currentLang.value === 'ja' ? '' : '_' + currentLang.value.split('-')[0];
            return item[field + postfix] || item[field] || '';
        }};

        const filteredAgencies = computed(() => {{
            let results = agencies;
            if (filterMode.value !== 'all') {{
                results = results.filter(item => item.filter === filterMode.value);
            }}
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

        const setFilter = (mode) => {{
            filterMode.value = mode;
        }};

        // Temporary port of visual effects
        const setupFxLayers = () => {{
            if (isMobile.value) return; // Disable heavy fx on mobile
            const fxLayer = document.createElement('div');
            fxLayer.className = 'fx-layer';
            fxLayer.id = 'fxLayer';
            document.body.appendChild(fxLayer);
            
            const stageBg = document.createElement('div');
            stageBg.className = 'stage-bg';
            stageBg.setAttribute('aria-hidden', 'true');
            document.body.appendChild(stageBg);

            requestAnimationFrame(() => {{
                document.body.classList.add('is-ready');
            }});
        }};

        return {{
            isMobile, currentLang, filterMode, searchQuery, filteredAgencies, setFilter, t, totalAgencies
        }};
    }}
}});

// Post-processing tags before mounting
agencies.forEach(item => {{
    item.resolvedTags = item.tags || [];
}});

app.mount('#app');
'''
        with open('script.js', 'w', encoding='utf-8') as f:
            f.write(vue_script)
        
print("Root hub and agencies safely processed!")
