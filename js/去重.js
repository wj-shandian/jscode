// map 去重

function deDep(arr) {
  let map = new Map();
  arr.foreach((item) => map.set(item, 1));
  return [...map.keys()];
}

// set 去重

function deDep(arr) {
  return [...new Set(arr)];
}

// reduce 去重

function deDep(arr) {
  return arr.reduce(
    (item, val) => (item.includes(val) ? item : [...item, v]),
    []
  );
}

// filter 去重
function deDep(arr) {
  return arr.filter((val, index) => arr.indexOf(val) === index);
}
