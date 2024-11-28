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

function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function flat(val){
  let stack = [...val]
  let res = []
  while(stack.length){
    let next = stack.pop()
    if(Array.isArray(next)){
      stack.push(...next)
    }else{
      res.push(next)
    }
  }
  return res.reverse()
}