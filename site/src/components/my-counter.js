class Counter extends WebComponent {
  static properties = ["count"];
  onInit() {
    this.props.count = 0;
    this.onclick = () => ++this.props.count;
  }
  get template() {
    return `<button>${this.props.count}</button>`;
  }
}
