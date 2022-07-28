const markdownlint = require('markdownlint')
const accessibilityRulesConfig = require('../style/accessibility.json')
const accessibilityRules = require('../accessibility-rules').all


const exampleFileName = "./test/example.md"
const options = {
    config: {
        default: false,
        ...accessibilityRulesConfig
    },
    files: [exampleFileName],
    customRules: accessibilityRules
}

describe('when A11y rules applied', () => {
    test('fails expected rules', async () => {
        const result = await new Promise((resolve, reject) => {
            markdownlint(options, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })

        const failuresForExampleFile = result[exampleFileName]
        const failureNames = failuresForExampleFile.map(failure => failure.ruleNames).flat()

        expect(failuresForExampleFile).toHaveLength(1)
        expect(failureNames).toContain('no-default-alt-text')
    })
})