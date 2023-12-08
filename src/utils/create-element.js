export function createElement(tree) {
  if (!tree.type) {
    const leaves = typeof tree === "object" ? Object.keys(tree) : [];
    if (leaves?.length > 1) {
      return leaves.map((leaf) => createElement(tree[leaf]));
    }
    return document.createTextNode(tree);
  } else {
    const el = document.createElement(tree.type);
    if (tree.props)
        Object.keys(tree.props).forEach(prop => el[prop] = tree.props[prop])
    tree.children?.forEach((child) => {
      const childEl = createElement(child);
      if (childEl) {
        el.appendChild(childEl);
      }
    });
    return el;
  }
}
