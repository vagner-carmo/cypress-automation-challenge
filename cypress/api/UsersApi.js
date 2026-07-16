class UsersApi {

    create(user, options = {}) {

        return cy.request({

            method: 'POST',
            url: `${Cypress.env('apiUrl')}/usuarios`,
            body: user,
            failOnStatusCode: false,
            ...options

        })

    }

    getById(id, options = {}) {

        return cy.request({
            method: 'GET',
            url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
            failOnStatusCode: true,
            ...options
        })

    }

    getAll(options = {}) {

        return cy.request({
            method: 'GET',
            url: `${Cypress.env('apiUrl')}/usuarios`,
            failOnStatusCode: true,
            ...options
        })

    }

    update(id, user, options = {}) {

        return cy.request({

            method: 'PUT',
            url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
            body: user,
            failOnStatusCode: true,
            ...options

        })

    }

    delete(id, options = {}) {

        return cy.request({

            method: 'DELETE',
            url: `${Cypress.env('apiUrl')}/usuarios/${id}`,
            failOnStatusCode: true,
            ...options

        })

    }

}

export default new UsersApi()