import { getKebabCase } from "./utils/get-kebab-case";
import { getCamelCase } from "./utils/get-camel-case";
import { serialize, deserialize } from "./utils/parse";

/**
 * A minimal base class to reduce the complexity of creating reactive custom elements
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Ayo Ayco <https://ayo.ayco.io>
 * @see https://www.npmjs.com/package/web-component-base#readme
 */
export class WebComponent extends HTMLElement {
  /**
   * Array of strings that tells the browsers which attributes will cause a render
   * @type {Array<string>}
   */
  static properties = [];

  /**
   * Read-only string property that represents how the component will be rendered
   * @returns {string | Node | (string | Node)[]}
   * @see https://www.npmjs.com/package/web-component-base#template-vs-render
   */
  get template() {
    return "";
  }

  /**
   * Read-only property containing camelCase counterparts of observed attributes.
   * @typedef {{[name: string]: any}} PropStringMap
   * @see https://www.npmjs.com/package/web-component-base#prop-access
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
   * @type {PropStringMap}
   */
  get props() {
    return this.#props;
  }

  /**
   * @type {PropStringMap}
   */
  #props;

  /**
   * Triggered after view is initialized
   */
  afterViewInit() {}

  /**
   * Triggered when the component is connected to the DOM
   */
  onInit() {}

  /**
   * Triggered when the component is disconnected from the DOM
   */
  onDestroy() {}

  /**
   * Triggered when an attribute value changes
   * @typedef {{
   *  property: string,
   *  previousValue: any,
   *  currentValue: any
   * }} Changes
   * @param {Changes} changes
   */
  onChanges(changes) {}

  render() {
    if (typeof this.template === "string") this.innerHTML = this.template;
  }

  constructor() {
    super();
    this.#initializeProps();
  }

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

  attributeChangedCallback(property, previousValue, currentValue) {
    const camelCaps = getCamelCase(property);

    if (previousValue !== currentValue) {
      this[property] = currentValue === "" || currentValue;
      this[camelCaps] = this[property];

      this.#handleUpdateProp(camelCaps, this[property]);

      this.render();
      this.onChanges({ property, previousValue, currentValue });
    }
  }

  #handleUpdateProp(key, stringifiedValue) {
    const restored = deserialize(stringifiedValue, this.#typeMap[key]);
    if (restored !== this.props[key]) this.props[key] = restored;
  }

  #typeMap = {};
  #effectsMap = {};

  #handler(setter, meta) {
    const effectsMap = meta.#effectsMap;
    const typeMap = meta.#typeMap;

    return {
      set(obj, prop, value) {
        const oldValue = obj[prop];

        if (!(prop in typeMap)) {
          typeMap[prop] = typeof value;
        }

        if (value.attach === "effect") {
          if (!effectsMap[prop]) {
            effectsMap[prop] = [];
          }
          effectsMap[prop].push(value.callback);
        } else if (oldValue !== value) {
          obj[prop] = value;
          effectsMap[prop]?.forEach((f) => f(value));
          const kebab = getKebabCase(prop);
          setter(kebab, serialize(value));
        }

        return true;
      },
      get(obj, prop) {
        // TODO: handle non-objects
        if (obj[prop] !== null && obj[prop] !== undefined) {
          Object.getPrototypeOf(obj[prop]).proxy = meta.#props;
          Object.getPrototypeOf(obj[prop]).prop = prop;
        }
        return obj[prop];
      },
    };
  }

  #initializeProps() {
    if (!this.#props) {
      this.#props = new Proxy(
        {},
        this.#handler((key, value) => this.setAttribute(key, value), this)
      );
    }
  }
}
