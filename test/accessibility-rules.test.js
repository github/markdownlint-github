import { lint } from "markdownlint/async";
import * as accessibilityRulesConfig from "../style/accessibility.json";
import * as accessibilityRules from "..";

const exampleFileName = "./test/example.md";
const options = {
  config: {
    default: false,
    ...accessibilityRulesConfig,
  },
  files: [exampleFileName],
  customRules: accessibilityRules,
};

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

    expect(failuresForExampleFile).toHaveLength(3);
    expect(failureNames).toContain("no-default-alt-text");
  });
});
