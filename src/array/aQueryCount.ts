import { ICommonObject } from '../types/typing';

export function aQueryCount(arr: any[]) {
	var len = arr.length,
			temp = {} as ICommonObject,
			item = null;
	for (var i = 0; i < len; i++) {
		item = arr[i];
		temp[item] = temp.hasOwnProperty(item)
			? temp[item] + 1
			: 1;
	}
	return temp;
}
