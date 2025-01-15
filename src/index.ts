type BemModifiers = Record<string, boolean | string>;

export function bem(
  block: string,
  blockModifiers?: BemModifiers,
): (element?: string, modifier?: BemModifiers) => string {
  return (element?: string, elementModifiers?: BemModifiers) => {
    const blockModifiersStrings = generateWithModifiers(block, blockModifiers);
    const toReturn = [block, ...blockModifiersStrings];
    return toReturn.join(" ");
  };
}

function generateWithModifiers(baseClass: string, modifiers?: BemModifiers) {
  if (!modifiers) {
    return [baseClass];
  }
  return Object.entries(modifiers).map(([key, value]) => {
    if (typeof value === "boolean") {
      return `${baseClass}--${key}`;
    }
    if (typeof value === "string") {
      return `${baseClass}--${key}-${value}`;
    }
    return "";
  });
}
