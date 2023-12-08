import { WebComponent } from "../../src/index.js";

export class Counter extends WebComponent {
  static props = {
    count: 123,
  };
  onInit() {
    this.onclick = () => ++this.props.count;
  }
  get template() {
    return `<button id="btn">${this.props.count}</button>`;
  }
}

customElements.define("my-counter", Counter);
