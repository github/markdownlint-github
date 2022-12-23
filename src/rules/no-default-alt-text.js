// Regex to match alt text that is the same as the default image filename
// e.g. "Screen Shot 2020-10-20 at 2 52 27 PM"
// e.g. "Screenshot 2020-10-20 at 2 52 27 PM"
const altTextRegex =
  /^Screen ?[S|s]hot \d{4}-\d{2}-\d{2} at \d \d{2} \d{2} [A|P]M$/gi;
const altTextTagRegex =
  /alt="Screen ?[S|s]hot \d{4}-\d{2}-\d{2} at \d \d{2} \d{2} [A|P]M"/gi;

module.exports = {
  names: ["GH001", "no-default-alt-text"],
  description:
    "Images should not use the MacOS default screenshot filename as alternate text (alt text). If you have not changed this file, try merging main with your branch. For more information see: https://primer.style/design/accessibility/alternative-text-for-images",
  information: new URL(
    "https://primer.style/design/accessibility/alternative-text-for-images"
  ),
  tags: ["accessibility", "images"],
  function: function GH001(params, onError) {
    // markdown syntax
    const inlineTokens = params.tokens.filter((t) => t.type === "inline");
    for (const token of inlineTokens) {
      const imageTokens = token.children.filter((t) => t.type === "image");
      for (const image of imageTokens) {
        if (image.content.match(altTextRegex)) {
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
      if (line.match(altTextTagRegex)) {
        onError({
          lineNumber,
          detail: `For image: ${line}`,
        });
      }
      lineNumber++;
    }
  },
};
