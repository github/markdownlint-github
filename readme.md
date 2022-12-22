# GitHub Flavored Markdown Linting

We are using the [`markdownlint`](https://github.com/DavidAnson/markdownlint) library (via [`markdownlint-cli2`](https://github.com/DavidAnson/markdownlint-cli2) and adding our opinions and custom rules to it.

To review behaviors supported by `markdownlint`, particularly how to enable or disable rules, see [`markdownlint-cli2` configuration](https://github.com/DavidAnson/markdownlint-cli2#configuration).

## Opinions

At GitHub, we have opinions about how our markdown should be written.

In addition to defaults defined by `markdownlint`, we use this repository to enforce rules not defined by default, including our own custom rules.

See our opinions codified in [index.js](./index.js).

### Should I disable rules enabled by this plugin?

This plugin will enable the defaults defined by `markdownlint`. Several of these pertain to stylistic practices. You may choose to disable these rules if you determine it doesn't provide value for your project.

However, others of these rules should **NOT** be disabled because they encourage best accessibility practices. Disabling these rules will negatively impact accessibility. These rules are specified in [accessibility.json](./accessibility.json).

## Rules

The following are custom rules defined in this plugin.

- **GH001** _no-default-alt-text_
- **GH002** _no-generic-link-text_

See [`markdownlint` rules](https://github.com/DavidAnson/markdownlint#rules--aliases) for documentation on rules pulled in from `markdownlint`.

## Usage

**Note**: We recommend configuring [`markdownlint-cli2`](https://github.com/DavidAnson/markdownlint-cli2) over `markdownlint-cli` for compatibility with the [vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint) plugin.

1. Create a `.markdownlint-cli2.cjs` file in the root of your repository

    ```bash
    touch .markdownlint-cli2.cjs
    ```

2. Install packages

    - ```bash
      npm install -D markdownlint-cli2 # if updating existing package, check for updates
      npm install -D @github/markdownlint-github [--@github:registry=https://registry.npmjs.org]
      ```

3. Add/modify your linting script in `package.json`.

    ```bash
     markdownlint-cli2 \"**/*.{md,mdx}\" \"!node_modules\"
    ```

4. Edit `.markdownlint-cli2.cjs` file to suit your needs. Start with

    ```js
    const options = require('@github/markdownlint-github').init()
    module.exports = {
        config: options,
        customRules: ["@github/markdownlint-github"],
    }
    ```

    Or, you can also pass in configuration options that you wish to override the default. This looks like:

    ```js
    const options = require('@github/markdownlint-github').init({
        'fenced-code-language': false,
    })
    module.exports = {
        config: options,
        customRules: ["@github/markdownlint-github"],
    }
    ```

5. Install the [`vscode-markdownlint`](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) plugin to ensure `markdownlint` violations are surfaced in the file. This plugin should flag rules based off your `.markdownlint-cli2.cjs` configuration.

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

## Contributing

Please read [Contributing Guide](./CONTRIBUTING.md) for more information.
