export const deleteUserSuccessSchema = {

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