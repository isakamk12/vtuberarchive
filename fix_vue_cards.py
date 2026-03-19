import os
import re

base_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive"
os.chdir(base_dir)

# 1. Read and fix index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the agencyGrid with the CORRECT Vue template matching Vanilla JS!
start_grid = html.find('<div class="datapanel-grid" id="agencyGrid">')
end_grid = html.find('</div>', html.find('</div>', html.find('</div>', html.find('</div>', html.find('</a>', start_grid)))) + 6) 
# To be safe, let's just use regex since it's a known string from our fix script
new_grid = '''        <div class="datapanel-grid" id="agencyGrid">
            <div class="datapanel-card fade-in" 
                 :class="{ 'card-defunct': (agency.resolvedTags || []).includes('Defunct'), 'is-pressed': agency._pressed }"
                 v-for="(agency, index) in filteredAgencies" 
                 :key="agency.name" 
                 :style="{ animationDelay: (index * 0.05) + 's', '--brand-rgb': agency.color }"
                 @click="handleCardClick(agency)"
                 @pointerdown="agency._pressed = true"
                 @pointerup="agency._pressed = false"
                 @pointercancel="agency._pressed = false">
                 
                <div class="card-glare"></div>
                <div class="card-content">
                    <h3 class="card-title" :style="{ color: 'rgb(' + agency.color + ')' }">{{ t(agency, 'name') || agency.name }}</h3>
                    <p class="card-sub">{{ agency.sub }}</p>
                    <p class="card-desc" v-if="t(agency, 'desc')">{{ 
                        t(agency, 'desc').length > 72 ? 
                        t(agency, 'desc').substring(0, 72) + '…' : 
                        t(agency, 'desc') 
                    }}</p>
                </div>
                
                <div class="card-tags" v-if="(agency.resolvedTags || []).length > 0">
                    <span 
                        v-for="tag in (agency.resolvedTags || [])" 
                        :key="tag" 
                        :class="[
                            'card-tag', 
                            tag === 'Defunct' ? 'tag-defunct' : '',
                            tag === 'Investigating' ? 'tag-chosa' : ''
                        ]">
                        {{ formatTag(tag) }}
                    </span>
                </div>
                
                <div class="card-watermark">{{ agency.icon }}</div>
            </div>
        </div>'''

html = re.sub(r'<div class="datapanel-grid" id="agencyGrid">.*?</div>\s*</div>\s*</div>\s*</a>\s*</div>', new_grid, html, flags=re.DOTALL)
# Fallback replacement if regex failed
if 'datapanel-card' not in html:
    # We will do a substring replacement manually
    match = re.search(r'<div class="datapanel-grid" id="agencyGrid">[\s\S]*?</a>\s*</div>', html)
    if match:
        html = html[:match.start()] + new_grid + html[match.end():]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Read and fix script.js to include navigateWithTransition and formatTag
with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add handleCardClick and translateTag into setup
methods_injection = '''
        const formatTag = (tag) => {
            if (typeof window.translateAgencyTag === 'function') {
                if (tag === 'Defunct' && currentLang.value.split('-')[0] === 'ja') return '活動終了';
                if (tag === 'Investigating') return window.translateAgencyTag('In Progress');
                return window.translateAgencyTag(tag);
            }
            return tag;
        };

        const handleCardClick = (agency) => {
            const tags = agency.resolvedTags || [];
            if (agency.url && agency.url !== '#') {
                if (typeof window.navigateWithTransition === 'function') {
                    window.navigateWithTransition(agency.url);
                } else {
                    window.location.href = agency.url;
                }
            } else if (tags.includes('Investigating')) {
                const tr = window.translations ? window.translations[currentLang.value] : null;
                alert(tr && tr.alert_investigating ? tr.alert_investigating : 'Under investigation.');
            } else {
                const tr = window.translations ? window.translations[currentLang.value] : null;
                alert(tr && tr.alert_not_active ? tr.alert_not_active : 'Not ready yet.');
            }
        };
'''
if 'formatTag' not in js:
    js = js.replace('const setupFxLayers', methods_injection + '\n        const setupFxLayers')
    js = js.replace('setFilter, t, totalAgencies }', 'setFilter, t, totalAgencies, formatTag, handleCardClick }')
    
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(js)

print("Vue card structures and scripts successfully realigned with Vanilla JS classes.")
