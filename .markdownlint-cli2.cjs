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
}
