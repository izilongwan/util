/**
 * 封装事件绑定
 * @param {Element} elem 元素
 * @param {String} type 事件类型
 * @param {Function} fn 执行函数
 * @param {Boolean} capture 是否捕获
 */
export function addEvent (elem: HTMLElement, type: string, fn: Function, capture = false) {
	if ((<any>elem).addEventListener) {
		(<any>addEvent) = function (elem: HTMLElement, type: string, fn: Function, capture = false) {
			(<any>elem).addEventListener(type, fn, capture);
		}
	} else if ((<any>elem).attachEvent) {
		(<any>addEvent) = function (elem: HTMLElement, type: string, fn: Function) {
			(<any>elem).attachEvent('on' + type, function () {
				fn.call(elem);
			});
		}
	} else {
		(<any>addEvent) = function (elem: HTMLElement, type: string, fn: Function) {
			(<any>elem)['on' + type] = fn;
		}
	}

	addEvent(elem, type, fn, capture);
}
