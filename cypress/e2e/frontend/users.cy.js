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

        cy.createUser().then(usuario => {

            UserRegisterPage.acessarPagina()

            UserRegisterPage.cadastrarUsuario({
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.password,
                administrador: true
            })

            UserRegisterPage.validarEmailJaExistente()

        })

    })

})