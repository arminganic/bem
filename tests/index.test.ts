import { bem } from "../src/index";

describe("bem function", () => {
  it("should only return the block when no modifiers are passed to the function", () => {
    const generateClasses = bem("card");
    expect(generateClasses()).toBe("card");
  });

  it("should return the block with one modifier when one boolean modifier is passed to the function", () => {
    const generateClasses = bem("card", { dark: true });
    expect(generateClasses()).toBe("card card--dark");
  });

  it("should return the block with no modifier when falsy boolean modifier is passed to the function", () => {
    const generateClasses = bem("card", { dark: false });
    expect(generateClasses()).toBe("card");
  });

  it("should return the block with one modifier when one string modifier is passed to the function", () => {
    const generateClasses = bem("card", { size: "medium" });
    expect(generateClasses()).toBe("card card--size-medium");
  });

  it("should return the block with one modifier when one number modifier is passed to the function", () => {
    const generateClasses = bem("card", { lines: 4 });
    expect(generateClasses()).toBe("card card--lines-4");
  });

  it("should only return the element when no modifiers are passed to the function", () => {
    const generateClasses = bem("card");
    const classes = generateClasses("body");
    expect(classes).toBe("card__body");
  });

  it("should return the element with one modifier when one boolean modifier is passed to the function", () => {
    const generateClasses = bem("card");
    expect(generateClasses("body", { dark: true })).toBe(
      "card__body card__body--dark",
    );
  });

  it("should return the element with one modifier when one string modifier is passed to the function", () => {
    const generateClasses = bem("card");
    expect(generateClasses("body", { size: "medium" })).toBe(
      "card__body card__body--size-medium",
    );
  });

  it("should return the element with one modifier when one number modifier is passed to the function", () => {
    const generateClasses = bem("card");
    expect(generateClasses("body", { lines: 4 })).toBe(
      "card__body card__body--lines-4",
    );
  });

  it("should only return elements when block modifiers were applied", () => {
    const generateClasses = bem("card", { size: "medium" });
    expect(generateClasses("body")).toBe("card__body");
  });

  it("should only return elements when block and element modifiers were applied", () => {
    const generateClasses = bem("card", { size: "medium" });
    expect(generateClasses("body", { lines: 4 })).toBe(
      "card__body card__body--lines-4",
    );
  });

  it("should not accept block with invalid characters", () => {
    const generateClasses = bem("product_card");
    expect(generateClasses()).toBe("");
  });

  it("should not accept element with invalid characters", () => {
    const generateClasses = bem("card");
    expect(generateClasses("action_area")).toBe("");
  });

  it("should not accept empty block", () => {
    const generateClasses = bem("");
    expect(generateClasses()).toBe("");
  });

  it("should not accept empty element", () => {
    const generateClasses = bem("card");
    expect(generateClasses("")).toBe("card");
  });
});
