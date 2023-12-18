import { serialize } from "./serialize.mjs";
export function createElement(tree) {
  if (!tree.type) {
    if (Array.isArray(tree)) {
      const frag = document.createDocumentFragment();
      frag.replaceChildren(...tree.map((leaf) => createElement(leaf)));
      return frag;
    }
    return document.createTextNode(tree);
  } else {
    const el = document.createElement(tree.type);
    /**
     * handle props
     */
    if (tree.props) {
      Object.entries(tree.props).forEach(([prop, value]) => {
        const domProp = prop.toLowerCase();
        if (domProp === "style" && typeof value === "object") {
          applyStyles(el, value);
        } else if (prop in el) {
          el[prop] = value;
        } else if (domProp in el) {
          el[domProp] = value;
        } else {
          el.setAttribute(prop, serialize(value));
        }
      });
    }
    /**
     * handle children
     */
    tree.children?.forEach((child) => {
      const childEl = createElement(child);
      if (childEl instanceof Node) {
        el.appendChild(childEl);
      }
    });
    return el;
  }
}

function applyStyles(el, styleObj) {
  Object.entries(styleObj).forEach(([rule, value]) => {
    if (rule in el.style && value) el.style[rule] = value;
  });
}
