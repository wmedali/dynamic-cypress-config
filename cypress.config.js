const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const equipe = config.env.equipe
      config.specPattern = `cypress/e2e/${equipe}`
      
      
      return config
    },
  },
});
