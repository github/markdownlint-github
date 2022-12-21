const bannedLinkText = [
  "read more",
  "learn more",
  "more",
  "here",
  "click here",
  "link",
];

/* Downcase and strip extra whitespaces and punctuation */
const stripAndDowncaseText = (text) => {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
};

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
      params.config.banned_link_texts || []
    );
    const inlineTokens = params.tokens.filter((t) => t.type === "inline");
    for (const token of inlineTokens) {
      const { children } = token;
      let inLink = false;
      let linkText = "";
      let lineIndex = 0;
      let { lineNumber } = token;
      for (const child of children) {
        const { content, markup, type } = child;
        if (type === "link_open") {
          inLink = true;
          linkText = "";
        } else if (type === "link_close") {
          inLink = false;
          if (allBannedLinkTexts.includes(stripAndDowncaseText(linkText))) {
            onError({
              lineNumber,
              lineIndex,
              detail: `For link: ${linkText}`,
            });
          }
        } else if (type === "softbreak" || type === "hardbreak") {
          lineNumber++;
          lineIndex = 0;
        } else if (inLink) {
          linkText += type.endsWith("_inline")
            ? `${markup}${content}${markup}`
            : content || markup;
        }
      }
    }
  },
};
