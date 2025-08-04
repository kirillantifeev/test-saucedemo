import {User, Users} from '../support/index.d'

class LoginPage {
    visit () {
        cy.visit('/');
    }

    loginUser () {

        cy.fixture<Users>('users.json').then((users) => {
            const user: User = users.performance_glitch_user

            cy.get('[data-test=username]').type(user.username);
            cy.get('[data-test=password]').type(user.password);
            cy.get('[data-test=login-button]').click();

        })
        
    }
}

export default new LoginPage()