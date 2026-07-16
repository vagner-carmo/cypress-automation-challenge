import LoginApi from '../api/LoginApi'

Cypress.Commands.add('getAccessToken', () => {

    const credentials = {
        email: 'fulano@qa.com',
        password: 'teste'
    }

    return LoginApi.login(credentials)
        .then((response) => {

            expect(response.status).to.eq(200)

            return response.body.authorization

        })

})