const _ = require('lodash')

const accessibilityRules = require('./style/accessibility.json')
const base = require('./style/base.json')
const noDefaultAltText = require('./no-default-alt-text')

const customRules = [
    noDefaultAltText
]

module.exports = [...customRules]

customRules.forEach(rule => {
    base[rule.names[1]] = true
})

module.exports.init = function init(consumerConfig) {
    // left overwrites right
    return _.defaultsDeep(consumerConfig, accessibilityRules, base)
}
