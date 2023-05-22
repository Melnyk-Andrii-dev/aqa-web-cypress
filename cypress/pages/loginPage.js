
class loginPage {

    elements = {
        usernameInp: () => cy.get('input#user', { timeout: 5000 }),
        startLoginBtn: () => cy.get('#submitButton'),
        passwordInp: () => cy.get('input#secret'),
        finishLoginBtn: () => cy.get('#submitButton'),
        errorMessage: () => cy.get('h3[data-test="error"]'),
        loggingLoader: () => cy.get('[class*="loader-circle"]'),
    }

    typeUsername(username) {
        this.elements.usernameInp()
            .type(username);
    }

    clickStartLogin() {
        this.elements.startLoginBtn()
            .click();
    }

    typePassword(password) {
        this.elements.passwordInp()
            .type(password);
    }

    clickFinishLogin() {
        this.elements.finishLoginBtn()
            .click();
    }

}

module.exports = new loginPage();