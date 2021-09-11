export function aQueryCount(arr) {
	var len = arr.length,
			temp = {},
			item = null;
	for (var i = 0; i < len; i++) {
		item = arr[i];
		temp[item] = temp.hasOwnProperty(item)
			? temp[item] + 1
			: 1;
	}
	return temp;
}
