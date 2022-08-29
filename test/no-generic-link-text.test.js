const noGenericLinkTextRule = require("../no-generic-link-text");
const runTest = require("./utils/run-test").runTest;

describe("GH002: No Generic Link Text", () => {
  describe("successes", () => {
    test("inline", async () => {
      const strings = [
        "[GitHub](https://www.github.com)",
        "[Read more about GitHub](https://www.github.com/about)",
        "[](www.github.com)",
      ];

      const results = await runTest(strings, noGenericLinkTextRule);

      for (const result of results) {
        expect(result).not.toBeDefined();
      }
    });
  });
  describe("failures", () => {
    test("markdown example", async () => {
      const strings = [
        "[Click here](www.github.com)",
        "[here](www.github.com)",
        "[read more](www.github.com)",
        "[more](www.github.com)",
        "[learn more](www.github.com)",
        "[learn more.](www.github.com)",
        "[click here!](www.github.com)",
      ];

      const results = await runTest(strings, noGenericLinkTextRule);

      const failedRules = results
        .map((result) => result.ruleNames)
        .flat()
        .filter((name) => !name.includes("GH"));

      expect(failedRules).toHaveLength(7);
      for (const rule of failedRules) {
        expect(rule).toBe("no-generic-link-text");
      }
    });
  });
});
