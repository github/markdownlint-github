const _ = require("lodash");

const accessibilityRules = require("./style/accessibility.json");
const base = require("./style/base.json");
const gitHubCustomRules = require("./src/rules/index").rules;

module.exports = [...gitHubCustomRules];

const offByDefault = ["no-empty-alt-text"];

for (const rule of gitHubCustomRules) {
  const ruleName = rule.names[1];
  base[ruleName] = offByDefault.includes(ruleName) ? false : true;
}

module.exports.init = function init(consumerConfig) {
  // left overwrites right
  return _.defaultsDeep(consumerConfig, accessibilityRules, base);
};
