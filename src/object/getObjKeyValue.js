/**
 * 获取对象的KEY，支持 "."、"[]"
 * @param {Object} obj
 * @param {String} key
 * @returns {any}
 */
export function getObjKeyValue (obj, key) {
	if (typeof key === 'string') {
		if (!(/\.|\[.+\]/g).test(key)) {
			return obj[key];
		}
		key = key
			.replace(/\]\[/g, '.')
			.replace(/\[/g, '.')
			.replace(/\]/g, '.')
			.replace(/\.$/, '')
			.split('.');

		return key.reduce((prev, cur) => prev[cur], obj);
	}
}
