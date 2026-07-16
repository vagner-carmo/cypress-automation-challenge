import { faker } from '@faker-js/faker'

export const createUser = () => ({

    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: '123456',
    administrador: 'true'

})