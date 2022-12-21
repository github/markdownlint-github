# GitHub Flavored Markdown Linting

We are using the [`markdownlint`](https://github.com/DavidAnson/markdownlint) library (via [`markdownlint-cli`](https://github.com/igorshubovych/markdownlint-cli)), and adding a few opinions and custom rules to it.

To review behaviors supported by `markdownlint`, particularly how to enable or disable rules, see [`markdownlint` Configuration](https://github.com/DavidAnson/markdownlint#configuration).

## Opinions

At GitHub, we have a few opinions about how our markdown should be written.

In addition to the good defaults defined by `markdownlint`, we also use this repository to enforce rules not defined by default.

For now, see our opinions codified in [index.js](./index.js).

## Usage

1. Create a `.markdownlint.js` file in the root of your repository

    ```bash
    touch .markdownlint.js
    ```

2. Install packages

    - ```bash
      npm install -D markdownlint-cli # if updating existing package, check for updates
      npm install -D @github/markdownlint-github [--@github:registry=https://registry.npmjs.org]
      ```

3. Add/modify your linting script in `package.json`. Modify other [CLI arguments](https://github.com/igorshubovych/markdownlint-cli#usage) as necessary. We recommend adding a `.markdownlintignore` file to [configure files to ignore](https://github.com/igorshubovych/markdownlint-cli#ignoring-files).

    ```bash
    markdownlint '**/*.{md,mdx}' --config .markdownlint.js --rules node_modules/@github/markdownlint-github
    ```

4. Edit `.markdownlint.js` file to suit your needs. Start with

    ```js
    module.exports = require('@github/markdownlint-github').init()
    ```

    Or, you can also pass in configuration options that you wish to override the default. This looks like:

    ```js
    const markdownlintGitHub = require('@github/markdownlint-github')
    module.exports = markdownlintGitHub.init({
        "fenced-code-language": false
    })
    ```

    Notice that disabling some rules will have a negative impact on accessibility.

### Advanced: Adding custom rules in your codebase

You may write custom rules within your repository. Follow the [custom rules guide in markdownlint](https://github.com/DavidAnson/markdownlint/blob/main/doc/CustomRules.md) to write your rule. Notice that the rule will need to be 1) enabled in the configuration and 2) passed in at the command line.

For instance, if you add `my-rule.js` with the name "some-rule" (see `markdownlint` docs),

your `.markdownlint.js` file will need to enable the rule:

```js
module.exports = require('@github/markdownlint-github').init({
    "some-rule": true
})
```

and your lint script will also need to pass in the location of the custom rule file:

```bash
... --rules node_modules/@github/markdownlint-github ./my-rule.js ...
```

Consider upstreaming any rules you find useful as proposals to this repository.

## Contributing

Please read [Contributing Guide](./CONTRIBUTING.md) for more information.
