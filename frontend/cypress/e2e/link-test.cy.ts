describe('Szenario: Suriya Project Tests', () => {
  beforeEach(() => {
    // Einloggen
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('julia12345@test.com')
    cy.get('input[type="password"]').type('password1234')
    cy.get('button[type="submit"]').click()
    cy.get('.q-table').should('exist')
    cy.contains('div', 'LINK LIST').should('have.css', 'font-weight', '700')
    cy.contains('button', 'Create Link').should('exist')
    cy.contains('th', 'SLUG').should('exist')
    cy.contains('th', 'LAST UPDATE').should('exist')
    cy.contains('th', 'ACTION').should('exist')

    cy.wait(2000)
    cy.contains('button', 'Create Link').click()

    cy.get('.q-placeholder[aria-label="Destination URL"]')
      .should('be.visible')
      .type('https://example1.com')
    cy.get('.q-placeholder[aria-label="Slug"]').should('be.visible').type('test-slug1')
    cy.contains('Save').click()

    cy.contains('Successfully created new link').should('be.visible')
    cy.wait(3000)
  })
  it('should create a new link and then delete it', () => {
    // Neuen Link erstellen
    cy.visit('http://localhost:5173/')
    cy.wait(2000)
    cy.contains('button', 'Create Link').click()

    cy.get('input[placeholder="Destination URL"]').type('https://example2.com')
    cy.get('input[placeholder="Slug"]').type('test-slug2')
    cy.contains('Save').click()

    cy.contains('Successfully created new link').should('be.visible')
    cy.wait(3000)

    cy.visit('http://localhost:5173/link-list')
    cy.get('.q-table').should('exist')
    cy.contains('test-slug2')
  })
})
