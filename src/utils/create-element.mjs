import { serialize } from "./serialize.mjs";
export function createElement(tree, watchList = [], selector = []) {
  if (!tree.type) {
    const value = tree.dynamic ? tree.value : tree;

    if (Array.isArray(value)) {
      const frag = document.createDocumentFragment();
      frag.replaceChildren(
        ...value.map((leaf) =>
          leaf.dynamic
            ? createElement(leaf.value, watchList)
            : createElement(leaf, watchList)
        )
      );

      return frag;
    }

    const node = document.createTextNode(value);
    if (tree.dynamic) {
      const watchObj = {
        selector: selector.join(" "),
        type: "textContent",
        value,
      };
      // console.log(">>> node", watchObj);
      watchList.push(watchObj);
    }

    return node;
  } else {
    const el = document.createElement(tree.type);
    const elSelector = tree.type;
    const selectorIndex = selector.length;
    selector.push(elSelector);
    /**
     * handle props
     */
    if (tree.props) {
      Object.entries(tree.props).forEach(([prop, value]) => {
        const v = value.dynamic ? value.value : value;
        if (prop === "id") {
          selector[selectorIndex] += `#${value}`;
        }
        if (prop === "class") {
          selector[selectorIndex] += `.${value}`;
        }
        handleProp(prop, v, el);
        if (value.dynamic) {
          const watchObj2 = {
            selector: selector.join(" "),
            type: "prop",
            key: prop,
            value: v,
          };
          // console.log(">>> prop", watchObj2);
          watchList.push(watchObj2);
        }
      });
    }
    /**
     * handle children
     */
    tree.children?.forEach((child) => {
      const childEl = createElement(child, watchList, selector);
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
