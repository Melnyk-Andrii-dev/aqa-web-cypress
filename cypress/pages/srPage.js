
class srPage {

    elements = {
        searchInp: () => cy.get('[data-cy="search-keyword"]'),
        searchDrpItems: () => cy.get('[data-cy*="search-dropdown-item"]'),
        searchDrpItemsTexts: () => cy.get('[data-cy*="search-dropdown-item"] span:not([class]):not([style])', { timeout: 10000 }),
        searchBtn: () => cy.get('[data-cy="search-trigger-button"]'),
        clearSearchBtn: () => cy.get('[data-cy="transactions-history-search-bar"] button[class*="clear-button"]'),
        searchFieldLoader: () => cy.get('[class*="search-keyword-dropdown"] [class="g-spinner-circle"]'),
        searchMainLoader: () => cy.get('[data-cy="transactions-region"] .g-spinner-circle'),
        transactionItems: () => cy.get('[data-cy*="transaction-list-item"]', { timeout: 10000 }),
        transactionItemsLabels: () => cy.get('[class*="transaction-list-item"][class*="misc"] [class="g-badge-label"]'),
        transactionItemsDates: () => cy.get('[data-cy*="transaction-list-item"] time', { timeout: 10000 }),
        searchResultsCounter: () => cy.get('.card-body strong', { timeout: 10000 }),
        openIndicator: () => cy.get('.overallSearch', { timeout: 10000 })
    }


    isOpened() {
        this.elements.openIndicator()
            .should('exist');
    }

    verifySearchPlaceholder(placeholder) {
        this.elements.searchInp()
            .should('have.css', 'placeholder', placeholder);
    }

    verifySearchDropdownItems() {
        this.elements.searchInp()
            .click()
            .then(() => {
                this.elements.searchDrpItems()
                    .should('have.length', 4)
                    .and()
                    .each(($item) => {
                        cy.wrap($item)
                            .should('be.visible')
                    })
            })
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
        this.elements.searchInp()
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

    clearOneSymbolFromSearchInput() {
        this.elements.searchInp()
            .type('{backspace}');
    }

    verifySearchSuggestionsByPartialMatch(partialText) {
        this.elements.searchDrpItemsTexts()
            .each(($element) => {
                cy.wrap($element).should(($suggestionText) => {
                    expect($suggestionText.text()).to.match(new RegExp(partialText, 'i'));
                });
            });
    }

    verifySearchMainLoader() {
        this.elements.searchMainLoader()
            .should('be.visible');
    }

    verifySearchResultsByLabelStrictMatch(strictText) {
        this.elements.transactionItemsLabels()
            .each(($element) => {
                cy.wrap($element).should(($labelText) => {
                    expect($labelText.text()).to.be.eq(strictText);
                });
            });
    }

    verifySearchResultsByCategoryAPI(category) {
        this.elements.searchInp()
            .clear()
            .type(category)
            .then(() => {
                cy.intercept('GET', 'https://site.com/api/my/transactions*').as('searchReq');
                this.elements.searchBtn()
                    .click({ timeout: 5000 })
                cy.wait('@searchReq')
                    .then((interception) => {

                        const collection = interception.response.body.collection;
                        collection.forEach((element) => {
                            expect(element.categories[0].subCategory.toLowerCase()).to.equal(category.toLowerCase());
                        });

                    });
            })
    }

    clearSearchField() {
        this.elements.searchInp()
            .click()
            .then(($field) => {
                for (let i = 0; i < 15; i++) {
                    cy.wrap($field).type('{backspace}');
                }
            })
    }

    verifySearchResultsQuantity(qty) {
        this.elements.transactionItems()
            .should('have.length', qty)
    }

    verifySearchResultsDescendingOrder() {
        this.elements.transactionItemsDates()
            .then(elements => {
                // Step 1: Extract datetime values from elements
                const datetimeValues = Cypress._.map(elements, element => element.getAttribute('datetime'));

                // Step 2: Sort datetime values in descending order
                const sortedDatetimeValues = datetimeValues.slice().sort((a, b) => b.localeCompare(a));

                // Step 3: Verify that datetime values are sorted in descending order
                expect(datetimeValues).to.deep.equal(sortedDatetimeValues);
            });
    }

    clickSearchSuggestionByTextFullMatch(text) {
        this.elements.searchDrpItemsTexts()
            .should('have.length', 1)
            .should('have.text', text).as('suggestion');

        cy.get('@suggestion')
            .parents('[data-cy*="search-dropdown-item"]')
            .click({ force: true })
    }

    verifySearchFieldFilling(text) {
        this.elements.searchInp()
            .should('have.attr', 'value', text)
    }

    verifyNoSearchResultsForText(text) {
        this.elements.searchInp()
            .clear()
            .type((text + '{enter}'))
            .then(() => {
                this.verifyNoTransactionsFound();
            })
    }

    verifyNoSearchResultsByLabel(searchInput, resultLabel) {

        this.elements.searchInp()
            .clear()
            .type((searchInput + '{enter}'))
            .then(() => {
                this.verifySearchResultsByLabelStrictMatch(resultLabel);
            })
    }

    verifySearchResultCounter(counter) {

        this.elements.searchResultsCounter()
            .then(($element) => {
                const elementText = $element[0].childNodes[0].nodeValue;
                expect(elementText).to.equal((counter + ' transactions'));
            });
    }

}

module.exports = new srPage();