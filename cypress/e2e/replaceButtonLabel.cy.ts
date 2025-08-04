import LoginPage from "../pages/LoginPage";

describe('replacing the button label', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.loginUser();
    })

    it('click on the card button', () => {
        cy.get('[data-test=inventory-item]')
        .first()
        .within(() => {
            cy.get('[data-test=add-to-cart-sauce-labs-backpack]').should('have.text', 'Add to cart').click();

            cy.get('[data-test=remove-sauce-labs-backpack]').should('have.text', 'Remove');
        })     

    })

})