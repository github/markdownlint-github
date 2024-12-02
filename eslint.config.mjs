import github from "eslint-plugin-github";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.config({
    extends: "plugin:github/recommended", 
    ignorePatterns: ['eslint.config.mjs', '.markdownlint-cli2.cjs'],
    rules: {
        "import/no-commonjs": "off",
        "filenames/match-regex": "off",
        "i18n-text/no-en": "off",
    },
    }), {
    plugins: {
        github,
    },
    ignores: ['eslint.config.mjs', '.markdownlint-cli2.cjs'],
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },

        ecmaVersion: 2020,
        sourceType: "commonjs",
    },

    rules: {
        "import/no-commonjs": "off",
        "filenames/match-regex": "off",
        "i18n-text/no-en": "off",
    },
}];