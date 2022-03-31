/**
 * 该节点下的元素节点Children
 * @param {Element} el
 * @param {Number} idx
 * @returns
 */
export function children (el: HTMLElement, idx: number) {
	var child = el.childNodes,
			len = child.length,
			childItem = null,
			temp = [];

	for (var i = 0; i < len; i++) {
		childItem = child[i];
		if (childItem.nodeType == 1) {
			temp.push(childItem);
		}
	}

	return idx >= 0 ? temp[idx] : temp;
}
