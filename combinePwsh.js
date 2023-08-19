function combinePwsh(script, inputString) {
    const combinedString = `& {$jsonString = '${inputString}'
    ${script}}`;
    return combinedString;
}

module.exports = combinePwsh;