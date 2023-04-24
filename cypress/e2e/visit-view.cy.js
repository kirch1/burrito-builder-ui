describe('Test for visiting and viewing existing orders', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders.json'
    })
    cy.visit('http://localhost:3000/');
  });

  //as a user, I should be able to visit the site and view the header text
  it('Should be able to view header', () => {
    cy.get('header').contains('Burrito Builder');
  });

  //as a user, I should be able to visit the site view the empty form
  it('Should be able to view empty form', () => {
    cy.get('form').should('be.visible');
    cy.get('input').invoke('attr', 'placeholder').should('contain', 'Name')
    cy.get('form').contains('Order: Nothing selected');
    cy.get('button').last().contains('Submit Order');
  });

  //as user, I should be able to visit the site and view existing orders in the API
  it('Should be able to view API existing orders', () => {
    cy.get('.order').first().contains('TestName');
    cy.get('.order').first().contains('hot sauce');
    cy.get('.order').first().contains('jalapeno');
    cy.get('.order').first().contains('cilantro');
  });
});

describe('No orders test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'no-orders.json'
    })
    cy.visit('http://localhost:3000/');
  })

  //as user, I should be able to visit and be notofied if there are no orders
  it('API contains empty array of orders', () => {
    cy.get('section > p').contains('No orders yet!');
  });
});

describe('GET network error', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 400
    })
    cy.visit('http://localhost:3000/');
  })

  //as user I, should be notified if there was en error getting orders from the API
  it('API contains empty array of orders', () => {
    cy.get('#error-msg').contains('Error fetching orders!');
  });
});
