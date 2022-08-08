// Regex to match alt text that is the same as the default image filename 
// e.g. "Screen Shot 2020-10-20 at 2 52 27 PM"
// e.g. "Screenshot 2020-10-20 at 2 52 27 PM"
const altTextRegex = /^Screen ?[S|s]hot \d{4}-\d{2}-\d{2} at \d \d{2} \d{2} [A|P]M$/gi
const altTextTagRegex = /alt=\"Screen ?[S|s]hot \d{4}-\d{2}-\d{2} at \d \d{2} \d{2} [A|P]M\"/gi

// const altTextRegex = /^Screen ?[S|s]hot \d{4}-\d{2}-\d{2}/gi
// const altTextTagRegex = /alt=\"Screen ?[S|s]hot \d{4}-\d{2}-\d{2}/gi

module.exports = {
    "names": [ "GH001", "no-default-alt-text" ],
    "description": "Images should not use the MacOS default screenshot filename as alternate text (alt text). If you have not changed this file, try merging main with your branch. For more information see: https://primer.style/design/accessibility/alternative-text-for-images",
    "information": new URL("https://primer.style/design/accessibility/alternative-text-for-images"),
    "tags": [ "accessibility", "images" ],
    "function": function GH001(params, onError) {
        // markdown syntax
        params.tokens.filter(t => t.type === "inline").forEach(token => {
            token.children.filter(t => t.type === "image").forEach(image => {
                if (image.content.match(altTextRegex)) {
                    onError({
                        lineNumber: image.lineNumber,
                        details: `For image: ${image.content}`
                    })
                }
            })
        })

        // html syntax
        let lineNumber = 1
        params.lines.forEach(line => {
            if (line.match(altTextTagRegex)) {
                onError({
                    lineNumber: lineNumber,
                    details: `For line: ${line}`
                })
            }
            lineNumber++
        })
    }
}
