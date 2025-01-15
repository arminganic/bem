type BemModifiers = Record<string, boolean | string | number>;

export function bem(
  block: string,
  blockModifiers: BemModifiers = {},
): (element?: string, modifier?: BemModifiers) => string {
  return (element = "", elementModifiers = {}) => {
    if (!validateClassName(block)) {
      return "";
    }
    if (element && !validateClassName(element)) {
      return "";
    }
    const baseClass = element ? `${block}__${element}` : block;
    const modifiers = element ? elementModifiers : blockModifiers;
    return generateClasses(baseClass, modifiers).join(" ");
  };
}

function generateClasses(
  baseClass: string,
  modifiers: BemModifiers = {},
): string[] {
  if (!validateModifiers(modifiers)) {
    return [baseClass];
  }

  const modifierClasses = Object.entries(modifiers)
    .filter(([_, value]) => value !== false) // Simplified filtering
    .map(([key, value]) =>
      typeof value === "boolean"
        ? `${baseClass}--${key}`
        : `${baseClass}--${key}-${value}`,
    );

  return [baseClass, ...modifierClasses];
}

function validateClassName(name: string): boolean {
  const isValid = /^[a-zA-Z0-9-]+$/.test(name);
  if (!isValid) {
    console.warn(
      `Invalid class name: "${name}". Class names should only contain alphanumeric characters or dashes.`,
    );
  }
  return isValid;
}

function validateModifiers(modifiers: unknown): modifiers is BemModifiers {
  if (typeof modifiers !== "object" || modifiers === null) {
    console.warn(
      `Expected a plain object for modifiers, but received: ${modifiers}`,
    );
    return false;
  }

  for (const [key, value] of Object.entries(modifiers)) {
    if (!["boolean", "string", "number"].includes(typeof value)) {
      console.warn(
        `Invalid modifier value for key "${key}": Expected boolean, string, or number but received ${typeof value}.`,
      );
      return false;
    }
    if (typeof value === "string" && value.startsWith("-")) {
      console.warn(`Modifier "${key}" should not start with a dash.`);
    }
    if (typeof value === "number" && value < 0) {
      console.warn(`Modifier "${key}" should be a positive number.`);
    }
  }

  return true;
}
