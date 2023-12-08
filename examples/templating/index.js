import { WebComponent, html } from "../../src/index.js";

export class Counter extends WebComponent {
  static props = {
    count: 123,
  };
  get template() {
    return html`
      <div on:click=${() => ++this.props.count}>
        ${this.props.count}
        <p>hey</p>
      </div>
      <button on:click=${() => alert('woah!')}>hey <span>you</span> sexy animal</button>
    `;
  }

}

customElements.define("my-counter", Counter);
