// 继承

// 原型链继承

function A() {}

function B() {}

B.prototype = new A();

// 构造函数继承

function A() {}
function B() {
  A.apply(this);
}

// 组合继承

function A() {}
function B() {
  A.apply(this);
}
B.prototype = new A();

// 原型式继承

function ObjectCopy(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

// 寄生式继承

function copy1(obj) {
  let clone = Object.create(obj);
  clone.getName = function () {
    console.log("test");
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
  on(fn, name) {
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

// set去重

let array = [1, 2, 3, 2, 1, 4, 3];

let set = [...new Set(array)];

// reduce 去重

let reduce = array.reduce(
  (acc, val) => (acc.includes(val) ? acc : [...acc, val]),
  []
);

// map
let map = new Map();
let arr = array.forEach((item) => map.set(item, 1));
let mapArray = [...map.keys()];

// filter

let filter = array.filter((item, index) => array.indexOf(item) === index);

//深拷贝

function isObject(obj) {
  return typeof obj === "object" || typeof obj !== "null";
}

function copy(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source);

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

// flat

let arrFlat = [1, [2, [3]]];

let flat1 = arrFlat.flat(Infinity);

let flat2 = [].concat(...arrFlat);

let flat3 = arrFlat.reduce((acc, val) => acc.concat(val), []);

//柯里化

function curry(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is must  be an function");
  }
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
  return function (x) {
    if (funs.length === 0) return x;
    if (funs.length === 1) return funs[0](x);
    return funs.reduceRight((result, item) => {
      if (typeof item !== "function") return result;
      return item(result);
    });
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
    let index = i,
      item = self[i];
    initVal = fn(initVal, item, index);
  }
  return initVal;
};
