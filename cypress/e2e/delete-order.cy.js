describe('Test for visiting and viewing existing orders', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders.json'
    });
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders/2', {
      statusCode: 204
    })
    cy.visit('http://localhost:3000/');
  });

  //as a user, I should be able to delete and order by clicking the respective X icon for the order
  it('Should be able to delete order', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'order-deleted.json'
    });
    cy.get('.order').last().contains('TestName2');
    cy.get('.delete-order').last().click();
    cy.get('.order').last().contains('TestName');
  })
});

describe('DELETE sad path', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'orders.json'
    });
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders/2', {
      statusCode: 404
    })
    cy.visit('http://localhost:3000/');
  })

  //as user I, should be notified if there was an error deleteing from the api
  it('DELETE netowrk error', () => {
    cy.get('.delete-order').last().click();
    cy.get('#error-msg').contains('There was a problem deleting the order!');
  });
});
