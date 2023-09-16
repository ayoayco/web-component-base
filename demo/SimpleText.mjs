// @ts-check
import WebComponent from "../index.mjs";

class SimpleText extends WebComponent {
  greeting = "Hello";

  static get observedAttributes() {
    return ["greeting"];
  }

  get template() {
    return `<p>Simple text ${this.greeting}</p>`;
  }
}

customElements.define("simple-text", SimpleText);
