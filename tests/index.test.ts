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

  it("should return the block with one modifier when one string modifier is passed to the function", () => {
    const generateClasses = bem("card", { size: "medium" });
    expect(generateClasses()).toBe("card card--size-medium");
  });

  it("should return the block with one modifier when one number modifier is passed to the function", () => {
    const generateClasses = bem("card", { lines: 4 });
    expect(generateClasses()).toBe("card card--lines-4");
  });
});
