import WebComponent from "../src/WebComponent.js";

export class BooleanPropTest extends WebComponent {
  isInline = false;
  anotherone = false;

  static properties = ["is-inline", "anotherone"];

  onChanges(changes) {
    console.log(">>> boolean prop test", changes);
  }

  get template() {
    return `<p>is-inline: ${this.isInline}</p><p>another-one: ${this.anotherone}</p>`;
  }
}

customElements.define("boolean-prop-test", BooleanPropTest);
