// @ts-check

export class WebComponent extends HTMLElement {
  get template() {
    return "";
  }

  /**
   * triggered when an attribute value changed
   */
  onChanges({ previousValue, currentValue }) {}

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(property, previousValue, currentValue) {
    if (previousValue !== currentValue) {
      this[property] = currentValue;
      this.render();
    }

    this.onChanges({previousValue, currentValue});
  }

  render() {
    this.innerHTML = this.template;
  }
}
