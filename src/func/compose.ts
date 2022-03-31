/**
 * 组合函数  --> 组合多个功能函数
 */
export function compose (...args: Function[]) {

	return function (initialVal: any) {
		return args.reduceRight(function (res, callback) {
			return callback(res);
		}, initialVal);
	}
}
