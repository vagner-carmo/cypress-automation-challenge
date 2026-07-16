import LoginApi from '../../api/LoginApi'
import { loginSuccessSchema } from '../../schemas/login/loginSuccess.schema'
import { loginErrorInvalidCredentialSchema } from '../../schemas/login/loginErrorInvalidCredential.schema'
import { loginErrorEmptyCredentialSchema } from '../../schemas/login/loginErrorEmptyCredential.schema'
import { validateSchema } from '../../support/schemaValidator'

describe('Login API', () => {

    it('Should login successfully with valid credentials', () => {

        const credentials = {

            email: 'fulano@qa.com',
            password: 'teste'

        }

        LoginApi.login(credentials)
            .then((response) => {

                expect(response.status).to.eq(200)
                expect(response.headers['content-type']).to.include('application/json')
                expect(response.body).to.be.an('object')
                expect(response.body.message).to.eq('Login realizado com sucesso')
                expect(response.body).to.have.property('authorization')
                expect(response.body.authorization).to.not.be.empty
                validateSchema(
                    loginSuccessSchema,
                    response.body,
                )

            })

    })

    it('Should not login with invalid password', () => {

        const credentials = {

            email: 'admin@qa.com',
            password: '123'

        }

        LoginApi.login(credentials, false)
        .then((response) => {

            expect(response.status).to.eq(401)
            expect(response.headers['content-type']).to.include('application/json')
            expect(response.body).to.be.an('object')
            expect(response.body.message).to.eq('Email e/ou senha inválidos')
            validateSchema(
                    loginErrorInvalidCredentialSchema,
                    response.body,
                )
            

        })
    })

    it('Should not login with empty credentials', () => {

        LoginApi.login({}, false)
        .then((response) => {

            expect(response.status).to.eq(400)
            expect(response.headers['content-type']).to.include('application/json')
            expect(response.body).to.be.an('object')
            expect(response.body.email).to.eq('email é obrigatório')
            expect(response.body.password).to.eq('password é obrigatório')
            validateSchema(
                    loginErrorEmptyCredentialSchema,
                    response.body,
                )

        })

    })

})