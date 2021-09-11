/**
 * hasChildren
 * @param {Element} el 
 * @returns 
 */
 export function hasChildren (el) {
	var child = el.childNodes,
			len = child.length,
			childItem = null;

	for (var i = 0; i < len; i++) {
		childItem = child[i];
		if (childItem.nodeType == 1) {
			return true;
		}
	}
	return false;
}