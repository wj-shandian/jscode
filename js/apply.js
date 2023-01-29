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
