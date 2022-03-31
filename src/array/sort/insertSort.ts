export function insertSort (arr: number[]) {
  var len = arr.length,
      temp = null,
      prevIdx = -1;

  for (var i = 1; i < len; i++) {
    temp = arr[i];
    prevIdx = i - 1;

    while (arr[prevIdx] > temp) {
      arr[prevIdx + 1] = arr[prevIdx];
      prevIdx--;
    }
    arr[prevIdx + 1] = temp;
  }

  return arr;
}
