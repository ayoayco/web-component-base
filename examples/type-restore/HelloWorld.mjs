import WebComponent from "../src/WebComponent.js";

export class HelloWorld extends WebComponent {
  static properties = ["name"];
  onInit() {
    this.props.name = 'a';
    this.onclick = ()=> this.props.name += 'a'
  }
  get template() {
    return `<button>W${this.props.name}h!</button>`;
  }
}

customElements.define("my-hello-world", HelloWorld);
