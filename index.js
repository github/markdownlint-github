import { readFile } from "fs/promises";
import _ from "lodash-es";
// import githubMarkdownLint from "./src/rules/index.js";

const offByDefault = ["no-empty-alt-text"];
// const foo = [altTextRule, noGenericLinkTextRule, noEmptyStringAltRule];
// for (const rule of foo) {
//   const ruleName = rule.names[1];
//   base[ruleName] = offByDefault.includes(ruleName) ? false : true;
// }

export async function init(consumerConfig) {
  // left overwrites right
  const accessibilityRules = JSON.parse(
    await readFile(new URL("./style/accessibility.json", import.meta.url))
  );

  const base = JSON.parse(
    await readFile(new URL("./style/base.json", import.meta.url))
  );

  return _.defaultsDeep(consumerConfig, accessibilityRules, base);
}

// export { default } from "./rules";
