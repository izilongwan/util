export function flat (arr: any[], depth = 1): any[] {
	var _self    = arr,
	    toString = {}.toString;

	return depth == 0
		? arr
		: _self.reduce(function (prev, cur) {
			return prev.concat(
				toString.call(cur) === '[object Array]'
					? flat(cur, depth - 1)
					: cur
			);
		}, []);
}
