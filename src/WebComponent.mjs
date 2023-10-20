// @ts-check

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
    const camelCaps = (kebab) =>
      kebab.replace(/-./g, (x) => x[1].toUpperCase());
    if (previousValue !== currentValue) {
      this[property] = currentValue;
      this[camelCaps(property)] = currentValue;
      this.render();
      this.onChanges({ property, previousValue, currentValue });
    }
  }

  render() {
    this.innerHTML = this.template;
  }
}
