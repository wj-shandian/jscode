function newInstanceof(left, right) {
  left = left.__proto__;
  while (true) {
    if (left === right.prototype) {
      return true;
    }
    if (left === null) {
      return null;
    }
    left = left.__proto__;
  }
}

let str = new String("123");
console.log(newInstanceof(str, String)); //true

/* 继承
1. 原型链继承

function Parent(name){
    this.name = 'test';
}

Parent.prototype.getName = function(){
    return this.name;
}

function Child(){}

Child.prototype = new Parent();

如果 this.name 是引用类型 那么继承之间就会相互影响

2. 构造函数继承

function Parent(name){
    this.name = ['test']
}

function Child(){
    Parent.call(this)
}

每次 new Child 都会创建新的 this.name不会相互影响


3. 组合继承 其实就是前两种的组合

function Parent(){
    this.name = 'test';
}

Parent.prototype.getName = function(){
    return this.name;
}

function Child(){
    Parent.call(this)
}

Child.prototype = new Parent();

组合继承的缺点是会调用两次父构造函数

4. 原型式继承

function createObj(obj){
    function F(){}
    F.prototype = obj;
    return new F();
}

5. 寄生式继承

function createObj(obj){
    let clone = Object.create(obj); // 以某种方式来增强这个对象
    clone.getName = function(){
        return '11'
    }
    return clone
}

6. 寄生组合式继承

function Parent(name){
    this.name = 'test';
}
Parent.prototype.getName = function(){
    return this.name;
}

function Child(name,age){
    Parent.call(this,name);
    this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;




*/

// 浅拷贝

function copy1(obj) {
  if (typeof obj === "object" && typeof obj !== null) {
    let target = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        target[key] = obj[key];
      }
    }
  } else {
    return obj;
  }
}

// flat 堆栈

function flat1(arr) {
  let stack = [...arr];
  let res = [];
  while (stack.length) {
    let num = stack.pop();
    if (Array.isArray(num)) {
      stack.push(...num);
    } else {
      res.push(num);
    }
  }
  return res.reverse();
}

function _new(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is should be a function");
  }
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}
