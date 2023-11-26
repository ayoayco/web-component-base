// @ts-check
import WebComponent from "../src/WebComponent.js";

export class Counter extends WebComponent {
  static properties = ["count"];
  onInit() {
    this.props.count = 1;
    this.onclick = ()=> ++this.props.count
    let double = () => this.props.count * 2;
    console.log(double());
    this.props.count = 3;
    console.log(double());
  }
  get template() {
    return `<button>${this.props.count}</button>`;
  }
}

customElements.define("my-counter", Counter);
