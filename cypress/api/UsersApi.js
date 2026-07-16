class UsersApi {

    create(user, options = {}) {

        return cy.request({

            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: user,
            failOnStatusCode: false,
            ...options

        })

    }

    getById(id, options = {}) {

        return cy.request({
            method: 'GET',
            url: `https://serverest.dev/usuarios/${id}`,
            failOnStatusCode: true,
            ...options
        })

    }

    getAll(options = {}) {

        return cy.request({
            method: 'GET',
            url: 'https://serverest.dev/usuarios',
            failOnStatusCode: true,
            ...options
        })

    }

    update(id, user, options = {}) {

        return cy.request({

            method: 'PUT',
            url: `https://serverest.dev/usuarios/${id}`,
            body: user,
            failOnStatusCode: true,
            ...options

        })

    }

    delete(id, options = {}) {

        return cy.request({

            method: 'DELETE',
            url: `https://serverest.dev/usuarios/${id}`,
            failOnStatusCode: true,
            ...options

        })

    }

}

export default new UsersApi()