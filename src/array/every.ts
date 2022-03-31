import { deepClone } from '../object'

export function every (arr: any[], fn: Function) {
	var len = arr.length,
			arg2 = arguments[1] || window,
			res = true,
			item = null,
			toString = {}.toString;
	for (var i = 0; i < len; i++) {
		item = toString.call(item) === '[object Object]'
			? deepClone(arr[i])
			: arr[i];
		if (!fn.apply(arg2, [item, i, arr])) {
			return res = false;
		};
	}
	return res;
}
