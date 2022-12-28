# GH001 No default alt text

## Rule details

Images should not use the macOS default screenshot filename as alternate text (alt text) which does not convey any meaningful information.

Alternative text should concisely describe what is conveyed in the image. If the image is decorative, the alternative text should be set to an empty string (`alt=""`).

Learn more at [Primer: Alternative text for images](https://primer.style/design/accessibility/alternative-text-for-images).

## Examples

### Incorrect 👎

```md
![Screen Shot 2022-06-26 at 7 41 30 PM](https://user-images.githubusercontent.com/abcdef.png)
```

```md
<img alt="Screen Shot 2022-06-26 at 7 41 30 PM" src="https://user-images.githubusercontent.com/abcdef.png">
```

### Correct 👍

```md
<!-- Mark decorative images with an empty string -->

![""](https://user-images.githubusercontent.com/abcdef.png)
```

```md
<img alt="A fluffy, orange kitten plays with a ball of yarn" src="https://user-images.githubusercontent.com/defgh.png">
```

```md
<img alt="A GitHub Discussion page with the heading structure visually surfaced with a text overlay" src="https://user-images.githubusercontent.com/xyz.png">
```

