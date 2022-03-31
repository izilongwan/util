import { swap } from './swap';

export function bubbleSort (arr: number[]) {
  var start = 0,
      end = arr.length - 1,
      startPos = -1,
      endPos = -1;

  while (start < end) {
    startPos = endPos = 0;

    for (var i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        endPos = i;
        swap(arr, i, i + 1);
      }
    }
    end = endPos;

    for (var j = end; j > start; j--) {
      if (arr[i - 1] > arr[i]) {
        startPos = i - 1;
        swap(arr, i - 1, i);
      }
    }
    start = startPos;
  }

  return arr;
}
