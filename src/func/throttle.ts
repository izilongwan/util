/**
 * 节流函数
 * @param {Function} fn 方法
 * @param {Number} delay 延迟毫秒数
 * @returns {Function}
 */
export function throttle(this: Object, fn: Function, delay = 1000) {
  let t: NodeJS.Timeout | null= null,
      fTs = Date.now();

  return (...args: any[]) => {
    const lTs = Date.now();

    clearTimeout(t!);

    if (lTs - fTs >= delay) {
      fTs = lTs;
      return fn.apply(this, args);
    }

    t = setTimeout(() => {
      return fn.apply(this, args);
    }, delay)
  }
}
