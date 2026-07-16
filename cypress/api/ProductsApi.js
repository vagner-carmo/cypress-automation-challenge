class ProductsApi {

    create(product, token, options = {}) {

        return cy.request({

            method: 'POST',
            url: `${Cypress.env('apiUrl')}/produtos`,
            headers: {
                Authorization: token
            },
            body: product,
            failOnStatusCode: false,
            ...options

        })

    }

    getAll(options = {}) {

        return cy.request({

            method: 'GET',
            url: `${Cypress.env('apiUrl')}/produtos`,
            failOnStatusCode: true,
            ...options

        })

    }

    getById(id, options = {}) {

        return cy.request({

            method: 'GET',
            url: `${Cypress.env('apiUrl')}/produtos/${id}`,
            failOnStatusCode: true,
            ...options

        })

    }

    delete(id, token, options = {}) {

        return cy.request({

            method: 'DELETE',
            url: `${Cypress.env('apiUrl')}/produtos/${id}`,
            headers: {
                Authorization: token
            },
            failOnStatusCode: true,
            ...options

        })

    }

    update(id, product, token, options = {}) {

        const request = {

            method: 'PUT',
            url: `${Cypress.env('apiUrl')}/produtos/${id}`,
            body: product,
            failOnStatusCode: true,
            ...options

        }

        if (token) {
            request.headers = {
                Authorization: token
            }
        }

        return cy.request(request)

    }

}

export default new ProductsApi()