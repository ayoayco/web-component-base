import { serialize } from "./serialize.mjs";
export function createElement(tree, watchList = []) {
  if (!tree && tree !== 0) {
    console.log(tree);
    const div = document.createElement("div");
    const watchObj = {
      type: "replace",
      node: div,
      value: "__replace__",
    };
    watchList.push(watchObj);
    return div;
  }
  if (!tree.type) {
    if (Array.isArray(tree)) {
      const frag = document.createDocumentFragment();
      frag.replaceChildren(
        ...tree.map((leaf, index) => {
          return createElement(leaf, watchList, undefined, index);
        })
      );

      return frag;
    }

    const node = document.createTextNode(tree);
    const watchObj = {
      type: "textContent",
      node,
      value: tree,
    };
    watchList.push(watchObj);

    return node;
  } else {
    const el = document.createElement(tree.type);

    /**
     * handle props
     */
    if (tree.props) {
      Object.entries(tree.props).forEach(([prop, value]) => {
        handleProp(prop, value, el);
        const watchObj2 = {
          type: "prop",
          key: prop,
          value,
          node: el,
        };
        watchList.push(watchObj2);
      });
    }

    /**
     * handle children
     */
    tree.children?.forEach((child) => {
      const childEl = createElement(child, watchList);
      if (childEl instanceof Node) {
        el.appendChild(childEl);
      }
    });

    return el;
  }
}

export function handleProp(prop, value, el) {
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
