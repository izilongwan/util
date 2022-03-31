import { getStyle } from '..';
import { ICommonObject } from '../../types/typing';

/**
 * 匀速运动
 * @param {Number} opt.duration 运动时长
 * @param {Function} opt.callback 运动结束后的回调函数
 */
 export function startMove(el: HTMLElement & { timer: NodeJS.Timeout | null}, opt: ICommonObject= {}) {
	var elem = el,
			speed = 100,
			step = 0,
			duration = opt.duration || 1000,
			callback = opt.callback

	if (elem.timer) {
		clearInterval(elem.timer);
	}

	elem.timer = setInterval(function () {
		var flag = true;
		for (var prop in opt) {
			var curProp = getStyle(elem, prop);

			step = (opt[prop] - curProp) / duration * speed;

			if (prop == 'opacity') {
				step *= 10
				elem.style[prop] = curProp + step;
			} else {
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				elem.style[prop as any] = curProp + step + 'px';
			}

			if (curProp + step !== opt[prop]) {
				flag = false;
			}
		}

		if (flag) {
			clearInterval(elem.timer!);
			elem.timer = null;
			typeof (callback) == 'function' && callback();
		}
	}, 30)
}
