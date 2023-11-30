// @ts-check
import WebComponent from "../src/WebComponent.js";

export class Counter extends WebComponent {
  static properties = ["count"];
  onInit() {
    this.props.count = 1;
    let i = 1
    this.onclick = ()=> ++this.props.count
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
