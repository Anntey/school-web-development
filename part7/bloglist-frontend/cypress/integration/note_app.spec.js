describe('After creating user in blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Kayttaja',
      username: 'testikayttaja',
      password: 'testisalis'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  // 5.17
  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  // 5.18
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testikayttaja')
      cy.get('#password').type('testisalis')
      cy.get('#login-button').click()
      cy.contains('Testi Kayttaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testikayttaja')
      cy.get('#password').type('vaarasalis')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong credentials')
      cy.get('#login-state').should('not.exist')
    })

    // 5.19
    describe('When logged in', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'testikayttaja', password: 'testisalis'
        }).then(response => {
          localStorage.setItem('loggedUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      })

      // 5.19
      it('A blog can be created', function() {
        cy.contains('Add blog')
        cy.contains('new blog').click()
        cy.get('#title').type('Cypress title')
        cy.get('#author').type('Cypress Tester')
        cy.get('#url').type('http://www.cypressurl.com')
        cy.get('#blogform-submit').click()
        cy.get('.info').contains('Added "Cypress title" by Cypress Tester')
        cy.contains('Cypress title Cypress Tester')
      })

      describe('When a blog has been created', function() {
        beforeEach(function() {
          cy.contains('new blog').click()
          cy.get('#title').type('Cypress title')
          cy.get('#author').type('Cypress Tester')
          cy.get('#url').type('http://www.cypressurl.com')
          cy.get('#blogform-submit').click()
        })

        // 5.20
        it('A blog can be liked', function() {
          cy.get('#details-div').click()
          cy.get('.blog').contains('0')
          cy.get('.blog').contains('like').click()
          cy.get('.blog').contains('1')
          cy.get('.blog').contains('like').click()
          cy.get('.blog').contains('2')
        })

        // 5.21
        it('A blog can be deleted', function() {
          cy.get('#details-div').click()
          cy.get('.blog').contains('remove').click()
          cy.get('.info').contains('Deleted "Cypress title" by Cypress Tester')
          cy.get('.bloglist').should('not.contain', 'Cypress title Cypress Tester')
        })
      })

      describe('When 3 blogs have been created', function() {
        beforeEach(function() {
          // first
          cy.contains('new blog').click()
          cy.get('#title').type('Cypress title first')
          cy.get('#author').type('Cypress Tester first')
          cy.get('#url').type('http://www.cypressurlfirst.com')
          cy.get('#blogform-submit').click()
          cy.wait(500)
          cy.get('.blog').last().click().contains('like').as('likeButton1')
          cy.get('@likeButton1').click()
          cy.wait(500)
          // second
          cy.contains('new blog').click()
          cy.get('#title').type('Cypress title second')
          cy.get('#author').type('Cypress Tester second')
          cy.get('#url').type('http://www.cypressurlsecond.com')
          cy.get('#blogform-submit').click()
          cy.wait(500)
          cy.get('.blog').last().click().contains('like').as('likeButton2')
          cy.get('@likeButton2').click()
          cy.wait(500)
          cy.get('@likeButton2').click()
          cy.wait(500)
          // third
          cy.contains('new blog').click()
          cy.get('#title').type('Cypress title third')
          cy.get('#author').type('Cypress Tester third')
          cy.get('#url').type('http://www.cypressurlthird.com')
          cy.get('#blogform-submit').click()
          cy.wait(500)
          cy.get('.blog').last().click().contains('like')
        })
        // 5.22
        it('Blogs are ordered by likes', function() {
          cy.get('.blog').first().contains('2')
          cy.get('.blog').last().contains('0')
        })
      })
    })
  })
})