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
});
