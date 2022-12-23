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
    "https://primer.style/design/accessibility/links#writing-link-text"
  ),
  tags: ["accessibility", "links"],
  function: function GH002(params, onError) {
    // markdown syntax
    const allBannedLinkTexts = bannedLinkText.concat(
      params.config.additional_banned_texts || []
    );
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
          if (allBannedLinkTexts.includes(stripAndDowncaseText(linkText))) {
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
