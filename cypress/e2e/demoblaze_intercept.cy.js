beforeEach(() => {
    cy.intercept('/entries', {
        fixture: 'mocked_products.json'
    }).as('getproducts')

    cy.intercept(
        {
            url: '/bycat',
            method: 'POST'
        },
        {
            fixture: 'mocked_filter_laptops.json'
        }
    ).as('filterByCat')
})

it('mock products in demoblae website', () => {
    cy.visit('/')
    cy.wait('@getproducts')
    cy.contains('Laptops').click()
})