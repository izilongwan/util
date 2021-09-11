// 封装文档解析完毕函数
export function domReady (fn) {
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function () {
			document.removeEventListener('DOMContentLoaded', arguments.callee, false);
			fn();
		}, false);
	} else if (document.attachEvent) {
		document.attachEvent('onreadystatechange', function () {
			if (this.readyState === 'complete') {
				document.detachEvent('onreadystatechange', arguments.callee);
				fn();
			}
		});
	}

	if (document.documentElement.doScroll && typeof (window.frameElement) === 'undefined') {
		try {
			document.documentElement.doScroll('left');
		} catch (e) {
			return setTimeOut(arguments.callee, 20);
		}
		fn();
	}
}
