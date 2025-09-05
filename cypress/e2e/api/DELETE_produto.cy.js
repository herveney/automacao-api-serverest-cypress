let token
let produtoId

describe('Deletar produto', () => {
    before(() => {
        return cy.api_login('fulano@qa.com', 'teste').then((response) => {
            token = response.body.authorization
            expect(token).to.exist
        })
    });

    it('Deve cadastrar e deletar o produto com sucesso', () => {
        return cy.request({
            method: 'POST',
            url: '/produtos',
            headers: {
                authorization: token
            },
            body: {
                "nome": 'produto_' + Date.now(),
                "preco": 5,
                "descricao": 'teste',
                "quantidade": 5
            }

        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 201])
            produtoId = response.body._id || response.body.id
            expect(produtoId, 'produtoId capturado').to.exist        ///validação de segurança, para não deixar o teste seguir se não foi capturado nenhum id válido.


            return cy.request({
                method: 'DELETE',
                url: `/produtos/${produtoId}`,
                headers: {
                    authorization: token
                }

            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Registro excluído com sucesso')
            })
        })

    })
});