const {
  stripAndDowncaseText,
} = require("../src/helpers/strip-and-downcase-text");

describe("stripAndDowncaseText", () => {
  test("strips extra whitespace", () => {
    expect(stripAndDowncaseText(" read  more  ")).toBe("read more");
    expect(stripAndDowncaseText(" learn    ")).toBe("learn");
  });

  test("strips punctuation", () => {
    expect(stripAndDowncaseText("learn more!!!!")).toBe("learn more");
    expect(stripAndDowncaseText("I like dogs...")).toBe("i like dogs");
  });

  test("downcases text", () => {
    expect(stripAndDowncaseText("HeRe")).toBe("here");
    expect(stripAndDowncaseText("CLICK HERE")).toBe("click here");
  });
});
