import { init } from "./index.js";

const options = init({
  default: false,
  "heading-increment": true,
  "no-alt-text": true,
  "single-h1": true,
  "no-emphasis-as-heading": true,
  "first-line-heading": true,
});
export const config = options;
export const customRules = ["./index.js"];
