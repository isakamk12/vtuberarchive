param(
  [Parameter(Mandatory = $false)]
  [string]$Path = "aogiri_translations.json"
)

$ErrorActionPreference = "Stop"

function Get-JsonObjectRange {
  param(
    [Parameter(Mandatory = $true)][string]$Text,
    [Parameter(Mandatory = $true)][string]$PropertyName
  )

  $pattern = '"' + [Regex]::Escape($PropertyName) + '"\s*:\s*\{'
  $m = [Regex]::Match($Text, $pattern)
  if (-not $m.Success) {
    throw "Property '$PropertyName' not found or not an object."
  }

  # Find the opening brace for the object
  $openIndex = $Text.IndexOf('{', $m.Index + $m.Length - 1)
  if ($openIndex -lt 0) { throw "Opening brace not found for '$PropertyName'." }

  $depth = 0
  $inString = $false
  $escape = $false

  for ($i = $openIndex; $i -lt $Text.Length; $i++) {
    $ch = $Text[$i]

    if ($inString) {
      if ($escape) {
        $escape = $false
        continue
      }
      if ($ch -eq '\') {
        $escape = $true
        continue
      }
      if ($ch -eq '"') {
        $inString = $false
        continue
      }
      continue
    }

    if ($ch -eq '"') {
      $inString = $true
      continue
    }

    if ($ch -eq '{') {
      $depth++
      continue
    }
    if ($ch -eq '}') {
      $depth--
      if ($depth -eq 0) {
        return @{ Start = $openIndex; End = $i }
      }
      continue
    }
  }

  throw "Matching closing brace not found for '$PropertyName'."
}

function Apply-Replacements {
  param(
    [Parameter(Mandatory = $true)][string]$Text,
    [Parameter(Mandatory = $true)][string]$Lang
  )

  switch ($Lang) {
    "en" {
      $Text = $Text -replace '\bHe\b', 'She'
      $Text = $Text -replace '\bhe\b', 'she'
      $Text = $Text -replace '\bHim\b', 'Her'
      $Text = $Text -replace '\bhim\b', 'her'
      $Text = $Text -replace '\bHis\b', 'Her'
      $Text = $Text -replace '\bhis\b', 'her'
      $Text = $Text -replace '\bHimself\b', 'Herself'
      $Text = $Text -replace '\bhimself\b', 'herself'
      # De-capitalize mid-sentence artifacts (best-effort).
      $Text = $Text -replace '([a-z0-9,;:\)\]])\sShe\b', '$1 she'
      $Text = $Text -replace '([a-z0-9,;:\)\]])\sHer\b', '$1 her'
      $Text = $Text -replace '([a-z0-9,;:\)\]])\sHerself\b', '$1 herself'
      $Text = $Text -replace '\(She\b', '(she'
      $Text = $Text -replace '\(Her\b', '(her'
      $Text = $Text -replace '\(Herself\b', '(herself'
      return $Text
    }
    "de" {
      $Text = $Text -replace '\bSeinen\b', 'Ihren'
      $Text = $Text -replace '\bseinen\b', 'ihren'
      $Text = $Text -replace '\bSeinem\b', 'Ihrem'
      $Text = $Text -replace '\bseinem\b', 'ihrem'
      $Text = $Text -replace '\bSeines\b', 'Ihres'
      $Text = $Text -replace '\bseines\b', 'ihres'
      $Text = $Text -replace '\bSeiner\b', 'Ihrer'
      $Text = $Text -replace '\bseiner\b', 'ihrer'
      $Text = $Text -replace '\bSeine\b', 'Ihre'
      $Text = $Text -replace '\bseine\b', 'ihre'
      $Text = $Text -replace '\bSein\b', 'Ihr'
      $Text = $Text -replace '\bsein\b', 'ihr'

      $Text = $Text -replace '\bIhn\b', 'Sie'
      $Text = $Text -replace '\bihn\b', 'sie'
      $Text = $Text -replace '\bIhm\b', 'Ihr'
      $Text = $Text -replace '\bihm\b', 'ihr'
      $Text = $Text -replace '\bEr\b', 'Sie'
      $Text = $Text -replace '\ber\b', 'sie'
      return $Text
    }
    "fr" {
      $Text = $Text -replace '\bLui-même\b', 'Elle-même'
      $Text = $Text -replace '\blui-même\b', 'elle-même'
      $Text = $Text -replace '\bIl\b', 'Elle'
      $Text = $Text -replace '\bil\b', 'elle'
      return $Text
    }
    default {
      return $Text
    }
  }
}

$raw = Get-Content -Raw -LiteralPath $Path -Encoding UTF8

foreach ($lang in @("en", "fr", "de")) {
  $range = Get-JsonObjectRange -Text $raw -PropertyName $lang
  $segment = $raw.Substring($range.Start, $range.End - $range.Start + 1)
  $fixed = Apply-Replacements -Text $segment -Lang $lang
  if ($fixed -ne $segment) {
    $raw = $raw.Substring(0, $range.Start) + $fixed + $raw.Substring($range.End + 1)
  }
}

Set-Content -LiteralPath $Path -Value $raw -Encoding UTF8
Write-Output "Updated: $Path"
