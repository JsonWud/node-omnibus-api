const testJson = require('../testJson');
const test = require('node:test');
const assert = require('node:assert')

test.describe('testJson', () => {
    const schemaObj = {
        type: 'object',
        properties: {
            name: { type: 'string' },
            age: { type: 'number' },
            email: { type: 'string', format: 'email' },
        },
        required: ['name', 'age', 'email'],
    };

    test.it('should return no errors for valid JSON', () => {
        const jsonString = '{"name": "John Doe", "age": 30, "email": "johndoe@example.com"}';
        const jsonObject = JSON.parse(jsonString);
        const result = testJson(jsonObject, schemaObj);
        console.log(result);
        assert.strictEqual(result.errors.length, 0);
    });

    test.it('should return errors for invalid JSON', () => {
        const jsonString = '{"name": "John Doe", "age": "30", "email": "johndoe@example.com"}';
        const jsonObject = JSON.parse(jsonString);
        const result = testJson(jsonObject, schemaObj);
        console.log(result);
        assert(result.errors.length > 0);
    });
});