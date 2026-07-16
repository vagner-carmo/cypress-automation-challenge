import { loginLocators as locator } from './LoginLocators'

class LoginPage {

    acessarPagina() {
        cy.visit('/')
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

    clicarEntrar() {
        cy.get(locator.btnEntrar)
            .should('be.visible')
            .click()
    }

    clicarCadastrar() {
        cy.get(locator.btnCadastrar)
            .should('be.visible')
            .click()
    }

    realizarLogin(email, senha) {
        this.preencherEmail(email)
        this.preencherSenha(senha)
        this.clicarEntrar()
    }

    validarLoginComSucesso(nomeUsuario) {
        cy.url().should('include', '/home')

        cy.contains(`Bem Vindo ${nomeUsuario}`)
            .should('be.visible')

    }

    validarMensagemErro(mensagem) {
        cy.get(locator.alertMessage)
            .should('be.visible')
            .and('contain.text', mensagem)
    }

    validarCamposObrigatorios() {

        cy.contains('Email é obrigatório')
            .should('be.visible')

        cy.contains('Password é obrigatório')
            .should('be.visible')

    }

}

export default new LoginPage()