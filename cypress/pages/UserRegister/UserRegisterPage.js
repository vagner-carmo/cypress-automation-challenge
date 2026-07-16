import { userRegisterLocators as locator } from './UserRegisterLocators'

class UserRegisterPage {

    acessarPagina() {
        cy.visit('/cadastrarusuarios')
    }

    preencherNome(nome) {
        cy.get(locator.inputNome)
            .clear()
            .type(nome)
    }

    preencherEmail(email) {
        cy.get(locator.inputEmail)
            .clear()
            .type(email)
    }

    preencherSenha(senha) {
        cy.get(locator.inputSenha)
            .clear()
            .type(senha)
    }

    selecionarAdministrador() {
        cy.get(locator.checkboxAdministrador)
            .check({ force: true })
    }

    desmarcarAdministrador() {
        cy.get(locator.checkboxAdministrador)
            .uncheck({ force: true })
    }

    clicarCadastrar() {
        cy.get(locator.btnCadastrar)
            .click()
    }

    clicarEntrar() {
        cy.get(locator.btnEntrar)
            .click()
    }

    cadastrarUsuario(usuario) {

        this.preencherNome(usuario.nome)
        this.preencherEmail(usuario.email)
        this.preencherSenha(usuario.senha)

        if (usuario.administrador) {
            this.selecionarAdministrador()
        }

        this.clicarCadastrar()
    }

    validarCadastroComSucesso() {
        cy.contains('Cadastro realizado com sucesso')
            .should('be.visible')
    }

    validarEmailJaExistente() {
        cy.contains('Este email já está sendo usado')
            .should('be.visible')
    }

    validarTelaCadastro() {
        cy.url().should('include', '/cadastrarusuarios')
        cy.get(locator.btnCadastrar).should('be.visible')
    }

}

export default new UserRegisterPage()