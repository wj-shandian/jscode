Function.prototype.bind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("this is must be an function");
  }
  let args = [...arguments].splice(1);
  let fn = this;
  function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  }
  Fn.prototype = fn.prototype;
  return Fn;
};
