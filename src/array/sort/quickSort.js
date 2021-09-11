export function quickSort (arr) {
  var mid = arr.shift(),
      left = [],
      right = [];

  if (arr.length < 2) {
    return arr;
  }

  arr.forEach(val => {
    val < mid
        ? left.push(val)
        : right.push(val);
  })

  return left._quickSort().concat(mid, right._quickSort());
}
