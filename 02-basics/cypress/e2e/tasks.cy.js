/// <reference types="Cypress" />

describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    // go to the root page
    cy.visit('http://localhost:5173/');
    // click the add task button
    cy.contains('Add Task').click();
    // this is better practice than the using contains text above :
    // cy.get('[data-cy="start-add-task-button"]').click();

    cy.get('.backdrop').click({ force: true });
    // click by default select the center of the item
    // and the center of the backdrop is behind the modal
    // we can add { force : true } to click the item even if it thinks there is something in front of that item
    // we can also hange the coordinates of where cypress simulates a click (will learn that later)

    // we want to check if the modal is really gone
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    // check if the cancel task button closes the modal
    // click the add task button again
    cy.contains('Add Task').click();
    // click the cancel button
    cy.contains('Cancel').click();
    // this is better practice than the using contains text above :
    // cy.get('[type="button"]').click();
    // we check again if the modal is really gone
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  });

  it('should create a new task', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('Task Title 1');
    cy.get('#summary').type('Task Summary...');
    cy.get('#category').select(2);
    // there are more than one add task buttons, its just hiding behind the modal
    // cy.contains('Add Task').click();
    cy.get('.modal').contains('Add Task').click();
    // should have length means we should find X number of these
    cy.get('.task').should('have.length', 1);
    cy.get('.task-list').find('.task').find('h2').contains('Task Title 1');
    cy.get('.task-list').find('.task').find('p').contains('Task Summary');
  });

  it('should validate user input', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.modal').contains('Add Task').click();
    cy.get('.modal').contains('Please provide values');
  });

  it('should filter tasks', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('Task Title 1');
    cy.get('#summary').type('Task Summary');
    cy.get('#category').select('urgent');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('moderate');
    cy.get('.task').should('have.length', 0);
    cy.get('#filter').select('urgent');
    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('all');
    cy.get('.task').should('have.length', 1);
  });

  it('should add multiple tasks', () => {
    cy.visit('http://localhost:5173/');

    cy.contains('Add Task').click();
    cy.get('#title').type('Task 1 Title');
    cy.get('#summary').type('Task 1 Summary');
    cy.get('#category').select('moderate');
    cy.get('.modal').contains('Add Task').click();

    cy.get('.task').should('have.length', 1);

    cy.contains('Add Task').click();
    cy.get('#title').type('Task 2 Title');
    cy.get('#summary').type('Task 2 Summary');
    cy.get('#category').select('moderate');
    cy.get('.modal').contains('Add Task').click();

    cy.get('.task').should('have.length', 2);
    // get the first element of a list :
    // cy.get('.task').first();
    // get the last element of a list :
    // cy.get('.task').last();
    cy.get('.task').eq(0).contains('Task 1 Title');
    cy.get('.task').eq(1).contains('Task 2 Title');
  });
});
