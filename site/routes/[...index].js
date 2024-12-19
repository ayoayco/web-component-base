/**
 * McFly SSR logic
 * 👋 this is not the route you're looking for
 * ...pages are in ./src/pages
 * ...reusable code are in ./src/components
 * @see https://ayco.io/gh/McFly#special-directories
 */
import config from '../mcfly.config.mjs'
export default useMcFlyRoute({ config, storage: useStorage() })
