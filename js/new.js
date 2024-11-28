/**
 * mdn 描述 new的解释是：创建一个用户自定义对象类型的实例或者具有构造函数的内置对象的实例
 * 并且 还给出 new 关键字的一些操作 这就为理解 和实现 new 比较清晰
 * 1 创建一个空的简单 JavaScript 对象（即 {}）；
 * 2 为步骤 1 新创建的对象添加属性 __proto__，将该属性链接至构造函数的原型对象；
 * 3 将步骤 1 新创建的对象作为 this 的上下文；
 * 4 如果该函数没有返回对象，则返回 this。
 */

function _new(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("fn should be a function type");
  }
  const obj = Object.create(fn.prototype); // 步骤1 和 步骤 2
  const result = fn.call(obj, ...args); // 绑定this
  return result instanceof Object ? result : obj;
}

/**
 *
 * 测试用例
 */
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const car1 = _new(Car, "Eagle", "Talon TSi", 1993);

console.log(car1.make); // Eagle

/*
默写一遍
function _new(fn, ...args) {
  if (typeof fn !== "function") {
    return new TypeError("fn should be a function type");
  }
  const obj = Object.create(fn.prototype);
  const result = fn.call(obj, ...args);
  return result instanceof Object ? result : obj;
}
*/

/**
 * 
昨日回顾 默写部分
 */
function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

function myInstanceof(left, right) {
  left = left.__proto__;
  let prototype = right.prototype;
  while (true) {
    if (prototype === left) return true;
    if (left === null) return null;
    left = left.__proto__;
  }
}

function _new(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("fn should be a function type");
  }
  const obj = Object.create(fn.prototype);
  const result = fn.call(obj, ...args);
  return result instanceof Object ? result : obj;
}
