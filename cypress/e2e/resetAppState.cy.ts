import LoginPage from "../pages/LoginPage";

describe('test Reset App State', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.loginUser();
    })

    it('click Reset App State button', () => {

        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();

        cy.get('[data-test=shopping-cart-badge]').should('have.text', '1')

        cy.get('[data-test="open-menu"]')
            .parent() 
            .find('button') 
            .click();

        cy.get('[data-test=reset-sidebar-link]').click();  

        cy.get('[data-test=shopping-cart-link]').should('have.text', '')

        cy.get('[data-test=add-to-cart-sauce-labs-backpack]');

    })

})