$now = Get-Date -f 'yyyyMMdd::HHmmss:ffff'
$jsonObj = $jsonString | ConvertFrom-Json
try {
    [ordered]@{
        timestamp = $now
        first     = $jsonObj.first
        last      = $jsonObj.last
        input     = $jsonString
    } | ConvertTo-Json
}
catch {
    [ordered]@{
        message = 'Catch triggered attempting to output JSON'
        error   = $_.Exception.Message
    } | ConvertTo-Json -Compress
}
