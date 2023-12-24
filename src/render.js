import { createElement, handleProp } from "./utils/index.js";

export function render(template, host) {
  if (!host.__prev_watch_list__) {
    host.__prev_watch_list__ = [];
  }

  if (typeof template === "string") {
    host.innerHTML = template;
  } else if (typeof template === "object") {
    const tree = template;
    const watchList = [];

    const el = createElement(tree, watchList);
    if (host.__prev_watch_list__?.length === 0) {
      if (el) host.replaceChildren(el);
      host.__prev_watch_list__ = watchList;
    } else {
      const d = diff(watchList, host.__prev_watch_list__);
      if (d?.length) {
        d.forEach((change) => {
          const parent = change.prevNode?.parentNode;
          if (change.type === "prop") {
            handleProp(change.key, change.value, change.prevNode);
            host.__prev_watch_list__[change.index] = watchList[change.index];
          } else {
            const newNode =
              change.type === "replace" ? change.node?.parentNode : change.node;

            if (newNode instanceof Node) {
              parent?.replaceChild(newNode, change.prevNode);
              host.__prev_watch_list__[change.index] = watchList[change.index];
            }
          }
        });
      }
    }
  }
}

function diff(change, prev) {
  const diff = prev
    .map((dom, index) => {
      if (
        !!dom &&
        !(
          dom.value instanceof Function &&
          dom.value.toString() !== change[index]?.value.toString()
        ) &&
        JSON.stringify(dom.value) !== JSON.stringify(change[index]?.value)
      ) {
        return {
          ...dom,
          prevNode: dom.node,
          value: change[index]?.value,
          node: change[index]?.node,
          index,
        };
      }
      return null;
    })
    .filter((d) => d !== null);

  return diff;
}
