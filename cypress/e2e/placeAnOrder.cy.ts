import LoginPage from "../pages/LoginPage";
import { IDataOrder } from "../support";

describe('place an order', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.loginUser();
    })

    it('successful order', () => {  

        cy.get('[data-test=add-to-cart-sauce-labs-backpack]')
        .closest('[data-test="inventory-item"]')
        .within(() => {
            cy.get('[data-test=inventory-item-name]')
                .then(($el) => {
                        const product1Name = $el.text();
                        cy.wrap(product1Name).as('product1Name');
                });

            cy.get('[data-test=inventory-item-price]')
                .then(($el) => {
                        const product1Price = $el.text().replace('$ ', '');
                        cy.wrap(product1Price).as('product1Price');
                });
        })
        
        cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click()

        cy.get('[data-test=add-to-cart-sauce-labs-bike-light]')
        .closest('[data-test="inventory-item"]')
        .within(() => {
            cy.get('[data-test=inventory-item-name]')
                .then(($el) => {
                        const product2Name = $el.text();
                        cy.wrap(product2Name).as('product2Name');
                });

            cy.get('[data-test=inventory-item-price]')
                .then(($el) => {
                        const product2Price = $el.text().replace('$ ', '');
                        cy.wrap(product2Price).as('product2Price');
                });
        })
        
        cy.get('[data-test=add-to-cart-sauce-labs-bike-light]').click();
        
        cy.get('[data-test=shopping-cart-badge]').should('have.text', '2').click();

        cy.url().should('include', '/cart.html');

        cy.get('[data-test=checkout]').click();

        cy.fixture<IDataOrder>('dataOrder.json').then((testUser) => {
                    const user: IDataOrder = testUser

                    cy.get('[data-test=firstName]').type(user.firstName);
                    cy.get('[data-test=lastName]').type(user.lastName);
                    cy.get('[data-test=postalCode]').type(user.postalCode);
                })

        cy.get('[data-test=continue]').click();


        const parsePrice = (priceText) => {
            const value = parseFloat(priceText.replace(/[^\d.]/g, ''));
            if (isNaN(value)) throw new Error(`Invalid price format: ${priceText}`);
            return value;
        };

        cy.get('@product1Price').then(price1Text => {
            const price1 = parsePrice(price1Text);
            
            cy.get('@product2Price').then(price2Text => {
                const price2 = parsePrice(price2Text);
                const expectedTotal = price1 + price2;

                cy.get('[data-test=subtotal-label]')
                .invoke('text')
                .then(parsePrice)
                .should('eq', expectedTotal);
            });
        });

        cy.get('[data-test=finish]').click();

        cy.get('[data-test=complete-header]').should('have.text', 'Thank you for your order!')

    })

})