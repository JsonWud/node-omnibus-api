// Import required modules and scripts
const express = require('express');
const path = require('path');
const fs = require('fs');
const pwshRunner = require('./pwshRunner');
const combinePwsh = require('./combinePwsh');
// because we use path.join here, the pwsh script will be included in the pkg executable
const psScript = fs.readFileSync(path.join(__dirname, 'pwsh-script.ps1'), 'utf8');

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
