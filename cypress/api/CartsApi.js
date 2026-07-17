class CartsApi {

    create(products, token, options = {}) {

        const request = {
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/carrinhos`,
            body: {
                produtos: products
            },
            headers: {
                Authorization: token
            },
            ...options
        }

        return cy.request(request)

    }

}

export default new CartsApi()