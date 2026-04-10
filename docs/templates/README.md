# テンプレート / ページ構造ルール

このドキュメントは、ページ追加や生成スクリプト改修時に「同じ型を保つ」ためのガイドです。

## 基本方針

- 静的サイトとして配信できる状態を維持する（HTML/CSS/JS のみで成立）
- 共通の読み込み順序・共通の見た目・共通の命名を崩さない
- 生成スクリプトは「生成物の形」を必ずこのルールに合わせる

## 必須要素（推奨）

HTML:

- `<!DOCTYPE html>` / `lang` / `meta charset` / `meta viewport`
- 主要 CSS の読み込み（例: `styles.css`、各ページ用 CSS）
- 必要な JS の読み込み（例: `mobile_optimize.js`、i18n、Vue）

## 命名・配置（例）

このリポジトリ内で一般的に見えるパターン:

- エージェンシーのハブ: `AgencyName/agencyname_index.html`
- キャラクター: `AgencyName/characters/CharacterName/charactername.html`
- ページ固有 JS: `AgencyName/agencyname_script.js` など（ページ末尾で読み込み）

## 共通スクリプト

- モバイル軽量化: `C:\Users\rpgmi\Documents\GitHub\vtuberarchive\mobile_optimize.js`
- ルート UI: `C:\Users\rpgmi\Documents\GitHub\vtuberarchive\script.js`

## i18n の載せ方

- UI テキストを HTML に直書きするのではなく、可能な限り i18n 側へ集約
- どの i18n ファイルを読むか（`i18n.js` / `i18n_indie.js` など）をページ種別で固定する

## テンプレ変更の手順

- まず「代表ページ」1つに適用して差分確認
- 問題なければ生成スクリプト側へ反映
- 既存ページへ横展開（必要なら自動化スクリプトで一括適用）

TODO:

- 「代表ページ」の指定（どの HTML を基準にするか）
- `<head>` の統一テンプレ（CDN/フォント/アイコン/スタイル）
- 新規ページ作成チェックリスト（リンク、戻り導線、モバイル表示）

