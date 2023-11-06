beforeEach(function () {
    cy.intercept('**/notes/api/notes', {
        fixture: 'mock_get_notes.json'
    }).as('getnotes')

    cy.intercept({
        'method': 'DELETE',
        'url' : '**/notes/api/notes/**'
    }, {
        fixture: 'mock_delete_note.json'
    }).as('deleteNote')
})

it('Login to notes app and delete cards', function () {
    cy.visit('notes/app')

    cy.contains('Login').click()
    cy.get('[data-testid="login-email"]').type('alee@gmail.com')
    cy.get('[data-testid="login-password"]').type('azerty')
    cy.get('[data-testid="login-submit"]').click()
    cy.get('[data-testid="add-new-note"]').should('be.visible').and('contain.text', 'Add Note')

    cy.get('[data-testid="note-card"]').first().find('[data-testid="note-delete"]').click()
    cy.get('[data-testid="note-delete-confirm"]').click()

})