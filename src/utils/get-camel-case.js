export function getCamelCase(kebab) {
  return kebab.replace(/-./g, (x) => x[1].toUpperCase());
}
