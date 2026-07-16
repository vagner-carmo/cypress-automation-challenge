import { userRegisterLocators as locator } from './UserRegisterLocators'

class UserRegisterPage {

    acessarPagina() {
        cy.visit('/cadastrarusuarios')
    }

    preencherNome(nome) {
        cy.get(locator.inputNome)
            .should('be.visible')
            .clear()
            .type(nome)
    }

    preencherEmail(email) {
        cy.get(locator.inputEmail)
            .should('be.visible')
            .clear()
            .type(email)
    }

    preencherSenha(senha) {
        cy.get(locator.inputSenha)
            .should('be.visible')
            .clear()
            .type(senha)
    }

    selecionarAdministrador() {
        cy.get(locator.checkboxAdministrador)
            .should('be.visible')
            .check({ force: true })
    }

    desmarcarAdministrador() {
        cy.get(locator.checkboxAdministrador)
            .should('be.visible')
            .uncheck({ force: true })
    }

    clicarCadastrar() {
        cy.get(locator.btnCadastrar)
            .should('be.visible')
            .click()
    }

    clicarEntrar() {
        cy.get(locator.btnEntrar)
            .should('be.visible')
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