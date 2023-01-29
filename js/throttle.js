// 节流 固定时间内执行一次

// 定时器版本
function throttle(fn, wait) {
  let timer;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, ...args);
        timer = null;
      }, wait);
    }
  };
}

// 时间戳版本

function throttle(fn, wait) {
  let timer = Date.now();
  return function (...args) {
    let now = Date.now();
    if (now - timer >= wait) {
      fn.call(null, ...args);
      timer = Date.now();
    }
  };
}

// 时间戳 + 定时器 立即触发 + 结束后触发一次

function throttle(fn, wait = 500) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  let context, timer;
  let previous = 0;
  return function (...args) {
    context = this;
    now = +new Date();
    let remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      // 立即执行
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.call(context, ...args);
      previous = now;
    } else if (!timer) {
      timer = setTimeout(function () {
        previous = +new Date();
        timer = null;
        fn.call(context, ...args);
      }, remaining);
    }
  };
}

/* 默写一遍
function throttle(fn, wait = 500) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  let context,
    timer,
    previous = 0;

  return function (...args) {
    let now = +new Date();
    context = this;
    let remaining = wait - (now - previous);
    if (remaining <= 0) {
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
*/
