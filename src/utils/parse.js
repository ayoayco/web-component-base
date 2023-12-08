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
