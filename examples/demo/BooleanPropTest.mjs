import { WebComponent } from "../../src/index.js";

export class BooleanPropTest extends WebComponent {
  static properties = ["is-inline", "anotherone"];

  get template() {
    return `<p>is-inline: ${this.props.isInline}</p><p>another-one: ${this.props.anotherone}</p>`;
  }
}

customElements.define("boolean-prop-test", BooleanPropTest);
