import { getCamelCase } from "./get-camel-case.js";

export function createElement(tree) {
  if (!tree.type) {
    const leaves = typeof tree === "object" ? Object.keys(tree) : [];
    if (leaves?.length > 1) {
      return leaves.map((leaf) => createElement(tree[leaf]));
    }
    return document.createTextNode(tree);
  } else {
    const el = document.createElement(tree.type);
    if (tree.props) {
      Object.keys(tree.props).forEach((prop) => {
        let domProp = prop.toLowerCase();
        let value = tree.props[prop];
        if (domProp.startsWith("data-")) {
          const dataProp = domProp.replace("data-", "");
          el.dataset[getCamelCase(dataProp)] = value;
        } else if (domProp.startsWith("aria-")) {
          el.setAttribute(domProp, value);
        } else {
          switch (domProp) {
            case "class":
              domProp = "className";
              break;
            case "for":
              domProp = "htmlFor";
              break;
          }
          if (domProp in el) el[domProp] = value;
        }
      });
    }
    tree.children?.forEach((child) => {
      const childEl = createElement(child);
      if (childEl) {
        el.appendChild(childEl);
      }
    });
    return el;
  }
}
