const noDefaultAltText = require('./no-default-alt-text')

const customRules = [noDefaultAltText]
console.log("hello", [...customRules])
module.exports = [...customRules]
