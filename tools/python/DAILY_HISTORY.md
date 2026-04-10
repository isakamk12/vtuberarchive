# DAILY HISTORY

「その日に何ファイル触ったか」だけを、ざっくり日付別に追えるメモです。

数え方:

- Git のコミット履歴から「その日のコミットで変更されたファイル数（ユニークパス）」を集計
- さらに、未コミット（作業中）の変更は別枠で記録

注意:

- `node_modules` をコミットしている日があるため、ファイル数が極端に大きい日があります（= この表は“作業量の目安”程度）。

## 未コミット（作業中）

### 2026-04-10 (JST)

- ステージ済み: `30` ファイル（Python の `git mv` 集約）
- 未追跡: `tools/python/README.md` / `STRUCTURE.md` / `RUNBOOK.md` / `HISTORY.md`（このフォルダーのドキュメント）

## コミット履歴集計（直近）

集計対象: 2026-03-10 以降

| Date (JST) | Files Changed (Unique Paths) |
| --- | ---: |
| 2026-04-07 | 57 |
| 2026-04-03 | 27 |
| 2026-04-01 | 108 |
| 2026-03-30 | 35 |
| 2026-03-29 | 52 |
| 2026-03-28 | 87 |
| 2026-03-27 | 55 |
| 2026-03-26 | 23 |
| 2026-03-25 | 83 |
| 2026-03-24 | 52 |
| 2026-03-23 | 41 |
| 2026-03-22 | 171 |
| 2026-03-20 | 117 |
| 2026-03-19 | 4594 |
| 2026-03-18 | 553 |
| 2026-03-17 | 83 |
| 2026-03-16 | 70 |
| 2026-03-15 | 62 |
| 2026-03-14 | 208 |
| 2026-03-13 | 52 |
| 2026-03-12 | 136 |
| 2026-03-11 | 270 |
| 2026-03-10 | 290 |

## 再集計コマンド（PowerShell）

必要になったら、これで同じ形式を再生成できます。

```powershell
$since='2026-03-10'
$raw = git log --since=$since --date=short --pretty=format:'--%ad' --name-only
$days = @{}
$cur=$null
foreach($line in $raw){
  if($line -like '--*'){
    $cur=$line.Substring(2)
    if(-not $days.ContainsKey($cur)){
      $days[$cur]=New-Object System.Collections.Generic.HashSet[string]
    }
  } elseif($cur -and $line.Trim() -ne ''){
    [void]$days[$cur].Add($line.Trim())
  }
}
$days.GetEnumerator() |
  Sort-Object Name -Descending |
  ForEach-Object { [pscustomobject]@{ Date=$_.Key; FilesChanged=$_.Value.Count } } |
  Format-Table -AutoSize
```

