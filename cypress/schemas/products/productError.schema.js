export const productErrorSchema = {

    type: 'object',
    required: [
        'message'
    ],
    properties: {
        message: {
            type: 'string'
        }
    },
    additionalProperties: false

}