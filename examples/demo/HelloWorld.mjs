// @ts-check
import { html, WebComponent } from '../../src/index.js'

export class HelloWorld extends WebComponent {
  static props = {
    count: 0,
    emotion: 'sad',
  }

  onInit() {
    this.props.count = 0
  }

  get template() {
    const label = this.props.count ? `Clicked ${this.props.count}` : 'World'
    const emote = this.props.emotion === 'sad' ? '. 😭' : '! 🙌'

    return html`
      <button onclick=${() => ++this.props.count}>
        Hello ${label}${emote}
      </button>
    `
  }
}

customElements.define('hello-world', HelloWorld)
