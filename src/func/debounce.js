/**
 * 防抖函数
 * @param {Function} fn 方法
 * @param {Number} delay 延迟毫秒数
 * @param {Boolean} triggerNow 立即触发
 * @returns {Function}
 */
export function debounce(fn, delay = 300, triggerNow = false) {
  let t = null

  const _ = function() {
    const args = [].slice.call(arguments);

    t && clearTimeout(t);

    if (triggerNow && !t) {
      t = -1
      return fn.apply(this, args)
    }

    let result = null

    t = setTimeout(() => {
      result = fn.apply(this, args);
    }, delay)

    return result;
  }

  _.remove = () => {
    clearTimeout(t);
    t = null;
  }

  return _;
}
