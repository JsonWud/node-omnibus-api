// Import required modules and scripts
const express = require('express');
const path = require('path');
const fs = require('fs');
const pwshRunner = require('./pwshRunner');
const combinePwsh = require('./combinePwsh');
// because we use path.join here, the pwsh script will be included in the pkg executable
const psScript = fs.readFileSync(path.join(__dirname, 'pwsh-script.ps1'), 'utf8');
const port = 3000;

// Create Express app
const app = express();

// Middleware to parse request body
app.use(express.json());

// Define root endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define post endpoint
app.post('/post', (req, res) => {
    const requestJson = req.body;
    console.log(req.body);
    const response = {
        message: `You Posted: ${JSON.stringify(requestJson)}`,
        status: 'Great Success!',
        reaction: '~* ~* Much Joy *~ *~'
    };
    res.send(response);
});

// Post endpoint to run powershell script
app.post('/pwsh-script', async (req, res) => {
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));
    console.log('PWSH-SCRIPT:::Received the following request body:')
    console.log('#'.repeat(80));
    console.log(req.body);
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));

    const pwshCodeBlock = combinePwsh(psScript, JSON.stringify(req.body));
    const mode = '-c'
    const args = '';
    await pwshRunner(mode, pwshCodeBlock, args)
        .then((output) => {
            res.send(output);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Post endpoint to dynamically run powershell file from assets folder
app.post('/pwsh-file', async (req, res) => {
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));
    console.log('PWSH-FILE:::Received the following request body:')
    console.log('#'.repeat(80));
    console.log(req.body);
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));

    const assetFileName = req.body.AssetFile;
    const pwshFileContent = fs.readFileSync(path.join(__dirname, `/assets/${assetFileName}.ps1`), 'utf8');
    const pwshScriptBlock = combinePwsh(pwshFileContent, JSON.stringify(req.body));
    const mode = '-c'
    const args = '';
    await pwshRunner(mode, pwshScriptBlock, args)
        .then((output) => {
            res.send(output);
        })
        .catch((err) => {
            res.send(err);
        });
});

// fs.mkdtempSync(prefix[, options])
// Post endpoint to run the powershell script from the temp directory
app.post('/pwsh-temp', async (req, res) => {
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));
    console.log('PWSH-TEMP:::Received the following request body:')
    console.log('#'.repeat(80));
    console.log(req.body);
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));

    const tempDir = fs.mkdtempSync('pwsh-temp-');
    const tempFilePath = path.join(tempDir, 'pwsh-script.ps1');
    fs.writeFileSync(tempFilePath, psScript, 'utf8');
    const pwshCodeBlock = combinePwsh(tempFilePath, JSON.stringify(req.body));
    const mode = '-c'
    const args = '';
    await pwshRunner(mode, pwshCodeBlock, args)
        .then((output) => {
            res.send(output);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
