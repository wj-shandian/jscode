// 原型链继承

function Parent() {
  this.name = "test";
}
Parent.prototype.getName = function () {
  console.log(this.name);
};
function Child() {}
Child.prototype = new Parent();

let child = new Child();

console.log(child.getName());

// 原型链继承 简单的说 实例化一个函数 复制给需要继承的的 函数原型上 B.prototype = new A() B继承A的一些方法和属性
// 问题是 如果 this.name 是引用类型 那么修改会相互影响 所以 这个继承有缺陷

// 构造函数继承

function Parent() {
  this.name = "test";
}

function Child() {
  // 我们new Child 相当于 把Parent上下文的代码在自己的环境执行了一遍，
  // 所以每次 new Child 都拥有一个自己 name 属性，且相互不会影响
  Parent.call(this);
}

// 缺点 只能继承私有属性 原型上的方法和属性 无法继承

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
function objectCopy(obj) {
  let clone = Object.create(obj);
  clone.sayName = function () {
    console.log("--");
  };
  return clone;
}
// 寄生组合继承

function A() {}
function B() {
  A.call(this);
}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;

//
function A() {}
function B() {}
B.prototype = new A();

//
function A() {}
function B() {
  A.call(this);
}

//
function A() {}
function B() {
  A.call(this);
}
B.prototype = new A();

//

function objCopy(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

//
function objCopy(obj) {
  let clone = Object.create(obj);
  clone.prototype.getName = function () {};
  return clone;
}

//
function A() {}
function B() {
  A.call(this);
}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
