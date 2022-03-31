import { ICommonObject } from '../types/typing';

/**
 * 替换模板正则
 * @param {String} str
 * @param {Object} data
 * @returns {Object}
 */
export function regTpl (str: string, data: ICommonObject) {
	const reg = new RegExp(/{{(.+?)}}/, 'gim');

	return str.replace(reg, (_, key) => {
		if (key.includes('.')) {
			const arr: string[] = key.split('.')
			return arr.reduce((prev, curr) => prev[curr] , data)
		}
		return data[key]
	})
}
