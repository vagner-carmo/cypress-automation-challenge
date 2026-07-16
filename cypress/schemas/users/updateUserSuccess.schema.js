export const updateUserSuccessSchema = {

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