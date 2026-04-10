import os

base_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive"
os.chdir(base_dir)

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Make sure we don't double inject
if 'const app = createApp' not in text:
    agencies_start = text.find('const agencies = [')
    agencies_end = text.find('const autoTagRules = [')

    if agencies_start != -1 and agencies_end != -1:
        agencies_str = text[agencies_start:agencies_end].strip()

        vue_script = f'''const {{ createApp, ref, computed, onMounted, onUnmounted }} = Vue;

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

        // Use global translations object from i18n.js
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
            if (window.innerWidth <= 768) return; 
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

// Prepare tags
agencies.forEach(item => {{ item.resolvedTags = item.tags || []; }});

app.mount('#app');
'''
        with open('script.js', 'w', encoding='utf-8') as f:
            f.write(vue_script)
        print("Successfully rebuilt script.js with Vue 3!")
    else:
        print("Could not find required substrings!")
else:
    print("script.js already processed.")
