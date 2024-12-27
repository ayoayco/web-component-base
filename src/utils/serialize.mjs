
/**
 * Takes a value and returns the serialized counterpart
 * @param {unknown} value Value to be serialized
 * @returns {void}
 */
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
