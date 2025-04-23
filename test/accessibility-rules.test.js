import { lint } from "markdownlint/async";
import githubMarkdownLint from "../index.js";
import accessibilityRules from "../style/accessibility.js";

const exampleFileName = "./test/example.md";

describe("when A11y rules applied", () => {
  test("fails expected rules", async () => {
    const options = {
      config: {
        default: false,
        ...accessibilityRules,
      },
      files: [exampleFileName],
      customRules: githubMarkdownLint,
    };

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
