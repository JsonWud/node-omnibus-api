function Resolve-Condition {
    [CmdletBinding()]
    param(
        $rootHash
    )
    $rootHash += @{
        preCondition = [ordered]@{
            if         = 'jdfljsldfjksldjflsfj'
            comparator = '='
            value      = '{Some_Complex_Thang}'
        }
    }
    $conditionOutcome = [ordered]@{
        parsed = 'khfkjhdfksjhdfkshdkjhsdgkjdgfkdfkdhgkdfjhgkdsdkjhfsdfkfhjs'
        result = $false
    }
    
    $rootHash += $conditionOutcome
}


$conditionHash = [ordered]@{}
Resolve-Condition -rootHash $conditionHash
$conditionHash | ConvertTo-Json -Depth 10



$things = 1, 3, 4, 6, 7, 9
foreach ($thing in $things) {
    $foreach.Current
    if ($foreach.Current -eq $things[-1]) {
        '.'
    }
}

'1', '2' -join ','