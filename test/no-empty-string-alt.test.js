const noEmptyStringAltRule = require("../src/rules/no-empty-string-alt");
const runTest = require("./utils/run-test").runTest;

describe("GH003: No Empty String Alt", () => {
  describe("successes", () => {
    test("html image", async () => {
      const strings = [
        '<img alt="A helpful description" src="https://user-images.githubusercontent.com/abcdef.png">',
        "`<img alt='' src='image.png'`", // code block
      ];

      const results = await runTest(strings, noEmptyStringAltRule);
      expect(results).toHaveLength(0);
    });
  });
  describe("failures", () => {
    test("HTML example", async () => {
      const strings = [
        '<img alt="" src="https://user-images.githubusercontent.com/abcdef.png">',
        "<img alt='' src='https://user-images.githubusercontent.com/abcdef.png'>",
      ];

      const results = await runTest(strings, noEmptyStringAltRule);

      const failedRules = results
        .map((result) => result.ruleNames)
        .flat()
        .filter((name) => !name.includes("GH"));

      expect(failedRules).toHaveLength(2);
      for (const rule of failedRules) {
        expect(rule).toBe("no-empty-string-alt");
      }
    });

    test("error message", async () => {
      const strings = [
        '<img alt="" src="https://user-images.githubusercontent.com/abcdef.png">',
      ];

      const results = await runTest(strings, noEmptyStringAltRule);

      expect(results[0].ruleDescription).toMatch(
        "Please provide an alternative text for the image.",
      );
      expect(results[0].errorRange).toEqual([6, 6]);
    });
  });
});
