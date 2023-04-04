//给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    // 为什么要这么取 中位数 看了一下回答 说是 如果 直接 （right+left）/ 2 取的话 如果 left 和 right 都很大的话 可能会造成数的越界
    let mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
};
