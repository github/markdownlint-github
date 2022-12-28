// Regex to match alt text that is the same as the default image filename
// e.g. "Screen Shot 2020-10-20 at 2 52 27 PM"
// e.g. "Screenshot 2020-10-20 at 2 52 27 PM"
const defaultMacOsScreenshotMarkdownRegex =
  /^Screen ?[S|s]hot \d{4}-\d{2}-\d{2} at \d \d{2} \d{2} [A|P]M$/gi;
const imageMarkdownRegex = /^image$/i;

const defaultMacOsScreenshotHtmlRegex =
  /alt="Screen ?[S|s]hot \d{4}-\d{2}-\d{2} at \d \d{2} \d{2} [A|P]M"/gi;
const imageHtmlRegex = /alt="image"/i;

module.exports = {
  names: ["GH001", "no-default-alt-text"],
  description:
    "Images should set meaningful alternative text (alt text), and not use the macOS default screenshot filename or `Image`.",
  information: new URL(
    "https://github.com/github/markdownlint-github/blob/main/docs/rules/GH001-no-default-alt-text.md"
  ),
  tags: ["accessibility", "images"],
  function: function GH001(params, onError) {
    // markdown syntax
    const inlineTokens = params.tokens.filter((t) => t.type === "inline");
    for (const token of inlineTokens) {
      const imageTokens = token.children.filter((t) => t.type === "image");
      for (const image of imageTokens) {
        if (
          image.content.match(defaultMacOsScreenshotMarkdownRegex) ||
          image.content.match(imageMarkdownRegex)
        ) {
          onError({
            lineNumber: image.lineNumber,
            detail: `For image: ${image.content}`,
          });
        }
      }
    }

    // html syntax
    let lineNumber = 1;
    for (const line of params.lines) {
      if (
        line.match(defaultMacOsScreenshotHtmlRegex) ||
        line.match(imageHtmlRegex)
      ) {
        onError({
          lineNumber,
          detail: `For image: ${line}`,
        });
      }
      lineNumber++;
    }
  },
};
