# Markdownlint-github

This repository provides GitHub's recommended [`markdownlint`](https://github.com/DavidAnson/markdownlint) configurations, and additional rules for use on GitHub open source and internal projects.

## Opinions

In addition to defaults defined by `markdownlint`, we use this repository to enforce rules not defined by default, including our own custom rules.

See opinions codified in [index.js](./index.js).

## Rules

The following are custom rules defined in this plugin.

* [**GH001** _no-default-alt-text_](./docs/rules/GH001-no-default-alt-text.md)
* [**GH002** _no-generic-link-text_](./docs/rules/GH002-no-generic-link-text.md)
* [**GH003** _no-empty-alt-text_](./docs/rules/GH003-no-empty-alt-text.md)

See [`markdownlint` rules](https://github.com/DavidAnson/markdownlint#rules--aliases) for documentation on rules pulled in from `markdownlint`.

## Usage

**Important**: We support the use of `markdownlint` through [`markdownlint-cli2`](https://github.com/DavidAnson/markdownlint-cli2) instead of `markdownlint-cli` for compatibility with the [`vscode-markdownlint`](https://github.com/DavidAnson/vscode-markdownlint) plugin.

1. Create a `.markdownlint-cli2.cjs` file in the root of your repository.

    ```bash
    touch .markdownlint-cli2.cjs
    ```

2. Install packages.

    ```bash
    npm install -D markdownlint-cli2 # if updating existing package, check for updates
    npm install -D @github/markdownlint-github [--@github:registry=https://registry.npmjs.org]
    npm install -D markdownlint-cli2-formatter-pretty
    ```

3. Add/modify your linting script in `package.json`.

    ```json
    "scripts": {
      "lint:markdown": "markdownlint-cli2 \"**/*.{md,mdx}\" \"!node_modules\""
    }
    ```

4. Edit `.markdownlint-cli2.cjs` file to suit your needs. Start with

    ```js
    const options = require('@github/markdownlint-github').init()
    module.exports = {
        config: options,
        customRules: ["@github/markdownlint-github"],
        outputFormatters: [
          [ "markdownlint-cli2-formatter-pretty", { "appendLink": true } ] // ensures the error message includes a link to the rule documentation
        ]
    }
    ```

    Or, you can also pass in configuration options that you wish to override the default. Read more at [Customizing configurations](#customizing-configurations). 
    This looks like:

    ```js
    const options = require('@github/markdownlint-github').init({
        'fenced-code-language': false, // Custom overrides
    })
    module.exports = {
        config: options,
        customRules: ["@github/markdownlint-github"],
        outputFormatters: [
          [ "markdownlint-cli2-formatter-pretty", { "appendLink": true } ]
        ]
    }
    ```

5. Install the [`vscode-markdownlint`](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) plugin to ensure `markdownlint` violations are surfaced in the file. This plugin should flag rules based off your `.markdownlint-cli2.cjs` configuration. When you make edits to your configuration, you will need to reload the VSCode window (`Ctrl+Shift+P` -> `Reload Window`) to ensure the extension syncs. If your project runs on Codespaces, consider adding this extension to your `.devcontainer/devcontainer.json` so that this extension is installed to new Codespaces by default.

### Customizing configurations

You may determine that the defaults set by this plugin are not suitable for your project.

This plugin will pull in the the defaults defined by `markdownlint`, several of which pertain to stylistic practices. You may choose to disable these rules if you determine it doesn't provide value for your project.

However, others of these rules should **NOT** be disabled because they encourage best accessibility practices. Disabling these rules will negatively impact accessibility. These rules are defined in [accessibility.json](./style/accessibility.json).

To review configurations supported by `markdownlint`, see [`markdownlint-cli2` configuration](https://github.com/DavidAnson/markdownlint-cli2#configuration).

### Advanced: Adding custom rules in your codebase

You may write custom rules within your repository. Follow the [custom rules guide in `markdownlint`](https://github.com/DavidAnson/markdownlint/blob/main/doc/CustomRules.md) to write your rule.

The rule will need to be enabled in the configuration. For instance, if you introduce `some-rule.js` with the name "some-rule", you must set the path of the custom rule in the `.markdownlint-cli2.cjs` file:

```js
module.exports = require('@github/markdownlint-github').init({
    "some-rule": true,
    customRules: ["@github/markdownlint-github", "some-rule.js"],
})
```

See [`markdownlint-cli2` configuration](https://github.com/DavidAnson/markdownlint-cli2#configuration).

Consider upstreaming any rules you find useful as proposals to this repository.

## License

This project is licensed under the terms of the MIT open source license. Please refer to [MIT](./LICENSE.txt) for the full terms.

## Maintainers

See [CODEOWNERS](./CODEOWNERS).

## Contributing

Please read [Contributing Guide](./CONTRIBUTING.md) for more information.
