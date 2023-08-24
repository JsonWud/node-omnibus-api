// This is a node module that will export a default function named pwshRunner
// This function will take a string as input and return a promise that will
// resolve to the output of the powershell script
function pwshRunner(mode, script, args) {
    const { spawn } = require('child_process');
    // Wrap the child process in a promise so we can wait for it to finish
    return new Promise((resolve, reject) => {
        // Spawn a child process running pwsh and pass it the script
        const psOutput = spawn('pwsh', [mode, script, args]);
        // Create a variable to hold the output
        let output = '';
        // Add a listener to the stdout stream to capture the output
        psOutput.stdout.on('data', (data) => {
            output += data;
        });
        // Add a listener to the stderr stream to capture any errors
        psOutput.stderr.on('data', (data) => {
            reject(data.toString());
        });
        // Add a listener to the close event to resolve the promise
        psOutput.on('close', (code) => {
            if (code !== 0) {
                reject(`psOutput process exited with code ${code}`);
            }
            resolve(output);
        });
    });
}

// Export the pwshRunner function
module.exports = pwshRunner;