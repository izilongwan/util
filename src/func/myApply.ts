/**
 * 手写Function.prototype.apply
 * @param {Function} fn 执行的方法
 * @param {Object} ctx 绑定的上下文
 * @param {<any>Array} args 传递参数
 * @returns {any}
 */
export function myApply (fn: Function, c: Object, args: any[]) {
  const ctx = c ? Object(c) : window;

  var len    = args.length,
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
