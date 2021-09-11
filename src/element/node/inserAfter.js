/**
 * insertAfter
 * @param {Element} el
 * @param {Element} tar
 * @param {Element} node
 * @returns Element
 */
export function insertAfter (el, tar, node) {
	var afterNode = node.nextElementSibling;
	afterNode ? el.insertBefore(tar, afterNode)
						: el.appendChild(tar);
	return tar;
}
