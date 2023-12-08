import { WebComponent, html } from "../../src/index.js";

export class Counter extends WebComponent {
  static props = {
    count: 123,
  };
  get template() {
    return html`
      <button onclick=${() => ++this.props.count} style="background-color: black; color: white;">
        <span>${this.props.count}</span>
      </button>
    `;
  }
}

customElements.define("my-counter", Counter);
