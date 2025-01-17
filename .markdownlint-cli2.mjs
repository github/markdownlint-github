import { init } from "./index.js";

const configOptions = await init({
  default: false,
  "heading-increment": true,
  "no-alt-text": true,
  "single-h1": true,
  "no-emphasis-as-heading": true,
  "first-line-heading": true,
});
console.log(configOptions);
const options = {
  config: configOptions,
  customRules: ["./index.js"],
};
export default options;
