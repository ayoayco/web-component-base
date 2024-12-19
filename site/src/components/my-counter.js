class Counter extends WebComponent {
  static props = {
    count: 0,
  }
  get template() {
    return html`<button onClick=${() => ++this.props.count}>
      ${this.props.count}
    </button>`
  }
}
