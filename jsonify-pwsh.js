// Read the contents of pwsh-script.ps1 and output a JSON object with two properties:
// script-name: pwsh-script.ps1
// script-content: the contents of pwsh-script.ps1
const fs = require('fs');
const ps1Contents = fs.readFileSync('./pwsh-script.ps1', 'utf8');
const psScript = {
    'script-name': 'pwsh-script.ps1',
    'script-content': ps1Contents
};
fs.writeFileSync('./pwsh-script.json', JSON.stringify(psScript, null, 4));