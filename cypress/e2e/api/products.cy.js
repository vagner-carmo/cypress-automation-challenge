import LoginApi from '../../api/LoginApi'
import ProductsApi from '../../api/ProductsApi'
import CartsApi from '../../api/CartsApi'
import { validateSchema } from '../../support/schemaValidator'
import { createProduct } from '../../factories/productFactory'
import { createProductSuccessSchema } from '../../schemas/products/createProductSuccess.schema'
import { productErrorSchema } from '../../schemas/products/productError.schema'
import { getAllProductsSchema } from '../../schemas/products/getAllProducts.schema'
import { getProductSchema } from '../../schemas/products/getProduct.schema'
import { deleteProductSuccessSchema } from '../../schemas/products/deleteProductSuccess.schema'
import { deleteProductShoppingCarErrorSchema } from '../../schemas/products/deleteProductShoppingCarError.schema'
import { updateProductSuccessSchema } from '../../schemas/products/updateProductSuccess.schema'


describe('Products API', () => {

    it('Should create a new product successfully', () => {

        const product = createProduct()

        cy.getAccessToken()
            .then((token) => {

                ProductsApi.create(product, token)
                    .then((response) => {

                        expect(response.status).to.eq(201)
                        expect(response.headers['content-type']).to.include('application/json')
                        expect(response.body).to.be.an('object')
                        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
                        expect(response.body._id).to.not.be.empty

                        validateSchema(
                            createProductSuccessSchema,
                            response.body
                        )

                    })

            })

    })

    it('Should not create a product with an existing name', () => {

        const product = {

            nome: 'Logitech MX Vertical',
            preco: 470,
            descricao: 'Mouse Logitech MX Vertical',
            quantidade: 15

        }

        cy.getAccessToken()
            .then((token) => {

                ProductsApi.create(
                    product,
                    token,
                    {
                        failOnStatusCode: false
                    }
                )
                    .then((response) => {

                        expect(response.status).to.eq(400)
                        expect(response.headers['content-type']).to.include('application/json')
                        expect(response.body).to.be.an('object')
                        expect(response.body.message).to.eq('Já existe produto com esse nome')

                        validateSchema(
                            productErrorSchema,
                            response.body
                        )

                    })

            })

    })

    it('Should not create a product with an invalid access token', () => {

        const product = createProduct()

        ProductsApi.create(
            product,
            'invalid_token',
            {
                failOnStatusCode: false
            }
        )
            .then((response) => {

                expect(response.status).to.eq(401)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body).to.be.an('object')
                expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')

                validateSchema(
                    productErrorSchema,
                    response.body
                )

            })

    })

    it('Should retrieve all products successfully', () => {

        ProductsApi.getAll()
            .then((response) => {

                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body).to.be.an('object')
                expect(response.body.quantidade).to.be.greaterThan(0)
                expect(response.body.produtos).to.be.an('array')
                expect(response.body.produtos.length).to.eq(response.body.quantidade)

                validateSchema(
                    getAllProductsSchema,
                    response.body
                )

            })

    })

    it('Should retrieve a product by id successfully', () => {

        const product = createProduct()

        cy.getAccessToken().then((token) => {

            ProductsApi.create(product, token)
                .then((createResponse) => {

                    expect(createResponse.status).to.eq(201)

                    validateSchema(
                        createProductSuccessSchema,
                        createResponse.body
                    )

                    ProductsApi.getById(createResponse.body._id)
                        .then((getResponse) => {

                            expect(getResponse.status).to.eq(200)
                            expect(getResponse.headers['content-type']).to.include('application/json')
                            expect(getResponse.body).to.be.an('object')
                            expect(getResponse.body.nome).to.eq(product.nome)
                            expect(getResponse.body.preco).to.eq(product.preco)
                            expect(getResponse.body.descricao).to.eq(product.descricao)
                            expect(getResponse.body.quantidade).to.eq(product.quantidade)

                            validateSchema(
                                getProductSchema,
                                getResponse.body
                            )

                        })

                })

        })

    })

    it('Should not retrieve a product with an invalid id', () => {

        const invalidProductId = '1234567890123abc'

        ProductsApi.getById(
            invalidProductId,
            {
                failOnStatusCode: false
            }
        )
            .then((response) => {

                expect(response.status).to.eq(400)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body).to.be.an('object')
                expect(response.body.message).to.eq('Produto não encontrado')

                validateSchema(
                    productErrorSchema,
                    response.body
                )

            })

    })

    it('Should delete a product successfully', () => {

        const product = createProduct()

        cy.getAccessToken().then((token) => {

            ProductsApi.create(product, token)
                .then((createResponse) => {

                    expect(createResponse.status).to.eq(201)

                    validateSchema(
                        createProductSuccessSchema,
                        createResponse.body
                    )

                    const productId = createResponse.body._id

                    ProductsApi.delete(productId, token)
                        .then((deleteResponse) => {

                            expect(deleteResponse.status).to.eq(200)
                            expect(deleteResponse.headers['content-type']).to.include('application/json')
                            expect(deleteResponse.body).to.be.an('object')
                            expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso')

                            validateSchema(
                                deleteProductSuccessSchema,
                                deleteResponse.body
                            )

                            ProductsApi.getById(
                                productId,
                                {
                                    failOnStatusCode: false
                                }
                            )
                                .then((getResponse) => {

                                    expect(getResponse.status).to.eq(400)
                                    expect(getResponse.body.message).to.eq('Produto não encontrado')

                                    validateSchema(
                                        productErrorSchema,
                                        getResponse.body
                                    )

                                })

                        })

                })

        })

    })

    it('Should not delete a product associated with a shopping cart', () => {
        let product

        cy.getAccessToken().then(token => {

            product = createProduct()

            ProductsApi.create(product, token)
                .then(productResponse => {

                    const productId = productResponse.body._id

                    return CartsApi.create(
                        [
                            {
                                idProduto: productId,
                                quantidade: 1
                            }
                        ],
                        token
                    )
                        .then(() => {

                            return ProductsApi.delete(
                                productId,
                                token,
                                {
                                    failOnStatusCode: false
                                }
                            )

                        })

                })
                .then((response) => {

                    expect(response.status).to.eq(400)
                    expect(response.headers['content-type']).to.include('application/json')
                    expect(response.body).to.be.an('object')
                    expect(response.body.message).to.eq('Não é permitido excluir produto que faz parte de carrinho')

                    validateSchema(
                        deleteProductShoppingCarErrorSchema,
                        response.body
                    )

                })

        })

    })

    it('Should not delete a product with an invalid access token', () => {

        const productId = 'K6leHdftCeOJj8BJ'

        ProductsApi.delete(
            productId,
            'invalid_token',
            {
                failOnStatusCode: false
            }
        )
            .then((response) => {

                expect(response.status).to.eq(401)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body).to.be.an('object')
                expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')

                validateSchema(
                    productErrorSchema,
                    response.body
                )

            })

    })

    it('Should update a product successfully', () => {

        const product = createProduct()

        cy.getAccessToken().then((token) => {

            ProductsApi.create(product, token)
                .then((createResponse) => {

                    expect(createResponse.status).to.eq(201)

                    validateSchema(
                        createProductSuccessSchema,
                        createResponse.body
                    )

                    const updatedProduct = {
                        ...product,
                        nome: `${product.nome} Updated`,
                        preco: product.preco + 100,
                        descricao: `${product.descricao} - Updated`,
                        quantidade: product.quantidade + 10
                    }

                    ProductsApi.update(
                        createResponse.body._id,
                        updatedProduct,
                        token
                    )
                        .then((updateResponse) => {

                            expect(updateResponse.status).to.eq(200)
                            expect(updateResponse.headers['content-type']).to.include('application/json')
                            expect(updateResponse.body).to.be.an('object')
                            expect(updateResponse.body.message).to.eq('Registro alterado com sucesso')

                            validateSchema(
                                updateProductSuccessSchema,
                                updateResponse.body
                            )

                            ProductsApi.getById(createResponse.body._id)
                                .then((getResponse) => {

                                    expect(getResponse.status).to.eq(200)
                                    expect(getResponse.body.nome).to.eq(updatedProduct.nome)
                                    expect(getResponse.body.preco).to.eq(updatedProduct.preco)
                                    expect(getResponse.body.descricao).to.eq(updatedProduct.descricao)
                                    expect(getResponse.body.quantidade).to.eq(updatedProduct.quantidade)

                                    validateSchema(
                                        getProductSchema,
                                        getResponse.body
                                    )

                                })

                        })

                })

        })

    })

    it('Should not update a product with an existing name', () => {

        const product = createProduct()

        cy.getAccessToken().then((token) => {

            ProductsApi.create(product, token)
                .then((createResponse) => {

                    expect(createResponse.status).to.eq(201)

                    validateSchema(
                        createProductSuccessSchema,
                        createResponse.body
                    )

                    const updatedProduct = {
                        ...product,
                        nome: 'Logitech MX Vertical'
                    }

                    ProductsApi.update(
                        createResponse.body._id,
                        updatedProduct,
                        token,
                        {
                            failOnStatusCode: false
                        }
                    )
                        .then((response) => {

                            expect(response.status).to.eq(400)
                            expect(response.headers['content-type']).to.include('application/json')
                            expect(response.body).to.be.an('object')
                            expect(response.body.message).to.eq('Já existe produto com esse nome')

                            validateSchema(
                                productErrorSchema,
                                response.body
                            )

                        })

                })

        })

    })

    it('Should not update a product with an invalid access token', () => {

        const product = createProduct()

        cy.getAccessToken().then((token) => {

            ProductsApi.create(product, token)
                .then((createResponse) => {

                    expect(createResponse.status).to.eq(201)

                    validateSchema(
                        createProductSuccessSchema,
                        createResponse.body
                    )

                    const updatedProduct = {
                        ...product,
                        nome: `${product.nome} Updated`
                    }

                    ProductsApi.update(
                        createResponse.body._id,
                        updatedProduct,
                        'invalid_token',
                        {
                            failOnStatusCode: false
                        }
                    )
                        .then((response) => {

                            expect(response.status).to.eq(401)
                            expect(response.headers['content-type']).to.include('application/json')
                            expect(response.body).to.be.an('object')
                            expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')

                            validateSchema(
                                productErrorSchema,
                                response.body
                            )

                        })

                })

        })

    })

})