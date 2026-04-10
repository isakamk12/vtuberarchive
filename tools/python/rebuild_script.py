import os

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Only inject if we haven't already
if 'const app = createApp' not in text:
    # Extremely robust text slicing instead of regex
    
    # 1. Extract agencies
    agencies_start = text.find('const agencies = [')
    # Find the next declaration to mark the end of agencies
    agencies_end = text.find('const translations = {')
    if agencies_start != -1 and agencies_end != -1:
        agencies_str = text[agencies_start:agencies_end].strip()
        
    # 2. Extract translations
    translations_start = text.find('const translations = {')
    translations_end = text.find('function copyToClipboard(') # or function renderAgencies
    if translations_end == -1:
        translations_end = text.find('function renderAgencies(')
        
    if translations_start != -1 and translations_end != -1:
        translations_str = text[translations_start:translations_end].strip()

    if agencies_start != -1 and translations_start != -1:
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
        with open('script.js', 'w', encoding='utf-8') as f:
            f.write(vue_script)
            print("Successfully rebuilt script.js!")
    else:
        print("Failed to find boundaries in script.js")
