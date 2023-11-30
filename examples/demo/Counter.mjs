// @ts-check
import WebComponent from "../../src/WebComponent.js";

export class Counter extends WebComponent {
  static properties = ["count"];
  onInit() {
    this.props.count = 0;
    this.onclick = () => ++this.props.count;
  }
  get template() {
    return `<button id="btn">${this.props.count}</button>`;
  }
}

customElements.define("my-counter", Counter);
