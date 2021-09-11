/**
 * 弹性运动
 * @param {Element} opt.attr 元素属性
 * @param {Number} opt.target 元素弹性变换后的位置
 * @param {Number} opt.k 弹性系数
 * @param {Number} opt.z 摩擦阻力系数
 * @param {Function} opt.callback 运动结束后的回调函数
 */
 export function elasticMove (el, opt = {}, callback) {
	var elem = el,
			attr = opt.attr || 'left',
			target = opt.target === 0 ? 0 : opt.target || 250,
			callback = opt.callback,
			k = opt.k || .7,
			z = opt.z || .7,
			flexLen = target,
			step = 0,
			cur = 0;

	if (!elem.timer) {
		elem.timer = {};
	} else if (elem.timer[attr]) {
		clearInterval(elem.timer[attr]);
	}

	elem.timer[attr] = setInterval(function () {
		cur = getStyle(elem, attr);
		flexLen = target - cur;
		step += flexLen * k;
		step *= z;
		elem.style[attr] = cur + step + 'px';

		if (Math.round(flexLen) === 0 && Math.round(step) === 0) {
			elem.style[attr] = target + 'px';
			clearInterval(elem.timer[attr]);
			elem.timer[attr] = null;
			typeof (callback) === 'function' && callback();
		}
	}, 1000 / 60);
}
