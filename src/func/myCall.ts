import { ICommonObject } from '../types/typing';

/**
 * 手写Function.prototype.call
 * @param {Function} fn 执行的方法
 * @param {Object} ctx 绑定的上下文
 * @param {any} [args,] 不定参数
 * @returns {any}
 */
export function myCall (fn: Function, c: ICommonObject) {
  const ctx = c ? Object(c) : window;

  var args = [].slice.call(arguments, 2),
      len    = args.length,
      param  = [],
      random = Math.random();

  for (var i = 0; i < len; i++) {
    param.push('args[' + i + ']');
  }

  ctx[random] = fn;

  var res = eval('ctx[random](' + param + ')');

  delete ctx[random];

  return res;
}
