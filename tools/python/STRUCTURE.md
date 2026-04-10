# STRUCTURE

このフォルダー配下の Python は「サイト生成・整形・検査」用です。ページ表示時に読み込まれるものではありません。

## ディレクトリ

- `3AM/`: 3AM 関連の生成スクリプト
- `Astraline/`: Astraline 関連の生成スクリプト
- `Densetsu/`: Densetsu 関連の生成スクリプト
- `MAHA5/japan/`: MAHA5 Japan 関連の生成スクリプト
- `MarbleCreators/`: MarbleCreators 関連の生成スクリプト
- `NexuStella/`: NexuStella 関連の生成スクリプト
- `VASE/`: VASE 関連の生成スクリプト

## スクリプト一覧（ルート直下）

- `aogiri_i18n.py`: Aogiri まわりの i18n パイプライン（抽出・翻訳・適用の一連）
- `translate_i18n.py`: 翻訳辞書生成の補助（`deep_translator` を使用）
- `prepare_i18n.py`: HTML から i18n 対象を抽出・整形する補助（`bs4` を使用）
- `fix_aogiri_names.py`: 名称ゆれ等の補正（Aogiri）
- `fix_aogiri_names_zh.py`: 中国語表記の補正（Aogiri）

- `migrate_to_vue.py`: 既存 HTML を Vue 前提の構造に寄せる移行（`bs4`）
- `rebuild_script.py`: `script.js` を Vue 用の内容へ再構成（文字列スライス中心）
- `rebuild_script2.py`: `rebuild_script.py` のバリエーション
- `rebuild_script3.py`: `rebuild_script.py` のバリエーション
- `rebuild_script4.py`: `rebuild_script.py` のバリエーション
- `fix_root_vue.py`: ルートの Vue 周りの修正（正規表現中心）
- `fix_vue.py`: 各 HTML の Vue 化を補助（`bs4`）
- `fix_vue_cards.py`: カード/UI 部分の修正補助
- `fix_index.py`: `index.html` まわりの修正補助
- `inject_scripts.py`: スクリプト挿入の補助
- `apply_mobile_opt.py`: モバイル向けの軽量化パッチ適用（`bs4`）
- `manual_revert.py`: 生成物や注入処理の巻き戻し/調整用（`bs4` + `subprocess`）

- `check_progress.py`: 進捗集計（例: `progress_report.json` の生成）
- `check_consistency.py`: 整合性チェック（命名・参照などのルール検査想定）
- `check_outliers.py`: 外れ値検知（例: タグ/表記の偏り検出）
- `check.py`: 簡易チェックの入口
- `dump_logic.py`: ロジック/テンプレ等のダンプ補助（`subprocess`）
- `get_template.py`: テンプレ取り回しの補助（`subprocess`）

## スクリプト一覧（生成系）

- `3AM/generate_3am_chars.py`: 3AM のキャラクターページ生成
- `Astraline/generate_astraline_chars.py`: Astraline のキャラクターページ生成
- `Densetsu/generate_densetsu_chars.py`: Densetsu のキャラクターページ生成
- `MAHA5/japan/generate_maha5_chars.py`: MAHA5 Japan のキャラクターページ生成
- `MarbleCreators/generate_chars.py`: MarbleCreators のキャラクターページ生成
- `NexuStella/generate_pages.py`: NexuStella のページ生成
- `VASE/generate_pages.py`: VASE のページ生成

