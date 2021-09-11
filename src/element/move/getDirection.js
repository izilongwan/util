/**
 * 判断鼠标相对于元素的位置
 * @param {Element} el 元素
 * @param {Object} e 事件源
 * @returns {String} top|left|bottom|right
 */
export function getDirection (el, e) {
	var e = e || window.event,
			elem = el,
			elemWidth = getStyle(elem, 'width'),
			elemHeight = getStyle(elem, 'height'),
			x = (getPagePos(e).x - getElemPos(elem).left - elemWidth / 2) * (elemWidth > elemHeight ? elemHeight / elemWidth : 1),
			y = (getPagePos(e).y - getElemPos(elem).top - elemHeight / 2) * (elemHeight > elemWidth ? elemWidth / elemHeight : 1),
			angle = (Math.atan2(y, x) * 180 / Math.PI) + 180,
			num = (Math.round(angle / 90) + 3) % 4;

	function _getDir (type, callback) {
		var dir;
		switch (num) {
			case 0:
				dir = 'top';
				break;
			case 1:
				dir = 'right';
				break;
			case 2:
				dir = 'bottom';
				break;
			case 3:
				dir = 'left';
				break;
			default:
				break;
		}
		if (type === dir) {
			typeof (callback) == 'function' && callback.call(elem);
		}
	}

	return {
		left: function (callback) {
			_getDir('left', callback);
			return this;
		},

		top: function (callback) {
			_getDir('top', callback);
			return this;
		},

		right: function (callback) {
			_getDir('right', callback);
			return this;
		},

		bottom: function (callback) {
			_getDir('bottom', callback);
			return this;
		}
	}
}
