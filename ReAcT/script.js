document.addEventListener('DOMContentLoaded', () => {
    const agencyGrid = document.getElementById('agencyGrid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const totalAgenciesEl = document.getElementById('totalAgencies');
    const emptyState = document.getElementById('emptyState');

    // Data Structure tailored for the Omni-Terminal
    const agencies = [
        // MAJOR
        { name: "ホロライブ", sub: "hololive production", filter: "major", color: "0, 210, 255", icon: "H", url: "Hololive/hololive_index.html", tags: ["Idol", "Global"] },
        { name: "にじさんじ", sub: "NIJISANJI", filter: "major", color: "255, 65, 108", icon: "N", url: "Nijisanji/nijisanji_index.html", tags: ["Pop", "Streamer"] },
        { name: "ぶいすぽっ！", sub: "VSPO!", filter: "major", color: "142, 45, 226", icon: "V", url: "Vspo/vspo_index.html", tags: ["Esports", "FPS"] },
        { name: "あおぎり高校", sub: "Aogiri High School", filter: "major", color: "17, 153, 142", icon: "A", url: "aogiri_fansite/aogiri_index.html", tags: ["Comedy", "Shorts"] },

        // CORPORATE (Brave Group, Music, Game Companies)
        { name: "Brave Group", sub: "IP Conglomerate", filter: "corporate", color: "255, 140, 0", icon: "B", tags: ["Corporate", "HQ"], url: "BraveGroup/bravegroup_index.html" },
        { name: "RIOT MUSIC", sub: "Brave group", filter: "corporate", color: "241, 39, 17", icon: "R", tags: ["Music", "Live"], url: "RiotMusic/riotmusic_index.html" },
        { name: "KAMITSUBAKI", sub: "THINKR", filter: "corporate", color: "123, 67, 151", icon: "K", tags: ["Virtual Art", "Music"], url: "Kamitsubaki/kamitsubaki_index.html" },
        { name: "VEE", sub: "Sony Music", filter: "corporate", color: "203, 45, 62", icon: "V", tags: ["Sony", "Variety"], url: "VEE/vee_index.html" },
        { name: "NeoPorte", sub: "ネオポルテ", filter: "corporate", color: "221, 24, 24", icon: "N", tags: ["Esports", "CR-Mafu"], url: "NeoPorte/neoporte_index.html" },
        { name: "PRISM Project", sub: "Sony Music", filter: "corporate", color: "79, 172, 254", icon: "P", tags: ["Global", "Idol"], url: "PrismProject/prismproject_index.html" },
        { name: "HIMEHINA", sub: "Studio LaRa", filter: "corporate", color: "255, 105, 180", icon: "H", tags: ["Music", "Live"], url: "Himehina/himehina_index.html" },

        // INDIE / MID (Familiar to fans)
        { name: "ななしいんく", sub: "774inc.", filter: "indie", color: "252, 234, 187", icon: "7", tags: ["Variety"], url: "Nanashi/nanashi_index.html" },
        { name: "深層組", sub: "Sinsogumi", filter: "indie", color: "135, 0, 0", icon: "S", tags: ["Underground"], url: "Shinsogumi/shinsogumi_index.html" },
        { name: "のりプロ", sub: "Noripro", filter: "indie", color: "248, 87, 166", icon: "N", tags: ["Manga", "Creator"], url: "Noripro/noripro_index.html" },
        { name: "Palette Project", sub: "パレプロ", filter: "indie", color: "0, 242, 254", icon: "P", tags: ["Idol", "Music"], url: "PaletteProject/paletteproject_index.html" },
        { name: "Re:AcT", sub: "リアクト", filter: "indie", color: "150, 251, 196", icon: "R", tags: ["Music", "Gaming"], url: "ReAcT/react_index.html" },
        { name: "Varium", sub: "Agency", filter: "indie", color: "252, 203, 144", icon: "V", tags: ["Magic", "Gaming"], url: "Varium/varium_index.html" },
        { name: "個人勢 VTuber", sub: "Independent", filter: "indie", color: "255, 142, 83", icon: "I", tags: ["Indie", "Global"], url: "IndieVtubers/indie_index.html" },

        // GLOBAL (EN, CN, KR)
        { name: "Idol Corp", sub: "EN/IL", filter: "global", color: "255, 8, 68", icon: "I", tags: ["EN", "IL"], url: "IdolCorp/idolcorp_index.html" },
        { name: "Phase Connect", sub: "EN Focus", filter: "global", color: "63, 43, 150", icon: "P", tags: ["EN", "Coffee"], url: "PhaseConnect/phaseconnect_index.html" },
        { name: "VShojo", sub: "US/JP Indie", filter: "global", color: "255, 126, 179", icon: "V", tags: ["EN", "JP"], url: "VShojo/vshojo_index.html" },
        { name: "A-SOUL", sub: "CN", filter: "global", color: "195, 20, 50", icon: "A", tags: ["CN", "3D Idol"], url: "ASOUL/asoul_index.html" },
        { name: "StelLive", sub: "KR Focus", filter: "global", color: "102, 166, 255", icon: "S", tags: ["KR", "Music"], url: "StelLive/stellive_index.html" },
        { name: "Production Kawaii", sub: "JP/EN", filter: "global", color: "255, 154, 158", icon: "P", tags: ["Idol"], url: "ProductionKawaii/productionkawaii_index.html" },
        { name: "V4Mirai", sub: "EN Branch", filter: "global", color: "0, 114, 255", icon: "V", tags: ["Brave Group", "EN"], url: "V4Mirai/v4mirai_index.html" },
        { name: "AkioAIR", sub: "Archived", filter: "global", color: "70, 130, 180", icon: "A", tags: ["EN", "Archived"], url: "AkioAIR/akioair_index.html" },
        { name: "CyberLive", sub: "Archived", filter: "global", color: "0, 255, 255", icon: "C", tags: ["EN", "Archived"], url: "CyberLive/cyberlive_index.html" },
        { name: "Globie", sub: "EU Branch", filter: "global", color: "255, 215, 0", icon: "G", tags: ["EU", "Archived"], url: "Globie/globie_index.html" },
        { name: "MyHoloTV", sub: "MY Focus", filter: "global", color: "32, 178, 170", icon: "M", tags: ["MY", "Rebranded"], url: "MyHoloTV/myholotv_index.html" },
        { name: "Tsunderia", sub: "Archived", filter: "global", color: "255, 99, 71", icon: "T", tags: ["EN", "Archived"], url: "Tsunderia/tsunderia_index.html" }
    ];

    // Total Count Update
    totalAgenciesEl.textContent = agencies.length;

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
            card.className = `datapanel-card fade-in`;
            card.style.animationDelay = `${index * 0.05}s`;
            card.style.setProperty('--brand-rgb', agency.color);

            // Build Tags HTML
            let tagsHTML = '';
            if (agency.tags && agency.tags.length > 0) {
                tagsHTML = `<div class="card-tags">
                    ${agency.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                </div>`;
            }

            card.innerHTML = `
                <div class="card-glare"></div>
                <div class="card-content">
                    <h3 class="card-title" style="color: rgb(${agency.color})">${agency.name}</h3>
                    <p class="card-sub">${agency.sub}</p>
                </div>
                ${tagsHTML}
                <div class="card-watermark">${agency.icon}</div>
            `;

            // Setup 3D Tilt interaction logic using requestAnimationFrame for smooth perf
            let bounds;
            let currentRotateX = 0;
            let currentRotateY = 0;

            card.addEventListener('mouseenter', () => {
                bounds = card.getBoundingClientRect();
                card.style.transition = 'none'; // remove transition for smooth tracking
            });

            card.addEventListener('mousemove', (e) => {
                if (!bounds) bounds = card.getBoundingClientRect();

                const calcX = e.clientX - bounds.left - bounds.width / 2;
                const calcY = e.clientY - bounds.top - bounds.height / 2;

                // Tilt intensity logic
                const intensity = 15;
                const rotateX = (calcY / (bounds.height / 2)) * -intensity;
                const rotateY = (calcX / (bounds.width / 2)) * intensity;

                // Adjust glare position
                const glareX = (e.clientX - bounds.left) / bounds.width * 100;
                const glareY = (e.clientY - bounds.top) / bounds.height * 100;

                const glareEl = card.querySelector('.card-glare');
                if (glareEl) {
                    glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15), transparent 50%)`;
                }

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                bounds = null;
                card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

                const glareEl = card.querySelector('.card-glare');
                if (glareEl) {
                    glareEl.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.0), transparent 50%)`;
                }
            });

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
