import { faker } from '@faker-js/faker'

import LoginPage from '../../pages/Login/LoginPage'
import ProductRegisterPage from '../../pages/ProductRegister/productRegisterPage'

describe('Products front-end', () => {

    beforeEach(() => {

        const usuario = {
                    nome: 'Fulano da Silva',
                    email: 'fulano@qa.com',
                    senha: 'teste'
                }
        
        LoginPage.acessarPagina()
        
        LoginPage.realizarLogin(usuario.email, usuario.senha)
        LoginPage.validarLoginComSucesso(usuario.nome)

        ProductRegisterPage.acessarPagina()
        
    })

   it('Should create a product successfully', () => {

        const produto = {

            nome: faker.commerce.productName(),
            preco: faker.number.int({ min: 100, max: 5000 }),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 100 }),
            imagem: 'cypress/fixtures/imagens/imagemTeste.jpg'

        }
    
        ProductRegisterPage.cadastrarProduto(produto)

        ProductRegisterPage.validarCadastroComSucesso(produto.nome)

    })

    it('Should not create a product without required fields', () => {

        ProductRegisterPage.clicarCadastrar()

        ProductRegisterPage.validarCamposObrigatorios()

    })

    it('Should not create a product with an existing name', () => {

        const product = {
            nome: 'Logitech MX Vertical',
            preco: 450,
            descricao: 'Mouse Logitech MX Vertical',
            quantidade: 10
        }

        ProductRegisterPage.cadastrarProduto(product)

        ProductRegisterPage.validarMensagem(
            'Já existe produto com esse nome'
        )

    })

})