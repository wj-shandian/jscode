function flat(value) {
  if (Array.isArray(value)) {
    throw typeError("Array is not allowed");
  }
  const stack = [...value];
  const res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
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
    if (cbs) {
      cbs.forEach((item) => item.apply(this, args));
    }
  }
  off(name) {
    this.callbacks[name] = null;
  }
}

function debounce(fn, wait = 500, immediate = false) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }
  let timer = null;
  return function (...args) {
    let now = immediate && !timer;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      !immediate && fn.apply(this, args);
    }, wait);
    now && fn.apply(this, args);
  };
}

function throttle(fn, wait = 500) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }
  let timer = null,
    previous = 0;
  return function (...args) {
    let now = +new Date();
    let remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args);
      previous = now;
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
        previous = +new Date();
      }, remaining);
    }
  };
}
const a = {
  b: {
    c: {
      d: 1,
    },
  },
};

function get(source, path) {
  const paths = path.replace(/\[(\+d)\]/g, ".$1").split(".");
  let result = source;
  for (let value of paths) {
    result = Object(result)[value];
    if (result === undefined) return undefined;
  }
  return result;
}

console.log(get(a, "b.c.d"));
function set(source, path, e) {
  const paths = path.replace(/\[(\+d)\]/g, ".$1").split(".");
  let result = source;
  for (let value of paths) {
    if (value === paths[paths.length - 1]) {
      result[value] = e;
    } else {
      result = result[value];
    }
  }
  return result;
}
