const altTextRule = require("../src/rules/no-default-alt-text");
const runTest = require("./utils/run-test").runTest;

describe("GH001: No Default Alt Text", () => {
  describe("successes", () => {
    test("inline", async () => {
      const strings = [
        "![Chart with a single root node reading 'Example'](https://user-images.githubusercontent.com/abcdef.png)",
      ];

      const results = await runTest(strings, altTextRule);

      for (const result of results) {
        expect(result).not.toBeDefined();
      }
    });
    test("html image", async () => {
      const strings = [
        '<img alt="A helpful description" src="https://user-images.githubusercontent.com/abcdef.png">',
      ];

      const results = await runTest(strings, altTextRule);

      for (const result of results) {
        expect(result).not.toBeDefined();
      }
    });
  });
  describe("failures", () => {
    test("markdown example", async () => {
      const strings = [
        "![Screen Shot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)",
        "![ScreenShot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)",
        "![Screen shot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)",
        "![Screenshot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)",
        "![Clean Shot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)",
        "![image](https://user-images.githubusercontent.com/abcdef.png)",
        "![Image](https://user-images.githubusercontent.com/abcdef.png)",
      ];

      const results = await runTest(strings, altTextRule);

      const failedRules = results
        .map((result) => result.ruleNames)
        .flat()
        .filter((name) => !name.includes("GH"));

      expect(failedRules).toHaveLength(7);
      for (const rule of failedRules) {
        expect(rule).toBe("no-default-alt-text");
      }
    });

    test("HTML example", async () => {
      const strings = [
        '<img alt="Screen Shot 2022-06-26 at 7 41 30 PM" src="https://user-images.githubusercontent.com/abcdef.png">',
        '<img alt="ScreenShot 2022-06-26 at 7 41 30 PM" src="https://user-images.githubusercontent.com/abcdef.png">',
        '<img alt="Screen shot 2022-06-26 at 7 41 30 PM" src="https://user-images.githubusercontent.com/abcdef.png">',
        '<img alt="Screenshot 2022-06-26 at 7 41 30 PM" src="https://user-images.githubusercontent.com/abcdef.png">',
        '<img alt="Clean Shot 2022-06-26 at 7 41 30 PM" src="https://user-images.githubusercontent.com/abcdef.png">',
        '<img alt="Image" src="https://user-images.githubusercontent.com/abcdef.png">',
        '<img alt="image" src="https://user-images.githubusercontent.com/abcdef.png">',
      ];

      const results = await runTest(strings, altTextRule);

      const failedRules = results
        .map((result) => result.ruleNames)
        .flat()
        .filter((name) => !name.includes("GH"));

      expect(failedRules).toHaveLength(7);
      for (const rule of failedRules) {
        expect(rule).toBe("no-default-alt-text");
      }
    });

    test("error message", async () => {
      const strings = [
        "![Screen Shot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)",
        '<img alt="Screen Shot 2022-06-26 at 7 41 30 PM" src="https://user-images.githubusercontent.com/abcdef.png">',
      ];

      const results = await runTest(strings, altTextRule);

      expect(results[0].ruleDescription).toMatch(
        "Images should have meaningful alternative text (alt text)"
      );
      expect(results[0].errorRange).toEqual([3, 36])
      expect(results[1].ruleDescription).toMatch(
        "Images should have meaningful alternative text (alt text)"
      );
      expect(results[1].errorRange).toEqual([11, 36])
    });
  });
});
