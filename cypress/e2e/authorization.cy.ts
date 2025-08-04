import LoginPage from '../pages/LoginPage';

describe('login tests', () => {
    beforeEach(() => {
        LoginPage.visit();
    })

    it('successful login with glitch_user', () => {
        LoginPage.loginUser();

        cy.url().should('include', '/inventory.html');
        cy.get('[data-test=title]').should('have.text', 'Products');
    })

    it('log in with an incorrect password', () => {
        cy.get('[data-test=username]').type('performance_glitch_user');
        cy.get('[data-test=password]').type('incorrect');
        cy.get('[data-test=login-button]').click();

        cy.get('[data-test=error]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('log in with an incorrect username', () => {
        cy.get('[data-test=username]').type('incorrect');
        cy.get('[data-test=password]').type('secret_sauce');
        cy.get('[data-test=login-button]').click();

        cy.get('[data-test=error]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

})