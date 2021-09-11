/**
 * 组合函数  --> 组合多个功能函数
 */
export function compose () {
	var args = [].slice.call(arguments);

	return function (initialVal) {
		return args.reduceRight(function (res, callback) {
			return callback(res);
		}, initialVal);
	}
}
