const noEmptyStringAltRule = require("../src/rules/no-empty-alt-text");
const runTest = require("./utils/run-test").runTest;

describe("GH003: No Empty Alt Text", () => {
  describe("successes", () => {
    test("html image", async () => {
      const strings = [
        '<img alt="A helpful description" src="https://user-images.githubusercontent.com/abcdef.png">',
        "`<img alt='' src='image.png'>`", // code block
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
        '<img src="cat.png" alt="" /> <img src="dog.png" alt="" />',
      ];

      const results = await runTest(strings, noEmptyStringAltRule);
      const failedRules = results
        .map((result) => result.ruleNames)
        .flat()
        .filter((name) => !name.includes("GH"));

      expect(failedRules).toHaveLength(4);
      for (const rule of failedRules) {
        expect(rule).toBe("no-empty-alt-text");
      }
    });

    test("error message", async () => {
      const strings = [
        '<img alt="" src="https://user-images.githubusercontent.com/abcdef.png">',
        '<img src="cat.png" alt="" /> <img src="dog.png" alt="" />',
      ];

      const results = await runTest(strings, noEmptyStringAltRule);

      expect(results[0].ruleDescription).toMatch(
        "Please provide an alternative text for the image.",
      );
      expect(results[0].errorRange).toEqual([6, 6]);

      expect(results[1].ruleDescription).toMatch(
        "Please provide an alternative text for the image.",
      );
      expect(results[1].errorRange).toEqual([20, 6]);
      expect(results[2].ruleDescription).toMatch(
        "Please provide an alternative text for the image.",
      );
      expect(results[2].errorRange).toEqual([49, 6]);
    });
  });
});
