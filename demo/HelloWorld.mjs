// @ts-check
import WebComponent from "../src/WebComponent.js";

export class HelloWorld extends WebComponent {
  static properties = ["count", "emotion"];

  onInit() {
    this.props.count = 0;
    this.onclick = () => ++this.props.count;
  }

  get template() {
    const label = this.props.count ? `Clicked ${this.props.count}` : "World";
    const emote = this.props.emotion === "sad" ? ". 😭" : "! 🙌";

    return `<button id="btn">Hello ${label}${emote}</button>`;
  }
}

customElements.define("hello-world", HelloWorld);
