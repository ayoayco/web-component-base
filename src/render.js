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
      console.log(">>> initial", watchList);
    } else {
      const d = diff(watchList, host.__prev_watch_list__);
      if (d?.length) {
        d.forEach((change) => {
          const parent = change.prevNode?.parentNode;
          // if (change.type === "add") {
          //   // add
          //   const ultraParent = change.node.parentNode.parentNode;
          //   ultraParent.appendChild(change.node.parentNode);
          //   console.log(ultraParent)
          //   return;
          // }
          if (change.type === "prop") {
            handleProp(change.key, change.value, change.prevNode);
            host.__prev_watch_list__[change.index] = watchList[change.index];
          } else if (change.type !== "add") {
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
  console.log({ change, prev });
  const diff1 = change
    .map((c, index) => ({ ...c, index }))
    .filter((c) => !prev.find((p) => c.node.isEqualNode(p.node)));

  const diff2 = diff1.filter((c) => {
    if (c.index < prev.length) {
      if (
        c.value !== prev[c.index].value ||
        (typeof c.value === "function" &&
          c.value.toString() !== prev[c.index].value.toString())
      ) {
        c.prevType = prev[c.index].type;
        c.prevNode = prev[c.index].node;
        return true;
      }
    } else {
      c.type = "add";
      return true;
    }
  });

  console.log(diff2);
  return diff2;
}
