import { productRegisterLocators as locator } from './productRegisterLocators'

class ProductRegisterPage {

    acessarPagina() {
        cy.visit('/admin/cadastrarprodutos/')
    }

    preencherNome(nome) {
        cy.get(locator.inputNome).clear().type(nome)
    }

    preencherPreco(preco) {
        cy.get(locator.inputPreco).clear().type(preco)
    }

    preencherDescricao(descricao) {
        cy.get(locator.inputDescricao).clear().type(descricao)
    }

    preencherQuantidade(quantidade) {
        cy.get(locator.inputQuantidade).clear().type(quantidade)
    }

    adicionarImagem(caminhoImagem) {
        cy.get(locator.inputImagem)
            .selectFile(caminhoImagem, { force: true })
    }

    clicarCadastrar() {
        cy.get(locator.btnCadastrar).click()
    }

    cadastrarProduto(produto) {

        this.preencherNome(produto.nome)
        this.preencherPreco(produto.preco)
        this.preencherDescricao(produto.descricao)
        this.preencherQuantidade(produto.quantidade)

        if (produto.imagem) {
            this.adicionarImagem(produto.imagem)
        }

        this.clicarCadastrar()
    }

    clicarCadastrar() {
        cy.get(locator.btnCadastrar).click()
    }

    validarCadastroComSucesso(nomeProduto) {
        cy.url().should('include', '/admin/listarprodutos')

        cy.get('table')
            .should('contain.text', nomeProduto)
    }

    validarCamposObrigatorios() {
        cy.contains('Nome é obrigatório')
            .should('be.visible')

        cy.contains('Preco é obrigatório')
            .should('be.visible')

        cy.contains('Descricao é obrigatório')
            .should('be.visible')

        cy.contains('Quantidade é obrigatório')
            .should('be.visible')

    }

    validarMensagem(mensagem) {

        cy.get(locator.alertMessage)
            .should('be.visible')
            .and('contain.text', mensagem)

    }

}
export default new ProductRegisterPage()