/**
 * 元素过渡动画
 * @param {Boolean} opt.isShow 元素显示的状态
 * @param {String} opt.animation 过渡动画
 * @param {Number} opt.duration 动画时间 ms
 */
export function showAnimation (el, opt = {}) {
	var elem = el,
			t = null,
			t1 = null,
			t2 = null,
			isShow = opt.isShow,
			duration = opt.duration || 1000,
			animation = opt.animation,
			callback = opt.callback

	elem.style.animation = animation + ' ' + duration + 'ms';

	t = setTimeout(function () {
		if (!isShow) {
			t2 = setTimeout(function () {
				elem.style.display = 'none';
				typeof (callback) == 'function' && callback();
				clearTimeout(t2);
				t2 = null;
			}, .7 * duration);
		} else {
			elem.style.display = 'block';
		}
		t1 = setTimeout(function () {
			elem.style.animation = '';
			typeof (callback) == 'function' && callback();
			clearTimeout(t1);
			t1 = null;
		}, .8 * duration);
		clearTimeout(t);
		t = null;
	}, .4 * duration);
}