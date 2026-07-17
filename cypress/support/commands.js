import LoginApi from '../api/LoginApi'
import UsersApi from '../api/UsersApi'
import { createUser } from '../factories/userFactory'

Cypress.Commands.add('getAccessToken', () => {

    return cy.createUser().then(user => {

        return LoginApi.login({
            email: user.email,
            password: user.password
        })
        .then(response => {

            expect(response.status).to.eq(200)

            return response.body.authorization

        })

    })

})

Cypress.Commands.add('createUser', () => {

    const user = createUser()

    return UsersApi.create(user)
        .then((response) => {

            expect(response.status).to.eq(201)

            return {
                ...user,
                _id: response.body._id
            }

        })

})