import LoginPage from '../../pages/Login/LoginPage'


describe('Login', () => {

    let user

    beforeEach(() => {

        cy.createUser().then(createdUser => {

            user = createdUser

        })

        LoginPage.acessarPagina()

    })

    it('Should login successfully', () => {

        LoginPage.realizarLogin(
            user.email,
            user.password
        )

        LoginPage.validarLoginComSucesso(user.nome)

    })

    it('Should not log in with invalid credentials', () => {

        LoginPage.acessarPagina()

        LoginPage.realizarLogin(
            'teste@teste.com',
            'teste777'
        )

        LoginPage.validarMensagemErro('Email e/ou senha inválidos')

    })

    it('Should not log in with empty credentials', () => {

        LoginPage.acessarPagina()

        LoginPage.clicarEntrar()

        LoginPage.validarCamposObrigatorios()

    })

})

