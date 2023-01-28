const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class myPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallback.forEach((fn) => fn());
      }
    };
    const reject = (value) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = value;
        this.onRejectedCallback.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      throw error;
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let promise2 = new myPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  let called;
  if ((x !== null && typeof x === "object") || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

myPromise.defer = myPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new myPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

// 全部成功才成功 只要有一个失败就失败
myPromise.all = function (values) {
  if (!Array.isArray(values)) {
    const type = typeof values;
    return new TypeError(`TypeError:${type}${values} is not iterable`);
  }
  return new myPromise((resolve, reject) => {
    let orderIndex = 0;
    let resultArray = [];

    const processKey = (value, i) => {
      resultArray[i] = value;
      if (++orderIndex === values.length) {
        resolve(resultArray);
      }
    };
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (value && typeof value.then === "function") {
        value.then((res) => {
          processKey(res, i);
        }, reject);
      } else {
        processKey(value, i);
      }
    }
  });
};

// 以最快的为准 最快失败那就失败 最快成功那就是成功
myPromise.race = function (values) {
  return new myPromise((resolve, reject) => {
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      if (value && typeof value.then === "function") {
        value.then(reject, resolve);
      } else {
        resolve(value);
      }
    }
  });
};

// 只要有一个成功就成功 全部失败才失败

myPromise.any = function (values) {
  values = Array.isArray(values) ? values : [];
  return new myPromise((resolve, reject) => {
    let length = values.length;
    const err = [];
    if (length === 0)
      return reject(new AggregateError("all promise is reject"));
    values.forEach((item) => {
      if (item && typeof item.then === "function") {
        item.then(
          (res) => {
            resolve(res);
          },
          (error) => {
            length--;
            err.push(error);
            if (length === 0) {
              reject(new AggregateError(error));
            }
          }
        );
      } else {
        resolve(item);
      }
    });
  });
};

// 全部结束才结束
myPromise.allSettled = function (values) {
  values = Array.isArray(values) ? values : [];
  let length = values.length;
  const result = [];
  if (length === 0) return reject(new AggregateError("promise array is empty"));
  return new myPromise((resolve, reject) => {
    values.forEach((item) => {
      if (item && typeof item.then === "function") {
        item.then(
          (res) => {
            result.push(res);
            length--;
            if (length === 0) resolve(result);
          },
          (err) => {
            result.push(err);
            length--;
            if (length === 0) resolve(result);
          }
        );
      } else {
        result.push(item);
        length--;
        if (length === 0) resolve(result);
      }
    });
  });
};

module.exports = myPromise;
