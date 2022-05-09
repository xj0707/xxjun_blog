
const loginSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            pattern: "\\w+@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}"
        },
        password: {
            type: "string",
        }
    },
    required: ["email", "password"],
    additionalProperties: false
}


module.exports = {
    loginSchema
}