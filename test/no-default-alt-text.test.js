const markdownlint = require('markdownlint')
const altTextRule = require('../no-default-alt-text')

const thisRuleName = altTextRule.names[0]

const config = {
    config: {
        default: false,
        [thisRuleName]: true
    },
    customRules: [altTextRule]
}

describe('GH001: No Default Alt Text', () => {
    describe('successes', () => {
        test('inline', async () => {
            const thisTestConfig = {
                ...config,
                strings: ["![Chart with a single root node reading 'Example'](https://user-images.githubusercontent.com/abcdef.png)"]
            }

            const result = await new Promise((resolve, reject) => {
                markdownlint(thisTestConfig, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })

            const thisResult = result[0]

            expect(thisResult).toHaveLength(0)
        })
        test('html image', async () => {
            const thisTestConfig = {
                ...config,
                strings: ["<img alt=\"A helpful description\" src=\"https://user-images.githubusercontent.com/abcdef.png\">"]
            }

            const result = await new Promise((resolve, reject) => {
                markdownlint(thisTestConfig, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })

            const thisResult = result[0]

            expect(thisResult).toHaveLength(0)
        })
    })
    describe('failures', () => {
        test('inline example', async () => {
            const thisTestConfig = {
                ...config,
                strings: ["![Screen Shot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)"]
            }

            const result = await new Promise((resolve, reject) => {
                markdownlint(thisTestConfig, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })

            const thisResult = result[0]
            const failedRule = thisResult[0]

            expect(thisResult).toHaveLength(1)
            expect(failedRule.ruleNames).toContain(thisRuleName)
        })
        test('HTML example', async () => {
            const thisTestConfig = {
                ...config,
                strings: ["<img alt=\"Screenshot 2022-06-26 at 7 41 30 PM\" src=\"https://user-images.githubusercontent.com/abcdef.png\">"]
            }

            const result = await new Promise((resolve, reject) => {
                markdownlint(thisTestConfig, (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
            })

            const thisResult = result[0]
            const failedRule = thisResult[0]

            expect(thisResult).toHaveLength(1)
            expect(failedRule.ruleNames).toContain(thisRuleName)
        })
    })
})