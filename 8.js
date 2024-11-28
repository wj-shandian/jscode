function myInstanceOf(left, right) {
  left = left.__proto__;
  let rightPrototype = right.prototype;
  while (true) {
    if (left === rightProto) return true;
    if (left === null) return false;
    left = left.__proto__;
  }
}

class Event {
  constructor() {
    this.callbacks = {};
  }
  on(name, fn) {
    if (this.callbacks[name]) {
      this.callbacks[name].push(fn);
    } else {
      this.callbacks[name] = [fn];
    }
  }
  emit(name, args) {
    const cbs = this.callbacks[name];
    if (cbs && cbs.length > 0) {
      cbs.forEach((cb) => cb.apply(args));
    }
  }
  off(name) {
    this.callbacks[name] = null;
  }
}

function debounce(fn, delay = 500, immediate) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is not a function");
  }
  let timer = null;
  return function (...args) {
    let now = !timer && immediate;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      !immediate && fn.apply(this, args);
    }, delay);
    now && fn.apply(this, args);
  };
}

function throttle(fn, delay = 500) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is not a function");
  }
  let timer = null,
    previous = 0;
  return function (...args) {
    let now = +new Date();
    let remaining = delay - (now - previous);
    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
        previous = +new Date();
      }, remaining);
    }
  };
}

function isObject(value) {
  return typeof value === "object" && value !== null;
}

function deepClone(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source);
  let target = Array.isArray(source) ? [] : {};
  hash.set(source, target);
  for (let key in source) {
    if (isObject(source[key]) && source.hasOwnProperty(key)) {
      target[key] = deepClone(source[key], hash);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function flat(value) {
  let stack = [...value];
  let res = [];
  while (stack.length) {
    let next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
}
