describe('Szenario: Login form displayed', () => {
  it('should show display the login form', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })
})

describe('Szenario:Login', () => {
  it('should login with valid credentials', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('foobar11234@test.com')
    cy.get('input[type="password"]').type('password1234')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/')
  })

  describe('Szenarion: Welcome message', () => {
    it('should display a welcome message when the user is logged in', () => {
      cy.visit('http://localhost:5173/login')
      cy.get('input[type="email"]').type('foobar11234@test.com')
      cy.get('input[type="password"]').type('password1234')
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/')
      cy.get('p.welcome-message').should('contain', 'Welcome, foobar11234@test.com!')
    })
  })

  describe('Szenario: Logout', () => {
    beforeEach(() => {
      // Login before each test in this block
      cy.visit('http://localhost:5173/login')
      cy.get('input[type="email"]').type('foobar11234@test.com')
      cy.get('input[type="password"]').type('password1234')
      cy.get('button[type="submit"]').click()
    })

    it('should logout the user', () => {
      cy.get('button[type="submit"]').click()
      cy.url().should('include', '/login')
    })
  })

  describe('Szenario: Login fail', () => {
    it('should show an error message with invalid credentials', () => {
      cy.visit('http://localhost:5173/login')
      cy.get('input[type="email"]').type('wrong@example.com')
      cy.get('input[type="password"]').type('wrongpassword')
      cy.get('button[type="submit"]').click()
      cy.contains('.error-message', 'Error during login. Try again!').should('exist')
    })
  })
})
