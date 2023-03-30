// 重复比较相邻两个数 若第一项比第二项大 则 替换两着位置  否则 不动

function sort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
let a = [3, 2, 5, 1, 4];
console.log(sort(a));
