export function serialize(value) {
  switch (typeof value) {
    case 'number':
    case 'boolean':
    case 'object':
      return JSON.stringify(value)
    default:
      return value
  }
}
