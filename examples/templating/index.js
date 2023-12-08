import { WebComponent, html } from "../../src/index.js";

export class Counter extends WebComponent {
  static props = {
    count: 123,
  };
  get template() {
    return html`
      <button on:click=${() => ++this.props.count}>
        ${this.props.count}
      </button>
      <input on:keyup=${() => console.log(this.props.count)} />
    `;
  }

  prev;
  render() {
    const {t, ...tree} = this.template;
    if (JSON.stringify(this.prev) !== JSON.stringify(tree)) {
      // render
      const el = this.createElement(tree)
      console.log('>>> element to render', el)
      if (Array.isArray(el))
        this.replaceChildren(...el)
      else
        this.replaceChildren(el)
      console.log(this.prev, tree)
      this.prev = tree;
    }
  }

  createElement(tree) {

      if (!tree.type) {
        const leaves = Object.keys(tree);
        if (leaves?.length > 1)
          return leaves.map(leaf => this.createElement(tree[leaf]));
       return document.createTextNode(tree);
      }

      const el = document.createElement(tree.type);
      const eventAttrs = tree.props ? Object.keys(tree.props).filter(key => key.startsWith('on:')).map((key) => ({key, cb:tree.props[key]})) : [];
      eventAttrs.forEach(onEvent => {
        const {key, cb} = onEvent;
        const eventId = key.replace('on:', '');
        el.addEventListener(eventId, cb)
      })
      tree.children?.forEach(child => {
        const childEl = this.createElement(child)
        if (childEl)
          el.appendChild(childEl)
      })

      return el;
  }
}

customElements.define("my-counter", Counter);
