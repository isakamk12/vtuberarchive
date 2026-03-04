document.addEventListener('DOMContentLoaded', () => {
    const agencyGrid = document.getElementById('agencyGrid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const totalAgenciesEl = document.getElementById('totalAgencies');
    const emptyState = document.getElementById('emptyState');

    // Data Structure tailored for Masonry & Filtering
    const agencies = [
        // MAJOR
        { name: "ホロライブ", sub: "hololive production", filter: "major", size: "card-large", color: "0, 210, 255", icon: "H", url: "Hololive/hololive_index.html" },
        { name: "にじさんじ", sub: "NIJISANJI", filter: "major", size: "card-large", color: "255, 65, 108", icon: "N", url: "Nijisanji/nijisanji_index.html" },
        { name: "ぶいすぽっ！", sub: "VSPO!", filter: "major", size: "card-wide", color: "142, 45, 226", icon: "V", url: "Vspo/vspo_index.html" },
        { name: "あおぎり高校", sub: "Aogiri High School", filter: "major", size: "card-wide", color: "17, 153, 142", icon: "A", url: "aogiri_fansite/aogiri_index.html" },

        // CORPORATE (Brave Group, Music, Game Companies)
        { name: "Brave Group", sub: "IP Conglomerate", filter: "corporate", size: "card-wide", color: "255, 140, 0", icon: "B", tags: ["Corporate"], url: "BraveGroup/bravegroup_index.html" },
        { name: "RIOT MUSIC", sub: "Brave group", filter: "corporate", size: "", color: "241, 39, 17", icon: "R", tags: ["Music"], url: "RiotMusic/riotmusic_index.html" },
        { name: "KAMITSUBAKI", sub: "THINKR", filter: "corporate", size: "card-tall", color: "123, 67, 151", icon: "K", tags: ["Music", "Art"], url: "Kamitsubaki/kamitsubaki_index.html" },
        { name: "VEE", sub: "Sony Music", filter: "corporate", size: "", color: "203, 45, 62", icon: "V", tags: ["Sony"], url: "VEE/vee_index.html" },
        { name: "NeoPorte", sub: "ネオポルテ", filter: "corporate", size: "", color: "221, 24, 24", icon: "N", tags: ["Esports"], url: "NeoPorte/neoporte_index.html" },
        { name: "PRISM Project", sub: "Sony Music", filter: "corporate", size: "", color: "79, 172, 254", icon: "P", url: "PrismProject/prismproject_index.html" },
        { name: "HIMEHINA", sub: "Studio LaRa", filter: "corporate", size: "", color: "255, 105, 180", icon: "H", tags: ["Music"], url: "Himehina/himehina_index.html" },

        // INDIE / MID (Familiar to fans)
        { name: "ななしいんく", sub: "774inc.", filter: "indie", size: "card-wide", color: "252, 234, 187", icon: "7", url: "Nanashi/nanashi_index.html" },
        { name: "深層組", sub: "Sinsogumi", filter: "indie", size: "card-tall", color: "135, 0, 0", icon: "S", url: "Shinsogumi/shinsogumi_index.html" },
        { name: "のりプロ", sub: "Noripro", filter: "indie", size: "", color: "248, 87, 166", icon: "N", tags: ["Manga"], url: "Noripro/noripro_index.html" },
        { name: "Palette Project", sub: "パレプロ", filter: "indie", size: "", color: "0, 242, 254", icon: "P", tags: ["Idol"], url: "PaletteProject/paletteproject_index.html" },
        { name: "Re:AcT", sub: "リアクト", filter: "indie", size: "", color: "150, 251, 196", icon: "R", url: "ReAcT/react_index.html" },
        { name: "Varium", sub: "Agency", filter: "indie", size: "", color: "252, 203, 144", icon: "V", url: "Varium/varium_index.html" },
        { name: "個人勢 VTuber", sub: "Independent", filter: "indie", size: "card-wide", color: "255, 142, 83", icon: "I", tags: ["Indie"], url: "#" },

        // GLOBAL (EN, CN, KR)
        { name: "Idol Corp", sub: "EN/IL", filter: "global", size: "card-wide", color: "255, 8, 68", icon: "I", tags: ["EN", "IL"], url: "IdolCorp/idolcorp_index.html" },
        { name: "Phase Connect", sub: "EN Focus", filter: "global", size: "card-tall", color: "63, 43, 150", icon: "P", tags: ["EN"], url: "PhaseConnect/phaseconnect_index.html" },
        { name: "VShojo", sub: "US/JP Indie", filter: "global", size: "card-wide", color: "255, 126, 179", icon: "V", tags: ["EN", "JP"], url: "VShojo/vshojo_index.html" },
        { name: "A-SOUL", sub: "CN", filter: "global", size: "", color: "195, 20, 50", icon: "A", tags: ["CN"], url: "ASOUL/asoul_index.html" },
        { name: "StelLive", sub: "KR Focus", filter: "global", size: "", color: "102, 166, 255", icon: "S", tags: ["KR"], url: "StelLive/stellive_index.html" },
        { name: "Production Kawaii", sub: "JP/EN", filter: "global", size: "", color: "255, 154, 158", icon: "P", url: "ProductionKawaii/productionkawaii_index.html" },
        { name: "V4Mirai", sub: "EN Branch", filter: "global", size: "", color: "0, 114, 255", icon: "V", tags: ["Brave Group"], url: "V4Mirai/v4mirai_index.html" },
        { name: "AkioAIR", sub: "Archived", filter: "global", size: "", color: "70, 130, 180", icon: "A", tags: ["EN"], url: "AkioAIR/akioair_index.html" },
        { name: "CyberLive", sub: "Archived", filter: "global", size: "", color: "0, 255, 255", icon: "C", tags: ["EN"], url: "CyberLive/cyberlive_index.html" },
        { name: "Globie", sub: "EU Branch (Archived)", filter: "global", size: "", color: "255, 215, 0", icon: "G", tags: ["EU"], url: "Globie/globie_index.html" },
        { name: "MyHoloTV", sub: "MY Focus", filter: "global", size: "", color: "32, 178, 170", icon: "M", tags: ["MY"], url: "MyHoloTV/myholotv_index.html" },
        { name: "Tsunderia", sub: "Archived", filter: "global", size: "", color: "255, 99, 71", icon: "T", tags: ["EN"], url: "Tsunderia/tsunderia_index.html" }
    ];

    // Total Count
    document.getElementById('totalAgencies').textContent = agencies.length;

    // Render Function
    function renderAgencies(data) {
        agencyGrid.innerHTML = '';

        if (data.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        data.forEach((agency, index) => {
            const card = document.createElement('div');
            card.className = `agency-card ${agency.size} fade-in`;
            card.style.animationDelay = `${index * 0.05}s`;
            card.style.setProperty('--brand-color-rgb', agency.color);
            card.style.setProperty('--brand-gradient', `linear-gradient(135deg, rgba(${agency.color}, 0.8), rgba(${agency.color}, 0.2))`);

            // Build Tags HTML
            let tagsHTML = '';
            if (agency.tags && agency.tags.length > 0) {
                tagsHTML = `<div class="tags-wrapper">
                    ${agency.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>`;
            }

            card.innerHTML = `
                <div class="card-glitch-bg"></div>
                <div class="corner-accent tl"></div>
                <div class="corner-accent br"></div>
                
                <div class="card-content">
                    <h3 class="agency-name">${agency.name}</h3>
                    <p class="agency-sub">${agency.sub}</p>
                    ${tagsHTML}
                </div>
                <div class="abstract-letter">${agency.icon}</div>
            `;

            // Click listener for navigation
            card.addEventListener('click', () => {
                if (agency.url && agency.url !== '#') {
                    window.location.href = agency.url;
                } else {
                    alert('Status: [DATA ARCHIVE NOT YET ACTIVE]');
                }
            });

            agencyGrid.appendChild(card);
        });
    }

    // Initial Render
    renderAgencies(agencies);

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const searchTerm = searchInput.value.toLowerCase().trim();

            filterAndSearch(filterValue, searchTerm);
        });
    });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        filterAndSearch(activeFilter, searchTerm);
    });

    function filterAndSearch(filterMode, query) {
        let results = agencies;

        // Apply Category Filter
        if (filterMode !== 'all') {
            results = results.filter(item => item.filter === filterMode);
        }

        // Apply Search Filter
        if (query) {
            results = results.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.sub.toLowerCase().includes(query) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
            );
        }

        renderAgencies(results);
    }
});
