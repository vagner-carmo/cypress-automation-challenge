import UsersApi from '../../api/UsersApi'
import ProductsApi from '../../api/ProductsApi'
import CartsApi from '../../api/CartsApi'
import LoginApi from '../../api/LoginApi'
import { createUser } from '../../factories/userFactory'
import { validateSchema } from '../../support/schemaValidator'
import { createUserSuccessSchema } from '../../schemas/users/createUserSuccess.schema'
import { getAllUsersSchema } from '../../schemas/users/getAllUsers.schema'
import { getUserSchema } from '../../schemas/users/getUser.schema'
import { updateUserSuccessSchema } from '../../schemas/users/updateUserSuccess.schema'
import { deleteUserSuccessSchema } from '../../schemas/users/deleteUserSuccess.schema'
import { userErrorSchema } from '../../schemas/users/userError.schema'
import { deleteUserShoppingCarErrorSchema } from '../../schemas/users/deleteUserShoppingCarError.schema'
import { createProduct } from '../../factories/productFactory'


describe('Users API', () => {

    it('Should create a new user successfully', () => {

        const user = createUser()

        UsersApi.create(user)
            .then((response) => {

                expect(response.status).to.eq(201)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body).to.be.an('object')
                expect(response.body.message).to.eq('Cadastro realizado com sucesso')
                expect(response.body._id).to.not.be.empty

                validateSchema(
                    createUserSuccessSchema,
                    response.body
                )

            })

    })

    it('Should not create a user with duplicated email', () => {

        const user = {
            nome: 'Fulano',
            email: 'fulano@qa.com',
            password: 'teste',
            administrador: 'true'
        }

        UsersApi.create(user, {
            failOnStatusCode: false
        })
            .then((response) => {

                expect(response.status).to.eq(400)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body).to.be.an('object')
                expect(response.body.message).to.eq('Este email já está sendo usado')

                validateSchema(
                    userErrorSchema,
                    response.body
                )

            })

    })

    it('Should retrieve all users successfully', () => {

        UsersApi.getAll()
            .then((response) => {

                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body).to.be.an('object')
                expect(response.body.quantidade).to.be.greaterThan(0)
                expect(response.body.usuarios).to.be.an('array')
                expect(response.body.usuarios).to.have.length(response.body.quantidade)

                validateSchema(
                    getAllUsersSchema,
                    response.body
                )

            })

    })


    it('Should retrieve a user by id successfully', () => {

        const user = createUser()

        UsersApi.create(user)
            .then((createResponse) => {

                expect(createResponse.status).to.eq(201)

                validateSchema(
                    createUserSuccessSchema,
                    createResponse.body
                )

                UsersApi.getById(createResponse.body._id)
                    .then((getResponse) => {

                        expect(getResponse.status).to.eq(200)
                        expect(getResponse.headers['content-type']).to.include('application/json')
                        expect(getResponse.body).to.be.an('object')
                        expect(getResponse.body.nome).to.eq(user.nome)
                        expect(getResponse.body.email).to.eq(user.email)
                        expect(getResponse.body.password).to.eq(user.password)
                        expect(getResponse.body.administrador).to.eq(user.administrador)

                        validateSchema(
                            getUserSchema,
                            getResponse.body
                        )

                    })

            })

    })


    it('Should not retrieve a user with an invalid id', () => {

        const invalidUserId = '0123456789102abc'

        UsersApi.getById(invalidUserId, {
            failOnStatusCode: false
        })
            .then((response) => {

                expect(response.status).to.eq(400)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body).to.be.an('object')
                expect(response.body.message).to.eq('Usuário não encontrado')

                validateSchema(
                    userErrorSchema,
                    response.body,
                )

            })

    })


    it('Should update a user successfully', () => {

        const user = createUser()

        UsersApi.create(user)
            .then((createResponse) => {

                expect(createResponse.status).to.eq(201)

                validateSchema(
                    createUserSuccessSchema,
                    createResponse.body
                )

                const updatedUser = {
                    ...user,
                    nome: 'Usuário Atualizado'
                }

                UsersApi.update(
                    createResponse.body._id,
                    updatedUser
                )
                    .then((updateResponse) => {

                        expect(updateResponse.status).to.eq(200)
                        expect(updateResponse.headers['content-type']).to.include('application/json')
                        expect(updateResponse.body).to.be.an('object')
                        expect(updateResponse.body.message).to.eq('Registro alterado com sucesso')
                        validateSchema(
                            updateUserSuccessSchema,
                            updateResponse.body
                        )

                    })

                UsersApi.getById(createResponse.body._id)
                    .then((getResponse) => {

                        expect(getResponse.status).to.eq(200)
                        expect(getResponse.body.nome).to.eq(updatedUser.nome)
                        expect(getResponse.body.email).to.eq(updatedUser.email)
                        expect(getResponse.body.password).to.eq(updatedUser.password)
                        expect(getResponse.body.administrador).to.eq(updatedUser.administrador)

                    })

            })

    })

    it('Should not update a user with an existing email', () => {

        const user = createUser()

        UsersApi.create(user)
            .then((createResponse) => {

                expect(createResponse.status).to.eq(201)

                validateSchema(
                    createUserSuccessSchema,
                    createResponse.body
                )

                const updatedUser = {
                    ...user,
                    email: 'fulano@qa.com'
                }

                UsersApi.update(
                    createResponse.body._id,
                    updatedUser,
                    {
                        failOnStatusCode: false
                    }
                )
                    .then((response) => {

                        expect(response.status).to.eq(400)
                        expect(response.headers['content-type']).to.include('application/json')
                        expect(response.body).to.be.an('object')
                        expect(response.body.message).to.eq('Este email já está sendo usado')

                        validateSchema(
                            userErrorSchema,
                            response.body
                        )

                    })

            })

    })

    it('Should delete a user successfully', () => {

        const user = createUser()

        UsersApi.create(user)
            .then((createResponse) => {

                expect(createResponse.status).to.eq(201)

                validateSchema(
                    createUserSuccessSchema,
                    createResponse.body
                )

                const userId = createResponse.body._id

                UsersApi.delete(userId)
                    .then((deleteResponse) => {

                        expect(deleteResponse.status).to.eq(200)
                        expect(deleteResponse.headers['content-type']).to.include('application/json')
                        expect(deleteResponse.body).to.be.an('object')
                        expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso')

                        validateSchema(
                            deleteUserSuccessSchema,
                            deleteResponse.body
                        )

                        UsersApi.getById(userId, {
                            failOnStatusCode: false
                        })
                            .then((getResponse) => {

                                expect(getResponse.status).to.eq(400)
                                expect(getResponse.body.message).to.eq('Usuário não encontrado')

                                validateSchema(
                                    userErrorSchema,
                                    getResponse.body
                                )

                            })

                    })

            })

    })

    it('Should not delete a user with a registered shopping cart', () => {

        let createdUser

        cy.createUser().then(user => {

            createdUser = user

            return LoginApi.login({
                email: user.email,
                password: user.password
            })

        })
            .then(loginResponse => {

                const token = loginResponse.body.authorization
                const product = createProduct()

                return ProductsApi.create(product, token)
                    .then(productResponse => {

                        return CartsApi.create(
                            [
                                {
                                    idProduto: productResponse.body._id,
                                    quantidade: 1
                                }
                            ],
                            token
                        )
                    })
                    .then(() => {

                        return UsersApi.delete(
                            createdUser._id,
                            {
                                failOnStatusCode: false
                            }
                        )

                    })

            })
            .then(response => {

                expect(response.status).to.eq(400)
                expect(response.body.message)
                    .to.eq('Não é permitido excluir usuário com carrinho cadastrado')

                validateSchema(
                    deleteUserShoppingCarErrorSchema,
                    response.body
                )

            })

    })

})