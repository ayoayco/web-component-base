class FeatureSet extends WebComponent {
  #features = [
    {
      icon: "️🔄",
      title: "Reactive.",
      description:
        "A robust API for synchronizing your component's UI and property values",
    },
    {
      icon: "😌",
      title: "Easy.",
      description: "Sensible life-cycle hooks that you understand and remember",
      url: "",
    },
    {
      icon: "️💡",
      title: "Familiar.",
      description:
        "Use the built-in JSX-like syntax or bring your own custom templating syntax",
      url: "https://codepen.io/ayoayco-the-styleful/pen/ZEwNJBR?editors=1010",
    },
    {
      icon: "️🛜",
      title: "Powerful.",
      description:
        "Attach 'side effects' that gets triggered on property value changes",
      url: "",
    },
  ];

  /**
   * @type {Array<HTMLArticleElement>}
   */
  get articleEl() {
    return this.querySelectorAll("article");
  }

  afterViewInit() {
    /**
     * @type {Partial<CSSStyleDeclaration>}
     */
    const articleStyles = {
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "30px",
      marginBottom: "1em",
    };
    Object.keys(articleStyles).forEach((rule) =>
      this.articleEl.forEach((el) => (el.style[rule] = articleStyles[rule]))
    );

    /**
     * @type {Partial<CSSStyleDeclaration>}
     */
    const ftrStyles = {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "30px",
      gap: "1em",
    };
    const featureWrapper = this.querySelector(".feature-wrapper");
    Object.keys(ftrStyles).forEach(
      (rule) => (featureWrapper.style[rule] = ftrStyles[rule])
    );
  }

  get template() {
    return html`
      <div class="feature-wrapper">
        ${this.#features.map(
          (feature) => html`
            <article>
              <h3 style="margin-bottom: 1em" class="feature-title">
                <span>${feature.icon}</span> ${feature.title}
              </h3>
              <p style="margin:0" class="feature-description">
                ${feature.description}
              </p>
            </article>
          `
        )}
      </div>
    `;
  }
}
