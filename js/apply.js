Function.prototype.apply = function (context) {
  context = context || window;
  let args = arguments[1];
  let result = null;
  context.fn = this;
  if (args) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
};

Function.prototype.newApply = function (context) {
  context = context || window;
  context.fn = this;
  let args = arguments[1];
  let result = null;
  if (args) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
Function.prototype.newCall = function (context) {
  context = context || window;
  context.fn = this;
  let args = [...arguments].splice(1);
  let result = null;

  result = context.fn(...args);

  delete context.fn;
  return result;
};
