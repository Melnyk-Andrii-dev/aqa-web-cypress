import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
const loginPage = require('../../pages/loginPage');
const homePage = require('../../pages/homePage');
const srPage = require('../../pages/srPage');

Given('login page is opened', () => {
    cy.visit('/')
})

When('user enters the username {string}', (username) => {
    loginPage.typeUsername(username);
})

When('user enters the password {string}', (password) => {
    loginPage.typePassword(password);
})

When('user clicks on start login button', () => {
    loginPage.clickStartLogin();
})

When('user clicks on finish login button', () => {
    loginPage.clickFinishLogin();
})

Then('user is logged in', () => {
    homePage.isOpened();
})

Given, Then('search field is prefilled with placeholder {string}', (placeholder) => {
    homePage.verifySearchPlaceholder(placeholder)
})

When('user clicks on search field', () => {
    homePage.clickSearchField();
})

Then('filer suggestions are displayed', () => {
    homePage.verifyFilterSuggestions();
})

When('user types {string} in search field', (text) => {
    homePage.typeInSearchField(text);
})

When('user clicks search button', () => {
    homePage.clickSearchButton();
})

Then('search field loader is displayed', () => {
    homePage.verifySearchFieldLoader();
})

Then('search results page is opened', () => {
    srPage.isOpened();
})

Then('no search results are displayed', () => {
    srPage.verifyNoTransactionsFound();
})

When('user clears one symbol from search field', () => {
    srPage.clearOneSymbolFromSearchInput();
})

When('user clears search field', () => {
    srPage.clearSearchField();
})

Then('search suggestions by text {string} displayed', (text) => {
    srPage.verifySearchSuggestionsByPartialMatch(text)
})

Then('search main loader is displayed', () => {
    srPage.verifySearchMainLoader();
})

Then('search results are displayed by label {string}', (label) => {
    srPage.verifySearchResultsByLabelStrictMatch(label);
})

Then('{int} search results are displayed', (qty) => {
    srPage.verifySearchResultsQuantity(qty);
})

Then('search results are sorted by date in descending order', () => {
    srPage.verifySearchResultsDescendingOrder();
})

When('user clicks clear search button', () => {
    srPage.clickClearSearchButton();
})

When('user clicks search suggestion {string}', (suggestionText) => {
    srPage.clickSearchSuggestionByTextFullMatch(suggestionText)
})

Then('search field is filled with {string}', (text) => {
    srPage.verifySearchFieldFilling(text);
})

Then('verify no search results for {string}', (text) => {
    srPage.verifyNoSearchResultsForText(text);
})

Then('verify search for {string} gives result by label {string}', (searchInput, resultLabel) => {
    srPage.verifyNoSearchResultsByLabel(searchInput, resultLabel);
})

Then('verify search result counter {int}', (counter) => {
    srPage.verifySearchResultCounter(counter)
})

Then('API verify search results by category {string}', (category) => {
    srPage.verifySearchResultsByCategoryAPI(category);
})