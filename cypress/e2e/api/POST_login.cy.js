
describe('API - Login', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.api_login('fulano@qa.com', 'teste').then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
        })
    });

    
    it('Senha incorreta - Não deve realizar login', () => {
        cy.api_login('fulano@qa.com', 'SenhaIncorreta').then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    })

    
    it('Usuário incorreto - Não deve realizar o login', () => {
        cy.api_login('incorreto@qa.com', 'teste').then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    });
});
