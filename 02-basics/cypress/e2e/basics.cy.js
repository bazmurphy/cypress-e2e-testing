/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173');
    cy.get('.main-header img');
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').should('have.length', 1);
    cy.get('.main-header h1').contains('My Cypress Course Tasks');
    // when you chain .get() it will look from the top of the page again
    // cy.get(".main-header").get("img");
    // if you want to look for something inside the first .get() you should use the .find()
    cy.get('.main-header').find('h1').contains('My Cypress Course Tasks');
    // but when you chain .contains() it does look for one thing inside another
  });
});
