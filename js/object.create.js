// function create(obj) {
//   function F() {}
//   F.prototype = obj;
//   return new F();
// }

// function create(obj) {
//   function F() {}
//   F.prototype = obj;
//   return new F();
// }

// function myCreate(obj) {
//   function F() {}
//   F.prototype = obj;
//   return new F();
// }

// Object.create() 方法用于创建一个新的对象，用现在这个对象作为新创建的原型

function create(obj) {
  function F() {}
  F.prototype = obj;
  console.log(new F(), "返回对象");
  return new F(); // 返回一个对象
}

const myObj = create({ a: "test" });

console.log(myObj.a, "打印的对象"); // a 被绑定到 原型上了  所以 create 方法也很简单

// 简单的说就是 创建一个新的函数 把传入的 对象 绑定到 新的函数的原型上 然后返回这个函数的实例

/*
** 再默写一遍
function create(obj){
  function F(){}
  F.prototype = obj
  return new F()
}
*/
