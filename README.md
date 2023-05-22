# andrii-melnyk-task

This is a Cypress (JavaScript) test automation demo project, implemented with cucumber-plugin https://github.com/TheBrainFamily/cypress-cucumber-preprocessor. Configured with Esbuild bundler and ES6 module (compile options).

Consists of an E2E scenario for Bank Transactions Search Functionality. Page object model approach is used for step definitions. Currently setup for Desktop 1440x900 resolution, target browser - Google Chrome v111.


Prior to running the test, please set the USERNAME and PASSWORD in the **"cypress\e2e\search\search.feature"** file. Please run the test with npx (e.g. **"npx cypress run --headed --browser chrome --spec "cypress\e2e\search\search.feature"**)
