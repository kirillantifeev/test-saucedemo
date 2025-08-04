import LoginPage from "../pages/LoginPage";

describe('test logout user', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.loginUser();
    })

    it('logout user', () => {


        cy.getAllCookies().then((cookies) => {
            const hasSaucedemoCookie = cookies.some(cookie => 
                cookie.domain === 'www.saucedemo.com'
            );
            console.log(cookies)
            expect(hasSaucedemoCookie).to.be.true;
        });

        cy.get('[data-test="open-menu"]')
            .parent() 
            .find('button') 
            .click();

        cy.get('[data-test=logout-sidebar-link]').click();

        cy.getAllCookies().then((cookies) => {
            const hasSaucedemoCookie = cookies.some(cookie => 
                cookie.domain === 'www.saucedemo.com'
            );
            console.log(cookies)
            expect(hasSaucedemoCookie).to.be.false;
        });

    })



})