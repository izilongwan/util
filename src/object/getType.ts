/**
 * 封装 typeof返回类型
 * @param {any} target
 * @returns {String}
 */
export function getType (target: unknown) {
	// 1.区分原始值,引用值
	// 2.区分引用值: 数组, 对象, 包装类
	if (target === null) {
		return 'null';
	}

	var type = typeof (target);

  /**
   * '[object Array]'
     '[object Object]'
     '[object Date]'
     '[object RegExp]'
     '[object Number]'
     '[object String]'
     '[object Boolean]'
   */

  return type === 'object'
    ? Object.prototype.toString.call(target).slice(8, -1)
    : type;
}
