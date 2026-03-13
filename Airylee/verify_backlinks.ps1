$basePath = "c:\Users\rpgmi\Documents\GitHub\vtuberarchive\Airylee\characters"
$files = Get-ChildItem -Path $basePath -Filter *.html -Recurse

$broken = 0
$files | ForEach-Object {
    $content = Get-Content $_.FullName
    if ($content -notmatch 'href="\.\./\.\./airylee_index\.html"') {
        Write-Host "MISSING BACKLINK: $($_.FullName)" -ForegroundColor Red
        $broken++
    }
}
if ($broken -eq 0) { Write-Host "All character pages have correct backlinks!" -ForegroundColor Green }
