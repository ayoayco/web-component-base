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
   * @see https://www.npmjs.com/package/web-component-base#prop-access
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
   * @typedef {{[name: string]: any}} PropStringMap
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
   * @param {{
   *  property: string,
   *  previousValue: any,
   *  currentValue: any
   * }} changes
   */
  onChanges(changes) {}

  render() {
    if (typeof this.template === "string") this.innerHTML = this.template;
  }

  /**
   * start HTMLElement callbacks
   */
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
    const camelCaps = this.#getCamelCaps(property);

    if (previousValue !== currentValue) {
      this[property] = currentValue === "" || currentValue;
      this[camelCaps] = this[property]; // remove on v2
      this.props[camelCaps] = {
        attributeChanged: true,
        value: this[property],
      }

      this.render();
      this.onChanges({ property, previousValue, currentValue });
    }
  }
 
  #getCamelCaps(kebab) {
    return kebab.replace(/-./g, (x) => x[1].toUpperCase());
  }

  #typeMap = {}
  #handler = (setter, typeMap) => ({
    set(obj, prop, value) {
      const attributeChanged = value?.attributeChanged ?? false;
      let newValue = attributeChanged ? value.value : value;
      const oldValue = obj[prop];
      
      console.log(">>>", newValue, oldValue);

      if (!(prop in typeMap)) {
        typeMap[prop] = typeof newValue;
      }

      obj[prop] = restoreType(newValue, typeMap[prop])

      if (attributeChanged && !oldValue != newValue) {
        const kebab = getKebab(prop);
        setter(kebab, newValue);
      }


      function getKebab(str) {
        return str.replace(
          /[A-Z]+(?![a-z])|[A-Z]/g,
          ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
        );
      }

      function restoreType(value, type) {
        switch(type) {
          case 'string': return value;
          case 'number': return parseInt(value);
          case 'boolean': return JSON.parse(value);
          default: return value
        }
      }



      return true;
    },
  });

  #initializeProps() {
    if (!this.#props) {
      this.#props = new Proxy(
        {},
        this.#handler((key, value) => this.setAttribute(key, value), this.#typeMap)
      );
    }
  }
}

export default WebComponent;
