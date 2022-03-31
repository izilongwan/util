/**
 * 移动端触屏事件的封装
 * @param {Element} el 元素
 * @param {Number} activeRange 触发的最小值
 *
 * @returns {Function} opt.tap 轻触
 * @returns {Function} opt.longtap 长按
 * @returns {Function} opt.slideleft 左滑
 * @returns {Function} opt.slideright 右滑
 * @returns {Function} opt.slideup 上滑
 * @returns {Function} opt.slidedown 下滑
 */
export function touch(el: HTMLElement, activeRange = 100) {
	var elem = el;

	function tap(this: Object, callback: Function) {
		elem.addEventListener('touchstart', fn, false);
		elem.addEventListener('touchend', fn, false);

		var bTime: number, eTime: number;

		function fn(e: Event) {
			e.preventDefault();

			switch (e.type) {
				case 'touchstart':
					bTime = new Date().getTime();
					break;
				case 'touchend':
					eTime = new Date().getTime();

					if (eTime - bTime < 500) {
						typeof (callback) == 'function' && callback.call(elem, e);
					}
					break;
				default:
					break;
			}
		}
		return this;
	}

	function longtap(this: Object, callback: Function) {
		elem.addEventListener('touchstart', fn, false);
		elem.addEventListener('touchmove', fn, false);
		elem.addEventListener('touchend', fn, false);

		var t: NodeJS.Timeout | null = null;

		function fn(e: Event) {
			e.preventDefault();
			t && clearTimeout(t);

			switch (e.type) {
				case 'touchstart':
					t = setTimeout(function () {
						typeof (callback) == 'function' && callback.call(elem, e);
						clearTimeout(t!);
						t = null;
					}, 500);
					break;

				case 'touchmove':
				case 'touchend':
					clearTimeout(t!);
					break;

				default:
					break;
			}
		}
		return this;
	}

	function _slide(type: string, callback: Function) {
		elem.addEventListener('touchstart', fn, false);
		elem.addEventListener('touchend', fn, false);

		var bX: number, bY: number, eX, eY;

		function fn(e: Event) {
			var touch = (<any> e).changedTouches[0];
			e.preventDefault();

			switch (e.type) {
				case 'touchstart':
					bX = touch.pageX;
					bY = touch.pageY;
					break;
				case 'touchend':
					eX = touch.pageX;
					eY = touch.pageY;
					_slideDir(e, eX - bX, eY - bY);
					break;
				default:
					break;
			}
		}

		function _slideDir(e: Event, x: number, y: number) {
			switch (type) {
				case 'left':
					if (x > activeRange && Math.abs(y) < 30) {
						typeof (callback) == 'function' && callback.call(elem, e);
					}
					break;
				case 'up':
					if (Math.abs(x) < 30 && -y > activeRange) {
						typeof (callback) == 'function' && callback.call(elem, e);
					}
					break;
				case 'right':
					if (-x > activeRange && Math.abs(y) < 30) {
						typeof (callback) == 'function' && callback.call(elem, e);
					}
					break;
				case 'down':
					if (Math.abs(x) < 30 && y > activeRange) {
						typeof (callback) == 'function' && callback.call(elem, e);
					}
					break;
			}
		}
	}

	function slideleft(this: Object, callback: Function) {
		_slide('left', callback);
		return this;
	}

	function slideright(this: Object, callback: Function) {
		_slide('right', callback);
		return this;
	}

	function slideup(this: Object, callback: Function) {
		_slide('up', callback);
		return this;
	}

	function slidedown(this: Object, callback: Function) {
		_slide('down', callback);
		return this;
	}

	return {
		tap: tap,
		longtap: longtap,
		slideleft: slideleft,
		slideright: slideright,
		slideup: slideup,
		slidedown: slidedown
	};
}
