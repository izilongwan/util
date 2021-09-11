/**
 * 封装事件冒泡函数：
 * IE：cancelBubble
 * Firefox：stopPropagation
 */
export function cancelBubble (e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}
