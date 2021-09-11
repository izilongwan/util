/**
 * 节流函数
 * @param {Function} fn 方法
 * @param {Number} delay 延迟毫秒数
 * @returns {Function}
 */
export function throttle(fn, delay = 1000) {
  let t  = null,
      fTs = Date.now();

  return function() {
    const args = [].slice.call(arguments);
    const lTs = Date.now();

    clearTimeout(t);

    if (lTs - fTs >= delay) {
      fTs = lTs;
      return fn.apply(this, args);
    }

    t = setTimeout(() => {
      return fn.apply(this, args);
    }, delay)
  }
}
