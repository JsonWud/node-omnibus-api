# function to convert base64 to string
function ConvertTo-String {
    param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [string]$Base64
    )
    process {
        $bytes = [System.Convert]::FromBase64String($Base64)
        [System.Text.Encoding]::UTF8.GetString($bytes)
    }
}