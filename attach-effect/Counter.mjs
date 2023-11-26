// @ts-check
import WebComponent from "../src/WebComponent.js";
// import { attachEffect } from "../src/attach-effect.js";

export class Counter extends WebComponent {
  static properties = ["count"];
  onInit() {
    this.props.count = 0;
    this.onclick = () => ++this.props.count;
    // attachEffect(this.props, 'count', console.log);
  }
  get template() {
    return `<button id="btn">${this.props.count}</button>`;
  }
}

customElements.define("my-counter", Counter);
