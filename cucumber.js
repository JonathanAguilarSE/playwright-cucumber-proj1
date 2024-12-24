const { DEFAULT_THEME } = require("@cucumber/pretty-formatter");

module.exports = {
    // Default configuration for cucumber framework
    // Ex. your feature file, runner, and somoe test configuraitons
    default: {
        paths: ["features/**/*.feature"],
        formatOptions: {
            snippetInterface: "async-await",
            theme: {
                ...DEFAULT_THEME,
            },
            colorsEnabled: true,
        },
        format: [
            "html:reports/cucumber-report.html",
            "summary",
            // "progress-bar"
            "@cucumber/pretty-formatter"
        ],
        // Required JS files befroe running steps
        // Includes step-deifinitions and any setup files needed for your tests
        require: ["step-definitions/**/*.js", "setup/*.js"],
    },
}