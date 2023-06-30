const options = require('./index.js').init({
    "default": false,
    "heading-increment": true,
    "no-alt-text": true,
    "single-h1": true,
    "no-emphasis-as-header": true,
    "first-line-heading": true
})
module.exports = {
    config: options,
    customRules: ["./index.js"],
    outputFormatters: [
        ['markdownlint-cli2-formatter-pretty', {appendLink: true}], // ensures the error message includes a link to the rule documentation
        [
          'markdownlint-cli2-formatter-json',
          {name: 'markdown-violations.json', spaces: 1}
        ]
    ]
}
