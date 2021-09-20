/**
 * 跨域 window.name + iframe
 * @param {String} opt.iframeUrl iframe的url
 * @param {String} opt.location 跳转location
 * @param {Function} opt.callback 回调函数
 */
export const xhrWindowName = (function (doc) {
  var flag = false,
      t = null;
  var getDatas = function (opt) {
    if (flag) {
      flag = false;
      opt.callback(JSON.parse(iframe.contentWindow.name));
    } else {
      flag = true;
      t = setTimeout(function () {
        iframe.contentWindow.location = opt.location;
        clearTimeout(t);
        t = null;
      }, 500);
    }
  }

  return function (opt) {
    var iframe = doc.createElement('iframe');
    iframe.src = opt.frameUrl;
    doc.body.appendChild(iframe);
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', function () {
        getDatas(opt);
      });
    } else {
      iframe.onload = getDatas(opt);
    }
  }
})(globalThis.document);
