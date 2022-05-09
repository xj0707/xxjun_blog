
const Ajv = require('ajv')
const ajv = new Ajv()
const Exception = require('./exception')

const ajvVerify = (schema, data = {}) => {
    const validating = ajv.compile(schema)
    const valid = validating(data)
    if (!valid) {
        return Exception.apiErr(400, 40000, ajv.errorsText(validating.errors), '参数验证失败')
    }
    return null
}

module.exports = {
    ajvVerify
}