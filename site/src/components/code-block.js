class CodeBlockComponent extends HTMLElement {
  connectedCallback() {
    const trimmed = this.innerHTML.trim();
    const lang = this.getAttribute("language");
    const inline = this.getAttribute("inline") !== null;

    this.innerHTML = `
        <pre id="pre"><code id="code">${trimmed}</code></pre>
    `;

    /**
     * @type {HTMLPreElement}
     */
    const pre = this.querySelector("#pre");

    if (lang) {
      pre.className = `language-${lang}`;
    }

    /**
     * @type {Partial<CSSStyleDeclaration>}
     */
    const style = {
      background: "#f5f2f0",
      padding: "1em",
      margin: "1em 0",
      fontSize: "large",
      overflow: "auto",
      borderRadius: '5px'
    };

    if (inline) {
      style.display = 'inline';
      style.padding = '0.3em';
    }

    Object.keys(style).forEach((rule) => {
      pre.style[rule] = style[rule];
    });
  }
}
