import { ICommonObject } from '../types/typing';

export function aUnique (arr: any) {
	var ret = [],
			temp = {} as ICommonObject,
			len = arr.length,
			item = null;

	for (var i = 0; i < len; i++) {
		item = arr[i];
		if (!temp.hasOwnProperty(item)) {
			temp[item] = item;
			ret.push(item);
		}
	}
	return ret;
}
