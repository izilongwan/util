/**
 * 拖拽函数
 * @param {Element} opt.elem 点击的元素
 * @param {Element} opt.dblWrap 双击所显示的元素
 * @param {Element} opt.menuWrap 右键所显示的元素
 */
export function drag (el, opt = {}) {
	var dragWrap = opt.dragWrap || el,
			elem = el,
			dblWrap = opt.dblWrap,
			menuWrap = opt.menuWrap,
			wWidth = getClientPort().w,
			wHeight = getClientPort().h,
			callbackTime = null,
			ceTime = null,
			t = null,
			counter = 0;
			disX = 0,
			disY = 0;

	if (menuWrap) {
		var mWidth = getStyle(menuWrap, 'width'),
				mHeight = getStyle(menuWrap, 'height'),
				maxW = wWidth - mWidth,
				maxH = wHeight - mHeight;
		addEvent(menuWrap, 'click', stopEvent);
	}
	addEvent(elem, 'mousedown', mouseDown);
	addEvent(elem, 'contextmenu', stopEvent);
	addEvent(dragWrap, 'contextmenu', stopEvent);

	function mouseDown (e) {
		var e = e || window.event,
				x = getPagePos(e).x,
				y = getPagePos(e).y,
				mLeft = 0,
				mTop = 0,
				btnCode = e.button;

		stopEvent(e);

		if (btnCode === 0) {
			disX = x - getStyle(dragWrap, 'left');
			disY = y - getStyle(dragWrap, 'top');

			addEvent(document, 'mousemove', mouseMove);
			addEvent(document, 'mouseup', mouseUp);
		} else if (btnCode === 2) {
			if (menuWrap) {
				if (x >= maxW) {
					mLeft = x - mWidth;
				} else {
					mLeft = x;
				}
				if (y >= maxH) {
					mTop = y - mHeight;
				} else {
					mTop = y;
				}
				menuWrap.style.left = mLeft + 'px';
				menuWrap.style.top = mTop + 'px';
				menuWrap.style.display = 'block';
				addEvent(document, 'click', hideMenu);
				addEvent(menuWrap, 'contextmenu', stopEvent);
			}
		}
	}

	function mouseMove (e) {
		var e = e || window.event,
				x = getPagePos(e).x - disX,
				y = getPagePos(e).y - disY,
				maxX = wWidth - getStyle(dragWrap, 'width') - 1,
				maxY = wHeight - getStyle(dragWrap, 'height') - 1;

		if (menuWrap) {
			menuWrap.style.display = 'none';
			removeEvent(document, 'click', hideMenu);
			removeEvent(menuWrap, 'contextmenu', stopEvent);
		}
		if (x < 0) {
			x = 0;
		} else if (x >= maxX) {
			x = maxX;
		}

		if (y < 0) {
			y = 0;
		} else if (y >= maxY) {
			y = maxY;
		}

		dragWrap.style.left = x + 'px';
		dragWrap.style.top = y + 'px';
	}

	function mouseUp () {
		if (dblWrap) {
			var res = null;
			counter++;
			if (counter == 1) {
				callbackTime = new Date().getTime();
			}
			if (counter == 2) {
				ceTime = new Date().getTime();
			}
			res = ceTime - callbackTime;
			if (callbackTime && ceTime && res < 300) {
				dblWrap.style.display = 'block';
			}
			t = setTimeout(function () {
				callbackTime = ceTime = counter = 0;
				clearTimeout(t);
			}, 500);
		}
		removeEvent(document, 'mousemove', mouseMove);
		removeEvent(document, 'mouseup', mouseUp);
	}

	function stopEvent (e) {
		var e = e || window.event;
		preventDefault(e);
		cancelBubble(e);
	}

	function hideMenu () {
		menuWrap.style.display = 'none';
	}
}
