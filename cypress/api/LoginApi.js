class LoginApi {

    login(credentials, options = {}) {

        return cy.request({

            method: 'POST',
            url: 'https://serverest.dev/login',
            body: credentials,
            failOnStatusCode: false,
            ...options

        })

    }

}

export default new LoginApi()