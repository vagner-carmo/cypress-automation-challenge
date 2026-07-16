class LoginApi {

    login(credentials, options = {}) {

        return cy.request({

            method: 'POST',
            url: `${Cypress.env('apiUrl')}/login`,
            body: credentials,
            failOnStatusCode: false,
            ...options

        })

    }

}

export default new LoginApi()