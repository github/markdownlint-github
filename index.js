import _ from "lodash-es";

import * as accessibilityRules from "./style/accessibility.json";
import * as base from "./style/base.json";
import { githubMarkdownLint } from "./src/rules/index.js";

const offByDefault = ["no-empty-alt-text"];
const foo = base;

// for (const rule of githubMarkdownLint) {
//   const ruleName = rule.names[1];
//   foo[ruleName] = offByDefault.includes(ruleName) ? false : true;
// }

export function init(consumerConfig) {
  // left overwrites right
  return _.defaultsDeep(consumerConfig, accessibilityRules, base);
}
