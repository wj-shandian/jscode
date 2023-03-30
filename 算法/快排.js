/**
 * 快排在基本思想上 和 归并排序是一致的 都是分而治之 区别在于 快速排序不会吧数组分割 再合并 而是在原数组上操作
 *
 */

// 以基准值为中心 划分左右子数组
function partition(arr, left, right) {
  let pivotValue = arr[Math.floor(left + (right - left) / 2)];
  let i = left,
    j = right;
  while (i <= j) {
    while (arr[i] < pivotValue) {
      i++;
    }
    while (arr[j] > pivotValue) {
      j--;
    }
    // 若i<=j，则意味着基准值左边存在较大元素或右边存在较小元素，交换两个元素确保左右两侧有序
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (arr.length <= 1) return arr;
  const lineIndex = partition(arr, left, right);
  if (left < lineIndex - 1) {
    quickSort(arr, left, lineIndex - 1);
  }
  if (lineIndex < right) {
    quickSort(arr, lineIndex, right);
  }
  return arr;
}

console.log(quickSort([2, 3, 1, 8, 4, 6]));
