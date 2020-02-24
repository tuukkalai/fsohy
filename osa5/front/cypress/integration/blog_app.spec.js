describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tuukka Laitinen',
      username: 'tuukkala',
      password: '5alainen'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
  })

  it('user can login', function() {
    cy.visit('http://localhost:3000')
    cy.contains('username').get('input').type('tuukkala')
    cy.contains('username').get('input').type('5alainen')
    cy.contains('login').click()
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
      cy.contains('username').get('input').type('tuukkala')
      cy.contains('password').get('input').type('5alainen')
      cy.contains('login').click()
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.contains('title').get('input').type('another blog cypress')
        cy.contains('author').get('input').type('test author')
        cy.contains('url').get('input').type('http://example.com/777')
        cy.contains('create').click()
      })
    })
  })
})