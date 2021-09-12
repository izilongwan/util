/**
 * 手写Function.prototype.bind
 * @param {Function} fn 执行的方法
 * @param {Object} ctx 绑定的上下文
 * @param {any} [args,] 不定参数
 * @returns {any}
 */
export function myBind(fn, ctx) {
  ctx = ctx ? Object(ctx) : window;

  const args = [].slice.call(arguments, 2)

  function myFunc () {
    const newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this instanceof myFunc ? this : ctx, newArgs)
  }

  function Buffer() {}

  Buffer.prototype = fn.prototype
  myFunc.prototype = new Buffer()

  return myFunc
}
