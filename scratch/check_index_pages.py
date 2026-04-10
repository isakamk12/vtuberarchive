
import os
import re

def check_urls():
    script_path = "c:/Users/rpgmi/Documents/GitHub/vtuberarchive/script.js"
    with open(script_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Simple regex to find "url: '...'"
    urls = re.findall(r"url:\s*['\"]([^'\"]+)['\"]", content)
    
    missing = []
    placeholders = []
    
    for url in urls:
        if url == "#":
            continue
            
        full_path = os.path.join("c:/Users/rpgmi/Documents/GitHub/vtuberarchive", url)
        if not os.path.exists(full_path):
            missing.append(url)
        else:
            size = os.path.getsize(full_path)
            if size < 3000:
                with open(full_path, "r", encoding="utf-8") as f:
                    file_content = f.read()
                    if "整備中" in file_content or "Under construction" in file_content:
                        placeholders.append(url)
    
    print("Missing Index Pages:")
    for m in missing:
        print(f"- {m}")
    
    print("\nPlaceholder Index Pages:")
    for p in placeholders:
        print(f"- {p}")

if __name__ == "__main__":
    check_urls()
