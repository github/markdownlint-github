const _ = require('lodash')

const noDefaultAltText = require('./no-default-alt-text')

const customRules = [
    noDefaultAltText
]

module.exports = [...customRules]

const accessibilityRules = {
    "no-duplicate-header": true,
    "ol-prefix": "ordered",
    "no-space-in-links": false,
    "single-h1": true,
    "no-emphasis-as-header": true,
    "ul-style": true, 
}

const base = {
    default: true,
    /*
    * Although 'true' is in the default set,
    * we define rules that GitHub particularly
    * prefer to be set true. Consuming libraries
    * can still override them, but our opinion is here.
    */
    "no-inline-html": false,
    "no-bare-urls": false,
    "no-blanks-blockquote": false,
    "fenced-code-language": true
}

customRules.forEach(rule => {
    base[rule.names[1]] = true
})

module.exports.init = function init(consumerConfig) {
    // left overwrites right
    return _.defaultsDeep(consumerConfig, accessibilityRules, base)
}
