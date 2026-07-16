import LoginPage from '../../pages/Login/LoginPage'


describe('Login', () => {

    it('Should log in successfully', () => {

        const usuario = {
            nome: 'Fulano da Silva',
            email: 'fulano@qa.com',
            senha: 'teste'
        }

        LoginPage.acessarPagina()

        LoginPage.realizarLogin(usuario.email, usuario.senha)

        LoginPage.validarLoginComSucesso(usuario.nome)

    })

    it('Should not log in with invalid credentials', () => {

        LoginPage.acessarPagina()

        LoginPage.realizarLogin(
            'teste@teste.com',
            'teste'
        )

        LoginPage.validarMensagemErro('Email e/ou senha inválidos')

    })

    it('Should not log in with empty credentials', () => {

        LoginPage.acessarPagina()

        LoginPage.clicarEntrar()

        LoginPage.validarCamposObrigatorios()

    })

})

