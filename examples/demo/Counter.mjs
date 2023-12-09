// @ts-check
import { WebComponent, html } from "../../src/index.js"

export class Counter extends WebComponent {
  static props = {
    count: 0
  }
  get template() {
    return html`
      <button onClick=${() => ++this.props.count} id="btn">
        ${this.props.count}
      </button>
    `;
  }
}

customElements.define("my-counter", Counter);
