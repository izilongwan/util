export function sUnique (string: string) {
	var str = '',
			temp: Record<string, string> = {},
			len = string.length,
			item = null;

	for (var i = 0; i < len; i++) {
		item = string[i];
		if (!temp.hasOwnProperty(item)) {
			temp[item] = item;
			str += item;
		}
	}
	return str;
}
