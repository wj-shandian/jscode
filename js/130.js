// 默写
function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

function myInstanceof(left, right) {
  left = left.__proto__;
  let prototype = right.prototype;
  while (true) {
    if (left === prototype) return true;
    if (left === null) return null;
    left = left.__proto__;
  }
}

function _new(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  const obj = Object.create(fn);
  const result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}

function debounce(fn, wait = 500, immediate = false) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    const now = immediate && !timer;
    timer = setTimeout(() => {
      !immediate && fn.apply(this, args);
      timer = null;
    }, wait);
    now && fn.apply(this, args);
  };
}

function throttle(fn, wait = 500) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  let context,
    timer,
    previous = 0;
  return function (...args) {
    let now = +new Date();
    let remaining = wait - (now - previous);
    context = this;
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(context, args);
      previous = now;
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        previous = +new Date();
        fn.apply(context, args);
      }, remaining);
    }
  };
}

Function.prototype.call = function (context) {
  context = context || window;
  context.fn = this;
  const args = [...arguments].splice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
Function.prototype.apply = function (context) {
  context = context || window;
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
