import { lint } from "markdownlint/async";
import markdownIt from "markdown-it";

const markdownItFactory = () => markdownIt({ html: true });

export async function runTest(strings, rule, ruleConfig) {
  const thisRuleName = rule.names[1];

  const config = {
    config: {
      default: false,
      [thisRuleName]: ruleConfig || true,
    },
    customRules: [rule],
    markdownItFactory,
  };

  const results = await Promise.all(
    strings.map((variation) => {
      const thisTestConfig = {
        ...config,
        strings: [variation],
      };

      return new Promise((resolve, reject) => {
        lint(thisTestConfig, (err, result) => {
          if (err) reject(err);
          resolve(result[0]);
        });
      });
    }),
  );

  return results.flat();
}
