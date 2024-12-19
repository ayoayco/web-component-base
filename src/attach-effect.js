/**
 * Attach a "side effect" function that gets triggered on property value changes
 * @param {Object} obj
 * @param {(newValue: any) => void} callback
 */
export function attachEffect(obj, callback) {
  const { proxy, prop } = Object.getPrototypeOf(obj)

  proxy[prop] = {
    attach: 'effect',
    callback,
  }
}
