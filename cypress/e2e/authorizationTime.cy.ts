import LoginPage from "../pages/LoginPage";
import { User, Users } from "../support";

describe('test time autorization', () => {
    beforeEach(() => {
        LoginPage.visit();
    })

    it('login time', () => {
        const startTime = Date.now();

        cy.fixture<Users>('users.json').then((users) => {
            const user: User = users.performance_glitch_user
        
            cy.get('[data-test=username]').type(user.username);
            cy.get('[data-test=password]').type(user.password);
            cy.get('[data-test=login-button]').click();
        
        })

        cy.url().should('include', '/inventory.html').then(() => {
            const loadTime = Date.now() - startTime;
            cy.log(`Время авторизации: ${loadTime}ms`);
        });
    });

})