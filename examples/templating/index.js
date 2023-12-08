import { WebComponent, html } from "../../src/index.js";

export class Counter extends WebComponent {
  static props = {
    count: 123,
  };
  get template() {
    return html`
      <button on:click=${() => ++this.props.count}>
        ${this.props.count}
      </button>
    `;
  }
}

customElements.define("my-counter", Counter);
