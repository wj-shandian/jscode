// function create(obj) {
//   function F() {}
//   F.prototype = obj;
//   return new F();
// }

// function myInstanceof(left, right) {
//   left = left.__proto__;
//   let prototype = right.prototype;
//   while (true) {
//     if (left === prototype) return true;
//     if (left === null) return null;
//     left = left.__proto__;
//   }
// }

// function _new(fn, ...args) {
//   if (typeof fn !== "function") {
//     throw new TypeError("fn is must be function");
//   }
//   let obj = Object.create(fn.prototype);
//   let result = fn.apply(obj, args);
//   return result instanceof Object ? result : obj;
// }

// function throttle(fn, wait = 500) {
//   if (typeof fn !== "function") {
//     throw new TypeError("fn is must be function");
//   }
//   let timer,
//     previous = 0,
//     context;
//   return function (...args) {
//     timer && clearTimeout(timer);
//     let now = +new Date();
//     let remaining = wait - (now - previous);
//     context = this;
//     if (remaining <= 0 || remaining > wait) {
//       if (timer) {
//         timer = null;
//         clearTimeout(timer);
//       }
//       fn.apply(context, args);
//       previous = now;
//     } else if (!timer) {
//       timer = setTimeout(() => {
//         timer = null;
//         clearTimeout(timer);
//         previous = +new Date();
//         fn.apply(context, args);
//       }, remaining);
//     }
//   };
// }

// // 手写 flat 递归
// let result = [];
// function flat(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       flat(arr[i]);
//     } else {
//       result.push(arr[i]);
//     }
//   }
// }

// 手写 flat 堆栈

function flat(arr) {
  let stack = [...arr];
  let res = [];
  while (stack.length) {
    let num = stack.pop();
    if (Array.isArray(num)) {
      stack.push(...num);
    } else {
      res.push(num);
    }
  }
  return res.reverse();
}
let arr = [1, [2], 3, [4, [5]], [6]];
console.log(flat(arr), "--");

// function debounce(fn, wait = 500, immediate = false) {
//   if (typeof fn !== "function") {
//     throw new TypeError("fn is must be an function");
//   }
//   let timer;
//   return function (...args) {
//     timer && clearTimeout(timer);
//     let now = immediate && !timer;
//     timer = setTimeout(() => {
//       timer = null;
//       !immediate && fn.apply(this, args);
//     }, wait);
//     now && fn.apply(this, args);
//   };
// }

// Function.prototype.call = function (context) {
//   context = context || window;
// };
