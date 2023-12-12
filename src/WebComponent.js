import {
  createElement,
  getKebabCase,
  getCamelCase,
  serialize,
  deserialize,
} from "./utils/index.js";

/**
 * A minimal base class to reduce the complexity of creating reactive custom elements
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Ayo Ayco <https://ayo.ayco.io>
 * @see https://www.npmjs.com/package/web-component-base#readme
 */
export class WebComponent extends HTMLElement {
  /**
   * Blueprint for the Proxy props
   * @typedef {{[name: string]: any}} PropStringMap
   * @type {PropStringMap}
   */
  static props;

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
   * @see https://www.npmjs.com/package/web-component-base#prop-access
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

  constructor() {
    super();
    this.#initializeProps();
  }

  static get observedAttributes() {
    return this.props
      ? Object.keys(this.props).map((camelCase) => getKebabCase(camelCase))
      : [];
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
      const newValue = currentValue === "" || currentValue;
      this.#handleUpdateProp(camelCaps, newValue);
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
        } else if (typeMap[prop] !== typeof value) {
          throw TypeError(
            `Cannot assign ${typeof value} to ${
              typeMap[prop]
            } property (setting '${prop}' of ${meta.constructor.name})`
          );
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
    let initialProps = {};
    if (this.constructor.props) {
      initialProps = this.constructor.props;
      Object.keys(initialProps).forEach((camelCase) => {
        const value = initialProps[camelCase];
        this.#typeMap[camelCase] = typeof value;
        this.setAttribute(getKebabCase(camelCase), serialize(value));
      });
    }
    if (!this.#props) {
      this.#props = new Proxy(
        initialProps,
        this.#handler((key, value) => this.setAttribute(key, value), this)
      );
    }
  }

  #prevDOM;
  render() {
    if (typeof this.template === "string") {
      this.innerHTML = this.template;
      return;
    } else if (typeof this.template === "object") {
      const tree = this.template;

      // TODO: smart diffing
      if (JSON.stringify(this.#prevDOM) !== JSON.stringify(tree)) {
        // render
        const el = createElement(tree);
        if (el) {
          if (Array.isArray(el)) this.replaceChildren(...el);
          else this.replaceChildren(el);
        }
        this.#prevDOM = tree;
      }
    }
  }
}
