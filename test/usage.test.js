const githubMarkdownLint = require("../index");

describe("usage", () => {
  describe("default export", () => {
    test("custom rules on default export", () => {
      const rules = githubMarkdownLint;
      expect(rules).toHaveLength(3);

      expect(rules[0].names).toEqual(["GH001", "no-default-alt-text"]);
      expect(rules[1].names).toEqual(["GH002", "no-generic-link-text"]);
      expect(rules[2].names).toEqual(["GH003", "no-empty-alt-text"]);
    });
  });
  describe("init method", () => {
    test("default options returned with no arguments provided", () => {
      const options = githubMarkdownLint.init();
      expect(options).toEqual({
        "no-duplicate-header": true,
        "ol-prefix": "ordered",
        "no-space-in-links": false,
        "single-h1": true,
        "no-emphasis-as-header": true,
        "no-empty-alt-text": false,
        "heading-increment": true,
        "no-generic-link-text": true,
        "ul-style": {
          style: "asterisk",
        },
        default: true,
        "no-inline-html": false,
        "no-bare-urls": false,
        "no-blanks-blockquote": false,
        "fenced-code-language": true,
        "no-default-alt-text": true,
        "no-alt-text": true,
      });
    });

    test("arguments override default configuration", () => {
      const defaultOptions = githubMarkdownLint.init();

      const toTestOptions = Object.keys(defaultOptions).slice(0, 3);

      // create a consumer config that is the opposite of the default config
      const originalConfig = {};
      const consumerConfig = {};
      for (const key of toTestOptions) {
        consumerConfig[key] = !defaultOptions[key];
        originalConfig[key] = defaultOptions[key];
      }
      // confirm they are not the same
      expect(originalConfig).not.toEqual(consumerConfig);

      // do config step
      const options = githubMarkdownLint.init(consumerConfig);

      // confirm config is set by consumer
      expect(options).toHaveProperty(
        toTestOptions[0],
        consumerConfig[toTestOptions[0]],
      );
      expect(options).toHaveProperty(
        toTestOptions[1],
        consumerConfig[toTestOptions[1]],
      );
      expect(options).toHaveProperty(
        toTestOptions[2],
        consumerConfig[toTestOptions[2]],
      );
    });
  });
});
