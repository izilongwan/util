export function forEach (arr: any[], fn: Function) {
	var len = arr.length,
			arg2 = arguments[1] || window;

	for (var i = 0; i < len; i++) {
		fn.apply(arg2, [arr[i], i, arr]);
	}
}
