$jsonObj = $jsonString | ConvertFrom-Json -Depth 100

[ordered]@{
    timestamp     = (Get-Date -f 'yyyyMMdd::HHmmss:ffff')
    YourMessage   = $jsonObj.Message
    OriginalInput = $jsonString
    AssetFile     = $jsonObj.AssetFile
} | ConvertTo-Json