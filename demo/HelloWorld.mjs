import WebComponent from "../src/index.mjs";

export class HelloWorld extends WebComponent {
  name = "World";
  emotion = "excited";

  static properties = ["name", "emotion"];

  onInit() {
    let count = 0;
    this.onclick = () => {
      this.setAttribute("name", `Clicked ${++count}x!`);
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
    return `<button id="btn">Hello ${this.name}${
      this.emotion === "sad" ? ". 😭" : "! 🙌"
    }</button>`;
  }
}

customElements.define("hello-world", HelloWorld);
