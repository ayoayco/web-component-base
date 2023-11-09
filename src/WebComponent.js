/**
 * A minimal vanilla JS base class to reduce the complexity of creating reactive custom elements
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Ayo Ayco <https://ayo.ayco.io>
 * @see https://www.npmjs.com/package/web-component-base#readme
 * @example
 * ```js
 * import WebComponent from "https://unpkg.com/web-component-base/index.js";
 *
 * class HelloWorld extends WebComponent {
 *   dataName = "World";
 *   emotion = "excited";
 *
 *   static properties = ["data-name", "emotion"];
 *
 *   get template() {
 *     return `
 *         <h1>Hello ${this.dataName}${this.emotion === "sad" ? ". 😭" : "! 🙌"}</* h1>`;
 *   }
 * }
 *
 * customElements.define('hello-world', HelloWorld);
 * ```
 */
export class WebComponent extends HTMLElement {
  /**
   * @type Array<string>
   */
  static properties = [];

  /**
   * @returns string
   */
  get template() {
    return "";
  }

  static get observedAttributes() {
    return this.properties;
  }

  /**
   * Triggered after view is initialized
   * @returns void
   */
  afterViewInit() {}

  /**
   * Triggered when the component is connected to the DOM
   * @returns void
   */
  onInit() {}

  /**
   * Triggered when the component is disconnected from the DOM
   * @returns void
   */
  onDestroy() {}

  /**
   * @param {{'property': string, 'previousValue': any, 'currentValue': any}} changes
   * @returns void
   */
  onChanges(changes) {}

  connectedCallback() {
    this.onInit();
    this.render();
    this.afterViewInit();
  }

  disconnectedCallback() {
    this.onDestroy();
  }

  /**
   * @param {string} property
   * @param {any} previousValue
   * @param {any} currentValue
   */
  attributeChangedCallback(property, previousValue, currentValue) {
    const camelCaps = this.#getCamelCaps(property);
    if (previousValue !== currentValue) {
      this[property] = currentValue;
      this[camelCaps] = currentValue;
      this.render();
      this.onChanges({ property, previousValue, currentValue });
    }
  }

  render() {
    this.innerHTML = this.template;
  }

  #getCamelCaps(kebab) {
    return kebab.replace(/-./g, (x) => x[1].toUpperCase());
  }
}

export default WebComponent;
