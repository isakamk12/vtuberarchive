import json
import re

def update_i18n_file():
    path = 'i18n.js'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the new keys for each language
    # P3: Major criteria
    # P4: Capacity/Separation
    # P5: Tags/Contact
    
    new_data = {
        "ja": {
            "status_notice_major_criteria": "※「メジャー/大手」は「所属人数10人以上」「現役メンバーにチャンネル登録者10万人以上がいる」「現在も継続して活動している」の3条件を満たす場合に該当します。",
            "status_notice_capacity": "※個人・企業とも掲載上限は設けません。ただし個人勢は容量次第で分離サイト化する予定があるため、一時的に削除される場合があります。",
            "status_notice_tags": "※内部タグで管理している項目は、初期段階ではタグ制作が間に合っていない箇所が多い可能性があります。気付いた場合は連絡いただければ反映します。"
        },
        "en": {
            "status_notice_major_criteria": "* 'Major' status is assigned if 3 conditions are met: 10+ members, at least one member with 100k+ subscribers, and currently active.",
            "status_notice_capacity": "* There is no listing limit for both corporate and indie. However, indies may be moved to a separate site based on capacity.",
            "status_notice_tags": "* Many internal tags are still in development. If you notice any missing or incorrect tags, please contact us for updates."
        },
         "en-GB": {
            "status_notice_major_criteria": "* 'Major' status is assigned if 3 conditions are met: 10+ members, at least one member with 100k+ subscribers, and currently active.",
            "status_notice_capacity": "* There is no listing limit for both corporate and indie. However, indies may be moved to a separate site based on capacity.",
            "status_notice_tags": "* Many internal tags are still in development. If you notice any missing or incorrect tags, please contact us for updates."
        },
         "en-AU": {
            "status_notice_major_criteria": "* 'Major' status is assigned if 3 conditions are met: 10+ members, at least one member with 100k+ subscribers, and currently active.",
            "status_notice_capacity": "* There is no listing limit for both corporate and indie. However, indies may be moved to a separate site based on capacity.",
            "status_notice_tags": "* Many internal tags are still in development. If you notice any missing or incorrect tags, please contact us for updates."
        },
         "en-IE": {
            "status_notice_major_criteria": "* 'Major' status is assigned if 3 conditions are met: 10+ members, at least one member with 100k+ subscribers, and currently active.",
            "status_notice_capacity": "* There is no listing limit for both corporate and indie. However, indies may be moved to a separate site based on capacity.",
            "status_notice_tags": "* Many internal tags are still in development. If you notice any missing or incorrect tags, please contact us for updates."
        },
        "es": {
            "status_notice_major_criteria": "* El estado de 'Agencia Principal' se asigna si se cumplen 3 condiciones: 10+ miembros, al menos un miembro con 100k+ suscriptores y actividad actual.",
            "status_notice_capacity": "* No hay límite de listado para corporaciones o independientes. Sin embargo, los independientes podrían moverse a un sitio separado según la capacidad.",
            "status_notice_tags": "* Muchas etiquetas internas están en desarrollo. Si nota que falta alguna etiqueta, contáctenos para actualizarlas."
        },
        "es-419": {
            "status_notice_major_criteria": "* El estado de 'Agencia Principal' se asigna si se cumplen 3 condiciones: 10+ miembros, al menos un miembro con 100k+ suscriptores y actividad actual.",
            "status_notice_capacity": "* No hay límite de listado para corporaciones o independientes. Sin embargo, los independientes podrían moverse a un sitio separado según la capacidad.",
            "status_notice_tags": "* Muchas etiquetas internas están en desarrollo. Si nota que falta alguna etiqueta, contáctenos para actualizarlas."
        },
        "zh-Hans": {
            "status_notice_major_criteria": "* “大型/主要”分类标准：成员10人以上、至少一名成员订阅数超10万、且当前仍活跃。",
            "status_notice_capacity": "* 企业和个人势均不设收录上限。但个人势可能因容量问题择期移至独立分站。",
            "status_notice_tags": "* 内部标签仍处于初期开发阶段，如有遗漏或错误，请联系我们进行更新。"
        },
        "zh-Hant": {
            "status_notice_major_criteria": "* 「大型/主要」分類標準：成員10人以上、至少一名成員訂閱數超10萬、且當前仍活躍。",
            "status_notice_capacity": "* 企業和個人勢均不設收錄上限。但個人勢可能因容量問題擇期移至獨立分站。",
            "status_notice_tags": "* 內部標籤仍處於初期開發階段，如有遺漏或錯誤，請聯繫我們進行更新。"
        },
        "ko": {
            "status_notice_major_criteria": "* '메이저/대형' 기준: 소속 인원 10명 이상, 구독자 10만 명 이상의 멤버 존재, 현재 활동 중.",
            "status_notice_capacity": "* 기업 및 개인세 모두 상한은 없습니다. 단, 개인세는 용량에 따라 별도 사이트로 분리될 수 있습니다.",
            "status_notice_tags": "* 내부 태그는 현재 제작 초기 단계입니다. 누락된 부분이 있다면 연락해 주세요."
        },
        "fr": {
            "status_notice_major_criteria": "* Statut 'Majeur' : 10+ membres, au moins un membre avec 100k+ abonnés, et actuellement actif.",
            "status_notice_capacity": "* Pas de limite de référencement. Cependant, les indies peuvent être déplacés vers un site séparé selon la capacité.",
            "status_notice_tags": "* De nombreux tags internes sont en développement. Si vous remarquez des erreurs, contactez-nous."
        },
        "fr-CA": {
             "status_notice_major_criteria": "* Statut 'Majeur' : 10+ membres, au moins un membre avec 100k+ abonnés, et actuellement actif.",
            "status_notice_capacity": "* Pas de limite de référencement. Cependant, les indies peuvent être déplacés vers un site séparé selon la capacité.",
            "status_notice_tags": "* De nombreux tags internes sont en développement. Si vous remarquez des erreurs, contactez-nous."
        },
        "de": {
            "status_notice_major_criteria": "* 'Groß'-Status: 10+ Mitglieder, mind. ein Mitglied mit 100k+ Abonnenten und derzeit aktiv.",
            "status_notice_capacity": "* Keine Listungsbeschränkung. Unabhängige können jedoch aus Kapazitätsgründen auf eine separate Website verschoben werden.",
            "status_notice_tags": "* Viele interne Tags sind in Entwicklung. Wenn Sie Fehler bemerken, kontaktieren Sie uns bitte."
        },
        "it": {
            "status_notice_major_criteria": "* Stato 'Maggiore': 10+ membri, almeno un membro con 100k+ iscritti e attualmente attivo.",
            "status_notice_capacity": "* Nessun limite di inserimento. Gli indie possono essere spostati in un sito separato per motivi di spazio.",
            "status_notice_tags": "* Molti tag interni sono in sviluppo. Se noti errori, contattaci per aggiornamenti."
        },
        "pt": {
            "status_notice_major_criteria": "* Status 'Principal': 10+ membros, pelo menos um membro com 100k+ inscritos e atualmente ativo.",
            "status_notice_capacity": "* Sem limite de listagem. No entanto, indies podem ser movidos para um site separado devido à capacidade.",
            "status_notice_tags": "* Muitas tags internas estão em desenvolvimento. Se notar erros, entre em contacto connosco."
        },
        "pt-BR": {
            "status_notice_major_criteria": "* Status 'Principal': 10+ membros, pelo menos um membro com 100k+ inscritos e atualmente ativo.",
            "status_notice_capacity": "* Sem limite de listagem. No entanto, indies podem ser movidos para um site separado devido à capacidade.",
            "status_notice_tags": "* Muitas tags internas estão em desenvolvimento. Se notar erros, entre em contato conosco."
        },
        "ru": {
            "status_notice_major_criteria": "* Статус 'Крупные': 10+ участников, минимум один участник с 100k+ подписками, активен.",
            "status_notice_capacity": "* Ограничений по числу нет. Однако инди-проекты могут быть вынесены на отдельный сайт.",
            "status_notice_tags": "* Многие теги находятся в разработке. Если вы заметили ошибки, пожалуйста, свяжитесь с нами."
        },
        "pl": {
            "status_notice_major_criteria": "* Status 'Główny': 10+ członków, min. jeden członek z 100k+ subskrypcjami, aktywny.",
            "status_notice_capacity": "* Brak limitów listowania. Jednak indies mogą zostać przeniesieni na oddzielną stronę.",
            "status_notice_tags": "* Wiele tagów wewnętrznych jest w budowie. Jeśli zauważysz błędy, skontaktuj się z nami."
        },
        "no": {
            "status_notice_major_criteria": "* 'Stor'-status: 10+ medlemmer, minst ett medlem med 100k+ abonnenter, og nåværende aktiv.",
            "status_notice_capacity": "* Ingen listebegrensning. Indier kan imidlertid flyttes til et eget nettsted basert på kapasitet.",
            "status_notice_tags": "* Mange interne tagger er under utvikling. Hvis du merker feil, vennligst kontakt oss."
        },
        "sv": {
            "status_notice_major_criteria": "* 'Stor'-status: 10+ medlemmar, minst en medlem med 100k+ prenumeranter, och aktiv för närvarande.",
            "status_notice_capacity": "* Ingen listningsgräns. Indies kan dock flyttas till en separat webbplats baserat på kapacitet.",
            "status_notice_tags": "* Många interna taggar är under utveckling. Om du märker fel, vänligen kontakta oss."
        },
        "fi": {
            "status_notice_major_criteria": "* 'Suuri'-status: 10+ jäsentä, vähintään yksi jäsen 100k+ tilaajalla, ja tällä hetkellä aktiivinen.",
            "status_notice_capacity": "* Ei listausrajoitusta. Indiet voidaan kuitenkin siirtää erilliselle sivustolle kapasiteetin mukaan.",
            "status_notice_tags": "* Monet sisäiset tagit ovat kehitteillä. Jos huomaat virheitä, ota yhteyttä."
        },
        "fil": {
            "status_notice_major_criteria": "* 'Major' status: 10+ miyembro, may hindi bababa sa isang miyembro na may 100k+ subscribers, at kasalukuyang active.",
            "status_notice_capacity": "* Walang limitasyon sa listing. Ang mga indie ay maaaring ilipat sa hiwalay na site base sa kapasidad.",
            "status_notice_tags": "* Maraming internal tags ay dine-develop pa. Kung may napansing mali, mangyaring makipag-ugnayan sa amin."
        }
    }

    # Use regex to find language blocks and inject content
    # pattern: langKey: { ... }
    for lang, keys in new_data.items():
        # Match the end of the language block
        # Look for something like status_roadmap_no_lat: "...", followed by }
        lang_pattern = rf'({lang}.*?status_roadmap_no_lat: ".*?")(\s*}})'
        match = re.search(lang_pattern, content, re.DOTALL)
        if match:
            injection = ""
            for k, v in keys.items():
                injection += f',\n        {k}: "{v}"'
            content = content[:match.start(2)] + injection + content[match.start(2):]

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated i18n.js successfully.")

if __name__ == "__main__":
    update_i18n_file()
