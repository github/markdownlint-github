import github from "eslint-plugin-github";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { ignores } from "eslint-plugin-github/lib/configs/flat/react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("plugin:github/recommended"), {
    plugins: {
        github,
    },

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

    ignores: ['**/.markdownlint-cli2.cjs'],
}];