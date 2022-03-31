import { ICommonObject } from '../types/typing';

/**
 * 跨域 window.name + iframe
 * @param {String} opt.iframeUrl iframe的url
 * @param {String} opt.location 跳转location
 * @param {Function} opt.callback 回调函数
 */
export const xhrWindowName = (function (doc) {
  var flag = false,
      t: NodeJS.Timeout | null= null;
  var getDatas = function (iframe: HTMLIFrameElement, opt: ICommonObject) {
    if (flag) {
      flag = false;
      opt.callback(JSON.parse(iframe.contentWindow!.name));
    } else {
      flag = true;
      t = setTimeout(function () {
        iframe.contentWindow!.location = opt.location;
        clearTimeout(t!);
        t = null;
      }, 500);
    }
  }

  return function (opt: ICommonObject) {
    var iframe = doc.createElement('iframe')!;
    iframe.src = opt.frameUrl;
    doc.body.appendChild(iframe);

    if ((<any>iframe).attachEvent) {
      (<any>iframe).attachEvent('onload', function () {
        getDatas(iframe, opt);
      });
    } else {
      (<any>iframe).onload = getDatas(iframe, opt);
    }
  }
})(globalThis.document);
