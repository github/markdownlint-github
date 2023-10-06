const markdownlint = require("markdownlint");
const accessibilityRulesConfig = require("../style/accessibility.json");
const accessibilityRules = require("..");

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
      markdownlint(options, (err, res) => {
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
