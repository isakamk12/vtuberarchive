
import os
import re

def check_unreferenced_dirs():
    root = "c:/Users/rpgmi/Documents/GitHub/vtuberarchive"
    script_path = os.path.join(root, "script.js")
    with open(script_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Simple regex to find "url: '...'"
    urls = re.findall(r"url:\s*['\"]([^'\"]+)['\"]", content)
    referenced_dirs = set()
    for url in urls:
        if url != "#":
            referenced_dirs.add(url.split('/')[0])
            
    all_dirs = [d for d in os.listdir(root) if os.path.isdir(os.path.join(root, d))]
    
    ignore_dirs = {".git", ".venv", "node_modules", "tools", "$indexFile", "About", "relationship", "scratch"}
    
    unreferenced = []
    for d in all_dirs:
        if d not in referenced_dirs and d not in ignore_dirs:
            unreferenced.append(d)
            
    print("Unreferenced Directories (Internal or Pending):")
    for u in unreferenced:
        # Check if it contains an index file
        idx_files = [f for f in os.listdir(os.path.join(root, u)) if "index.html" in f.lower()]
        print(f"- {u} (Contains index: {bool(idx_files)})")

if __name__ == "__main__":
    check_unreferenced_dirs()
