import { deepClone } from '../object'

export function some (arr: any[], fn: Function) {
	var len = arr.length,
			arg2 = arguments[1] || window,
			res = false,
			item = null,
			toString = {}.toString;
	for (var i = 0; i < len; i++) {
		item = toString.call(item) === '[object Object]'
			? deepClone(arr[i])
			: arr[i];
		if (fn.apply(arg2, [item, i, arr])) {
			return res = true;
		}
	}
	return res;
}
