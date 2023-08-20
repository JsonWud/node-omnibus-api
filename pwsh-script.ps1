$now = Get-Date -f 'yyyyMMdd::HHmmss:ffff'
$ipinfo = Invoke-RestMethod -Uri 'https://ipinfo.io/json'
$jsonObj = $jsonString | ConvertFrom-Json
try {
    [ordered]@{
        timestamp      = $now
        first          = $jsonObj.first
        last           = $jsonObj.last
        input          = $jsonString
        serverLocation = ('{0}, {1} (per ipinfo.io)' -f $ipinfo.city, $ipinfo.region)
    } | ConvertTo-Json
}
catch {
    [ordered]@{
        message = 'Catch triggered attempting to output JSON'
        error   = $_.Exception.Message
    } | ConvertTo-Json -Compress
}
