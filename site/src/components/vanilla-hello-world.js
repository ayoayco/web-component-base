class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ["my-name"];
  }

  connectedCallback() {
    let count = 0;
    const currentName = this.getAttribute('my-name');

    if (!currentName) {
      this.setAttribute('my-name', 'World')
    }

    this.onclick = () => this.setAttribute("my-name", `Clicked ${++count}x`);
  }

  attributeChangedCallback(property, previousValue, currentValue) {
    if (property === "my-name" && previousValue !== currentValue) {
      this.innerHTML = `<button style="cursor:pointer">Hello ${currentValue}!</button>`;
    }
  }
}
