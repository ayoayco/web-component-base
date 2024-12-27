/**
 * @param {string} kebab String to be converted to camel-case
 * @returns {string} Camel-case counterpart
 */
export function getCamelCase(kebab) {
  if (typeof kebab !== 'string') {
    return ''
  }
  return kebab.replace(/-./g, (x) => x[1].toUpperCase())
}
