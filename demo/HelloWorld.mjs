// @ts-check
import WebComponent from "../index.mjs";

export class HelloWorld extends WebComponent {
  name = "World";
  emotion = "excited";

  static get observedAttributes() {
    return ["name", "emotion"];
  }

  get template() {
    return `
        <h1>Hello ${this.name}${
            this.emotion === 'sad'
                ? '. 😭'
                : '! 🙌'
        }</h1>`
  }
}
