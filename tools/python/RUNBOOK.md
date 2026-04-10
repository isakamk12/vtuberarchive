# RUNBOOK

「どれをいつ叩くか」を忘れないためのメモです。実行前に必ず差分確認できる状態（ブランチ、バックアップ）で運用してください。

## 共通の実行場所

多くはリポジトリルート基準で動きます。

```powershell
cd C:\Users\rpgmi\Documents\GitHub\vtuberarchive
```

## 進捗を更新したい

```powershell
python tools\python\check_progress.py
```

生成物の例:

- `progress_report.json`
- `progress_report.txt`

## Vue への移行・注入をやり直したい

対象 HTML を編集する系は破壊的になりがちです。対象ディレクトリを絞ってから実行する運用がおすすめです。

- HTML を Vue 前提のラップ構造に寄せる

```powershell
python tools\python\migrate_to_vue.py
```

- `script.js` を Vue 用に再構成する（ルートの `script.js` を上書きするタイプ）

```powershell
python tools\python\rebuild_script.py
```

`rebuild_script2.py` から `rebuild_script4.py` はバリエーションです。

## モバイル軽量化パッチを当てたい

```powershell
python tools\python\apply_mobile_opt.py
```

## i18n 周りを更新したい

外部依存:

- `beautifulsoup4`
- `deep-translator`

```powershell
python tools\python\aogiri_i18n.py
```

補助:

```powershell
python tools\python\prepare_i18n.py
python tools\python\translate_i18n.py
```

注意:

- 翻訳系はネットワーク依存になりがちです。件数や対象を確認してから実行してください。

