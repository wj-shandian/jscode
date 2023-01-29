/**
 * 防抖
 * 防止抖动  意思是在 触发设置的时间内执行回调 如果在时间内 再次触发该事件 那么会重新计时
 * */

function debounce(fn, time) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      // 因为 用的是箭头函数 所以下面的this 指向上一层的 this  如果这个地方用 function 定义函数 那么 上层要定义一个this 变量
      fn.call(this, ...args);
    }, time);
  };
}

// 是否需要立即执行
function debounce(fn, wait = 500, immediate = false) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  let timer;
  return function (...args) {
    let now = immediate && !timer; // 第一点击 timer 是空的 所以 now 是true  在wait时间内 第二次点击 timer 有值 所以 now 是false 如果 不在wait 时间内 那么now还是true
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null; // 这是关键 每次执行都要把timer清空 否则超过wait 时间 再次点击就不能立即执行
      !immediate && fn.call(this, ...args); // 如果需要立即执行 那么这个代码 永远不需要执行 因为会二次触发
    }, wait);
    now && fn.call(this, ...args); // 第一次执行该函数
  };
}

/*
默写一遍
function debounce(fn, wait = 500, immediate = false) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  let timer;
  return function (...args) {
    let now = immediate && !timer;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      !immediate && fn.call(this, ...args);
    }, wait);
    now && fn.call(this, ...args);
  };
}
*/
