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
        return token.type === "html_block" && token.content.includes("<img");
      },
    );
    const inlineImages = params.parsers.markdownit.tokens.filter(
      (token) =>
        token.type === "inline" &&
        token.children.some((child) => child.type === "image"),
    );

    const htmlAltRegex = new RegExp(/alt=""|alt=''/i);
    const markdownAltRegex = new RegExp(/!\[""\]|!\[''\]/i);

    for (const token of [...htmlTagsWithImages, ...inlineImages]) {
      const lineRange = token.map;
      const lineNumber = token.lineNumber;
      const lines = params.lines.slice(lineRange[0], lineRange[1]);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let fails;
        if (token.type === "inline") {
          fails = markdownAltRegex.test(line);
        } else {
          fails = htmlAltRegex.test(line);
        }
        if (fails) {
          onError({
            lineNumber: lineNumber + i,
          });
        }
      }
    }
  },
};
