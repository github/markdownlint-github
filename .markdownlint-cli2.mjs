import markdownIt from "markdown-it";
import { init } from "./index.js";

const markdownItFactory = () => markdownIt({ html: true });

const configOptions = await init({
  default: false,
  "heading-increment": true,
  "no-alt-text": true,
  "single-h1": true,
  "no-emphasis-as-heading": true,
  "first-line-heading": true,
});
const options = {
  config: configOptions,
  customRules: ["./index.js"],
  markdownItFactory,
};
export default options;
