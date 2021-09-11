/**
 * 重力运动
 * @param {Number} opt.activeHeight 最大活动高度
 * @param {Number} opt.activeWidth 最大活动宽度
 * @param {Number} opt.stepY 垂直方向上的步数
 * @param {Number} opt.stepX 水平方向上的步数
 * @param {Number} opt.maxCount 最大碰撞次数
 * @param {Number} opt.z 每次碰撞的耗能
 * @param {Function} opt.callback 运动结束后的回调函数
 */
 export function gravityMove( el, opt = {}) {
	var elem = el,
			activeHeight = (opt.activeHeight === 0 ? 0 : getClientPort().h) - getStyle(elem, 'height'),
			activeWidth = (opt.activeWidth === 0 ? 0 : getClientPort().w) - getStyle(elem, 'width'),
			z = opt.z || .7,
			callback = opt.callback,
			stepX = opt.stepX || 0,
			stepY = opt.stepY || 2,
			maxCount = opt.maxCount || 10,
			x = 0,
			y = 0,
			curTop,
			curLeft,
			count = 0;

	if (elem.timer) {
		clearInterval(elem.timer);
	}

	elem.timer = setInterval(function () {
		curTop = getStyle(elem, 'top');
		curLeft = getStyle(elem, 'left');

		y += stepY;
		x += stepX;

		if (curTop + y > activeHeight) {
			count++;
			y = -y * z;
			elem.style.top = activeHeight + 'px';
			if (count === maxCount) {
				clearInterval(elem.timer);
				elem.timer = null;
				typeof (callback) === 'function' && callback();
			}
		}


		if (curLeft + x > activeWidth) {
			count++;
			x = -x * z;
			if (count === maxCount) {
				clearInterval(elem.timer);
				elem.timer = null;
			}
		}

		elem.style.top = curTop + y + 'px';
		elem.style.left = curLeft + x + 'px';
	}, 1000 / 60)
}
