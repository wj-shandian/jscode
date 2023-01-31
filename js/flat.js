function flat(arr) {
  return arr.flat(Infinity);
}

let arr = [1, [2, 3]];

let a = arr.reduce((acc, val) => acc.concat(val), []);
console.log(a);
console.log([].concat(...arr), "arr");

arr.flat(Infinity);
arr.reduce((acc, val) => acc.concat(val), []);
(arr) => [].concat(...arr);
