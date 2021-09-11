export function aUnique (arr) {
	var ret = [],
			temp = {},
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