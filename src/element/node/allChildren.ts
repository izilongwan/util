/**
 * 返回该元素下的所有元素节点
 * @param {Element} el
 */
export function allChildren (el: HTMLElement, childrenArr: ChildNode[] = []) {
	var child = el.childNodes,
			len = child.length,
			item = null;

	for (var i = 0; i < len; i++) {
		item = child[i] as HTMLElement;
		if (item.nodeType == 1) {
			childrenArr.push(item);
			allChildren(item, childrenArr);
		}
	}
	return childrenArr;
}
