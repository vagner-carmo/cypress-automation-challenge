export const getAllProductsSchema = {

    type: 'object',

    required: [
        'quantidade',
        'produtos'
    ],

    properties: {

        quantidade: {
            type: 'number'
        },

        produtos: {

            type: 'array',

            items: {

                type: 'object',

                required: [
                    'nome',
                    'preco',
                    'descricao',
                    'quantidade',
                    '_id'
                ],

                properties: {

                    nome: {
                        type: 'string'
                    },

                    preco: {
                        type: 'number'
                    },

                    descricao: {
                        type: 'string'
                    },

                    quantidade: {
                        type: 'number'
                    },

                     _id: {
                        type: 'string'
                    }

                },

                additionalProperties: true

            }

        }

    },

    additionalProperties: true

}