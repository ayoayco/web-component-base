export function createElement(tree) {
  if (tree.type === undefined) {
    if (Array.isArray(tree)) {
      const frag = document.createDocumentFragment();
      frag.replaceChildren(...tree.map(leaf => createElement(leaf)))
      return frag;
    }
    return document.createTextNode(tree);
  } else {
    const el = document.createElement(tree.type);
    if (tree.props) {
      Object.keys(tree.props).forEach((prop) => {
        const domProp = prop.toLowerCase();
        if (domProp in el) {
          el[domProp] = tree.props[prop];
        } else {
          el.setAttribute(prop, tree.props[prop])
        }
      });
    }
    tree.children?.forEach((child) => {
      const childEl = createElement(child);
      if (childEl instanceof Node) {
        el.appendChild(childEl);
      }
    });
    return el;
  }
}
