/**
 * 记忆/缓存函数  --> 具有缓存池的函数
 * 上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。
 * 具有记忆的函数} fn
 */
export function memorize (fn) {
	var cache = {};

	return function () {
		var key = [].join.call(arguments, ',');

		return cache[key] = cache[key] || fn.apply(this, arguments);
	}
}
