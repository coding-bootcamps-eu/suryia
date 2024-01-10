describe('Szenario: Suriya Project Tests', () => {
  it('should  display the login form, show the logged page and create a new link ', () => {
    // Einloggen
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('julia12345@test.com')
    cy.get('input[type="password"]').type('password1234')
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
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
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('julia12345@test.com')
    cy.get('input[type="password"]').type('password1234')
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    cy.visit('http://localhost:5173/')
    cy.wait(2000)
    cy.contains('button', 'Create Link').click()

    cy.get('.q-placeholder[aria-label="Destination URL"]')
      .should('be.visible')
      .type('https://example1.com')
    cy.get('.q-placeholder[aria-label="Slug"]').should('be.visible').type('test-slug2')
    cy.contains('Save').click()
    cy.contains('Successfully created new link').should('be.visible')

    cy.wait(3000)
    cy.on('window:confirm', () => true)
    cy.visit('http://localhost:5173/link-list')
    cy.get('.q-table').should('exist')
    cy.contains('tr', 'test-slug2').find('[data-cy="delete-button"]').click()
    cy.wait(2000)
  })
  it('should edit an existing link', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('julia12345@test.com')
    cy.get('input[type="password"]').type('password1234')
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    cy.visit('http://localhost:5173/')
    cy.wait(2000)
    cy.on('window:confirm', () => true)
    cy.get('.q-table').should('exist')
    cy.contains('tr', 'test-slug1').find('[data-cy="edit-button"]').click()
    cy.get('.q-placeholder[aria-label="Slug"]').should('be.visible').clear().type('editiert')
    cy.contains('Save').click()
    cy.visit('http://localhost:5173/link-list')
    cy.get('.q-table').should('exist')
    cy.contains('tr', 'editiert').find('[data-cy="delete-button"]').click()
  })
  it('should reset the form when the reset button is clicked', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('julia12345@test.com')
    cy.get('input[type="password"]').type('password1234')
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    cy.visit('http://localhost:5173/')
    cy.wait(2000)
    cy.contains('button', 'Create Link').click()

    cy.get('.q-placeholder[aria-label="Destination URL"]')
      .should('be.visible')
      .type('https://example3.com')
    cy.get('.q-placeholder[aria-label="Slug"]').should('be.visible').type('test-slug3')
    cy.contains('Reset').click()
    cy.get('.q-placeholder[aria-label="Destination URL"]').should('have.value', '')
    cy.get('.q-placeholder[aria-label="Slug"]').should('have.value', '')
    cy.contains('Successfully created new link').should('not.exist')
  })
})
