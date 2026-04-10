import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Inject Vue CDN in head
html = html.replace('    <script src="i18n.js"></script>\n</head>', '''    <script src="i18n.js"></script>
    <script src=\"https://unpkg.com/vue@3/dist/vue.global.js\"></script>
    <style>
        [v-cloak] { display: none; }
        .mobile-mode-banner {
            background: #ffc83d;
            color: #000;
            text-align: center;
            font-size: 0.85rem;
            padding: 4px;
            font-weight: 900;
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 9999;
            box-shadow: 0 -2px 10px rgba(255, 200, 60, 0.4);
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>''')

# 2. Wrap body with #app
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
html = html.replace('    <!-- Script -->\n    <script src="script.js"></script>\n</body>', '''        <div v-if="isMobile" class="mobile-mode-banner">🚀 Mobile Light Mode (Powered by Vue Virtual DOM)</div>
    </div> <!-- /#app -->

    <!-- Script -->
    <script src="script.js"></script>
</body>''')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html fixed and Vue successfully injected!")
