// @ts-check
import WebComponent from "../src/index.js";

export class HelloWorld extends WebComponent {
  name = "World";
  emotion = "excited";

  static properties = ["data-name", "emotion"];

  onInit() {
    let count = 0;
    this.onclick = () => {
      this.setAttribute("data-name", `Clicked ${++count}x!`);
    };
  }

  afterViewInit() {
    console.log("afterViewInit", this.querySelector("h1"));
  }

  onChanges(changes) {
    const { property, previousValue, currentValue } = changes;
    console.log(`${property} changed`, { previousValue, currentValue });
  }

  get template() {
    return `<button id="btn">Hello ${this.dataName}${
      this.emotion === "sad" ? ". 😭" : "! 🙌"
    }</button>`;
  }
}

customElements.define("hello-world", HelloWorld);
