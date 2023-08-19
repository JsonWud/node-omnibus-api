// Import required modules
const express = require('express');
const requireText = require('require-text');
const pwshRunner = require('./pwshRunner');
const fs = require('fs');
const jsonifyPwsh = require('./jsonify-pwsh');
const combinePwsh = require('./combinePwsh');
const psScript = requireText('./pwsh-script.ps1', require);

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
    console.log(req.body);
    // const base64Script = await jsonifyPwsh(psScript, JSON.stringify(req.body));
    const pwshCodeBlock = combinePwsh(psScript, JSON.stringify(req.body));
    await pwshRunner(pwshCodeBlock)
        .then((output) => {
            res.send(output);
        })
        .catch((err) => {
            res.send(err);
        });
});

// Start server
app.listen(3000, () => console.log('Server ready'));
