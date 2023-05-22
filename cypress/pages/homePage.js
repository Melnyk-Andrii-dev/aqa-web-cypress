
class homePage {

    elements = {
        searchInp: () => cy.get('[data-cy="search-keyword"]', { timeout: 10000 }),
        searchDrpItems: () => cy.get('[data-cy*="search-dropdown-item"]', { timeout: 10000 }),
        searchDrpItemsTexts: () => cy.get('[data-cy*="search-dropdown-item"] span:not([class]):not([style])'),
        searchBtn: () => cy.get('[data-cy="search-trigger-button"]'),
        clearSearchBtn: () => cy.get('[data-cy="transactions-history-search-bar"] button[class*="clear-button"]'),
        searchFieldLoader: () => cy.get('[class*="search-keyword-dropdown"] [class="g-spinner-circle"]'),
        searchMainLoader: () => cy.get('[data-cy="transactions-region"] .g-spinner-circle'),
        openIndicator: () => cy.get('[data-cy="nav-logout"]', { timeout: 20000 })
    }

    isOpened() {
        this.elements.openIndicator()
            .should('be.visible');
        cy.wait(5000)
    }

    verifySearchPlaceholder(placeholder) {
        this.elements.searchInp()
            .should('have.attr', 'placeholder', placeholder, { timeout: 10000 });
    }

    clickSearchField() {
        // cy.wait(5000)
        this.elements.searchInp()
            .click();
    }

    verifyFilterSuggestions() {

        this.elements.searchDrpItems()
            .should('have.length', 4)
            .and('be.visible')
    }

    typeInSearchField(text) {
        this.elements.searchInp()
            .type(text)
    }

    clickClearSearchButton() {
        this.elements.clearSearchBtn()
            .click()
    }

    clickSearchButton() {
        this.elements.searchBtn()
            .click()
    }

    verifySearchFieldLoader() {
        this.elements.searchFieldLoader()
            .should('be.visible')
            .then(($loader) => {
                cy.wrap($loader)
                    .should('not.exist')
            })
    }

    verifyNoTransactionsFound() {
        this.elements.transactionItems()
            .should('not.exist')
    }

    verifySearchSuggestionsByPartialMatch(partialText) {
        this.elements.searchDrpItemsTexts()
            .each(($element) => {
                cy.wrap($element)
                    .should(($suggestionText) => {
                        expect($suggestionText.text()).to.match(new RegExp(partialText, 'i'));
                    });
            });
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

    verifyLoggingIn() {
        this.elements.isLoggedInIndicator()
            .should('be.visible');
    }
}

module.exports = new homePage();