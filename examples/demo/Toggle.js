import { WebComponent, html } from '../../src/index.js'

class Toggle extends WebComponent {
  static props = {
    toggle: false,
  }
  get template() {
    return html`
      <button onClick=${() => (this.props.toggle = !this.props.toggle)}>
        ${this.props.toggle}
      </button>
    `
  }
}

customElements.define('my-toggle', Toggle)
