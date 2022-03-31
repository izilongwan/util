import { ICommonObject } from '../types/typing';

/**
 * 记忆/缓存函数  --> 具有缓存池的函数
 * 上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。
 * @param {Function} fn 需要记忆的函数
 */
export function memorize (fn: Function) {
	var cache: ICommonObject= {};

	return function (this: Object) {
		var key = [].join.call(arguments, ',');

		return cache[key] = cache[key] || fn.apply(this, arguments);
	}
}
