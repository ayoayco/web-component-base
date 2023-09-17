// @ts-check

export class WebComponent extends HTMLElement {
  get template() {
    return "";
  }

  /**
   * triggered when the component is connected to the DOM
   */
  onInit() {}

  /**
   * triggered when an attribute value changed
   */
  onChanges({ property, previousValue, currentValue }) {}

  connectedCallback() {
    this.render();
    this.onInit();
  }

  attributeChangedCallback(property, previousValue, currentValue) {
    if (previousValue !== currentValue) {
      this[property] = currentValue;
      this.render();
    }

    this.onChanges({ property, previousValue, currentValue });
  }

  render() {
    this.innerHTML = this.template;
  }
}
