// @ts-check
import WebComponent from "../../src/WebComponent.js";
import { attachEffect } from "../../src/attach-effect.js";

export class Decrease extends WebComponent {
  static properties = ["count"];
  onInit() {
    this.props.count = 999;
    this.onclick = () => --this.props.count;
    attachEffect(
      this.props.count,
      (count) => console.log(count)
    );
  }

  afterViewInit(){
    attachEffect(this.props.count, (count) => console.log(count + 100));
  }

  get template() {
    return `<button id="btn">${this.props.count}</button>`;
  }
}

customElements.define("my-decrement", Decrease);
