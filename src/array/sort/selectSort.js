import { swap } from './swap';

export function selectSort (arr) {
  var minIdx = -1,
      len = arr.length - 1;

  for (var i = 0; i < len; i++) {
    minIdx = i;

    for (var j = i + 1; j <= len; j++) {
      if (arr[minIdx] > arr[j]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      swap(arr, i, minIdx);
    }
  }

  return arr;
}
