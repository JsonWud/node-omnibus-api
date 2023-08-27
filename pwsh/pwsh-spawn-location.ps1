$thisPath = Get-Location | Select-Object -exp Path
[ordered]@{
    Path = $thisPath
} | ConvertTo-Json -Depth 100
