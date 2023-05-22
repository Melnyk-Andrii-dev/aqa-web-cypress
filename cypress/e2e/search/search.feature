Feature: Search Feature

    Feature This feature allows user to search for transactions

    Background: User is on a Homepage
    Given login page is opened
    # PUT USERNAME
    When user enters the username "name"
    When user clicks on start login button
    # PUT PASSWORD
    When user enters the password "pass"
    When user clicks on finish login button
    Then user is logged in

    Scenario: Search End To End 
    Given search field is prefilled with placeholder 'You search, I find.'
    When user clicks on search field
    Then filer suggestions are displayed

    When user types 'mockuptextQ*%97' in search field
    Then search field loader is displayed

    When user clicks search button
    Then search main loader is displayed
    Then search results page is opened
    Then no search results are displayed

    When user clears one symbol from search field
    Then search field loader is displayed

    When user clears search field
    When user clicks on search field
    When user types 'Fa' in search field
    Then search suggestions by text 'fa' displayed
    When user types 'shion{enter}' in search field
    Then search results are displayed by label "Fashion"

    When user clicks clear search button
    Then 50 search results are displayed
    Then search results are sorted by date in descending order

    When user types 'Fash' in search field
    When user clicks search suggestion 'Fashion'
    Then search results are displayed by label "Fashion"
    Then search field is filled with "Fashion"

    When user clicks on search field
    When user types '{backspace}' in search field
    When user clicks search button
    Then no search results are displayed
    
    Then verify no search results for 'Fashiom'
    Then verify no search results for 'Fashioo'
    Then verify no search results for 'Fashionn'
    Then verify no search results for 'Fash ion'

    Then verify search for 'fashion' gives result by label 'Fashion'
    Then verify search for 'FASHION' gives result by label 'Fashion'

    When user clicks clear search button
    Then search field is prefilled with placeholder 'Search for transactions in this account.'

    When user clicks on search field
    When user types 'last year' in search field
    When user clicks search button
    Then verify search result counter 89

    Then API verify search results by category 'Fashion'
