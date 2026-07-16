import { faker } from '@faker-js/faker'

export const createProduct = () => ({

    nome: faker.commerce.productName(),
    preco: faker.number.int({
        min: 100,
        max: 5000
    }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({
        min: 1,
        max: 100
    })

})