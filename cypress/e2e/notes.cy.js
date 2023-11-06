const notesData = require('../fixtures/notes_data.json')

describe('Creer des notes par API et les supprimer en Front', function () {
    beforeEach(function () {
        cy.intercept({
            method: 'PATCH',
            url: '**/notes/api/notes/**'
        }).as('completeNote')
    })
    it('Get The API Token', function () {
        cy.request({
            url: '/notes/api/users/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: {
                email: 'alee@gmail.com',
                password: 'azerty'
            }
        }).then(response => {
            expect(response).be.ok
            expect(response.body.data.email).eq('alee@gmail.com')
            expect(response.body.data.name).eq('Mohammed Ali')
            expect(response.body.data.token).not.undefined
            expect(response.body.message).eq("Login successful")
            cy.wrap(response.body.data.token).as('token')
        })
    })

    it('Create many notes', function () {
        notesData.forEach(note => {
            cy.request({
                method: 'POST',
                url: '/notes/api/notes',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token': this.token
                },
                body: {
                    title: note.title,
                    description: note.description,
                    category: note.category
                }
            }).then(response => {
                expect(response.status).eq(200)
                expect(response.body.message).eq("Note successfully created")
            })
        });

    })

    it('Login to notes app and delete cards', function () {
        cy.visit('notes/app')

        cy.contains('Login').click()
        cy.get('[data-testid="login-email"]').type('alee@gmail.com')
        cy.get('[data-testid="login-password"]').type('azerty')
        cy.get('[data-testid="login-submit"]').click()
        cy.get('[data-testid="add-new-note"]').should('be.visible').and('contain.text', 'Add Note')

        cy.get('[data-testid="toggle-note-switch"]').first().click()
        
          // code avant
        cy.wait('@completeNote').then(intercept => {
            const response = intercept.response.body
            cy.contains('response.title').should('be.visible')
            cy.get('mydropodown').should('have.option', response[0].option)
        }) 
        
        
        cy.get('[data-testid="note-card"]').its('length').as('notesTotal')
        cy.get('[data-testid="progress-info"]').invoke('text').then(progressText => {
            expect(progressText).include(`1/${this.notesTotal}`)
        }) 

        // code après
         cy.get('[data-testid="note-card"]').its('length').then(notesTotal => {
            cy.get('[data-testid="progress-info"]').should("contain.text", `1/${notesTotal}`)
        })
 
        cy.pause()
        // Delete all notes
        cy.get('[data-testid="note-card"]').each(card => {
            cy.wrap(card).find('[data-testid="note-delete"]').click()
            cy.get('[data-testid="note-delete-dialog"]').should('be.visible').find('[data-testid="note-delete-confirm"]').click()
        })
    })

})