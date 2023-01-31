function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}
// function copy(source, hash = new WeakMap()) {
//   if (!isObject(source)) return source;
//   if (hash.has(source)) return hash.get(source);
//   let target = Array.isArray(source) ? [] : {};
//   hash.set(source, target);

//   for (let key in source) {
//     if (Object.hasOwnProperty.call(source, key)) { // hasOwnProperty 对象自身属性中是否具有指定的属性
//       if (isObject(source[key])) {
//         target[key] = copy(source[key], hash);
//       } else {
//         target[key] = source[key];
//       }
//     }
//   }
//   return target;
// }

function copy(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source);

  let target = Array.isArray(source) ? [] : {};
  hash.set(source, target);
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = copy(source[key], hash);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

const a = {
  name: "1",
  message: {
    name: "2",
  },
  age: null,
  arr: [1, 2, 3, [4, 5]],
};

// const b = copy(a);
// console.log(JSON.stringify(b));

let c = {
  a: "1",
};
for (let i in c) {
  console.log(Object.prototype.hasOwnProperty.call(c, "a"), i);
}
