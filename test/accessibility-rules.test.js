import { lint } from "markdownlint/async";
import * as accessibilityRulesConfig from "../style/accessibility.json";
import { githubMarkdownLint } from "../src/rules/index.js";

const exampleFileName = "./test/example.md";
const options = {
  config: {
    default: false,
    ...accessibilityRulesConfig,
  },
  files: [exampleFileName],
  customRules: githubMarkdownLint,
};

console.log(options);

describe("when A11y rules applied", () => {
  test("fails expected rules", async () => {
    const result = await new Promise((resolve, reject) => {
      lint(options, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });

    const failuresForExampleFile = result[exampleFileName];
    const failureNames = failuresForExampleFile
      .map((failure) => failure.ruleNames)
      .flat();

    // Currently failing, finding 6 failures not 3
    expect(failuresForExampleFile).toHaveLength(3);
    expect(failureNames).toContain("no-default-alt-text");
  });
});
