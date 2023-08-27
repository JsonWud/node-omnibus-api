function testJson(jsonObject, schemaObject) {
    const jsonSchema = require('jsonschema')
    const testResult = jsonSchema.validate(jsonObject, schemaObject)
    return testResult
}

module.exports = testJson;