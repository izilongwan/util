/**
 * 返回该元素下的所有元素节点
 * @param {Element} el
 */
export function allChildren (el, childrenArr = []) {
	var child = el.childNodes,
			len = child.length,
			item = null;

	for (var i = 0; i < len; i++) {
		item = child[i];
		if (item.nodeType == 1) {
			childrenArr.push(item);
			item.allChildren(childrenArr);
		}
	}
	return childrenArr;
}