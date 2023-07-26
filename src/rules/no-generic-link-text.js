const { stripAndDowncaseText } = require("../helpers/strip-and-downcase-text");

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
    "https://github.com/github/markdownlint-github/blob/main/docs/rules/GH002-no-generic-link-text.md",
  ),
  tags: ["accessibility", "links"],
  function: function GH002(params, onError) {
    // markdown syntax
    let bannedLinkTexts = bannedLinkText.concat(
      params.config.additional_banned_texts || [],
    );
    const exceptions = params.config.exceptions || [];
    if (exceptions.length > 0) {
      bannedLinkTexts = bannedLinkTexts.filter(
        (text) => !exceptions.includes(text),
      );
    }
    const inlineTokens = params.tokens.filter((t) => t.type === "inline");
    for (const token of inlineTokens) {
      const { children } = token;
      let inLink = false;
      let linkText = "";

      for (const child of children) {
        const { content, type } = child;
        if (type === "link_open") {
          inLink = true;
          linkText = "";
        } else if (type === "link_close") {
          inLink = false;
          if (bannedLinkTexts.includes(stripAndDowncaseText(linkText))) {
            onError({
              lineNumber: child.lineNumber,
              detail: `For link: ${linkText}`,
            });
          }
        } else if (inLink) {
          linkText += content;
        }
      }
    }
  },
};
