class MyQuote extends WebComponent {
  static properties = ['type'];

  /**
   * @type {HTMLElement}
   */
  get wrapper() {
    return this.querySelector('#wrapper');
  }

  afterViewInit() {
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

    Object.keys(style).forEach((rule) => {
      this.wrapper.style[rule] = style[rule];
    });

  }

  get template() {
    const trimmed = this.innerHTML.trim();
    return `
        <div id="wrapper">
            ${trimmed}
        </div>
        `;
  }
}
