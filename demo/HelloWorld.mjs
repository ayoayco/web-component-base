// @ts-check
import WebComponent from "../src/index.js";

export class HelloWorld extends WebComponent {
  static properties = ["my-name", "emotion"];

  onInit() {
    let count = 0;
    this.onclick = () => (this.props.myName = `Clicked ${++count}`);
  }

  get template() {
    return `<button id="btn">Hello ${this.props.myName ?? "World"}${
      this.props.emotion === "sad" ? ". 😭" : "! 🙌"
    }</button>`;
  }
}

customElements.define("hello-world", HelloWorld);
