import { WebComponent } from "../../src/index.js";

export class HelloWorld extends WebComponent {
  static props = {
    name: "a",
  };
  onInit() {
    this.onclick = () => (this.props.name += "a");
  }
  get template() {
    return `<button>W${this.props.name}h!</button>`;
  }
}

customElements.define("my-hello-world", HelloWorld);
