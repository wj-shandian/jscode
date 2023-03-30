/**
 * 归并排序是对分治思想的应用
 *
 * 分解子问题 ： 将需要被排序的数组从中间分割为两半，然后将分割出来的每个子数组 再分割，重复操作 直到单个子数组 不能再被分割为止
 * 求解每个子问题：从粒子最小的子数组开始，两两合并，确保每次合并出来的数组都是有序的
 * 合并子问题的解 得出最大问题的解： 当数组合并和原来数组 一样的长度，那么就得到一个有序的数组
 */

// ```
// [8, 7, 6, 5,| 4, 3, 2, 1]  第一次分割
// [8, 7,| 6, 5,| 4, 3,| 2, 1] 第二次分割
// [8,| 7,| 6,| 5,| 4,| 3,| 2,| 1] 第三次分割

// [7, 8,| 5, 6,| 3, 4,| 1, 2] 第一次合并
// [5, 6, 7, 8,| 1, 2, 3, 4]   第二次合并
// [1, 2, 3, 4, 5, 6, 7, 8]  第三次合并
// ```;

function mergeArr(arr1, arr2) {
  let i = 0,
    j = 0;
  const res = [];
  let len1 = arr1.length;
  let len2 = arr2.length;
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }
  if (i < len1) {
    return res.concat(arr1.slice(i));
  } else {
    return res.concat(arr2.slice(j));
  }
}

function mergeSort(arr) {
  let len = arr.length;
  if (len <= 1) return arr;
  // 分割点
  const mid = Math.floor(len / 2);

  // 递归分割左边数组
  const leftArr = mergeSort(arr.slice(0, mid));

  // 递归分割右边数组
  const rightArr = mergeSort(arr.slice(mid, len));

  // 合并左右两个有序数组

  arr = mergeArr(leftArr, rightArr);

  return arr;
}

console.log(mergeSort([3, 2, 4, 5, 1]));

// 时间复杂度 O(nlog(n))
