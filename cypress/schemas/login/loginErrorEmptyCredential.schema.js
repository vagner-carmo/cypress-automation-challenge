export const loginErrorEmptyCredentialSchema = {

    type: 'object',

    required: [
        'email',
        'password'
    ],

    properties: {

        email: {
            type: 'string'
        },

        password: {
            type: 'string'
        }

    },

    additionalProperties: false

}