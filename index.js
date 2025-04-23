import _ from "lodash-es";
import { githubMarkdownLint } from "./src/rules/index.js";

import accessibilityRules from "./style/accessibility.js";
import baseRules from "./style/base.js";

const offByDefault = ["no-empty-alt-text"];

export function init(consumerConfig) {
  const base = { ...baseRules };

  for (const rule of githubMarkdownLint) {
    const ruleName = rule.names[1];
    base[ruleName] = offByDefault.includes(ruleName) ? false : true;
  }

  return _.defaultsDeep(consumerConfig, accessibilityRules, base);
}

export default githubMarkdownLint;
