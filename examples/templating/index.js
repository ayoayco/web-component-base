// @ts-check
import { WebComponent, attachEffect, html } from "../../src/index.js";

export class Counter extends WebComponent {
  static props = {
    count: 129,
    sum: 0,
  };

  onInit() {
    attachEffect(this.props.count, (count) => (this.props.sum = 3 + count));
  }

  get template() {
    const list = ["a", "b", "c", "what"];
    const links = [
      {
        url: "https://ayco.io",
        text: "Ayo Ayco",
      },
      {
        url: "https://ayco.io/gh/McFly",
        text: "McFly",
      },
    ];

    return html`
      <div>
        <div>
          <div>
            <div>
              <div><a>${this.props.sum}</a></div>
            </div>
          </div>
        </div>
      </div>
      <div><a>${this.props.count}</a></div>
      <div><a>hey</a></div>
      <div><a>hey</a></div>
      <button
        class="hey"
        id="btn"
        onClick=${() => ++this.props.count}
        style="background-color: green; color: white;"
        about="Elephant"
        data-name="thing"
        aria-name="thingz"
      >
        <span>${this.props.count}</span>
      </button>
      <form style="margin: 1em 0;">
        <label data-my-name="Ayo" for="the-input">Name</label>
        <input
          onkeyup=${() => ++this.props.count}
          id="the-input"
          type="foo"
          value="Name:"
        />
      </form>
      ${this.props.count > 130 && html`<h1>Too much!</h1>`}
      ${list.map((item) => html`<p>${item}</p>`)}
      <h3 about="Elephant">Links</h3>
      <ul>
        ${links.map(
          (link) =>
            html`<li><a href=${link.url} target="_blank">${link.text}</a></li>`
        )}
      </ul>
      <div>${this.props.count > 130 && html`<h1>Too much!</h1>`}</div>
    `;
  }
}

customElements.define("my-counter", Counter);
