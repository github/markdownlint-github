/* Downcase and strip extra whitespaces and punctuation */
function stripAndDowncaseText(text) {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = { stripAndDowncaseText };
