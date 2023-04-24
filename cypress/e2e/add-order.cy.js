describe('Test for visiting and viewing existing orders', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders.json'
    });
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      fixture: 'new-order.json'
    });
    cy.visit('http://localhost:3000/');
  });

  //as a user, I should not be able to add a new order without a name and at least 1 ingredient
  it('Should not be able to submit incomplete form', () => {
    cy.get('#submit-order-button').click();
    cy.get('#error-msg').contains('Please add name and at least one ingredient');
    cy.wait(500);
    cy.get('input').type('Test Name');
    cy.get('#submit-order-button').click();
    cy.get('#error-msg').contains('Please add name and at least one ingredient');
    cy.wait(500);
    cy.get('input').clear();
    cy.get('#submit-order-button').click();
    cy.get('#error-msg').contains('Please add name and at least one ingredient');
  });

  //as a user, I should be able to add an order with the form
  it('Should be to POST new orders', () => {
    cy.get('input').type('Newman');
    cy.get('[name="hot sauce"]').click();
    cy.get('[name="beans"]').click();
    cy.get('#submit-order-button').click();
    cy.get('.order').last().contains('Newman');
    cy.get('.order').last().contains('hot sauce');
    cy.get('.order').last().contains('beans');
  });
});

describe('POST network error', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders.json'
    });
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 400
    })
    cy.visit('http://localhost:3000/');
  })

  //as user I, should be notified if there was an error adding and or to the API
  it('API POST error response when adding order', () => {
    cy.get('input').type('Newman');
    cy.get('[name="hot sauce"]').click();
    cy.get('[name="beans"]').click();
    cy.get('#submit-order-button').click();
    cy.get('#error-msg').contains('Error creating new order!');
  });
});
