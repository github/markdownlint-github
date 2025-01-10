import _ from "lodash-es";

import accessibilityRules from "./style/accessibility.json";
import base from "./style/base.json";
import { githubMarkdownLint } from "./src/rules/index.js";

const offByDefault = ["no-empty-alt-text"];

for (const rule of githubMarkdownLint) {
  const ruleName = rule.names[1];
  base[ruleName] = offByDefault.includes(ruleName) ? false : true;
}

export function init(consumerConfig) {
  // left overwrites right
  const foo = _.defaultsDeep(consumerConfig, accessibilityRules, base);
  return foo;
}

// export default githubMarkdownLint;
