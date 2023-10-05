# GH003 No empty string alt

## Rule details

This rule is _off_ by default and is only applicable for GitHub rendered markdown.

Currently, all images on github.com are automatically wrapped in an anchor tag.

As a result, images that are intentionally marked as decorative (via `alt=""``) end up as a link without an accessible name. This is confusing for assistive technology users. 

This rule can be enabled to enforce that the alt attribute is always set to descriptive text. 

This rule should be removed once this behavior is updated on GitHub's UI.

## Examples

### Incorrect 👎

```md
![""](cat.png)
```

```html
<img src="cat.png" alt="">
```

### Correct 👍

```md
![Mona Lisa](mona.png)
```

```html
<img src="mona.png" alt="Mona Lisa, the Octocat">
```
