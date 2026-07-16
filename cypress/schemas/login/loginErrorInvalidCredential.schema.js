export const loginErrorInvalidCredentialSchema = {

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