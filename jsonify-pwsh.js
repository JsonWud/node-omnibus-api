function jsonifyPwsh(script, inputString) {
    return new Promise((resolve, reject) => {
        const encoder = require('./encode-pwsh');
        const encodedPwsh = encoder(script, inputString);
        const psScript = {
            'script-name': 'pwsh-script.ps1',
            'script-content': encodedPwsh
        };
        resolve(psScript);
    });
}

module.exports = jsonifyPwsh;
