import { html, render } from "../../src/index.js";

class VanillaTest extends HTMLElement {
  connectedCallback() {
    const el = html`<button>hello</button>`;
    render(el, this);
  }
}

customElements.define("vanilla-test", VanillaTest);
