function combinePwsh(script, inputString) {
    const logBanner = require('./logBanner');
    const combinedString = `& {$jsonString = '${inputString}'
${script}}`;
    logBanner('Combined Pwsh Command:', combinedString)
    return combinedString;
}

module.exports = combinePwsh;