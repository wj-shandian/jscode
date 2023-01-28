// 用链表实现队列  链表实现比数组实现性能更好

class myQueue {
  head = null;
  tail = null;
  len = 0;

  add(value) {
    const newNode = {
      value: value,
      next: null,
    };
    if (this.head === null) {
      this.head = newNode;
    }
    const tailNode = this.tail;
    if (tailNode) {
      tailNode.next = newNode;
    }
    this.tail = newNode;
    this.len++;
  }
  delete() {
    const headNode = this.head;
    if (this.head === null || this.len <= 0) return null;
    this.head = headNode.next;
    const value = headNode.value;
    this.len--;
    return value;
  }
  get length() {
    return this.len;
  }
}

const q = new myQueue();
q.add(100);
q.add(200);
q.add(300);
console.log(JSON.stringify(q));

function selectSort(arr) {
  const len = arr.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i; j < len; j++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
