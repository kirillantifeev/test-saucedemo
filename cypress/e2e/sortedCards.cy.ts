import LoginPage from "../pages/LoginPage";
import { TNames, TPrices } from "../support";

let originalNames: TNames = [];
let originalPrices: TPrices = [];

describe('sorted product cards', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.loginUser();

        cy.get('[data-test=inventory-item]').should('have.length.gt', 0);
        cy.get('[data-test=inventory-item-name]').then($els => {
            originalNames = Cypress.$.makeArray($els).map(el => el.innerText);
        });
        cy.get('[data-test=inventory-item-price]').then($els => {
            originalPrices = Cypress.$.makeArray($els).map(el => parseFloat(el.innerText.replace('$', '')));
        });
    })

    it('sorted by name (A → Z)', () => {
        cy.get('[data-test=product-sort-container]').select('az');
        cy.get('[data-test=inventory-item-name]').then($els => {
            const sortedNames = Cypress.$.makeArray($els).map(el => el.innerText);
            
            expect(sortedNames).to.deep.equal([...originalNames].sort());
        });
    });


    it('sorted by name (Z → A)', () => {
        cy.get('[data-test=product-sort-container]').select('za');
        cy.get('[data-test=inventory-item-name]').then($els => {
            const sortedNames = Cypress.$.makeArray($els).map(el => el.innerText);
            
            expect(sortedNames).to.deep.equal([...originalNames].sort().reverse());
        });
    });

    it('Сортировка по цене (low → high)', () => {
        cy.get('[data-test=product-sort-container]').select('lohi');
        cy.get('[data-test=inventory-item-price]').then($els => {
            const sortedPrices = Cypress.$.makeArray($els).map(el => parseFloat(el.innerText.replace('$', '')));
            expect(sortedPrices).to.deep.equal([...originalPrices].sort((a, b) => a - b));
        });
    });

    it('Сортировка по цене (high → low)', () => {
        cy.get('[data-test=product-sort-container]').select('hilo');
        cy.get('[data-test=inventory-item-price]').then($els => {
            const sortedPrices = Cypress.$.makeArray($els).map(el => parseFloat(el.innerText.replace('$', '')));
            expect(sortedPrices).to.deep.equal([...originalPrices].sort((a, b) => b - a));
        });
    });
})