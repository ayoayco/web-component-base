// @ts-check

import WebComponent from "../dist";

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
    const { property, previousValue, currentValue } = changes;
    console.log(`${property} changed`, { previousValue, currentValue });
  }

  get template() {
    return `<h1>Hello ${this.name}${
      this.emotion === "sad" ? ". 😭" : "! 🙌"
    }</h1>`;
  }
}

customElements.define("hello-world", HelloWorld);
