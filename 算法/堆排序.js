/**堆排序的概念
 *  堆排序是指利用 堆这种数据结构 所设计的一种 排序算法 堆积是一个近似 完全二叉树的结构，并同时满足堆积的性质： 即子节点的键值或索引总是小于或者大于 它的父节点
 *     (大根堆)
 *       27
 *      /   \
 *     25    23
 *    /  \   /
 *   11   19 9
 *
 *    （小根堆）
 *         9
 *       /   \
 *      11    23
 *     /  \   /
 *    25   19 27
 *
 * 下标为 i的节点的父节点 下标 （i-1）/ 2 整除法
 * 下标为 i的节点的左孩子下标 i*2+1
 * 下标为 i的节点的右孩子下标 i*2+2
 *
 * 算法原理
 * (1) 创建一个大根堆H[0, ..., n-1]，此时H[0]为数组里的最大值（共有n个元素）。
 * (2) 把堆首和堆尾互换（即H[0]和H[n-1]交换），这样H[n-1]为堆H[0, ...,  n-1]的最大值，同时H[0, ..., n-2]为无序树。
 * (3) 调整H[0, ..., n-2]为大根堆，然后再次交换首尾元素。
 * (4) 重复步骤(3)直到最后一个元素，得到一个升序数组H[0, ..., n-1]。
 * 时间复杂度 O(nlogn)
 */

// 交换两者的位置
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 维护堆的性质
/**
 *
 * @param {*} arr  数组
 * @param {*} len  数组长度
 * @param {*} i  维护的节点
 */

function heapify(arr, len, i) {
  let temp = i,
    lson = i * 2 + 1,
    rson = i * 2 + 2;
  if (lson < len && arr[temp] < arr[lson]) {
    temp = lson;
  }
  if (rson < len && arr[temp] < arr[rson]) {
    temp = rson;
  }
  // 如果 temp 不等于 i 说明 至少有一个子节点 比父节点大  交换两者的位置
  if (temp !== i) {
    // 交换位置
    swap(arr, temp, i);
    // 递归重新维护
    heapify(arr, len, temp);
  }
}

// 堆排序 入口
function heapSort(arr) {
  let n = arr.length;
  // 建堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // 排序
  for (let i = n - 1; i >= 0; i--) {
    // 交换元素
    swap(arr, 0, i);
    // 交换之后重新维护 堆
    heapify(arr, i, 0);
  }
  return arr;
}

console.log(heapSort([3, 2, 9, 8, 0, 6, 7]));
