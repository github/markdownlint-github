import github from "eslint-plugin-github";
import globals from "globals";

export default [
  github.getFlatConfigs().recommended,
  {
    languageOptions: {
      ecmaVersion: 13,
      globals: {
        ...globals.es6,
        ...globals.node,
        ...globals.jest,
      },
    },
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    rules: {
      "github/filenames-match-regex": "off",
      "i18n-text/no-en": "off",
      "import/extensions": ["error", { js: "ignorePackages" }],
      "import/no-unresolved": [
        "error",
        {
          ignore: ["^markdownlint/.+"],
        },
      ],
    },
  },
];
