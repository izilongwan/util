/**
 * 获取元素CSS 样式属性
 * @param {Element} elem
 * @param {String} prop
 * @param {String} type before|after
 */
export function getStyle (elem, prop, type = null) {
	if (window.getComputedStyle) {
		return prop
			? parseInt(window.getComputedStyle(elem, type)[prop])
			: window.getComputedStyle(elem, null);
	} else {
		return prop
			? parseInt(elem.currentStyle[prop])
			: elem.currentStyle;
	}
}
