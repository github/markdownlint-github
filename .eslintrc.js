module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ["github"],
  extends: ["plugin:github/recommended"],
  rules: {
    "import/no-commonjs": "off",
    "filenames/match-regex": "off",
    "i18n-text/no-en": "off",
  },
};
