import { ICommonObject } from '../types/typing';

/**
 * 获取对象的KEY，支持 "."、"[]"
 * @param {Object} obj
 * @param {String} key
 * @returns {any}
 */
export function getObjKeyValue (obj: ICommonObject, key: string) {
	if (typeof key === 'string') {
		if (!(/\.|\[.+\]/g).test(key)) {
			return obj[key];
		}
		const arr = key
			.replace(/\]\[/g, '.')
			.replace(/\[/g, '.')
			.replace(/\]/g, '.')
			.replace(/\.$/, '')
			.split('.');

		return arr.reduce((prev, cur) => prev[cur], obj);
	}
}
