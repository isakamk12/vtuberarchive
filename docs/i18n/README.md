# i18n / 翻訳ルール

このドキュメントは、VTuber Archive 内のテキスト翻訳（多言語対応）を「迷わず・壊さず」運用するためのルール集です。

## 基本方針

- 目的: UI/説明文を多言語化しつつ、キー崩壊や表記ゆれを防ぐ
- 原則: `ja` を基準（ソース）として、他言語は派生として管理する
- 重要: 固有名詞（人名・団体名・作品名）は原則「翻訳しない」（必要なら別途ルール化）

## 対象言語

このリポジトリで見えている言語例:

- `ja`
- `en`
- `es`
- `ko`
- `zh-Hans`（簡体）
- `zh-Hant`（繁体）

追加する場合は、言語コードとフォールバック規則を必ず明記すること。

## 置き場所（例）

- ルート UI: `C:\Users\rpgmi\Documents\GitHub\vtuberarchive\i18n.js`
- 一部ページ: `C:\Users\rpgmi\Documents\GitHub\vtuberarchive\i18n_indie.js`
- Aogiri キャラ用: `C:\Users\rpgmi\Documents\GitHub\vtuberarchive\aogiri_char_i18n.js`
- 生成/整形ツール: `C:\Users\rpgmi\Documents\GitHub\vtuberarchive\tools\python\*.py`

## キー設計

- キーは「意味ベース」で付ける（見た目やページ順序に依存しない）
- キーは一度決めたら変えない（変更すると既存ページが壊れる）
- 新規キー追加時は、`ja` だけでもよいが、未翻訳が分かるようにメモを残す

## 表記ルール（推奨）

- 英数字の全角/半角は言語に合わせる（日本語 UI は基本半角英数、必要に応じて全角）
- 句読点は言語の慣習に合わせる（日本語: 「、。」 / 英語: `, .`）
- 例: 「JP/EN」などのラベルは UI で統一する

## 機械翻訳（自動翻訳）の扱い

- 機械翻訳は「下書き」としてのみ使用可
- 公開用に反映する前に、最低限の目視チェックを入れる
- 可能なら用語集（glossary）で固有名詞や頻出語を固定する

## 用語集（glossary）

TODO:

- 固有名詞の表記（ローマ字/現地語）を固定
- 「Archive / Sector / Agency」などのサイト内用語を固定

## 実行手順（例）

翻訳・抽出などのスクリプト運用は `C:\Users\rpgmi\Documents\GitHub\vtuberarchive\tools\python\RUNBOOK.md` を参照。

