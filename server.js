// Import required modules
const express = require('express');

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

// Start server
app.listen(3000, () => console.log('Server ready'));
