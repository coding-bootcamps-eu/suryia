describe('Login and Logut Test', () => {
  it('should login and logout successfully', () => {
    //  Besuche die Login-Seite Überprüfe ob 'LogIN' vorhanden ist
    cy.visit('/login').then(() => {
      cy.contains('LogIN').should('exist')
    })
    //cy.visit('/login')

    // Überprüfe ob Formular vorhanden ist
    //cy.contains('login')

    // Fülle das Login-Formular aus und klicke auf die Schaltfläche "LogIN"
    cy.get('input[type="email"]').type('user@email.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('form').submit()

    // Überprüfe, ob die Weiterleitung zur Dashboard-Seite erfolgreich ist
    cy.url().should('include', '/')

    //Klicke auf die Schaltfläche "LogOut"
    cy.get('button').click()

    // Überprüfe ob Login-Formular vorhanden ist
    //cy.contains('login')
    cy.visit('/login').then(() => {
      cy.contains('LogIN').should('exist')
    })
  })
})
