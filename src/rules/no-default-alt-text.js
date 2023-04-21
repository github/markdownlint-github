// Regex to match alt text that is the same as the default image filename
// e.g. "Screen Shot 2020-10-20 at 2 52 27 PM"
// e.g. "Screenshot 2020-10-20 at 2 52 27 PM"
// e.g. "Clean Shot 2020-10-20 @45x"
// e.g. "image"
// e.g. "14352435"
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
    "https://github.com/github/markdownlint-github/blob/main/docs/rules/GH001-no-default-alt-text.md"
  ),
  tags: ["accessibility", "images"],
  function: function GH001(params, onError) {
    for (const [lineIndex, line] of params.lines.entries()) {
      for (const match of [
        ...line.matchAll(markdownAltRegex),
        ...line.matchAll(htmlAltRegex),
      ]) {
        // The alt text is contained in the first capture group
        const altText = match[1];
        const [startIndex] = match.indices[1];

        onError({
          lineNumber: lineIndex + 1,
          range: [startIndex + 1, altText.length],
        });
      }
    }
  },
};
