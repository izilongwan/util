/**
 * 生成器
 * @param {Array} arr
 */
export function generator(arr: any[]) {
  let idx = 0,
      len = arr.length;

  return {
    next: function() {
      return {
        value: arr[idx++],
        done: idx > len ? true : false
      }
    }
  }
}

// const arr = [1, 2, 3, 4];

// const iter = generator(arr);

// console.log(iter.next())
// console.log(iter.next())
// console.log(iter.next())
// console.log(iter.next())
// console.log(iter.next())
