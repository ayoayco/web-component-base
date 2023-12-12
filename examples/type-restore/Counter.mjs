// @ts-check
import { WebComponent } from "../../src/index.js";

export class Counter extends WebComponent {
  static props = {
    count: 1,
  };
  onInit() {
    let i = 1;
    this.onclick = () => ++this.props.count;
    let double = () => i * 2;
    console.log(double());
    i = 3;
    console.log(double());
  }
  get template() {
    return `<button>${this.props.count}</button>`;
  }
}

customElements.define("my-counter", Counter);
