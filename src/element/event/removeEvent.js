/**
 * 封装事件解绑
 * @param {Element} elem 元素
 * @param {String} type 事件类型
 * @param {Function} fn 执行函数
 * @param {Boolean} capture 是否捕获
 */
export function removeEvent (elem, type, fn, capture) {
	if (elem.addEventListener) {
		removeEvent = function (elem, type, fn, capture = false) {
			elem.removeEventListener(type, fn, capture);
		}
	} else if (elem.attachEvent) {
		removeEvent = function (elem, type, fn) {
			elem.detachEvent('on' + type, function () {
				fn.call(elem);
			})
		}
	} else {
		removeEvent = function (elem, type, fn) {
			elem['on' + type] = null;
		}
	}

	removeEvent(elem, type, fn, capture);
}
