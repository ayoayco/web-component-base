/**
 *
 * @typedef { import('./WebComponent.js').Changes} Changes
 * @typedef { import('./WebComponent.js').PropStringMap} PropStringMap
 * @param {Object} obj
 * @param {(newValue: any) => void} callback
 */
export function attachEffect(obj, callback) {
  const { proxy, prop } = Object.getPrototypeOf(obj);

  proxy[prop] = {
    attach: "effect",
    callback,
  };
}
