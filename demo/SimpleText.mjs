// @ts-check

import WebComponent from "../dist/index";

class SimpleText extends WebComponent {
  onInit() {
    this.onclick = () => console.log(">>> click!");
  }

  get template() {
    return `<span>Click me!</span>`;
  }
}

customElements.define("simple-text", SimpleText);
