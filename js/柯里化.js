// 柯里化 是指将一个多参数的函数 拆分成一系列函数 每个拆分后的函数都只接收一个参数

function curry(fn) {
  return function curried(...args) {
    if (args.length < fn.length) {
      return function () {
        return curried(...args.concat(Array.from(arguments)));
      };
    }
    return fn(...args);
  };
}
function getSum(a, b, c) {
  // 这个函数接受三个参数
  return a + b + c;
}

const curried = curry(getSum);
console.log(curried(1, 2, 3)); // 那么这里也需要有三个参数 不能 只有两个 或者一个
console.log(curried(1)(2, 3));
console.log(curried(1)(2)(3));

function curry(fn) {
  return function curried(...args) {
    if (args.length < fn.length) {
      return function () {
        return curried(...args.concat(Array.from(arguments)));
      };
    }
    return fn(...args);
  };
}

// 组合函数 是指将多个函数合并成一个函数

function compose(...funs) {
  return function operate(x) {
    if (funs.length === 0) return x;
    if (funs.length === 1) return funs[0](x);
    return funs.reduceRight(function (result, item) {
      if (typeof item !== "function") return result;
      return item(result);
    }, x);
  };
}

// reduce 实现

Array.prototype.reduce = function (fn, init) {
  let self = this,
    i = 0;
  if (typeof fn !== "function") {
    throw new TypeError("fn must be an function");
  }
  if (typeof init === "undefined") {
    init = self[0];
    i = 1;
  }
  for (; i < self.length; i++) {
    let item = self[i];
    index = i;
    init = fn(init, item, index);
  }
  return init;
};

// 默写一遍

// 柯里化
function curry(fn) {
  return function curried(...args) {
    if (args.length < fn.length) {
      return function () {
        return curried(...args.concat(Array.from(arguments)));
      };
    }
    return fn(...args);
  };
}
// 组合函数
function compose(...funs) {
  return function operate(x) {
    if (funs.length === 0) return x;
    if (funs.length === 1) return funs[0](x);
    return funs.reduceRight(function (result, item) {
      if (typeof item !== "function") return result;
      return item(result);
    }, x);
  };
}
// reduce

Array.prototype.reduce = function (fn, initValue) {
  let self = this,
    i = 0;
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  if (typeof initValue === "undefined") {
    i = 1;
    initValue = self[0];
  }
  for (; i < fn.length; i++) {
    let index = i,
      item = self[i];
    initValue = fn(initValue, item, index);
  }
  return initValue;
};
