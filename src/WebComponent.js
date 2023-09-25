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
   * @param {{'property': string, 'previousValue': any, 'currentValue': any}} changes
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
    if (previousValue !== currentValue) {
      this[property] = currentValue;
      this.render();
      this.onChanges({ property, previousValue, currentValue });
    }
  }

  render() {
    this.innerHTML = this.template;
  }
}
