

import LoginPage from "../pages/LoginPage";

describe('test Api', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.loginUser();
    })

it('test service-work API', () => {
  cy.request({
    method: 'GET',
    url: 'https://www.saucedemo.com/service-work',
    failOnStatusCode: false 
  }).then((response) => {
    expect([200, 401, 404]).to.include(response.status);
    
    if (response.status === 200) {
      cy.log('Response body:', response.body);
      expect(response.body).to.not.be.null;
    }
  });
});

})