
const registerAdminSchema = {
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
const deleteAdminSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern: "^[1-9]\\d*$"
        }
    },
    required: ["id"],
    additionalProperties: false
}
const updateAdminSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern: "^[1-9]\\d*$"
        },
        nickname: {
            type: "string",
            minLength: 1,
            maxLength: 50
        },
        sex: { enum: ["0", "1", "2"] }

    },
    required: ["id"],
    additionalProperties: false
}

module.exports = {
    registerAdminSchema,
    deleteAdminSchema,
    updateAdminSchema
}