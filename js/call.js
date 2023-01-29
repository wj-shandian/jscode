Function.prototype.call = function (context) {
  context = context || window;
  context.fn = this;
  let result = null;
  let args = [...arguments].splice(1);
  result = context.fn(...args);
  delete context.fn;
  return result;
};
