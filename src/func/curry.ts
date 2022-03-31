/**
 * 柯里化函数  --> 将一个多参数函数转成多个单参数的函数（一个n元函数 --> n个一元函数）
 * @param {Function} fn 分步所执行的函数
 */

export function curry (this: Object, fn: Function) {
  var totalLen = fn.length,
      args: any[] = [].slice.call(arguments, 1);

	var func = function (this: Object, ...funcArgs: any[]) {
		if (funcArgs.length < totalLen) {
			return function (this: Object) {
				args = args.concat([].slice.call(funcArgs));
				return func.apply(this, args);
			}
		}

		return fn.apply(this, args);
	}

  return func.apply(this, args);
}
