import { lint } from "markdownlint/async";
// import * as accessibilityRulesConfig from "../style/accessibility.json";
import { githubMarkdownLint } from "../src/rules";

const exampleFileName = "./test/example.md";
const options = {
  config: {
    "no-duplicate-heading": true,
    "ol-prefix": "ordered",
    "no-space-in-links": false,
    "single-h1": true,
    "no-emphasis-as-heading": true,
    "no-empty-alt-text": false,
    "heading-increment": true,
    "no-generic-link-text": true,
    "ul-style": {
      style: "asterisk",
    },
    default: false,
    "no-inline-html": false,
    "no-bare-urls": false,
    "no-blanks-blockquote": false,
    "fenced-code-language": true,
    "no-default-alt-text": true,
    "no-alt-text": true,
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
