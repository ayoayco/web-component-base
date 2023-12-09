import { WebComponent, html } from "../../src/index.js";

export class Counter extends WebComponent {
  static props = {
    count: 123,
  };
  get template() {
    return html`
      <button
        class="hey"
        ID="btn"
        onClick=${() => ++this.props.count}
        style="background-color: black; color: white;"
        about="Elephant"
      >
        <span>${this.props.count}</span>
      </button>
      <form style="margin: 1em 0;">
        <label data-my-name="Ayo" for="the-input">Name</label>
        <input id="the-input" type="foo" value="Name:" />
      </form>
    `;
  }
}

customElements.define("my-counter", Counter);
