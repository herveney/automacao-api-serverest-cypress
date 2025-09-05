

describe('Cadastro de usuário', () => {
    it('Deve realizar cadastro de novo usuário com sucesso', () => {
        const emailUnico = `${Date.now()}maria3@gmail.com`

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/usuarios',
            body: {
                "nome": "Maria da Silva",
                "email": emailUnico,
                "password": "teste",
                "administrador": "true"
            }

        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            expect(response.body).to.have.property('_id')
            expect(response.body._id).to.be.a('string')
        })
    })

    it('Não permitir cadastro com e-mail já utilizado', () => {
        const emailDuplicado = `${Date.now()}@email.com`

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/usuarios',
            body: {
                "nome": "Mauro da Silva",
                "email": emailDuplicado,
                "password": "teste",
                "administrador": "true"
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/usuarios',
            failOnStatusCode: false,
            body: {
                "nome": "Mauro da Silva",
                "email": emailDuplicado,
                "password": "teste",
                "administrador": "true"
            }

        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Este email já está sendo usado')

        })

    });

});