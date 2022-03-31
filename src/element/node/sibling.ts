/**
 * 返回元素e的第n个兄弟元素节点, n正 ,返回 nextSibling; n负,返回 previousSibling
 * @param {Element} el
 */
export function sibling (el: ChildNode | null, n: number) {
	var elem = el;
	while (elem && n) {
		if (n > 0) {
			// if (leme.nextElementSibling) {
			//     e = e.nextElementSibling;
			// } else {
			//     for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
			// }
			elem = elem.nextSibling;
			while (elem && elem.nodeType !== Node.ELEMENT_NODE) {
				elem = elem.nextSibling;
			}
			n--;
		} else {
			// if (e.previousElementSibling) {
			//     e = e.previousElementSibling;
			// } else {
			//     for (e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
			// }
			elem = elem.previousSibling;
			while (elem && elem.nodeType !== Node.ELEMENT_NODE) {
				elem = elem.previousSibling;
			}
			n++;
		}
	}
	return elem;
}
