const _ = require('lodash')

const noDefaultAltText = require('./no-default-alt-text')

const customRules = [noDefaultAltText]

const base = {
    config: {},
    customRules
}

customRules.forEach(rule => {
    base.config[rule.names[1]] = true
})

module.exports.overwriteWith = function overwriteWith(consumerConfig) {
    // defaults are right-most
    return _.defaultsDeep(consumerConfig, base)
}


module.exports = [...customRules]
