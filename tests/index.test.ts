import { bem } from "../src/index";

describe("bem function", () => {
  it('should return "Hello World"', () => {
    expect(bem()).toBe("Hello World");
  });
});
