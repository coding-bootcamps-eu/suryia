describe('Login and Logout', () => {
  it('should login with valid credentials', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('foobar11234@test.com')
    cy.get('input[type="password"]').type('password1234')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/')
  })

  it('should logout the user', () => {
    cy.visit('http://localhost:5173/')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')
  })

  it('should show an error message with invalid credentials', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('wrong@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.contains('.error-message', 'Error during login. Try again!').should('exist')
  })
})
