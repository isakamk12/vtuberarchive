import os
import json

base_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive"
agencies = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d)) and not d.startswith(".") and d not in ["node_modules", ".git"]]

report = []

for agency in agencies:
    char_dir = os.path.join(base_dir, agency, "characters")
    if not os.path.exists(char_dir):
        if os.path.exists(os.path.join(base_dir, agency, f"{agency.lower()}_index.html")):
             report.append({"agency": agency, "status": "No characters folder", "count": 0, "expected": 0})
        continue
    
    # Direct HTML files
    direct_files = [f for f in os.listdir(char_dir) if f.endswith(".html") and f != "template.html"]
    
    # Subdirectories with HTML files
    subdirs = [os.path.join(char_dir, d) for d in os.listdir(char_dir) if os.path.isdir(os.path.join(char_dir, d))]
    subdir_count = 0
    for sd in subdirs:
        if any(f.endswith(".html") for f in os.listdir(sd)):
            subdir_count += 1
            
    count = len(direct_files) + subdir_count
    
    # Check for talents.json or agency_index.html to estimate expected count
    talents_file = os.path.join(base_dir, agency, "talents.json")
    expected = 0
    if os.path.exists(talents_file):
        try:
            with open(talents_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if isinstance(data, list):
                    expected = len(data)
                elif isinstance(data, dict):
                    if "talents" in data:
                        expected = len(data["talents"])
                    elif "members" in data:
                        expected = len(data["members"])
                    else:
                        expected = sum(len(v) for v in data.values() if isinstance(v, list))
        except:
            pass
    
    if expected == 0:
        index_file = os.path.join(base_dir, agency, f"{agency.lower()}_index.html")
        if not os.path.exists(index_file):
             index_file = os.path.join(base_dir, agency, f"{agency}_index.html")
             
        if os.path.exists(index_file):
            with open(index_file, 'r', encoding='utf-8') as f:
                content = f.read()
                expected = content.count("characters/")
            
    if expected == 0 and count == 0:
        continue
        
    status = "Incomplete"
    if count == 0:
        status = "Not Started"
    elif expected > 0 and count >= expected:
        status = "Likely Complete"
    elif expected > 0 and count < expected:
        # Sample one page for placeholder check
        is_placeholder = False
        if len(direct_files) > 0:
            sample_path = os.path.join(char_dir, direct_files[0])
        elif subdir_count > 0:
            sd_files = [f for f in os.listdir(subdirs[0]) if f.endswith(".html")]
            if sd_files:
                sample_path = os.path.join(subdirs[0], sd_files[0])
            else:
                sample_path = None
        else:
            sample_path = None
            
        if sample_path:
            try:
                with open(sample_path, 'r', encoding='utf-8') as f:
                    c = f.read(2000)
                    if "TODO" in c or "PLACEHOLDER" in c.upper() or len(c) < 1500:
                        is_placeholder = True
            except:
                pass
        
        if is_placeholder:
            status = f"Placeholders ({count}/{expected})"
        else:
            status = f"Progressing ({count}/{expected})"
    else:
        status = f"Found {count} pages"

    report.append({"agency": agency, "status": status, "count": count, "expected": expected})

status_order = ["Not Started", "Placeholders", "Progressing", "Found", "Likely Complete"]
report.sort(key=lambda x: (next((i for i, s in enumerate(status_order) if s in x["status"]), 99), x["agency"]))

with open("progress_report.json", "w", encoding="utf-8") as f:
    json.dump(report, f, indent=4, ensure_ascii=False)

print(f"{'Agency':<30} | {'Status':<30} | {'Count':<10}")
print("-" * 75)
for r in report:
    print(f"{r['agency']:<30} | {r['status']:<30} | {r['count']} / {r['expected']}")
