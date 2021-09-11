/**
 * 返回el元素的第n层祖先元素节点
 * @param {Element} el
 */
export function parent (el, n) {
	var elem = el;
	while (elem && n--) {
		elem = elem.parentElement;
	}
	return elem;
}