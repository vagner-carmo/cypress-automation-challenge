export const updateProductSuccessSchema = {

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