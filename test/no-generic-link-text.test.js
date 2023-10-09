const noGenericLinkTextRule = require("../src/rules/no-generic-link-text");
const runTest = require("./utils/run-test").runTest;

describe("GH002: No Generic Link Text", () => {
  describe("successes", () => {
    test("inline", async () => {
      const strings = [
        "[GitHub](https://www.github.com)",
        "[Read more about GitHub](https://www.github.com/about)",
        "[](www.github.com)",
        "![Image](www.github.com)",
        `
        ## Hello
        I am not a link, and unrelated.
        ![GitHub](some_image.png)
        `,
      ];

      const results = await runTest(strings, noGenericLinkTextRule);
      expect(results.length).toBe(0);
    });
  });
  describe("failures", () => {
    test("inline", async () => {
      const strings = [
        "[Click here](www.github.com)",
        "[here](www.github.com)",
        "Please [read more](www.github.com)",
        "[more](www.github.com)",
        "[link](www.github.com)",
        "You may [learn more](www.github.com) at GitHub",
        "[learn more.](www.github.com)",
        "[click here!](www.github.com)",
      ];

      const results = await runTest(strings, noGenericLinkTextRule);

      const failedRules = results
        .map((result) => result.ruleNames)
        .flat()
        .filter((name) => !name.includes("GH"));

      expect(failedRules).toHaveLength(8);
      for (const rule of failedRules) {
        expect(rule).toBe("no-generic-link-text");
      }
    });

    test("error message", async () => {
      const strings = ["[Click here](www.github.com)"];

      const results = await runTest(strings, noGenericLinkTextRule);

      expect(results[0].ruleDescription).toMatch(
        /Avoid using generic link text like `Learn more` or `Click here`/,
      );
      expect(results[0].errorDetail).toBe("For link: Click here");
    });

    test("additional words can be configured", async () => {
      const results = await runTest(
        ["[something](www.github.com)"],
        noGenericLinkTextRule,
        // eslint-disable-next-line camelcase
        { additional_banned_texts: ["something"] },
      );

      const failedRules = results
        .map((result) => result.ruleNames)
        .flat()
        .filter((name) => !name.includes("GH"));

      expect(failedRules).toHaveLength(1);
    });

    test("exceptions can be configured", async () => {
      const results = await runTest(
        ["[Link](primer.style/components/Link)"],
        noGenericLinkTextRule,
        { exceptions: ["link"] },
      );

      for (const result of results) {
        expect(result).not.toBeDefined();
      }
    });
  });
});
