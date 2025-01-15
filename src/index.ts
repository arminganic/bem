type BemModifiers = Record<string, boolean | string | number>;

export function bem(
  block: string,
  blockModifiers?: BemModifiers,
): (element?: string, modifier?: BemModifiers) => string {
  return (element?: string, elementModifiers?: BemModifiers) => {
    const baseClass = element ? `${block}__${element}` : block;
    const modifiers = element ? elementModifiers : blockModifiers;
    return generateClasses(baseClass, modifiers).join(" ");
  };
}

function generateClasses(
  baseClass: string,
  modifiers?: BemModifiers,
): string[] {
  if (
    typeof modifiers !== "object" ||
    modifiers === null ||
    modifiers === undefined ||
    Array.isArray(modifiers)
  ) {
    console.warn(
      `Expected modifiers to be a plain object, but received: ${modifiers}`,
    );
    return [baseClass];
  }

  const modifierClasses = Object.entries(modifiers).map(([key, value]) => {
    if (typeof value === "boolean") {
      return `${baseClass}--${key}`;
    }
    if (typeof value === "string" || typeof value === "number") {
      return `${baseClass}--${key}-${value}`;
    }
    console.warn(`Unsupported modifier type for key "${key}": ${typeof value}`);
    return "";
  });

  return [baseClass, ...modifierClasses];
}
