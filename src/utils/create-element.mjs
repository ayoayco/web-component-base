import { serialize } from "./serialize.mjs";
export function createElement(tree) {
  if (!tree.type) {
    const value = tree.dynamic ? tree.value : tree;

    if (Array.isArray(value)) {
      const frag = document.createDocumentFragment();
      frag.replaceChildren(
        ...value.map((leaf) =>
          leaf.dynamic ? createElement(leaf.value) : createElement(leaf)
        )
      );
      return frag;
    }

    const node = document.createTextNode(value);
    if (tree.dynamic)
      console.log(">>> node", { node, type: "textContent", value });

    return node;
  } else {
    const el = document.createElement(tree.type);
    /**
     * handle props
     */
    if (tree.props) {
      Object.entries(tree.props).forEach(([prop, value]) => {
        const v = value.dynamic ? value.value : value;
        handleProp(prop, v, el);
        if (value.dynamic)
          console.log(">>> prop", {
            node: el,
            type: "prop",
            key: prop,
            value: v,
          });
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

function handleProp(prop, value, el) {
  const domProp = prop.toLowerCase();
  if (domProp === "style" && typeof value === "object" && !!value) {
    applyStyles(el, value);
  } else if (prop in el) {
    el[prop] = value;
  } else if (domProp in el) {
    el[domProp] = value;
  } else {
    el.setAttribute(prop, serialize(value));
  }
}

function applyStyles(el, styleObj) {
  Object.entries(styleObj).forEach(([rule, value]) => {
    if (rule in el.style && value) el.style[rule] = value;
  });
}
