// 对象是没有 prototype的 只有 __proto__
const obj = {};
console.log(obj.__proto__);
console.log(Object.getPrototypeOf(obj));
console.log(obj.__proto__ === Object.getPrototypeOf(obj)); // __proto__ 和 getPrototypeOf 都是获取对象的原型 效果一样

// 函数才有 prototype
function Obj() {}
console.info(Obj.prototype.__proto__);

/**
 * MDN 上 instanceof 的解释是 检测构造函数的 prototype 是否出现在某个实例对象的原型链上
 * 所以 我们只要 获取 构造函数的原型 是否出现在 某个实例的的原型链上   因为原型链 可能会很长 所以 递归判断即可
 * object instanceof constructor 所以左边是个实例对象 右边是个函数
 * constructor.prototype 是否存在于参数 object 的原型链上。
 */

function myInstanceof(left, right) {
  left = left.__proto__;
  let rightValue = right.prototype;

  while (true) {
    if (left === rightValue) {
      return true;
    }
    if (left === null) {
      return null;
    }
    left = left.__proto__;
  }
}

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car("Honda", "Accord", 1998);

console.log(myInstanceof(auto, Car)); // true
console.log(myInstanceof(auto, Object)); // true 因为 Object 在auto的原型链上

/**
 *
 *
 默写一遍
 
function myInstanceof(left, right) {
  left = left.__proto__;
  let prototype = right.prototype;
  while (true) {
    if (left === prototype) {
      return true;
    }
    if (left === null) {
      return null;
    }
    left = left.__proto__;
  }
}
*/
