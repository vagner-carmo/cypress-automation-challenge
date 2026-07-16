export const deleteProductSuccessSchema = {

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