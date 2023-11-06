const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "uuopyr",
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    charts: true,
    reportPageTitle: 'Demo de rapport',
    embeddedScreenshots: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      const equipe = config.env.equipe
      if(equipe) config.specPattern = `cypress/e2e/${equipe}`
      
      return config
    },
  },
});
