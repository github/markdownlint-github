module.exports = {
  names: ["GH003", "no-empty-alt-text"],
  description: "Please provide an alternative text for the image.",
  information: new URL(
    "https://github.com/github/markdownlint-github/blob/main/docs/rules/GH003-no-empty-alt-text.md",
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

    const ImageRegex = new RegExp(/<img(.*?)>/, "gid");
    const htmlEmptyAltRegex = new RegExp(/alt=['"]['"]/, "gid");
    for (const token of htmlTagsWithImages) {
      const lineRange = token.map;
      const lineNumber = token.lineNumber;
      const lines = params.lines.slice(lineRange[0], lineRange[1]);

      for (const [i, line] of lines.entries()) {
        const imageTags = line.matchAll(ImageRegex);

        for (const imageTag of imageTags) {
          const imageTagIndex = imageTag.indices[0][0];

          const emptyAltMatches = [
            ...imageTag[0].matchAll(htmlEmptyAltRegex),
          ][0];
          if (emptyAltMatches) {
            const matchingContent = emptyAltMatches[0];
            const startIndex = emptyAltMatches.indices[0][0];
            onError({
              lineNumber: lineNumber + i,
              range: [imageTagIndex + startIndex + 1, matchingContent.length],
            });
          }
        }
      }
    }
  },
};
