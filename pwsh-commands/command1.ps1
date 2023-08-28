$convertedString = $jsonString | ConvertFrom-Json -Depth 100

[ordered]@{
    timestamp     = (Get-Date -f 'yyyyMMdd::HHmmss:ffff')
    YourMessage   = $convertedString.Message
    OriginalInput = $jsonString
} | ConvertTo-Json