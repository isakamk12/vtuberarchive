$basePath = "c:\Users\rpgmi\Documents\GitHub\vtuberarchive\Airylee"
$indexFile = Join-Path $basePath "airylee_index.html"
$charDir = Join-Path $basePath "characters"

$content = Get-Content $indexFile
$hrefMatches = [regex]::Matches($content, 'href="characters/([^"]+)"')
$links = $hrefMatches | ForEach-Object { $_.Groups[1].Value }

$broken = 0
$links | ForEach-Object {
    $fullPath = Join-Path $charDir $_
    if (-not (Test-Path $fullPath)) {
        Write-Host "BROKEN LINK: characters/$_" -ForegroundColor Red
        $broken++
    }
}
if ($broken -eq 0) { Write-Host "All character links in Airylee are valid!" -ForegroundColor Green }
