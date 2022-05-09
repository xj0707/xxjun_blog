
const addCommentSchema = {
    type: "object",
    properties: {
        content: {
            type: "string",
        },
        article_id: {
            type: "number",
            pattern: "^[1-9]\\d*$"
        }
    },
    required: ["article_id", "content"],
    additionalProperties: false
}
const deleteCommentSchema = {
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
const updateCommenteSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern: "^[1-9]\\d*$"
        },
        content: {
            type: "string",
        }
    },
    required: ["id"],
    additionalProperties: false
}

module.exports = {
    addCommentSchema,
    deleteCommentSchema,
    updateCommenteSchema
}