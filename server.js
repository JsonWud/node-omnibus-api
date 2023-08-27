// Import required modules and scripts
const express = require('express');
const path = require('path');
const fs = require('fs');
const pwshRunner = require('./pwshRunner');
const combinePwsh = require('./combinePwsh');
const { tmpdir } = require('node:os');
// pwsh files to write to temp directory
const pwshAssets = [
    'pwsh-script.ps1',
    'pwsh-script-wparam.ps1',
    'pwsh-spawn-location.ps1'
]
// Create temp directory
const tmpDir = tmpdir()
const tmpFilePath = fs.mkdtempSync(`${tmpDir}${path.sep}`, (err, folder) => {
    if (err) throw err;
    console.log(`tmpdir: ${folder}`);
    return folder;
})
// Write pwsh files to temp directory
pwshAssets.forEach((file) => {
    const pwshFilePath = path.join(tmpFilePath, file)
    console.log(`pwshFilePath: ${pwshFilePath}`);
    fs.writeFileSync(pwshFilePath, fs.readFileSync(path.join(__dirname, `pwsh${path.sep}${file}`), 'utf8'), 'utf8');
})
// Server listens on port:
const port = 3000;

// Create Express app
const app = express();

// Middleware to parse request body
app.use(express.json());

// Simple root endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Simple post endpoint
app.post('/post', (req, res) => {
    const requestJson = req.body;
    console.log(req.body);
    const response = {
        message: `You Posted: ${JSON.stringify(requestJson)}`,
        status: 'Great Success!',
        reaction: '~* ~* Much Joy *~ *~'
    };
    res.json(response);
});

// Post endpoint to run the powershell script from the pkg snapshot path
app.get('/spawn-pwsh-location', async (req, res) => {
    console.error('#'.repeat(80));
    console.log('#'.repeat(80));
    console.log('PWSH-SPAWN-LOCATION:::Returns Get-Location path from spawned pwsh process:')
    console.log('#'.repeat(80));
    console.error('#'.repeat(80));

    const pwshSnapshotFile = path.join(__dirname, `pwsh${path.sep}pwsh-spawn-location.ps1`)
    const pwshContent = fs.readFileSync(pwshSnapshotFile, 'utf8');
    const mode = '-c'
    const args = ''
    await pwshRunner(mode, pwshContent, args)
        .then((output) => {
            res.json(JSON.parse(output));
        })
        .catch((err) => {
            res.json(err);
        });
})



// Post endpoint to dynamically run powershell file from assets folder
app.post('/pwsh-command', async (req, res) => {
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));
    console.log('PWSH-FILE:::Received the following request body:')
    console.log('#'.repeat(80));
    console.log(req.body);
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));

    const commandFileName = req.body.CommandFile;
    const pwshCommandString = fs.readFileSync(path.join(__dirname, `/assets/${commandFileName}.ps1`), 'utf8');
    const pwshScriptBlock = combinePwsh(pwshCommandString, JSON.stringify(req.body));
    const mode = '-c'
    const args = '';
    await pwshRunner(mode, pwshScriptBlock, args)
        .then((output) => {
            res.json(JSON.parse(output));
        })
        .catch((err) => {
            res.json(JSON.parse(err));
        });
});

// Post endpoint to run the powershell script from the tmpdir directory
app.post('/pwsh-temp-file', async (req, res) => {
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));
    console.log('PWSH-TEMP:::Received the following request body:')
    console.log('#'.repeat(80));
    console.log(req.body);
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));

    const pwshFilePath = path.join(tmpFilePath, 'pwsh-script-wparam.ps1')
    console.log(`User just ran the pwsh file: ${pwshFilePath}`);
    const mode = '-f'
    const args = JSON.stringify(req.body);
    const cwd = tmpFilePath;
    await pwshRunner(mode, 'pwsh-script-wparam.ps1', args, cwd)
        .then((output) => {
            res.json(JSON.parse(output));
        })
        .catch((err) => {
            res.json(err);
        });
});



// Start server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
