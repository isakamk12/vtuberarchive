import subprocess
import re

result = subprocess.run(['git', 'show', 'HEAD:script.js'], capture_output=True, text=True, encoding='utf-8')
js = result.stdout

start = js.find('function renderAgencies(data)')
end = js.find('function setupTouchEffects')

if start != -1 and end != -1:
    with open('card_logic.txt', 'w', encoding='utf-8') as f:
        f.write(js[start:end])
    print("Dumped card logic.")
