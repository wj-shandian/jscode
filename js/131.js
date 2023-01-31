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
// 没记住
function _new(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be an function");
  }
  let obj = Object.create(fn.prototype);
  let result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}

function debounce(fn, wait = 500, immediate = false) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be an function");
  }
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    let now = immediate && !timer;
    timer = setTimeout(() => {
      !immediate && fn.apply(this, args);
      timer = null;
    }, wait);
    now && fn.apply(this, args);
  };
}

function throttle(fn, wait = 500) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be an function");
  }
  let timer,
    context,
    previous = 0;
  return function (...args) {
    let now = +new Date();
    context = this;
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
  let args = [...arguments].splice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.apply = function (context) {
  context = context || window;
  context.fn = this;
  let args = arguments[1];
  let result = null;
  if (args) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

// 加强
Function.prototype.bind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("this is must be an function");
  }
  let args = [...arguments].splice(1);
  let fn = this;
  function Fn() {
    fn.apply(
      this instanceof Fn ? this : context,
      args.concat(Array.from(arguments))
    );
  }
  Fn.prototype = fn.prototype;
  return Fn;
};

function curry(funs) {
  return function curried(...args) {
    if (args.length < funs.length) {
      return function () {
        return curried(...args.concat(Array.from(arguments)));
      };
    }
    return funs(...args);
  };
}
// 模拟 reduce
Array.prototype.reduce = function (fn, initVal) {
  let i = 0,
    self = this;
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  if (typeof initVal === "undefined") {
    i = 1;
    initVal = self[0];
  }
  for (; i < self.length; i++) {
    let index = i;
    let item = self[i];
    initVal = fn(initVal, item, index);
  }
  return initVal;
};

function compose(...funs) {
  return function (x) {
    if (funs.length === 0) return x;
    if (funs.length === 1) return funs[1](x);
    return funs.reduceRight((result, item) => {
      if (typeof item !== "function") return result;
      return item(result);
    }, x);
  };
}
