import WebComponent from "../src/WebComponent.js";

export class BooleanPropTest extends WebComponent {
  isInline = false;

  static properties = ["is-inline"];

  onChanges(changes) {
    console.log(">>> boolean prop test", changes);
  }

  get template() {
    return `<span>${this.isInline}</span>`;
  }
}

customElements.define("boolean-prop-test", BooleanPropTest);
