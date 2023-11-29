function Nest-Keys {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Keys,
        [Parameter(Mandatory = $true)]
        $Value
    )

    if (-not $Keys) {
        return $Value
    }

    $nestedObj = [ordered]@{}
    $nestedObj[$Keys[0]] = Nest-Keys -Keys $Keys[1..($Keys.Count - 1)] -Value $Value

    return $nestedObj
}

# Example usage
$keys = @('a', 'b', 'c')
$value = 1
$nestedObj = Nest-Keys -Keys $keys -Value $value
$nestedObj