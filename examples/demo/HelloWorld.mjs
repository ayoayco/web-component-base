// @ts-check
import { WebComponent } from "../../src/index.js";

export class HelloWorld extends WebComponent {
  static props = {
    count: 0,
    emotion: "sad",
  };

  onInit() {
    this.props.count = 0;
    this.onclick = () => ++this.props.count;
  }

  get template() {
    const label = this.props.count ? `Clicked ${this.props.count}` : "World";
    const emote = this.props.emotion === "sad" ? ". 😭" : "! 🙌";

    const button = document.createElement("button");
    button.innerText = `Hello ${label}${emote}`;
    const paragraph = document.createElement("p");
    paragraph.innerText = "Oh what, dynamic DOM?";

    return [button, paragraph, "no way"];
  }

  render() {
    if (typeof this.template === "string") {
      this.innerHTML = this.template;
    } else if (this.template instanceof Node) {
      this.replaceChildren(this.template);
    } else if (
      Array.isArray(this.template) &&
      this.template.every((t) => t instanceof Node || typeof t === "string")
    ) {
      this.replaceChildren(...this.template);
    }
  }
}

customElements.define("hello-world", HelloWorld);
