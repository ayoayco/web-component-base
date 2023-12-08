// @ts-check
import { WebComponent } from "../../src/index.js"

class SimpleText extends WebComponent {
  clickCallback() {
    console.log(">>> click!");
  }
  onInit() {
    this.onclick = this.clickCallback;
  }

  onDestroy() {
    console.log(">>> removing event listener");
    this.removeEventListener("click", this.clickCallback);
  }

  get template() {
    return `<span style="cursor:pointer">Click me!</span>`;
  }
}

customElements.define("simple-text", SimpleText);
