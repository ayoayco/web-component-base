// @ts-check
import { WebComponent, attachEffect, html } from "../../src/index.js";

export class Decrease extends WebComponent {
  static props = {
    count: 999,
  };

  onInit() {
    attachEffect(this.props.count, (count) => console.log(count));
  }

  afterViewInit() {
    attachEffect(this.props.count, (count) => console.log(count + 100));
  }

  get template() {
    return html`<button onclick=${() => --this.props.count} id="btn">${this.props.count}</button>`;
  }
}

customElements.define("my-decrement", Decrease);
