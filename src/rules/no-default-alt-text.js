/**
 * Examples:
 * * "Screen Shot 2020-10-20 at 2 52 27 PM"
 * * "Screenshot 2020-10-20 at 2 52 27 PM"
 * * "Clean Shot 2020-10-20 @45x"
 */
const defaultScreenshotRegex =
  "(?:screen|clean) ?shot \\d{4}-\\d{2}-\\d{2}[^'\"\\]]*";

const imageRegex = "image";
const combinedRegex = `(${[defaultScreenshotRegex, imageRegex].join("|")})`;

const markdownAltRegex = new RegExp(`!\\[${combinedRegex}\\]\\(.*\\)`, "gid");
const htmlAltRegex = new RegExp(`alt=["']${combinedRegex}["']`, "gid");

module.exports = {
  names: ["GH001", "no-default-alt-text"],
  description: "Images should have meaningful alternative text (alt text)",
  information: new URL(
    "https://github.com/github/markdownlint-github/blob/main/docs/rules/GH001-no-default-alt-text.md",
  ),
  tags: ["accessibility", "images"],
  function: function GH001(params, onError) {
    const htmlTagsWithImages = params.parsers.markdownit.tokens.filter(
      (token) => {
        return token.type === "html_block" && token.content.includes("<img");
      },
    );
    const inlineImages = params.parsers.markdownit.tokens.filter(
      (token) =>
        token.type === "inline" &&
        token.children.some((child) => child.type === "image"),
    );

    for (const token of [...htmlTagsWithImages, ...inlineImages]) {
      const lineRange = token.map;
      const lineNumber = token.lineNumber;
      const lines = params.lines.slice(lineRange[0], lineRange[1]);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let matches;
        if (token.type === "inline") {
          matches = line.matchAll(markdownAltRegex);
        } else {
          matches = line.matchAll(htmlAltRegex);
        }
        for (const match of matches) {
          const altText = match[1];
          const [startIndex] = match.indices[1];
          onError({
            lineNumber: lineNumber + i,
            range: [startIndex + 1, altText.length],
          });
        }
      }
    }
  },
};
