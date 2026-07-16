export const deleteUserShoppingCarErrorSchema = {

    type: 'object',
    required: [
        'message',
        'idCarrinho'
    ],
    properties: {
        message: {
            type: 'string'
        },
        idCarrinho: {
            type: 'string'
        }
    },
    additionalProperties: false

}