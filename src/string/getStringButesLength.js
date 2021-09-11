// 封装求取字符串长度
export function getStringButesLength (target) {
	var count = target.length,
			len = count;
	for (var i = 0; i < len; i++) {
		if (target.charCodeAt(i) > 255) {
			count++;
		}
	}
	return count;
}
