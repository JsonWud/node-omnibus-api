$now = Get-Date -f 'yyyyMMdd::HHmmss:ffff' # show that the data is live
$ipinfo = Invoke-RestMethod -Uri 'https://ipinfo.io/json' # show we can make a REST call and return data
$jsonObj = $jsonString | ConvertFrom-Json # $jsonString definition will be added before execution by the combinePwsh.js module
try {
    # expected output
    [ordered]@{
        timestamp      = $now
        first          = $jsonObj.first
        last           = $jsonObj.last
        full           = ('{0} {1}' -f $jsonObj.first, $jsonObj.last)
        input          = $jsonString
        serverLocation = ('{0}, {1} (per ipinfo.io)' -f $ipinfo.city, $ipinfo.region)
    } | ConvertTo-Json
}
catch {
    # catch any errors and output them as JSON
    [ordered]@{
        message = 'Catch triggered attempting to output JSON'
        error   = $_.Exception.Message
    } | ConvertTo-Json -Compress
}
