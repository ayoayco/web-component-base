// @ts-check
import { WebComponent, attachEffect } from "../../src/index.js";

export class Decrease extends WebComponent {
  static props = {
    count: 999,
  };

  onInit() {
    this.onclick = () => --this.props.count;
    attachEffect(this.props.count, (count) => console.log(count));
  }

  afterViewInit() {
    attachEffect(this.props.count, (count) => console.log(count + 100));
  }

  get template() {
    return `<button id="btn">${this.props.count}</button>`;
  }
}

customElements.define("my-decrement", Decrease);
