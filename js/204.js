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
  let obj = Object.create(fn.prototype);
  let result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}

function throttle(fn, wait = 500) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  let timer,
    previous = 0,
    context;
  return function (...args) {
    timer && clearTimeout(timer);
    context = this;
    let now = +new Date();
    let remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        timer = null;
        clearTimeout(timer);
      }
      fn.apply(context, args);
      previous = now;
    } else if (!timer) {
      timer = setTimeout(() => {
        previous = +new Date();
        timer = null;
        clearTimeout(timer);
        fn.apply(context, args);
      }, remaining);
    }
  };
}

function debounce(fn, wait = 500, immediate = false) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    let now = !timer && immediate;
    timer = setTimeout(() => {
      timer = null;
      !immediate && fn.apply(this, args);
    }, wait);
    now && fn.apply(this, args);
  };
}

Function.prototype.call = function (context) {
  context = context || window;
  context.fn = this;
  let args = [...arguments].splice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
Function.prototype.apply = function (context) {
  context = context || window;
  context.fn = this;
  let args = [...arguments][1];
  let result = null;
  if (args) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
Function.prototype.bind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("this is must be an function");
  }
  let fn = this;
  let args = [...arguments].splice(1);

  function Fn() {
    fn.apply(
      this instanceof Fn ? this : context,
      args.concat(Array.from(arguments))
    );
  }
  Fn.prototype = fn.prototype;
  return Fn;
};
