/**
 * 逆序元素节点
 * @param {Element} el
 */
export function reverseChildren (el) {
	var child = el.childNodes,
			len = child.length;

	while (len--) {
		el.appendChild(child[len]);
	}
}
