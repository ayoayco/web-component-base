export function serialize(value) {
  switch (typeof value) {
    case "number":
    case "boolean":
    case "object":
    case "undefined":
      return JSON.stringify(value);
    default:
      return value;
  }
}
