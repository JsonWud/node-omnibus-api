const assert = require('assert');
const combinePwsh = require('../utils/combinePwsh');
const test = require('node:test');

test.describe('combinePwsh', () => {
    test.it('should combine script and input string into a PowerShell command', () => {
        const script = 'Get-ChildItem';
        const inputString = '-Path "C:\\Users\\jasonwood\\Documents"';
        const expectedCommand = `& {$jsonString = '${inputString}'
${script}}`;
        const actualCommand = combinePwsh(script, inputString);
        assert.strictEqual(actualCommand, expectedCommand);
    });
});