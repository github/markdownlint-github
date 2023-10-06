module.exports = {
  names: ["GH003", "no-empty-string-alt"],
  description: "Please provide an alternative text for the image.",
  information: new URL(
    "https://github.com/github/markdownlint-github/blob/main/docs/rules/GH003-no-empty-string-alt.md",
  ),
  tags: ["accessibility", "images"],
  function: function GH003(params, onError) {
    const htmlTagsWithImages = params.parsers.markdownit.tokens.filter(
      (token) => {
        return (
          (token.type === "html_block" && token.content.includes("<img")) ||
          (token.type === "inline" &&
            token.content.includes("<img") &&
            token.children.some((child) => child.type === "html_inline"))
        );
      },
    );

    const htmlAltRegex = new RegExp(/alt=['"]['"]/, "gid");

    for (const token of htmlTagsWithImages) {
      const lineRange = token.map;
      const lineNumber = token.lineNumber;
      const lines = params.lines.slice(lineRange[0], lineRange[1]);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const matches = line.matchAll(htmlAltRegex);
        for (const match of matches) {
          const matchingContent = match[0];
          const startIndex = match.indices[0][0];
          onError({
            lineNumber: lineNumber + i,
            range: [startIndex + 1, matchingContent.length],
          });
        }
      }
    }
  },
};
