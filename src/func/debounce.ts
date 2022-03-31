/**
 * 防抖函数
 * @param {Function} fn 方法
 * @param {Number} delay 延迟毫秒数
 * @param {Boolean} triggerNow 立即触发
 * @returns {Function}
 */
export function debounce(this: Object, fn: Function, delay = 300, triggerNow = false) {
  let t: NodeJS.Timeout | null = null

  const _ = (...args: any[]): any => {
    t && clearTimeout(t);

    if (triggerNow && !t) {
      // t = -1
      return fn.apply(this, args)
    }

    let result = null

    t = setTimeout(() => {
      result = fn.apply(this, args);
    }, delay)

    return result;
  }

  _.remove = () => {
    clearTimeout(t!);
    t = null;
  }

  return _;
}
