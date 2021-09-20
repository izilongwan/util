/**
 * 偏函数   --> 固定一个函数的一个或多个参数（n元函数 --> n - x 元函数）
 * @param {Function} fn
 */
export function partial (fn) {
	var args = [].slice.call(arguments, 1),
			_self = fn;

	return function () {
		var newArgs = args.concat([].slice.call(arguments));

		return _self.apply(this, newArgs);
	}
}
