const _ = require("lodash");

const accessibilityRules = require("./style/accessibility.json");
const base = require("./style/base.json");
const gitHubCustomRules = require("./src/rules/index").rules;

module.exports = [...gitHubCustomRules];

for (const rule of gitHubCustomRules) {
  base[rule.names[1]] = true;
}

module.exports.init = function init(consumerConfig) {
  // left overwrites right
  return _.defaultsDeep(consumerConfig, accessibilityRules, base);
};
