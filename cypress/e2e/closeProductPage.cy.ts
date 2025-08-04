import LoginPage from "../pages/LoginPage";

describe('product page operation', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.loginUser();
    })

    it('close the product page', () => {

        cy.get('[data-test=inventory-item]')
        .first()
        .within(() => {
            cy.get('[data-test=inventory-item-name]').click();
        })

        cy.url().should('include', '?id');
        
        cy.get('[data-test=back-to-products]').click();

        cy.url().should('include', '/inventory.html');
    })

})