// Import required modules and scripts
const express = require('express');
const path = require('path');
const fs = require('fs');
const pwshRunner = require('./utils/pwshRunner');
const combinePwsh = require('./utils/combinePwsh');
const logBanner = require('./utils/logBanner');
const { tmpdir } = require('node:os');
// Create temp directory
const osTmpDir = tmpdir()
const thisTmpDir = fs.mkdtempSync(`${osTmpDir}${path.sep}`, (err, folder) => {
    if (err) throw err;
    return folder;
})
// pwsh files to write to temp directory
const pwshFiles = [
    'pwsh-script.ps1',
    'pwsh-script-wparam.ps1',
    'pwsh-spawn-location.ps1'
]
// Write pwsh files to temp directory
pwshFiles.forEach((file) => {
    const pwshFilePath = path.join(thisTmpDir, file)
    console.log(`Writing ${file} to: ${pwshFilePath}`);
    fs.writeFileSync(pwshFilePath, fs.readFileSync(path.join(__dirname, `pwsh-files${path.sep}${file}`), 'utf8'), 'utf8');
})
// Server listens on port:
const port = 3000;

// Create Express app
const app = express();

// Middleware to parse request body
app.use(express.json());

// Simple root endpoint
app.get('/', (req, res) => {
    logBanner('SIMPLE-GET:::Returns Hello World!');
    res.send('Hello World!');
});

app.get('/timestamp', (req, res) => {
    logBanner('SIMPLE-GET:::Returns timestamp:');
    const timestamp = Date.now();
    res.send(timestamp.toString());
})

// Simple post endpoint
app.post('/post', (req, res) => {
    logBanner('SIMPLE-POST:::Received the following request body:', req.body);
    const response = {
        message: `You Posted: ${JSON.stringify(req.body)}`,
        status: 'Great Success!',
        reaction: '~* ~* Much Joy *~ *~'
    };
    res.json(response);
});

// Post endpoint to run the powershell script from the pkg snapshot path
app.get('/spawn-pwsh-location', async (req, res) => {
    logBanner('PWSH-SPAWN-LOCATION:::Returns Get-Location path from spawned pwsh process:')
    const pwshSnapshotFile = path.join(__dirname, `pwsh-files${path.sep}pwsh-spawn-location.ps1`)
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

//  /spawn-pwsh-location-wconfig
app.get('/spawn-pwsh-location-wconfig', async (req, res) => {
    logBanner('PWSH-SPAWN-LOCATION:::Returns Get-Location path from spawned pwsh process:')
    const pwshSnapshotFile = path.join(__dirname, `pwsh-files${path.sep}pwsh-spawn-location.ps1`)
    const pwshContent = fs.readFileSync(pwshSnapshotFile, 'utf8');
    const mode = '-c'
    const args = ''
    const cwd = thisTmpDir
    await pwshRunner(mode, pwshContent, args, cwd)
        .then((output) => {
            res.json(JSON.parse(output));
        })
        .catch((err) => {
            res.json(err);
        });
})


// Post endpoint to dynamically run powershell file from assets folder
app.post('/pwsh-command', async (req, res) => {
    logBanner('PWSH-FILE:::Received the following request body:', req.body);
    const commandFileName = req.body.CommandFile;
    const pwshCommandString = fs.readFileSync(path.join(__dirname, `pwsh-commands${path.sep}${commandFileName}.ps1`), 'utf8');
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
    logBanner('PWSH-TEMP:::Received the following request body:', req.body);
    const pwshFilePath = path.join(thisTmpDir, 'pwsh-script-wparam.ps1')
    console.log(`(User just ran the pwsh file: ${pwshFilePath})`);
    const mode = '-f'
    const args = JSON.stringify(req.body);
    const cwd = thisTmpDir
    await pwshRunner(mode, 'pwsh-script-wparam.ps1', args, cwd)
        .then((output) => {
            res.json(JSON.parse(output));
        })
        .catch((err) => {
            res.json(err);
        });
});

// Start server
app.listen(port, () => logBanner(`Server listening on port ${port}!`));
