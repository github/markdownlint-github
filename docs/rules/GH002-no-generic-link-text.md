# GH002 No generic link text

## Rule details

Avoid setting generic link text like, "Click here", "Read more", and "Learn more" which do not make sense when read out of context.

Screen reader users often tab through links on a page to quickly find content without needing to listen to the full page. When link text does not clearly describe the actual linked content, it becomes difficult to quickly identify whether it's worth following the link.

Ensure that your link text is descriptive and the purpose of the link is clear even when read without the context provided by surrounding text.

Learn more about how to write descriptive link text at [Access Guide: Write descriptive link text](https://www.accessguide.io/guide/descriptive-link-text).

**Note**: For now, this rule only flags inline markdown implementation of links given the complexities of determining the accessible name of an HTML anchor tag,

## Configuration

You can configure additional link texts to flag by setting the rule configuration like the following:

```.js
{
    "no-generic-link-text": {
        "additional_banned_texts": ["Something", "Go here"]
    }
}
```
## Examples

### Incorrect 👎

```md
Go [here](https://github.com/)
```

```md
[Learn more](https://docs.github.com)
```

```md
[Click here](https://github.com/new) to create a new repository.
```

### Correct 👍

```md
[GitHub](https://github.com/)
```

```md
[GitHub Docs](https://docs.github.com)
```

```md
[Create a new repository](https://github.com/new) 
```