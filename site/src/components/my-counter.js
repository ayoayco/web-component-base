class Counter extends WebComponent {
  static props = {
    count: 0,
  };

  increment() {
    this.onclick = () => ++this.props.count;
  }
  get template() {
    return html`<button onClick=${() => this.increment()}>
      ${this.props.count}
    </button>`;
  }
}
