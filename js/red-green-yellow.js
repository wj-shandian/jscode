/**
 * 使用promise 使红绿灯交替
 */
function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

function light(timer, cb) {
  return new Promise((resolve, reject) => {
    cb();
    setTimeout(() => {
      resolve();
    }, timer);
  });
}

function step() {
  Promise.resolve()
    .then(() => {
      return light(3000, red);
    })
    .then(() => {
      return light(2000, green);
    })
    .then(() => {
      return light(1000, yellow);
    })
    .then(() => {
      return step();
    });
}

step();
