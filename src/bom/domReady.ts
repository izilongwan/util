// 封装文档解析完毕函数
export function domReady (fn: Function) {
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function () {
			document.removeEventListener('DOMContentLoaded', arguments.callee as any, false);
			fn();
		}, false);
	} else if ((<any>document).attachEvent) {
		(<any>document).attachEvent('onreadystatechange', function (this: any) {
			if (this.readyState === 'complete') {
				(<any>document).detachEvent('onreadystatechange', arguments.callee);
				fn();
			}
		});
	}

	if ((<any>document.documentElement).doScroll && typeof (window.frameElement) === 'undefined') {
		try {
			(<any>document.documentElement).doScroll('left');
		} catch (e) {
			return setTimeout(arguments.callee, 20);
		}
		fn();
	}
}
