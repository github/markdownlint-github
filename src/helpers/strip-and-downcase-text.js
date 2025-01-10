/* Downcase and strip extra whitespaces and punctuation */
export function stripAndDowncaseText(text) {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
