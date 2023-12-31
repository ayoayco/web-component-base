// @ts-check
import { WebComponent } from "../../src/index.js";

export class Toggle extends WebComponent {
  static props = {
    toggle: false,
  };
  onInit() {
    this.onclick = () => this.handleToggle();
  }
  handleToggle() {
    this.props.toggle = !this.props.toggle;
  }
  get template() {
    return `<button id="toggle">${this.props.toggle ? "On" : "Off"}</button>`;
  }
}

customElements.define("my-toggle", Toggle);
