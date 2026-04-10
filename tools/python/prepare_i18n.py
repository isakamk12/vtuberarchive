import os
import re
import json
from bs4 import BeautifulSoup, NavigableString

target_files = [
    r'IndieVtubers\characters\Ironmouse\ironmouse.html',
    r'IndieVtubers\characters\KawasakiSui\kawasakisui.html',
    r'IndieVtubers\characters\Mikeneko\mikeneko.html',
    r'IndieVtubers\characters\NiitoWai\niitowai.html',
    r'IndieVtubers\characters\SamekoSaba\samekosaba.html',
    r'IndieVtubers\characters\ShigureUi\shigureui.html'
]

jp_regex = re.compile(r'[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]')
extracted_data = {}

for file_path in target_files:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    page_name = os.path.basename(file_path).split('.')[0]
    count = 1
    
    if soup.title and jp_regex.search(soup.title.string or ""):
        key = f"{page_name}_title"
        extracted_data[key] = soup.title.string.strip()
        soup.title['data-i18n'] = key
        
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if meta_desc and jp_regex.search(meta_desc.get('content', '')):
        key = f"{page_name}_meta_desc"
        extracted_data[key] = meta_desc['content'].strip()
        meta_desc['data-i18n'] = key

    # Collect strings first to avoid mutating while iterating
    strings_to_process = []
    for string in soup.find_all(string=True):
        if string.parent.name in ['script', 'style', 'head', 'meta', 'title']:
            continue
        text = string.strip()
        if text and jp_regex.search(text):
            strings_to_process.append(string)

    for string in strings_to_process:
        text = string.strip()
        key = f"{page_name}_text_{count}"
        extracted_data[key] = text
        parent = string.parent
        # If parent only contains this string (after stripping), add data-i18n to parent
        if len([c for c in parent.contents if isinstance(c, NavigableString) and c.strip() or c.name]) == 1:
            if not parent.has_attr('data-i18n'):
                parent['data-i18n'] = key
                count += 1
            else:
                # Wrap in span to handle edge cases
                new_span = soup.new_tag("span")
                new_span['data-i18n'] = key
                new_span.string = string
                string.replace_with(new_span)
                count += 1
        else:
            new_span = soup.new_tag("span")
            new_span['data-i18n'] = key
            new_span.string = string
            string.replace_with(new_span)
            count += 1

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Processed {file_path}, extracted {count-1} text nodes.")

with open('extracted_ja.json', 'w', encoding='utf-8') as f:
    json.dump(extracted_data, f, ensure_ascii=False, indent=2)
