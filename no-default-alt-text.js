// Regex to match alt text that is the same as the default image filename 
// e.g. "Screen Shot 2020-10-20 at 2 52 27 PM"
// e.g. "Screenshot 2020-10-20 at 2 52 27 PM"
const altTextRegex = /^Screen\s?shot \d{4}-\d{2}-\d{2} at \d \d{2} \d{2} [A|P]M$/gi
const altTextTagRegex = /alt=\"Screen\s?shot \d{4}-\d{2}-\d{2} at \d \d{2} \d{2} [A|P]M\"/gi

module.exports = {
    "names": ["GH001", "no-default-alt-text"],
    "description": "Images should not use the MacOS default screenshot filename as alternate text (alt text). For more information see: https://primer.style/design/accessibility/alternative-text-for-images",
    "information": new URL("https://primer.style/design/accessibility/alternative-text-for-images"),
    "tags": ["accessibility", "images"],
    "function": function GH001(params, onError) {
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