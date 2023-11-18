/**
 * A minimal base class to reduce the complexity of creating reactive custom elements
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Ayo Ayco <https://ayo.ayco.io>
 * @see https://www.npmjs.com/package/web-component-base#readme
 * @example
 *
 * import WebComponent from "https://unpkg.com/web-component-base/index.js";
 *
 * class HelloWorld extends WebComponent {
 *   // tell the browser which attributes to cause a render
 *   static properties = ["data-name", "emotion"];
 *
 *   // give the component a readonly template
 *   // note: props have kebab-case & camelCase counterparts
 *   get template() {
 *     return `
 *         <h1>Hello ${this.props.dataName}${this.props.emotion === "sad" ? ". 😭" : "! 🙌"}</h1>`;
 *   }
 * }
 *
 * customElements.define('hello-world', HelloWorld);
 */
export class WebComponent extends HTMLElement {
  /**
   * Array of strings that tells the browsers which attributes will cause a render
   * @type {Array<string>}
   */
  static properties = [];

  /**
   * Read-only string property that represents how the component will be rendered
   * @returns {string}
   * @see https://www.npmjs.com/package/web-component-base#template-vs-render
   */
  get template() {
    return "";
  }

  /**
   * Read-only property containing camelCase counterparts of observed attributes.
   * This works like HTMLElement.dataset except dataset is only for attributes prefixed with `data-`.
   * A camelCase counterpart using `WebComponent.props` will give read/write access to any attribute, with or without the `data-*` prefix.
   * @see https://www.npmjs.com/package/web-component-base#prop-access
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
   * @type {DOMStringMap}
   * @example
   *
   * class HelloWorld extends WebComponent {
   *   static properties = ["my-prop"];
   *   get template() {
   *     return `
   *        <h1>Hello ${this.props.myProp}</h1>
   *        <h2>Hello ${this["my-prop"]}</h2>
   *     `;
   *   }
   * }
   */
  get props() {
    return this.#props;
  }

  /**
   * @type {DOMStringMap}
   */
  #props;

  constructor() {
    super();
    this.#initializeProps();
  }

  /**
   * Triggered after view is initialized. Best for querying DOM nodes that will only exist after render.
   * @returns {void}
   */
  afterViewInit() {}

  /**
   * Triggered when the component is connected to the DOM. Best for initializing the component like attaching event handlers.
   * @returns {void}
   */
  onInit() {}

  /**
   * Triggered when the component is disconnected from the DOM. Any initialization done in `onInit` must be undone here.
   * @returns {void}
   */
  onDestroy() {}

  /**
   * Triggered when an attribute value changes
   * @param {{
   *  property: string,
   *  previousValue: any,
   *  currentValue: any
   * }} changes
   * @returns {void}
   */
  onChanges(changes) {}

  render() {
    this.innerHTML = this.template;
  }

  /**
   * start HTMLElement callbacks
   */
  static get observedAttributes() {
    return this.properties;
  }

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
      this[property] = currentValue === "" || currentValue;
      this[camelCaps] = this[property]; // remove on v2
      this.#initializeProps();
      this.props[camelCaps] = this[property];

      this.render();
      this.onChanges({ property, previousValue, currentValue });
    }
  }

  /**
   * Converts a kebab-cased string into camelCaps
   * @param {string} kebab string in kebab-case
   * @returns {string}
   */
  #getCamelCaps(kebab) {
    return kebab.replace(/-./g, (x) => x[1].toUpperCase());
  }

  /**
   * Proxy handler for observed attribute - property counterpart
   * @param {(qualifiedName: string, value: string) => void} setter
   * @returns
   */
  #handler = (setter) => ({
    set(obj, prop, newval) {
      const oldval = obj[prop];
      console.log(">>> old value:", oldval, typeof oldval);

      obj[prop] = newval;

      /**
       * Converts camelCaps string into kebab-case
       * @param {string} str
       * @returns {string}
       */
      const kebabize = (str) =>
        str.replace(
          /[A-Z]+(?![a-z])|[A-Z]/g,
          ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
        );

      if (JSON.stringify(oldval) !== newval) {
        console.log(oldval, newval);
        const kebab = kebabize(prop);
        setter(kebab, newval);
      }

      return true;
    },
  });

  #initializeProps() {
    if (!this.#props) {
      const { ...clone } = this;
      this.#props = new Proxy(clone, this.#handler(this.setAttribute));
    }
  }
}

export default WebComponent; // remove on v2
