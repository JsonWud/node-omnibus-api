// exports a module function that accepts two strings
// prepend the first string to the second string
// then base64 encode the result
// and return the result

function encodePwsh(script, inputString) {
    const encodedString = Buffer.from(`$jsonString = '${inputString}'\n${script}`).toString('base64');
    return encodedString;
}

module.exports = encodePwsh;