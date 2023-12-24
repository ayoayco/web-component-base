/**
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Ayo Ayco <https://ayo.ayco.io>
 */

import { handleProp } from "./utils/create-element.mjs";
import {
  createElement,
  getKebabCase,
  getCamelCase,
  serialize,
  deserialize,
} from "./utils/index.js";

/**
 * A minimal base class to reduce the complexity of creating reactive custom elements
 * @see https://WebComponent.io
 */
export class WebComponent extends HTMLElement {
  /**
   * Array of strings that tells the browsers which attributes will cause a render
   * @type {Array<string>}
   */
  static properties = [];

  /**
   * Blueprint for the Proxy props
   * @typedef {{[name: string]: any}} PropStringMap
   * @type {PropStringMap}
   */
  static props;

  /**
   * Read-only string property that represents how the component will be rendered
   * @returns {string | any}
   * @see https://www.npmjs.com/package/web-component-base#template-vs-render
   */
  get template() {
    return "";
  }

  /**
   * Read-only property containing camelCase counterparts of observed attributes.
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
  // eslint-disable-next-line no-unused-vars
  onChanges(changes) {}

  constructor() {
    super();
    this.#initializeProps();
  }

  static get observedAttributes() {
    const propKeys = this.props
      ? Object.keys(this.props).map((camelCase) => getKebabCase(camelCase))
      : [];

    return [...new Set([...this.properties, ...propKeys])];
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
      get(obj, prop, receiver) {
        // TODO: handle non-objects
        if (obj[prop] !== null && obj[prop] !== undefined) {
          Object.getPrototypeOf(obj[prop]).proxy = receiver;
          Object.getPrototypeOf(obj[prop]).prop = prop;
        }
        return Reflect.get(...arguments);
      },
    };
  }

  #initializeProps() {
    let initialProps = structuredClone(this.constructor.props) ?? {};
    Object.keys(initialProps).forEach((camelCase) => {
      const value = initialProps[camelCase];
      this.#typeMap[camelCase] = typeof value;
      this.setAttribute(getKebabCase(camelCase), serialize(value));
    });
    if (!this.#props) {
      this.#props = new Proxy(
        initialProps,
        this.#handler((key, value) => this.setAttribute(key, value), this)
      );
    }
  }

  #prevWatchList = [];
  render() {
    if (typeof this.template === "string") {
      this.innerHTML = this.template;
    } else if (typeof this.template === "object") {
      const tree = this.template;
      const watchList = [];

      const el = createElement(tree, watchList);
      if (this.#prevWatchList?.length === 0) {
        if (el) this.replaceChildren(el);
      } else {
        const d = diff(watchList, this.#prevWatchList);
        if (d?.length) {
          console.log(d);
          d.forEach((change) => {
            const all = this.querySelectorAll(change.selector);
            let changedElement = all[0];

            if (changedElement?.length > 1) {
              console.log(">>> multiple!", changedElement);
            }

            if (!!changedElement && change.type === "textContent") {
              changedElement.textContent = change.value;
            }
            if (!!changedElement && change.type === "prop") {
              handleProp(change.key, change.value, changedElement);
            }
            if (!!changedElement && change.type === "replace") {
              changedElement.parentNode.replaceChild(
                change.node.parentNode,
                changedElement
              );
            }
          });
        }
      }

      this.#prevWatchList = watchList;
    }
  }
}

function diff(change, prev) {
  const diff = prev
    .map((dom, index) => {
      if (
        !(
          dom.value instanceof Function &&
          dom.value.toString() !== change[index]?.value.toString()
        ) &&
        JSON.stringify(dom.value) !== JSON.stringify(change[index]?.value)
      ) {
        return {
          ...dom,
          value: change[index]?.value,
          node: change[index]?.node,
        };
      }
      return null;
    })
    .filter((d) => d !== null);

  return diff;
}
