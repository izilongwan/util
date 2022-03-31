/**
 * 获取元素CSS 样式属性
 * @param {Element} elem
 * @param {String} prop
 * @param {String} type before|after
 */
export function getStyle (elem: HTMLElement, prop: string, type: string | null = null) {
	if (window.getComputedStyle) {
		return prop
			? parseInt(window.getComputedStyle(elem, type)[prop as any])
			: window.getComputedStyle(elem, null);
	} else {
		return prop
			? parseInt((<any>elem).currentStyle[prop])
			: (<any>elem).currentStyle;
	}
}
