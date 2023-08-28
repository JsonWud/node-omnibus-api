function combinePwsh(script, inputString) {
    const combinedString = `& {$jsonString = '${inputString}'
${script}}`;
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));
    console.log('Combined Pwsh Command:');
    console.log('#'.repeat(80));
    console.log(combinedString);
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));
    return combinedString;
}

module.exports = combinePwsh;