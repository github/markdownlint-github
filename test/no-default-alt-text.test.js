const markdownlint = require('markdownlint')
const altTextRule = require('../no-default-alt-text')

const thisRuleName = altTextRule.names[1]

const config = {
    config: {
        default: false,
        [thisRuleName]: true
    },
    customRules: [altTextRule]
}

async function runTest(strings){
    return await Promise.all(strings.map(variation => {
        const thisTestConfig = {
            ...config,
            strings: [variation]
        }

        return new Promise((resolve, reject) => {
            markdownlint(thisTestConfig, (err, result) => {
                if (err) reject(err)
                resolve(result[0][0])
            })
        })
    })) 
}

describe('GH001: No Default Alt Text', () => {
    describe('successes', () => {
        test('inline', async () => {
            const strings = ["![Chart with a single root node reading 'Example'](https://user-images.githubusercontent.com/abcdef.png)"]

            const results = await runTest(strings)

            results.forEach(result => {
                expect(result).not.toBeDefined()
            })
        })
        test('html image', async () => {
            const strings = ["<img alt=\"A helpful description\" src=\"https://user-images.githubusercontent.com/abcdef.png\">"]
            
            const results = await runTest(strings)
            
            results.forEach(result => {
                expect(result).not.toBeDefined()
            })
        })
    })
    describe('failures', () => {
        test('markdown example', async () => {
            const strings = [
                "![Screen Shot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)",
                "![ScreenShot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)",
                "![Screen shot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)",
                "![Screenshot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)"
            ]

            const results = await runTest(strings)
            
            const failedRules = results
                .map(result => result.ruleNames)
                .flat()
                .filter(name => !name.includes('GH'))

            expect(failedRules).toHaveLength(4)
            failedRules.forEach(rule => {
                expect(rule).toBe(thisRuleName)
            })
        })
        test('HTML example', async () => {
            const strings = [
                "<img alt=\"Screen Shot 2022-06-26 at 7 41 30 PM\" src=\"https://user-images.githubusercontent.com/abcdef.png\">",
                "<img alt=\"ScreenShot 2022-06-26 at 7 41 30 PM\" src=\"https://user-images.githubusercontent.com/abcdef.png\">",
                "<img alt=\"Screen shot 2022-06-26 at 7 41 30 PM\" src=\"https://user-images.githubusercontent.com/abcdef.png\">",
                "<img alt=\"Screenshot 2022-06-26 at 7 41 30 PM\" src=\"https://user-images.githubusercontent.com/abcdef.png\">"
            ]

            const results = await runTest(strings)

            const failedRules = results
                .map(result => result.ruleNames)
                .flat()
                .filter(name => !name.includes('GH'))

            expect(failedRules).toHaveLength(4)
            failedRules.forEach(rule => {
                expect(rule).toBe(thisRuleName)
            })
        })
    })
})