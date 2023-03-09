/**
 *
 * 循环 取一个数  如果前面的数比当前的数 大 那么把当前的数 移动到前面去 接着判断前面是否还有数 如果有继续判断移动 如果没有 则循环到下一个数
 */
function insertSort(arr) {
  const len = arr.length;
  let temp;
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    temp = arr[i];
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}

let a = [3, 5, 4, 2, 1];
console.log(insertSort(a));

function insertSort(arr) {
  const len = arr.length;
  let temp;
  for (let i = 1; i < len; i++) {
    let j = i;
    temp = arr[j];
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}

function insertSort(arr) {
  let len = arr.length;
  let temp;
  for (let i = 1; i < len; i++) {
    let j = i;
    temp = arr[j];
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}
