
/// comando de login
Cypress.Commands.add('api_login', (user, password) => {
    return cy.request({
        method: 'POST',
        url: 'http://localhost:3000/Login',
        body: {
            "email": user,
            "password": password
        },
        failOnStatusCode: false
    })
})

