import { deepClone } from '../object'

export function map (arr, fn) {
	var len = arr.length,
			arg2 = arguments[1] || window,
			newArr = [],
			item = null,
			toString = {}.toString;

	for (var i = 0; i < len; i++) {
		item = toString.call(item) === '[object Object]'
			? deepClone(arr[i])
			: arr[i];
		newArr.push(fn.apply(arg2, [item, i, arr]));
	}
	return newArr;
}
