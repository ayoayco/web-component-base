// @ts-check
import WebComponent from "../index.mjs";

export class HelloWorld extends WebComponent {
  name = "World";
  emotion = "excited";

  static properties = ["name", "emotion"];

  onInit() {
    console.log("onInit", this.querySelector("h1"));
  }

  afterViewInit() {
    console.log("afterViewInit", this.querySelector("h1"));
  }

  onChanges(changes) {
    console.log("onChanges", this.querySelector("h1"));
    Object.keys(changes).forEach((name) => {
      console.log(name, changes[name]);
    });
  }

  get template() {
    return `<h1>Hello ${this.name}${
      this.emotion === "sad" ? ". 😭" : "! 🙌"
    }</h1>`;
  }
}

customElements.define("hello-world", HelloWorld);
