import LoginPage from "../pages/LoginPage";

describe('product page operation', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.loginUser();
    })

    it('open the product page using the title', () => {

        cy.get('[data-test=inventory-item]')
        .first()
        .within(() => {
            cy.get('[data-test=inventory-item-name]')
                .then(($el) => {
                        const productName = $el.text();
                        cy.wrap(productName).as('productName');
                        $el.click(); 
                    });
                })

        cy.url().should('include', '?id');
        
        cy.get('@productName').then((productName) => {
            cy.get('[data-test=inventory-item-name]').should('have.text', productName);
        });
    })

    it('open the product page using the title', () => {

        cy.get('[data-test=inventory-item]')
        .first()
        .within(() => {
            cy.get('[data-test=inventory-item-name]')
                .then(($el) => {
                        const productName = $el.text();
                        cy.wrap(productName).as('productName');
                    });

            cy.get('[data-test=inventory-item-sauce-labs-backpack-img]').click();
        })

        cy.url().should('include', '?id');
        
        cy.get('@productName').then((productName) => {
            cy.get('[data-test=inventory-item-name]').should('have.text', productName);
        });
    })

})