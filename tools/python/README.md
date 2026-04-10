# tools/python

このフォルダーは **VTuber Archive の静的サイト本体ではなく**、HTML/JSON/JS を生成・移行・検査するための Python ユーティリティ置き場です。

2026-04-10 (JST) に、リポジトリ直下や各プロジェクト直下に散っていた `*.py` をここへ集約しました（サイト表示時に `.py` が参照されることは基本ありません）。

## 目的

- 生成: キャラクターページや一覧ページの生成
- 変換/移行: 既存 HTML を Vue 向けに加工、`script.js` の組み替え
- i18n: 抽出、翻訳、辞書生成、テキスト置換
- 検査: 進捗や整合性、外れ値のチェック

## 使い方（最低限）

PowerShell 例:

```powershell
cd C:\Users\rpgmi\Documents\GitHub\vtuberarchive
python tools\python\check_progress.py
```

注意:

- スクリプトによっては **ファイルを書き換えます**（HTML/JS/JSON）。作業ブランチやバックアップ前提で運用してください。
- 一部スクリプトはパスを固定値で持っています（例: `base_dir = r"c:\Users\rpgmi\Documents\GitHub\vtuberarchive"`）。環境が変わったら書き換えが必要です。

## 依存関係

標準ライブラリ以外で確認できたもの:

- `beautifulsoup4`（`bs4`）
- `deep-translator`（`deep_translator`）

インストール例:

```powershell
python -m pip install beautifulsoup4 deep-translator
```

補足:

- `deep_translator` を使う翻訳系はネットワーク依存になりがちです。実行前に対象範囲や回数を確認してください。

## 目次

- `STRUCTURE.md`: 置き場の構造とスクリプト一覧（何がどこにあるか）
- `RUNBOOK.md`: よくある作業手順（どれをどう使うか）
- `HISTORY.md`: 変更履歴（移動の経緯など）
- `DAILY_HISTORY.md`: 日付別の変更ファイル数メモ

## エージェント運用ルール

リポジトリ全体の「エージェントにやらせて良いこと/ダメなこと」は、ルートの `AGENTS.md` を参照。
