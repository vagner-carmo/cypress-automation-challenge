import UserRegisterPage from '../../pages/UserRegister/UserRegisterPage'
import { faker } from '@faker-js/faker'

describe('Users front-end', () => {

    it('Should create a user successfully', () => {

        const usuario = {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: '123456',
            administrador: true
        }

        UserRegisterPage.acessarPagina()
        UserRegisterPage.cadastrarUsuario(usuario)
        UserRegisterPage.validarCadastroComSucesso()

    })

    it('Should not create a user with an existing email', () => {

        const usuario = {
            nome: "Fulano da Silva",
            email: "fulano@qa.com",
            senha: '123456',
            administrador: true
        }

        UserRegisterPage.acessarPagina()
        UserRegisterPage.cadastrarUsuario(usuario)
        UserRegisterPage.validarEmailJaExistente()

    })

})