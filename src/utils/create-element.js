export function createElement(tree) {
  if (!tree.type) {
    const leaves = typeof tree === "object" ? Object.keys(tree) : [];
    if (leaves?.length > 1) {
      return leaves.map((leaf) => createElement(tree[leaf]));
    }
    return document.createTextNode(tree);
  } else {
    const el = document.createElement(tree.type);
    const eventAttrs = tree.props
      ? Object.keys(tree.props)
          .filter((key) => key.startsWith("on:"))
          .map((key) => ({ key, cb: tree.props[key] }))
      : [];
    eventAttrs.forEach((onEvent) => {
      const { key, cb } = onEvent;
      const eventId = key.replace("on:", "");
      el.addEventListener(eventId, cb);
    });
    tree.children?.forEach((child) => {
      const childEl = createElement(child);
      if (childEl) {
        el.appendChild(childEl);
      }
    });
    return el;
  }
}
