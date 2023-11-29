function ConvertTo-NestedObject {
    param (
        [Parameter(Mandatory = $true)]
        [array]$InputArray
    )
    
    $result = @{}
    
    foreach ($item in $InputArray) {
        $path = $item.path -split '\.'
        $value = $item.value
        $current = $result
        
        for ($i = 0; $i -lt $path.Length; $i++) {
            $key = $path[$i]
            
            if ($i -eq $path.Length - 1) {
                $current[$key] = $value
            }
            else {
                if (-not $current.ContainsKey($key)) {
                    $current[$key] = @{}
                }
                
                $current = $current[$key]
            }
        }
    }
    
    return $result
}

# Test the function
$json = @'
[
    {"path": "level1.level2.keyA", "value": "valueA"},
    {"path": "level1.level2.keyB", "value": "valueB"},
    {"path": "level1.level2.keyC", "value": "valueC"}
]
'@

$inputArray = $json | ConvertFrom-Json
$result = ConvertTo-NestedObject -InputArray $inputArray
$result | ConvertTo-Json
