/**
 * 封装事件绑定
 * @param {Element} elem 元素
 * @param {String} type 事件类型
 * @param {Function} fn 执行函数
 * @param {Boolean} capture 是否捕获
 */
export function addEvent (elem, type, fn, capture = false) {
	if (elem.addEventListener) {
		addEvent = function (elem, type, fn, capture) {
			elem.addEventListener(type, fn, capture);
		}
	} else if (elem.attachEvent) {
		addEvent = function (elem, type, fn) {
			elem.attachEvent('on' + type, function () {
				fn.call(elem);
			});
		}
	} else {
		addEvent = function (elem, type, fn) {
			elem['on' + type] = fn;
		}
	}

	addEvent(elem, type, fn, capture);
}
