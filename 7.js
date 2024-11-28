// lodash 的 get
function get(source, path) {
  // 这个正则的意思是 a.b[0].c => a.b.0.c 把 [0] 替换成 .0
  const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let result = source;
  for (const p of paths) {
    result = Object(result)[p];
    if (result === undefined) {
      return undefined;
    }
  }
  return result;
}

const test = {
  a: {
    b: [{ c: 1 }],
  },
};

console.log(get(test, "a.b[0].c")); // 1

// lodash 的 set
function set(source, path, value) {
  // 这个正则的意思是 a.b[0].c => a.b.0.c 把 [0] 替换成 .0
  const paths = path.replace(/\[(\d+)\]/g, ".$1").split(".");

  let result = source;
  for (const p of paths) {
    if (p === paths[paths.length - 1]) {
      result[p] = value;
    } else {
      result = result[p];
    }
  }
  return result;
}

console.log(set(test, "a.b[0].c", 2)); // 1
