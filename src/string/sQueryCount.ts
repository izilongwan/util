export function sQueryCount (string: string) {
	var temp: Record<string, number> = {},
			len = string.length,
			item = null;

	for (var i = 0; i < len; i++) {
		item = string[i];
		temp[item] = temp.hasOwnProperty(item)
							 ? ++temp[item]
							 : 1;
	}
	return temp;
}
