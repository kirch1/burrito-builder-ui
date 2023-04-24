describe('Test for visiting and viewing existing orders', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders.json'
    })
    cy.visit('http://localhost:3000/');
  })

  //as a user, I should be able to visit the site and view the header text
  it('Should be able to view header', () => {
    cy.get('header').contains('Burrito Builder');
  })

  //as a user, I should be able to visit the site view the empty form
  it('Should be able to view empty form', () => {
    cy.get('form').should('be.visible');
    cy.get('input').invoke('attr', 'placeholder').should('contain', 'Name')
    cy.get('form').contains('Order: Nothing selected');
    cy.get('button').last().contains('Submit Order');
  });

  //as user I,  should be able to visit the site and view existing orders in the API

})
