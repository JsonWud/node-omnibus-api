// Import required modules
const express = require('express');
const psScript = require('./pwsh-script.json');
const pwshRunner = require('./pwshRunner');
const fs = require('fs');

// Create Express app
const app = express();

// Middleware to parse request body
app.use(express.json());

// Define root endpoint
app.get('/', (req, res) => {
    res.send('Hello Jason');
});

// Define post endpoint
app.post('/post', (req, res) => {
    const requestJson = req.body;
    console.log(req.body);
    const response = {
        message: `You sent me ${JSON.stringify(requestJson)}`,
        status: 'success',
        reaction: 'what a riot!'
    };
    res.send(response);
});

// Post endpoint to run powershell script
app.post('/pwsh-json', async (req, res) => {
    await pwshRunner(psScript['script-content'])
        .then((output) => {
            res.send(output);
        })
        .catch((err) => {
            res.send(err);
        });
});

app.post('/pwsh-ps1', async (req, res) => {
    const ps1Contents = fs.readFileSync('./pwsh-script.ps1', 'utf8');
    await pwshRunner(ps1Contents)
        .then((output) => {
            res.send(output);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Start server
app.listen(3000, () => console.log('Server ready'));
