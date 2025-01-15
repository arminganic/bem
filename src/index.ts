type BemModifiers = Record<string, boolean>;

export function bem(
  block: string,
  blockModifiers?: BemModifiers,
): (element?: string, modifier?: BemModifiers) => string {
  return (element?: string, elementModifiers?: BemModifiers) => {
    const blockModifiersString = Object.entries(blockModifiers ?? {}).map(
      ([key, value]) => {
        if (typeof value === "boolean") {
          return `${block}--${key}`;
        }
        return "";
      },
    );
    const toReturn = [block, ...blockModifiersString];
    return toReturn.join(" ");
  };
}
