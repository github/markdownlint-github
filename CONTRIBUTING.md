# Contributing Guide

Thank you for your interest in contributing.

## Developing

Depending on your needs, you may have one of two development paths:

* via integrating with an existing usage (ideal for modifying the interface of our rules)
* via unit testing (ideal for adding a new rule)

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
    * in your codebase: `npm unlink @github/markdownlint-github`
    * in this directory: `npm unlink`

### Unit and Interface Testing

We use `jest` tests as well, which should be an equally comfortable development experience. Refer to existing test files for any patterns you may find useful.

## Publishing

The [publish.yml workflow](https://github.com/github/markdownlint-github/actions/workflows/publish.yml) will automatically publish a new release on npm upon creating a [new GitHub release](https://github.com/github/markdownlint-github/releases).
