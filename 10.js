function curry(fn) {
  return function curried(...args) {
    if (fn.length > args.length) {
      return function () {
        return curried(...args.concat(Array.from(arguments)));
      };
    }
    return fn(...args);
  };
}

function arrayToTree(source, root) {
  let result = [],
    map = {};
  for (let item of source) {
    const { id, parentId } = item;
    if (!map[id]) map[id] = {};
    map[id] = map[id].children
      ? { ...item, children: map[id].children }
      : { ...item };

    if (root === parentId) {
      result.push(map[parentId]);
    } else {
      if (!map[parentId]) map[parentId] = {};
      if (!map[parentId.children]) map[parentId].children = [];
      map[parentId].children.push(map[id]);
    }
  }
}

function compose(...funs) {
  return function operate(x) {
    if (funs.length === 0) return x;
    if (funs.length === 1) return funs[0](x);
    return funs.reduceRight((result, item) => {
      if (typeof item !== "function") return result;
      return item(result);
    });
  };
}
