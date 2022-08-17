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

3. Add/modify your linting script in `package.json`. Modify `--ignore` and other arguments as needed.

    ```bash
    markdownlint **/*.{md,mdx} --config .markdownlint.js --rules node_modules/@github/markdownlint-github --ignore node_modules
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

## Development

Depending on your needs, you may have one of two development paths:

- via integrating with an existing usage (ideal for modifying the interface of our rules)
- via unit testing (ideal for adding a new rule)

For that reason we've included two paths to develop. Feel free to use either, or both.

### Behavioral troubleshooting

It may be useful to work on this in tandem with a codebase that uses the rules. In that case, we encourage improving local development experience by leveraging `npm link` functionality:

1. In this repository on your machine, create the symlink to your local development directory

    ```bash
    npm link
    npm ls @github/markdownlint-github # should show a symlink
    ```

2. In the codebase you want to test against, replace the package in your `node_modules` folder with the symlink reference

    ```bash
    cd ../your-codebase
    npm link @github/markdownlint-github
    ```

    If you go to the `node_modules` directory in your codebase and try to navigate into the package, you'll notice that whatever changes you make in your local development directory will be reflected in the codebase.

3. Reset symlinks at any time by reversing the steps via `npm unlink`.
    - in your codebase: `npm unlink @github/markdownlint-github`
    - in this directory: `npm unlink`

### Unit and Interface Testing

We use `jest` tests as well, which should be an equally comfortable development experience. Refer to existing test files for any patterns you may find useful.

## Publishing

To publish, merge your work to main (after PR process completed).

Manage version and publish on a new branch, and create a PR to merge these changes into main.

```bash
npm version [major|minor|patch] # alternatively, manage version in package.json
npm run publish
```
