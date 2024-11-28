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

// 变种  二分查找 边界
/**. 
 * 在排序数组中查找元素的第一个和最后一个位置 
 * 
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
如果数组中不存在目标值 target，返回 [-1, -1]。
你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 * 
这题主要是找出 目标值的最左侧index 和最右侧index
 * */

var binarySearch = function (nums, target, lower) {
  let left = 0,
    right = nums.length - 1,
    ans = nums.length;
  while (left <= right) {
    let mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] > target || (lower && nums[mid] >= target)) {
      right = mid - 1;
      ans = mid;
    } else {
      left = mid + 1;
    }
  }
  return ans;
};
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let ans = [-1, -1];
  let leftIndex = binarySearch(nums, target, true);
  // 这里为什么减一呢 因为判断右边界 nums[mid] > target 所以减一 就是 目标值的最右侧
  let rightIndex = binarySearch(nums, target, false) - 1;
  if (
    leftIndex <= rightIndex &&
    rightIndex < nums.length &&
    nums[leftIndex] === target &&
    nums[rightIndex] === target
  ) {
    console.log(1);
    ans = [leftIndex, rightIndex];
  }
  return ans;
};
