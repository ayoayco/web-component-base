import { html, WebComponent } from "../../src/index.js";

export class HelloWorld extends WebComponent {
  static props = {
    myName: "World",
  };
  get template() {
    return html`<p>Hello ${this.props.myName}</p>`;
  }
}

customElements.define("hello-world", HelloWorld);
