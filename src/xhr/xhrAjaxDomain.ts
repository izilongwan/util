import { ICommonObject } from '../types/typing';

/**
 * 跨域 domain + iframe
 * @param {String} opt.baseDomain 基础域名
 * @param {String} opt.frameId iframe的id值
 * @param {String} opt.frameUrl ifrmae的url
 * @param {String} opt.url xhr请求的url
 * @param {String} opt.type xhr请求的方式
 * @param {Boolean} opt.async xhr同/异步
 * @param {String} opt.dataType xhr返回的数据类型
 * @param {any} opt.data xhr请求的数据
 * @param {Function} opt.success 成功的回调
 * @param {Function} opt.error 失败的回调
 */
export const xhrAjaxDomain = (function (doc) {
	function createIframe (frameId: string, frameUrl: string) {
		var frame = doc.createElement('iframe');
				frame.src = frameUrl;
				frame.id = frameId;
				frame.style.display = 'none';

		return frame;
	}

	return function (opt: ICommonObject) {
		doc.domain = opt.basicDomain;
		var frame = createIframe(opt.frameId, opt.frameUrl);

		frame.onload = function () {
			var $$ = (<any>(doc.getElementById(opt.frameId)!)).contentWindow.xhr;
			$$.ajax({
				url: opt.url,
				async: opt.async,
				type: opt.type,
				dataType: opt.dataType,
				data: opt.data,
				success: opt.success,
				error: opt.error,
				complete: opt.complete
			})
		}
		doc.body.appendChild(frame);
	}
})(globalThis.document);
