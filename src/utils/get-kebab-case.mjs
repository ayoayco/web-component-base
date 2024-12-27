/**
 * @param {string} str String to be converted to kebab-case
 * @returns {string} Kebab-case counterpart
 */
export function getKebabCase(str) {
  return str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()
  )
}
