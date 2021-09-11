import { deepClone } from '../object'

export function reduce (arr, fn, initialValue) {
	var len = arr.length,
			arg3 = arguments[2] || window,
			item = null,
			toString = {}.toString;

	initialValue = initialValue || arr[0];
	for (var i = 0; i < len; i++) {
		item = toString.call(item) === '[object Object]'
			? deepClone(arr[i])
			: arr[i];
		initialValue = fn.apply(arg3, [initialValue, item, i, arr]);
	}
	return initialValue;
}
