/**选择排序
 * 关键字是最小值 遍历数组 找出当前范围的最小时 放到当前范围最前面 然后缩小范围 继续查找
 */

function selectSort(arr) {
  let len = arr.length;
  let mindIndex;
  for (let i = 0; i < len - 1; i++) {
    mindIndex = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[mindIndex]) {
        mindIndex = j;
      }
    }
    if (mindIndex !== i) {
      [arr[i], arr[mindIndex]] = [arr[mindIndex], arr[i]];
    }
  }
  return arr;
}
let a = [3, 5, 4, 2, 1];
console.log(selectSort(a));

function selectSort(arr) {
  let len = arr.length;
  let mindIndex;
  for (let i = 0; i < len - 1; i++) {
    let mindIndex = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[mindIndex]) {
        mindIndex = j;
      }
    }
    if (mindIndex !== i) {
      [arr[i], arr[mindIndex]] = [arr[mindIndex], arr[i]];
    }
  }
  return arr;
}
