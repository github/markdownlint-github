const bannedLinkText = [
  "read more",
  "learn more",
  "more",
  "here",
  "click here",
  "link",
];

module.exports = {
  names: ["GH002", "no-generic-link-text"],
  description:
    "Avoid using generic link text like `Learn more` or `Click here`",
  information: new URL(
    "https://primer.style/design/accessibility/links#writing-link-text"
  ),
  tags: ["accessibility", "links"],
  function: function GH001(params, onError) {
    // markdown syntax
    const inlineTokens = params.tokens.filter((t) => t.type === "inline");
    for (const token of inlineTokens) {
      if (token.children.some((t) => t.type === "link_open")) {
        const linkTextTokens = token.children.filter((t) => t.type === "text");
        if (linkTextTokens) {
          const linkText = linkTextTokens[0];
          if (
            linkText.content &&
            bannedLinkText.includes(linkText.content.toLowerCase().trim())
          ) {
            onError({
              lineNumber: linkText.lineNumber,
              details: `For link: ${linkText.content}`,
            });
          }
        }
      }
    }
  },
};
