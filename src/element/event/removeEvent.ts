/**
 * 封装事件解绑
 * @param {Element} elem 元素
 * @param {String} type 事件类型
 * @param {Function} fn 执行函数
 * @param {Boolean} capture 是否捕获
 */
export function removeEvent (elem: HTMLElement, type: string, fn: Function, capture = false) {
	if ((<any>elem).addEventListener) {
		(<any>removeEvent) = function (elem: HTMLElement, type: string, fn: Function, capture = false) {
			(<any>elem).removeEventListener(type, fn, capture);
		}
	} else if ((<any>elem).attachEvent) {
		(<any>removeEvent) = function (elem: HTMLElement, type: string, fn: Function) {
			(<any>elem).detachEvent('on' + type, function () {
				fn.call(elem);
			})
		}
	} else {
		(<any>removeEvent) = function (elem: HTMLElement, type: string, fn: Function) {
			(<any>elem)['on' + type] = null;
		}
	}

	removeEvent(elem, type, fn, capture);
}
