
const addArticleSchema = {
    type: "object",
    properties: {
        title: {
            type: "string"
        },
        content: {
            type: "string"
        }
    },
    required: ["title", "content"],
    additionalProperties: false
}
const deleteArticleSchema = {
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
const updateArticleSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern: "^[1-9]\\d*$"
        },
        content: {
            type: "string",
        },
        title: {
            type: "string"
        }
    },
    required: ["id"],
    additionalProperties: false
}

module.exports = {
    addArticleSchema,
    deleteArticleSchema,
    updateArticleSchema
}