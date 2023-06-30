#!/usr/bin/env node

// Disables markdownlint rules in markdown files with same-line comments. This is
// useful when introducing a new rule that causes many failures. The comments
// can be fixed and removed at while updating the file later.
//
// Usage:
//
//  script/markdownlint-disable.js no-generic-link-text

/* eslint-disable no-console */

const fs = require("fs");
const { spawn } = require("child_process");

const rule = process.argv[2];
if (!rule) {
  console.error("Please specify a rule to disable."); // eslint-disable-line no-console
  process.exit(1);
}
let verbose = false;
if (process.argv[3] === "--verbose" || process.argv[3] === "-v") {
  verbose = true;
}

// Cleanup from previous run
if (fs.existsSync("markdown-violations.json")) {
  fs.unlinkSync("markdown-violations.json");
}

console.log(`Disabling "${rule}" rule in markdown files...`); // eslint-disable-line no-console
const childProcess = spawn("npm", ["run", "markdownlint", rule]);

childProcess.stdout.on("data", (data) => {
  if (verbose) console.log(data.toString());
});

childProcess.stderr.on("data", function (data) {
  if (verbose) console.log(data.toString());
});

let matchingRulesFound = 0;
childProcess.on("close", (code) => {
  if (code === 0) {
    console.log(`No violations for rule, "${rule}" found.`); // eslint-disable-line no-console
    process.exit(0);
  }

  const markdownViolations = JSON.parse(
    fs.readFileSync("markdown-violations.json", "utf8")
  );
  console.log(`${markdownViolations.length} violations found.`); // eslint-disable-line no-console

  for (const { fileName, ruleNames, lineNumber } of markdownViolations) {
    if (fileName.endsWith(".mdx")) {
      // Skip mdx files for now, which support different comment format.
      return;
    }
    if (ruleNames.includes(rule)) {
      matchingRulesFound++;
      const fileLines = fs.readFileSync(fileName, "utf8").split("\n");
      const offendingLine = fileLines[lineNumber - 1];
      fileLines[lineNumber - 1] = offendingLine.concat(
        ` <!-- markdownlint-disable-line ${rule} -->`
      );
      fs.writeFileSync(fileName, fileLines.join("\n"), "utf8");
    }
  }

  console.log(`${matchingRulesFound} violations ignored.`); // eslint-disable-line no-console
});
