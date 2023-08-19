# function that converts a string to base64
function ConvertTo-Base64 {
    param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [string]$String
    )
    process {
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($String)
        [System.Convert]::ToBase64String($bytes)
    }
}