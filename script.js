document.addEventListener('DOMContentLoaded', () => {
    const agencyGrid = document.getElementById('agencyGrid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const totalAgenciesEl = document.getElementById('totalAgencies');
    const emptyState = document.getElementById('emptyState');

    const agencies = [

        // ── JAPAN (稼働中) ──
        { name: "あおぎり高校", sub: "Aogiri High School", filter: "major", color: "17, 153, 142", icon: "A", url: "aogiri_fansite/aogiri_index.html", tags: ["Comedy", "Shorts"], desc: "都内の中小規模事務所からスタートし、現在は独自のコメディ路線で盤石な人気を誇っている。公式サイトでは各部員の詳細なプロフィールが閲覧可能。" },
        { name: "APP LAND", sub: "アップランド", filter: "corporate", color: "80, 200, 120", icon: "A", url: "AppLand/appland_index.html", tags: ["Agency", "JP"], desc: "電脳少女シロをはじめとする老舗。独自の技術力とバラエティ豊かな所属タレントが特徴で、公式サイトの更新も継続されている。" },
        { name: "RK Music", sub: "アールケーミュージック", filter: "corporate", color: "255, 80, 80", icon: "R", url: "RKMusic/rkmusic_index.html", tags: ["Music", "JP"], desc: "音楽特化型の事務所。所属シンガーのクオリティが高く、アーティストとしてのブランディングが公式サイトからも読み取れる。" },
        { name: "うおむすめ", sub: "Uomusume", filter: "indie", color: "100, 200, 255", icon: "U", url: "Uomusume/uomusume_index.html", tags: ["Variety", "JP"], desc: "魚をモチーフにした個性派プロジェクト。独自のニッチな層を掴んでおり、現在も活動を継続中。" },
        { name: "エアリープロダクション", sub: "Airy Production", filter: "indie", color: "135, 206, 235", icon: "A", url: "Airy/airy_index.html", tags: ["Agency", "JP"], desc: "複数の期生を擁し、着実に規模を拡大している。公式サイトはモダンな設計で、タレントごとのスケジュール確認も容易だ。" },
        { name: "AKA Virtual", sub: "AKAバーチャル", filter: "indie", color: "220, 20, 60", icon: "A", url: "AKAVirtual/akavirtual_index.html", tags: ["Agency", "JP"], desc: "3D技術に強みを持ち、グローバルな展開も見据えた運営を行っている。公式サイトは多言語対応が進んでいる。" },
        { name: "ENILIS VLiver", sub: "ENILIS Project", filter: "indie", color: "100, 255, 200", icon: "E", url: "Enilis/enilis_index.html", tags: ["Agency", "JP"], desc: "配信プラットフォームと密接に連携したプロジェクト。比較的新しい組織だが、精力的な募集とデビューを繰り返している。" },
        { name: "えのぐ", sub: "enogu", filter: "corporate", color: "255, 180, 50", icon: "E", url: "Engg/engg_index.html", tags: ["Music", "Idol"], desc: "VRアイドルグループとして独自の地位を築いている。公式サイトはライブ情報やディスコグラフィの整理が非常に丁寧だ。" },
        { name: "KAMITSUBAKI", sub: "神椿スタジオ / THINKR", filter: "corporate", color: "123, 67, 151", icon: "K", url: "Kamitsubaki/kamitsubaki_index.html", tags: ["Virtual Art", "Music"], desc: "音楽と物語を融合させた独特の世界観を持つ。公式サイトは非常に芸術性が高く、所属する歌唱魔女たちの情報が詳細に記されている。" },
        { name: "キズナアイ", sub: "Kizuna AI", filter: "corporate", color: "255, 105, 180", icon: "K", url: "KizunaAI/kizunaai_index.html", tags: ["Legend", "Pioneer"], desc: "現在はスリープ（活動休止）中ではあるが、公式サイトおよびプロジェクトとしての基盤は維持されており、関連展開も続いている。" },
        { name: "けものフレンズV", sub: "けもフレVぷろじぇくと", filter: "indie", color: "255, 180, 80", icon: "K", url: "KemonoFriendsV/kemono_index.html", tags: ["Media Mix", "JP"], desc: "メディアミックスの強みを活かした運営。公式サイトでは既存のIPと連動したタレント紹介が行われている。" },
        { name: "シンセマニアクス", sub: "Synthemaniacs", filter: "indie", color: "50, 255, 200", icon: "S", url: "Synthemaniacs/synth_index.html", tags: ["Music", "Synth"], desc: "音楽制作に重きを置いたグループ。クリエイターとタレントの距離が近く、公式サイトでも楽曲紹介が中心となっている。" },
        { name: "深層組", sub: "Shinsogumi", filter: "indie", color: "135, 0, 0", icon: "S", url: "Shinsogumi/shinsogumi_index.html", tags: ["Underground"], desc: "独自の世界観とファンコミュニティを持つ。公式サイトはアンダーグラウンドな雰囲気を守りつつ、最新情報を発信している。" },
        { name: "Star Facet Production", sub: "スターファセット", filter: "corporate", color: "200, 255, 220", icon: "S", url: "StarFacet/starfacet_index.html", tags: ["Agency", "JP"], desc: "個性を重視したタレント展開が特徴。公式サイトでは各メンバーの特技や配信スタイルが細かく分類されている。" },
        { name: "すぺしゃりて", sub: "Specialite", filter: "indie", color: "255, 160, 200", icon: "S", url: "Specialite/specialite_index.html", tags: ["Idol", "JP"], desc: "ゲーム実況や特定のジャンルに特化したタレントを擁する。公式サイトのデザインは視認性が高く、情報の検索性に優れている。" },
        { name: "超渋谷計画", sub: "Cho Shibuya Keikaku", filter: "corporate", color: "160, 60, 255", icon: "S", url: "ChoShibuya/choshibuya_index.html", tags: ["Tokyo", "Music"], desc: "都市文化と連動したユニークなプロジェクト。公式サイトでは渋谷という街を舞台にした活動報告が掲載されている。" },
        { name: "トリリオンステージ", sub: "Trillion Stage", filter: "corporate", color: "255, 120, 60", icon: "T", url: "TrillionStage/trillionstage_index.html", tags: ["Agency", "JP"], desc: "多角的なエンターテインメント展開を目指す事務所。公式サイトのニュース更新頻度が高く、運営の活発さが伺える。" },
        { name: "ななしいんく", sub: "774inc.", filter: "indie", color: "252, 234, 187", icon: "7", url: "Nanashi/nanashi_index.html", tags: ["Variety"], desc: "大手の一角として長年君臨。グループ統合を経て、現在は公式サイトで一括したタレント管理とイベント告知が行われている。" },
        { name: "にじさんじ", sub: "NIJISANJI", filter: "major", color: "255, 65, 108", icon: "N", url: "Nijisanji/nijisanji_index.html", tags: ["Pop", "Streamer"], desc: "業界最大手の一つ。公式サイトは膨大な所属ライバーのデータベースとなっており、検索機能や公式グッズ販売への導線が非常に強固だ。" },
        { name: "にゃんたじあ！", sub: "Nyantazia", filter: "indie", color: "255, 150, 200", icon: "N", url: "Nyantazia/nyantazia_index.html", tags: ["Cute", "JP"], desc: "猫をモチーフにしたコンセプトが明確な事務所。公式サイトは可愛らしいデザインで統一され、ファン向けのコンテンツが充実している。" },
        { name: "NeoPorte", sub: "ネオポルテ", filter: "corporate", color: "221, 24, 24", icon: "N", url: "NeoPorte/neoporte_index.html", tags: ["Esports", "CR-Mafu"], desc: "ゲームと配信のプロフェッショナルが設立。公式サイトはゲーマー向けのクールなデザインで、大会実績などが詳しく掲載されている。" },
        { name: "NexuStella", sub: "ネクサステラ", filter: "corporate", color: "100, 180, 255", icon: "N", url: "NexuStella/nexustella_index.html", tags: ["Agency", "JP"], desc: "メディア大手のバックアップを受けるプロジェクト。公式サイトは情報公開の透明性が高く、企業としての信頼性が厚い。" },
        { name: "のりプロ", sub: "Noripro", filter: "indie", color: "248, 87, 166", icon: "N", url: "Noripro/noripro_index.html", tags: ["Manga", "Creator"], desc: "漫画家佃煮のりお氏がプロデュース。公式サイトではタレント活動だけでなく、ボイスやグッズの展開が非常に活発に告知されている。" },
        { name: "ハコネクト", sub: "Haconect", filter: "indie", color: "80, 230, 180", icon: "H", url: "HakoNect/hakonect_index.html", tags: ["Agency", "JP"], desc: "着実にファンを増やしている中堅。公式サイトは各タレントの配信スケジュールがカレンダー形式で確認できるようになっている。" },
        { name: "Balus", sub: "バルス", filter: "indie", color: "255, 100, 140", icon: "B", url: "Balus/balus_index.html", tags: ["Idol", "JP"], desc: "技術提供からタレント運営まで幅広く行う。公式サイトは法人向けの情報も充実しており、業界内での立ち位置が明確。" },
        { name: "Palette Project", sub: "パレプロ", filter: "indie", color: "0, 242, 254", icon: "P", url: "PaletteProject/paletteproject_index.html", tags: ["Idol", "Music"], desc: "アイドル活動に特化したグループ。公式サイトはライブ写真や動画が多用されており、パフォーマンスの熱量が伝わる構成だ。" },
        { name: "VEE", sub: "ヴィー / Sony Music", filter: "corporate", color: "203, 45, 62", icon: "V", url: "VEE/vee_index.html", tags: ["Sony", "Variety"], desc: "ソニー・ミュージックによる大型プロジェクト。公式サイトは非常に洗練されており、所属タレントの多様性が強調されている。" },
        { name: "FIRST STAGE PRODUCTION", sub: "ファーストステージ", filter: "corporate", color: "255, 160, 20", icon: "F", url: "FirstStage/firststage_index.html", tags: ["Agency", "JP"], desc: "新進気鋭の事務所として急速にメンバーを増やしている。公式サイトのデザインも新しさを感じさせ、勢いがある。" },
        { name: "vα-liv", sub: "ヴイアライヴ", filter: "indie", color: "180, 100, 255", icon: "V", url: "Valiv/valiv_index.html", tags: ["Idol", "JP"], desc: "バンダイナムコによるアイドル育成プロジェクト。公式サイトではオーディションの進捗やファンの投票結果などが公開されている。" },
        { name: "Varium", sub: "ぶいありうむっ！", filter: "indie", color: "252, 203, 144", icon: "V", url: "Varium/varium_index.html", tags: ["Magic", "Gaming"], desc: "「かわいい」を前面に押し出したプロデュース。公式サイトはファンシーな色使いで、各メンバーのビジュアル紹介に力が入れられている。" },
        { name: "ぶいじだい", sub: "Vuijidai", filter: "indie", color: "255, 100, 80", icon: "V", url: "Buijidai/buijidai_index.html", tags: ["Agency", "JP"], desc: "独自のコンセプトを持つ新興事務所。公式サイトの構築が進んでおり、タレントの個性に合わせた紹介ページが特徴。" },
        { name: "ぶいすぽっ！", sub: "VSPO!", filter: "major", color: "142, 45, 226", icon: "V", url: "Vspo/vspo_index.html", tags: ["Esports", "FPS"], desc: "ゲーム実況とeスポーツに特化した超人気グループ。公式サイトは競技シーンの記録や各メンバーのデバイス情報なども網羅されている。" },
        { name: "VBOX", sub: "ぶいぼっくす", filter: "indie", color: "60, 180, 255", icon: "V", url: "VBOX/vbox_index.html", tags: ["Agency", "JP"], desc: "多様なタレントを抱えるマルチな事務所。公式サイトはシンプルながらも必要な情報が整理されており、使い勝手が良い。" },
        { name: "VRegion", sub: "ブイリージョン", filter: "indie", color: "100, 255, 160", icon: "V", url: "VRegion/vregion_index.html", tags: ["Regional", "JP"], desc: "地域活性化をテーマにした珍しいプロジェクト。公式サイトでは担当地域ごとの活動報告や特産品の紹介などが並ぶ。" },
        { name: "ぶいわんプロダクション", sub: "V-One Production", filter: "indie", color: "255, 130, 50", icon: "V", url: "VOne/vone_index.html", tags: ["Agency", "JP"], desc: "個々のタレントの自由度を尊重する運営。公式サイトでは各々の個性を活かした自由な発信が奨励されている。" },
        { name: "PROJECT NEBULA", sub: "プロジェクトネビュラ", filter: "indie", color: "80, 60, 200", icon: "P", url: "ProjectNebula/nebula_index.html", tags: ["Agency", "JP"], desc: "SF的な世界観を背景に持つ。公式サイトの設定資料ページなどは読み応えがあり、ファンを飽きさせない。" },
        { name: "ProForma Production", sub: "プロフォーマ", filter: "indie", color: "180, 180, 200", icon: "P", url: "ProForma/proforma_index.html", tags: ["Agency", "JP"], desc: "技術的な完成度を求めるプロフェッショナル集団。公式サイトはスペック重視の記載が多く、技術者目線でも興味深い。" },
        { name: "VASE", sub: "ヴェイス", filter: "indie", color: "180, 255, 180", icon: "V", url: "VASE/vase_index.html", tags: ["Agency", "JP"], desc: "多彩なバックグラウンドを持つタレントが所属。公式サイトは芸能事務所としての側面も強く、幅広いメディア展開をサポートしている。" },
        { name: "VOMS project", sub: "GYARI", filter: "indie", color: "100, 220, 140", icon: "V", url: "VOMSProject/voms_index.html", tags: ["Individual", "JP"], desc: "イラストレーターGYARI氏による個人主導のプロジェクト。公式サイトは独特のアートスタイルで統一され、情報がミニマルにまとまっている。" },
        { name: "ホロライブプロダクション", sub: "hololive production", filter: "major", color: "0, 210, 255", icon: "H", url: "Hololive/hololive_index.html", tags: ["Idol", "Global"], desc: "にじさんじと並ぶ業界の双璧。公式サイトは世界中のファンを対象とした多言語対応が完璧で、情報の網羅性は世界一と言える。" },
        { name: "Marble Creators", sub: "マーブルクリエイターズ", filter: "indie", color: "200, 200, 255", icon: "M", url: "Marble/marble_index.html", tags: ["Creator", "JP"], desc: "クリエイターの支援に重きを置く。公式サイトではタレントだけでなく、その背後にいる制作者の情報も大切に扱われている。" },
        { name: "まほろば", sub: "Mahoroba", filter: "indie", color: "220, 180, 255", icon: "M", url: "Mahoroba/mahoroba_index.html", tags: ["Variety", "JP"], desc: "日本文化や和風のコンセプトを取り入れた事務所。公式サイトのビジュアルは和を意識した美しい装丁となっている。" },
        { name: "Mi→RiSE", sub: "みらいず", filter: "indie", color: "100, 220, 255", icon: "M", url: "MiRise/mirise_index.html", tags: ["Agency", "JP"], desc: "次世代のスター発掘を目指す。公式サイトは若年層を意識したポップなデザインで、オーディション情報が目立つ配置になっている。" },
        { name: "ミリプロ", sub: "Million Production", filter: "indie", color: "255, 215, 0", icon: "M", url: "Milliproo/millipro_index.html", tags: ["Idol", "Agency"], desc: "急成長中の個人勢出身者が中心の組織。公式サイトは手作り感がありつつも、熱量の高いファンベースに支えられている。" },
        { name: "MEWLIVE", sub: "みゅ～らいぶ", filter: "indie", color: "255, 180, 200", icon: "M", url: "Mewlive/mewlive_index.html", tags: ["Idol", "JP"], desc: "音楽とライブパフォーマンスを軸にする。公式サイトは音源の視聴機能などが充実しており、音楽好きに優しい。" },
        { name: "ユニバースプロダクション", sub: "Universe Production", filter: "indie", color: "80, 100, 255", icon: "U", url: "Universe/universe_index.html", tags: ["Agency", "JP"], desc: "多角的なタレントマネジメントを行う。公式サイトはビジネスライクで整理されており、企業案件などの相談窓口も分かりやすい。" },
        { name: "ゆにれいど！", sub: "Uniraid!", filter: "indie", color: "255, 200, 80", icon: "Y", url: "Unireido/unireido_index.html", tags: ["Variety", "JP"], desc: "協力プレイや絆をテーマにしたグループ。公式サイトではメンバー間の関係性を示す相関図などが公開されることもある。" },
        { name: "RIOT MUSIC", sub: "Brave Group / ライオット", filter: "corporate", color: "241, 39, 17", icon: "R", url: "RiotMusic/riotmusic_index.html", tags: ["Music", "Live"], desc: "バーチャルアーティストの音楽制作を極める。公式サイトは各アーティストのディスコグラフィが非常に詳しく、音質のこだわりなども語られている。" },
        { name: "Re:AcT", sub: "リアクト", filter: "indie", color: "150, 251, 196", icon: "R", url: "ReAcT/react_index.html", tags: ["Music", "Gaming"], desc: "アイドルとアーティストの融合。公式サイトは長年の運営実績を活かした安定感のあるデザインで、所属人数も多い。" },
        { name: "りーさるぷらん", sub: "Lethal Plan", filter: "indie", color: "80, 255, 150", icon: "R", url: "LethalPlan/lethalplan_index.html", tags: ["Agency", "JP"], desc: "対戦格闘ゲームなどのハードなジャンルに特化した新興勢力。公式サイトはゲーム画面を意識した攻撃的なデザイン。" },
        { name: "Brave Group", sub: "ブレイブグループ", filter: "corporate", color: "255, 140, 0", icon: "B", url: "BraveGroup/bravegroup_index.html", tags: ["Corporate", "HQ"], desc: "数多くの人気事務所を傘下に持つ巨大持ち株会社。公式サイトは企業情報がメインだが、各プロジェクトへのポータルとして機能している。" },
        { name: "HIMEHINA", sub: "ヒメヒナ / Studio LaRa", filter: "corporate", color: "255, 105, 180", icon: "H", url: "Himehina/himehina_index.html", tags: ["Music", "Live"], desc: "田中ヒメと鈴木ヒナによるユニットおよびその運営組織。公式サイトはファンクラブとの連携が非常に深く、独自コンテンツが満載。" },

        // ── GLOBAL (稼働中) ──
        { name: "3AM", sub: "スリーエーエム", filter: "global", color: "80, 100, 200", icon: "3", url: "ThreeAM/threeam_index.html", tags: ["EN", "Agency"], desc: "夜の時間帯をターゲットにしたコンセプト。公式サイトは英語で運営され、深夜帯の配信スケジュールが中心。" },
        { name: "Astraline", sub: "アストラライン", filter: "global", color: "100, 150, 255", icon: "A", url: "Astraline/astraline_index.html", tags: ["EN", "Agency"], desc: "宇宙や近未来を想起させるデザインの公式サイト。英語圏のリスナーに特化したコンテンツを展開している。" },
        { name: "Densetsu.EXE", sub: "デンセツ", filter: "global", color: "50, 255, 100", icon: "D", url: "DensetsuEXE/densetsu_index.html", tags: ["EN", "Gaming"], desc: "日本のサブカルチャーをリスペクトした海外事務所。公式サイトは英語だが、日本のファンにも親しみやすいデザイン。" },
        { name: "MAHA5", sub: "マハパンチャ", filter: "global", color: "255, 60, 100", icon: "M", url: "MAHA5/maha5_index.html", tags: ["MY", "Idol"], desc: "インドネシアを拠点とする最大手。公式サイトはインドネシア語と英語で、現地の文化に根ざした活動を報告している。" },
        { name: "Mythic Talent", sub: "ミシックタレント", filter: "global", color: "200, 100, 255", icon: "M", url: "MythicTalent/mythic_index.html", tags: ["EN", "Agency"], desc: "大規模なタレントマネジメントエージェンシー。公式サイトはプロフェッショナルな印象で、多数のクリエイターを支援。" },
        { name: "Mugen Live", sub: "ムゲンライブ", filter: "global", color: "60, 255, 220", icon: "M", url: "MugenLive/mugenlive_index.html", tags: ["Asia", "Agency"], desc: "アジア圏での展開に力を入れる。公式サイトはシンプルで、各タレントのSNSリンクが整理されている。" },
        { name: "Phase Connect", sub: "フェイズ・コネクト", filter: "global", color: "63, 43, 150", icon: "P", url: "PhaseConnect/phaseconnect_index.html", tags: ["EN", "Coffee"], desc: "英語圏で独特の存在感を放つ。公式サイトは各メンバーのプロフィールが非常に詳しく、海外のミームにも対応している。" },
        { name: "Stellar Verse Productions", sub: "ステラバース", filter: "global", color: "150, 200, 255", icon: "S", url: "StellarVerse/stellarverse_index.html", tags: ["EN", "Agency"], desc: "物語性を重視した海外プロジェクト。公式サイトでは独自の物語世界の設定が英語で綴られている。" },
        { name: "StelLive", sub: "ステルライブ / KR", filter: "global", color: "102, 166, 255", icon: "S", url: "StelLive/stellive_index.html", tags: ["KR", "Music"], desc: "韓国を拠点に強力なファンベースを持つ。公式サイトは韓国語中心だが、ビジュアルの質の高さで海外からも注目されている。" },
        { name: "V&U", sub: "バーチャル＆ユー", filter: "global", color: "255, 180, 80", icon: "V", url: "VandU/vandu_index.html", tags: ["EN", "Agency"], desc: "英語圏のタレントを数多く擁する。公式サイトはスタイリッシュで、各タレントの個性的なビジュアルが引き立つ。" },
        { name: "V4Mirai", sub: "ブイフォーミライ / Brave Group", filter: "global", color: "0, 114, 255", icon: "V", url: "V4Mirai/v4mirai_index.html", tags: ["Brave Group", "EN"], desc: "Brave Groupの海外展開ブランド。公式サイトは日本語と英語のハイブリッドで、国内外の架け橋となっている。" },
        { name: "VOLs", sub: "ヴォルズ", filter: "global", color: "80, 200, 255", icon: "V", url: "VOLs/vols_index.html", tags: ["EN", "Agency"], desc: "独自の技術を用いた配信を売りとする。公式サイトはテクノロジーに詳しくない層にも分かりやすい解説を載せている。" },
        { name: "VShojo", sub: "ヴイショウジョ / US", filter: "global", color: "255, 126, 179", icon: "V", url: "VShojo/vshojo_index.html", tags: ["EN", "JP"], desc: "米国を拠点とするタレントファーストのエージェンシー。公式サイトはタレントごとの自由度が高く、個々のブランドが尊重されている。" },
        { name: "A-SOUL", sub: "アーソウル / CN", filter: "global", color: "195, 20, 50", icon: "A", url: "ASOUL/asoul_index.html", tags: ["CN", "3D Idol"], desc: "中国のテック巨頭によるプロジェクト。公式サイト（主に中国国内向け）は3D技術の粋を集めた豪華な仕様。" },
        { name: "Globie", sub: "グロービー / EU", filter: "global", color: "255, 215, 0", icon: "G", url: "Globie/globie_index.html", tags: ["EU", "Agency"], desc: "欧州市場をメインターゲットとしたプロジェクト。公式サイトは多様な言語や文化への配慮が見られ、国際色豊か。" },

        // ── 調査中（運営状況不明） ──
        { name: "うたたねプロダクション", sub: "Utatane Production", filter: "indie", color: "180, 140, 255", icon: "U", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "N'sARK", sub: "エヌズアーク", filter: "indie", color: "70, 130, 200", icon: "N", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "Guild CQ", sub: "ギルドシーキュー", filter: "indie", color: "200, 160, 80", icon: "G", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "ななはぴ", sub: "NanaHapi", filter: "indie", color: "255, 200, 100", icon: "7", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "ねくすとぴあ", sub: "Nextopia", filter: "indie", color: "100, 160, 255", icon: "N", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "VALTRA", sub: "ヴァルトラ", filter: "indie", color: "140, 80, 255", icon: "V", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "Vebop Project", sub: "ヴィバップ", filter: "indie", color: "255, 200, 50", icon: "V", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "Vlash", sub: "ブラッシュ", filter: "global", color: "255, 80, 60", icon: "V", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "PROMISU", sub: "プロミス", filter: "global", color: "255, 140, 100", icon: "P", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "VEXZ", sub: "ヴェクス", filter: "global", color: "255, 100, 200", icon: "V", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "bondlive", sub: "ボンドライブ", filter: "indie", color: "255, 220, 120", icon: "B", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "MAHA5JAPAN", sub: "マハパンチャ JP", filter: "global", color: "255, 80, 120", icon: "M", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "MeSTAGE", sub: "みいすて", filter: "indie", color: "255, 160, 220", icon: "M", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "MicoLiz", sub: "ミコリス", filter: "indie", color: "200, 100, 255", icon: "M", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "MUSUBIME△", sub: "むすびめ", filter: "indie", color: "160, 255, 200", icon: "M", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "UniVIRTUAL", sub: "ユニバーチャル", filter: "indie", color: "150, 200, 255", icon: "U", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "ラブボックス", sub: "LoveBox", filter: "indie", color: "255, 100, 150", icon: "L", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "re;BON", sub: "リボン", filter: "indie", color: "255, 140, 180", icon: "R", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "Luminaria Production", sub: "るみぷろ", filter: "indie", color: "200, 240, 255", icon: "L", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "Arri Virtual", sub: "アリバーチャル", filter: "global", color: "180, 255, 200", icon: "A", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "AStars production", sub: "エースターズ", filter: "global", color: "255, 230, 80", icon: "A", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "ChromaSHIFT", sub: "クロマシフト", filter: "global", color: "255, 8, 68", icon: "C", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "PRISM Project", sub: "プリズム / Sony Music", filter: "global", color: "79, 172, 254", icon: "P", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "Production Kawaii", sub: "プロダクション・カワイイ", filter: "global", color: "255, 154, 158", icon: "P", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "AkioAIR", sub: "アキオエアー", filter: "global", color: "70, 130, 180", icon: "A", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "CyberLive", sub: "サイバーライブ", filter: "global", color: "0, 255, 255", icon: "C", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "Tsunderia", sub: "ツンデリア", filter: "global", color: "255, 99, 71", icon: "T", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },
        { name: "MyHoloTV", sub: "マイホロティービー / MY", filter: "global", color: "32, 178, 170", icon: "M", url: "#", tags: ["調査中"], desc: "現在の運営状況を調査中のため、詳細情報は一時的に非公開としています。" },

        // ── その他 ──
        { name: "個人勢 VTuber", sub: "Independent", filter: "indie", color: "255, 142, 83", icon: "I", url: "IndieVtubers/indie_index.html", tags: ["Indie", "Global"], desc: "特定の事務所に所属せず活動するVTuber群。多様なジャンルと配信スタイルが共存している。" }
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
            const isDefunct = agency.tags && agency.tags.includes('Defunct');
            card.className = `datapanel-card fade-in${isDefunct ? ' card-defunct' : ''}`;
            card.style.animationDelay = `${index * 0.05}s`;
            card.style.setProperty('--brand-rgb', agency.color);

            // Build Tags HTML
            let tagsHTML = '';
            if (agency.tags && agency.tags.length > 0) {
                tagsHTML = `<div class="card-tags">
                    ${agency.tags.map(tag => {
                        let cls = 'card-tag';
                        if (tag === 'Defunct') cls += ' tag-defunct';
                        if (tag === '調査中') cls += ' tag-chosa';
                        return `<span class="${cls}">${tag}</span>`;
                    }).join('')}
                </div>`;
            }

            // Truncate desc for card display
            const shortDesc = agency.desc
                ? (agency.desc.length > 72 ? agency.desc.substring(0, 72) + '…' : agency.desc)
                : '';

            card.innerHTML = `
                <div class="card-glare"></div>
                <div class="card-content">
                    <h3 class="card-title" style="color: rgb(${agency.color})">${agency.name}</h3>
                    <p class="card-sub">${agency.sub}</p>
                    ${shortDesc ? `<p class="card-desc">${shortDesc}</p>` : ''}
                </div>
                ${tagsHTML}
                <div class="card-watermark">${agency.icon}</div>
            `;

            // 3D Tilt
            let bounds;
            card.addEventListener('mouseenter', () => {
                bounds = card.getBoundingClientRect();
                card.style.transition = 'none';
            });
            card.addEventListener('mousemove', (e) => {
                if (!bounds) bounds = card.getBoundingClientRect();
                const calcX = e.clientX - bounds.left - bounds.width / 2;
                const calcY = e.clientY - bounds.top - bounds.height / 2;
                const intensity = 15;
                const rotateX = (calcY / (bounds.height / 2)) * -intensity;
                const rotateY = (calcX / (bounds.width / 2)) * intensity;
                const glareX = (e.clientX - bounds.left) / bounds.width * 100;
                const glareY = (e.clientY - bounds.top) / bounds.height * 100;
                const glareEl = card.querySelector('.card-glare');
                if (glareEl) glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15), transparent 50%)`;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                bounds = null;
                card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                const glareEl = card.querySelector('.card-glare');
                if (glareEl) glareEl.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.0), transparent 50%)`;
            });
            card.addEventListener('click', () => {
                if (agency.url && agency.url !== '#') {
                    window.location.href = agency.url;
                } else if (agency.tags && agency.tags.includes('調査中')) {
                    alert('【調査中】\n現在の運営状況を調査中のため、このセクターへのアクセスは一時的に制限されています。');
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
        if (filterMode !== 'all') {
            results = results.filter(item => item.filter === filterMode);
        }
        if (query) {
            results = results.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.sub.toLowerCase().includes(query) ||
                (item.desc && item.desc.toLowerCase().includes(query)) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
            );
        }
        renderAgencies(results);
    }
});
