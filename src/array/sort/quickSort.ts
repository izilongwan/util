export function quickSort (arr: number[]): number[] {
  var mid = arr.shift(),
      left = [] as number[],
      right = [] as number[];

  if (arr.length < 2) {
    return arr;
  }

  arr.forEach(val => {
    val < (<number>mid)
        ? left.push(val)
        : right.push(val);
  })

  return quickSort(left).concat(mid as number, quickSort(right));
}
