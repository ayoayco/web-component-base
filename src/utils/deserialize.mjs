export function deserialize(value, type) {
  switch (type) {
    case "number":
    case "boolean":
    case "object":
    case "undefined":
      return JSON.parse(value);
    default:
      return value;
  }
}
