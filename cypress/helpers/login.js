import { loginPage } from "../locators/login";

export function login(username, password) {
    if(username) {
        cy.get(loginPage.usernameField).type(username);
    }
    if (password) {
        cy.get(loginPage.passwordField).type(password);
    }
    cy.get(loginPage.loginButton).click();
}

export function checkErrorMessage(message) {
    cy.get(loginPage.errorMessage).should('be.visible').and('contain.text', message)
}