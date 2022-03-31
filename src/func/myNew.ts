import { isObject } from '../object';

/**
 * new 实现
 * @param {Function} fn 方法
 * @returns {Object}
 */
export function myNew(fn: Function) {
  var ctx = {};

  Object.setPrototypeOf(ctx, fn.prototype);

  var res = fn.apply(ctx, [].slice.call(arguments, 1));

  return isObject(res) ? res : ctx;
}
