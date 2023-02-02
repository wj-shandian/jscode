// 原型链继承

function A() {}
function B() {}

B.prototype = new A();

// 构造函数继承

function A() {}
function B() {
  A.call(this);
}

// 组合继承

function A() {}
function B() {
  A.call(this);
}
B.prototype = new A();

// 原型式继承

function objectCopy(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

// 寄生式继承

function object2(obj) {
  let clone = Object.create(obj);
  clone.prototype.getName = function () {
    console.log(this.name);
  };
  return clone;
}

// 寄生组合继承

function A() {}
function B() {
  A.apply(this);
}

B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;

// 发布订阅

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
    if (this.callbacks[name]) {
      this.callbacks[name].foreach((item) => item.apply(this, args));
    }
  }
  off(name) {
    this.callbacks[name] = null;
  }
}

// 去重
let a = [1, 2, 1, 3];

// set
let arr = [...new Set(a)];

// reduce
let arr1 = a.reduce(
  (acc, val) => (acc.includes(val) ? acc : [...acc, val]),
  []
);

// filter
let arr2 = a.filter((acc, index) => a.indexOf(acc) === index);

// map

function map(a) {
  let map = new Map();
  let arr = a.foreach((item) => {
    map.set(item, 1);
  });
  return [...map.keys()];
}

// 深拷贝

function isObject(source) {
  return typeof source === "object" && typeof source !== "null";
}

function copy(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (!hash.has(source)) return hash.get(source);

  let target = Array.isArray(source) ? [] : {};
  hash.set(source, target);
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = copy(source[key], hash);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// 数组扁平化

let flatB = [1, [2, [3]]];
// 第一种
let t1 = flatB.flat(Infinity);

// 第二种
let t2 = (flatB) => [].concat(...flatB);

// 第三种
let t3 = flatB.reduce((acc, val) => acc.concat(val), []);

// 第四种 首先json转字符串 然后 正则 匹配 [] 括号 最后放入数组

// 柯里化

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

// 组合函数

function compose(...funs) {
  return function (x) {
    if (funs.length === 0) return x;
    if (funs.length === 1) return funs[0](x);
    return funs.reduceRight((acc, val) => {
      if (typeof val !== "function") return acc;
      return val(acc);
    }, x);
  };
}
// reduce

Array.prototype.reduce = function (fn, initVal) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must be an function");
  }
  let self = this,
    i = 0;
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
