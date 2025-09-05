let token

describe('Cadastro de produto', () => {

    before(() => {
        cy.api_login('fulano@qa.com', 'teste').then((response) => { /// sempre que realizar login garante o token para os outros casos de testes 
            token = response.body.authorization
        })
    })
    it('Deve realizar login com sucesso', () => {
        cy.api_login('fulano@qa.com', 'teste').then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')

        })
    })

    it('Deve cadastrar um produto com sucesso', () => {
        const productName = "mesa_" + Date.now() ///nome dinamico para o produto

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/produtos',
            headers: {
                authorization: token
            },
            body: {
                "nome": productName,
                "preco": 470,
                "descricao": 'teste',
                "quantidade": 5
            },

        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            expect(response.body).to.have.property('_id')
            expect(response.body._id).to.be.a('string')

        })
    })
    it('Não deve cadastrar produto com nome duplicado', () => {
        const duplicatedName = "sofa" + Date.now()

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/produtos',
            headers: { authorization: token },
            body: {
                "nome": duplicatedName,
                "preco": 500,
                "descricao": 'teste',
                "quantidade": 6
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
        /// novo request deve estar dentro do mesmo it para validar duplicidade de produto
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/produtos',
            headers: { authorization: token },
            failOnStatusCode: false,
            body: {
                "nome": duplicatedName,
                "preco": 500,
                "descricao": 'teste',
                "quantidade": 6
            }
        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe produto com esse nome')
        })
    })
})