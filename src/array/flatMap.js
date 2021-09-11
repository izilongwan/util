export function flatMap(arr, fn) {
  const ctx = Reflect.apply([].slice, arguments, [1]),
        self = arr,
        ret = [];

  for (let i = 0, len = self.length; i < len; i++) {
    const res = Reflect.apply(fn, ctx, [self[i], i, self]);

    if (Array.isArray(res)) {
      for (let j = 0, resLen = res.length; j < resLen; j++) {
        ret.push(res[j]);
      }
    }
    else {
      ret.push(res);
    }
  }

  return ret;
}