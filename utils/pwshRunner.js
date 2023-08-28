// Either runs a PowerShell script or a PowerShell command based on inputs
function pwshRunner(mode, script, args, cwd) {
    const { spawn } = require('child_process');
    // Optionally set the cwd for the child process if it was passed in
    const options = {
        cwd: cwd
    }
    // Wrap the child process in a promise so we don't block other code
    return new Promise((resolve, reject) => {
        const psOutput = spawn('pwsh', [mode, script, args], options);
        let output = '';

        psOutput.stdout.on('data', (data) => {
            output += data; // Collect the output
        });

        psOutput.stderr.on('data', (data) => {
            reject(data.toString()); // Reject promise on any errors
        });
        // Resolve with the output or reject promise if the process exits with a non-zero code
        psOutput.on('close', (code) => {
            if (code !== 0) {
                reject(`psOutput process exited with code ${code}`);
            }
            resolve(output);
        });
    });
}

module.exports = pwshRunner;