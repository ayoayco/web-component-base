// @ts-check
import WebComponent from "../index.mjs";

export class HelloWorld extends WebComponent {
  name = "World";
  emotion = "excited";

  static properties = ["name", "emotion"];

  onChanges({ property, previousValue, currentValue }) {
    console.log(">>> changed", { property, previousValue, currentValue });
  }

  get template() {
    return `
        <h1>Hello ${this.name}${this.emotion === "sad" ? ". 😭" : "! 🙌"}</h1>`;
  }
}

customElements.define("hello-world", HelloWorld);
