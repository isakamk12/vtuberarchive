import subprocess
import re

result = subprocess.run(['git', 'show', 'HEAD:script.js'], capture_output=True, text=True, encoding='utf-8')
js = result.stdout

match = re.search(r'card\.innerHTML = `(.*?)`;', js, re.DOTALL)
if match:
    with open('template.txt', 'w', encoding='utf-8') as f:
        f.write(match.group(1).strip())
    print("Template extracted.")
else:
    print("Could not find template.")
