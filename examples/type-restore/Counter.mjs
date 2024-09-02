// @ts-check
import { html, WebComponent } from "../../src/index.js";

export class Counter extends WebComponent {
  static props = {
    count: 1,
  };
  get template() {
    return html`<button onclick=${() => ++this.props.count}>${this.props.count}</button>`;
  }
}

customElements.define("my-counter", Counter);
