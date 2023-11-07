it('test', () => {
    cy.visit('https://www.saucedemo.com/v1/')
    cy.get('erreur_get')
})