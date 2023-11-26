export function attachEffect(proxy, prop, callback) {
    proxy[prop] = {
        attach: 'effect',
        callback
    }
}