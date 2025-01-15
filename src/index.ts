type BemModifiers = Record<string, boolean | string | number>;

export function bem(
  block: string,
  blockModifiers?: BemModifiers,
): (element?: string, modifier?: BemModifiers) => string {
  return (element?: string, elementModifiers?: BemModifiers) => {
    if (!element) {
      return generateWithModifiers(block, blockModifiers).join(" ");
    }
    return generateWithModifiers(`${block}__${element}`, elementModifiers).join(
      " ",
    );
  };
}

function generateWithModifiers(baseClass: string, modifiers?: BemModifiers) {
  if (!modifiers) {
    return [baseClass];
  }
  const baseClassModifiers = Object.entries(modifiers).map(([key, value]) => {
    if (typeof value === "boolean") {
      return `${baseClass}--${key}`;
    }
    if (typeof value === "string" || typeof value === "number") {
      return `${baseClass}--${key}-${value}`;
    }
    return "";
  });
  return [baseClass, ...baseClassModifiers];
}
