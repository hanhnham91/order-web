export function stringifyReplacer(_key: string | number | symbol, value: any) {
  if (typeof value === "undefined") {
    return "undefined";
  }

  const specialTypes = ["function", "bigint", "symbol"];
  if (specialTypes.includes(typeof value)) {
    return value.toString();
  }

  return value;
}

export function stringifyJSON(value: any, spacing?: number): string {
  return JSON.stringify(value, stringifyReplacer, spacing);
}
