// Import required modules
const express = require('express');
const requireText = require('require-text');
const pwshRunner = require('./pwshRunner');
const combinePwsh = require('./combinePwsh');
const path = require('path');
const psScript = requireText((path.join(__dirname, 'pwsh-script.ps1')), require);

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
        message: `You Posted: ${JSON.stringify(requestJson)}`,
        status: 'Great Success!',
        reaction: '~* ~* Much Joy *~ *~'
    };
    res.send(response);
});

// Post endpoint to run powershell script
app.post('/pwsh-json', async (req, res) => {
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));
    console.log('Received the following request body:')
    console.log('#'.repeat(80));
    console.log(req.body);
    console.log('#'.repeat(80));
    console.log('#'.repeat(80));

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
