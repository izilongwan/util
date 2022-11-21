import { ICommonObject } from '../types/typing';

/**
 * 封装AJAX
 * @param {String} opt.url xhr请求的url
 * @param {String} opt.type xhr请求的方式
 * @param {Boolean} opt.async xhr同/异步
 * @param {String} opt.dataType xhr返回的数据类型
 * @param {any} opt.data xhr请求的数据
 * @param {Function} opt.success xhr的成功的回调
 * @param {Function} opt.error xhr的失败的回调
 * @param {Function} opt.complete xhr的完成的回调
 */
export const xhr = (function (doc, win) {
  var doAjax = function (opt: Record<string, any>) {
    var o = win.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject('Microsoft.XMLHTTP');
    if (!o) {
      throw new Error('您的浏览器暂不支持发起HTTP请求，请升级！');
    }

    var url = opt.url,
        type = (opt.type || 'GET').toUpperCase(),
        dataType = (opt.dataType || 'JSON').toUpperCase(),
        data = opt.data || null,
        jsonp = opt.jsonp || 'callback',
        jsonpCB: string = opt.jsonpCB || 'jQuery' + random() + '_' + new Date().getTime(),
        async = opt.async === false ? false : true,
        success = opt.success || function () {},
        error = opt.error || function () {},
        complete = opt.complete || function () {},
        timeout = opt.timoeut || 30000,

        timer: NodeJS.Timeout | null= null;

      if (!url) {
        throw new Error('您没有填写URL！');
      }

      if (dataType === 'JSONP') {
        if (type !== 'GET') {
          console.warn('请求方式已修改为 type="GET"');
          type = 'GET';
        }
        var oS = doc.createElement('script');
        oS.src = url.indexOf('?') === -1
               ? url + '?' + jsonp + '=' + jsonpCB
               : url + '&' + jsonp + '=' + jsonpCB;

        doc.body.appendChild(oS);
        doc.body.removeChild(oS);
        win[jsonpCB] = function (data: any) {
          success(data);
        }
        return;
      }

      o.onreadystatechange = function () {
        if (o.readyState === 4) {
          if ((o.status >= 200 && o.status < 300) || o.status === 304) {
            switch (dataType) {
              case 'JSON':
                success(JSON.parse(o.responseText));
                break;
              case 'TEXT':
                success(o.responseText);
                break;
              case 'XML':
                success(o.responseXML);
                break;
              default:
                success(JSON.parse(o.responseText));
                break;
            }
          } else {
            error();
          }
          complete();
          clearTimeout(timer!);
          timer = null;
          o = null;
        }
			}

      o.open(type, url, async);
      type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      o.send(type === 'POST' ? formatData(data) : null);

      timer = setTimeout(function () {
        o.abort();
        complete();
        clearTimeout(timer!);
        timer = null;
        o = null;
      }, timeout);
  }

  function formatData (data: any) {
    var str = '';
    for (var prop in data) {
      str += prop + '=' + data[prop] + '&';
    }
    return str.replace(/&$/, '');
  }

  function random () {
    var str = '';
    for (var i = 0; i < 20; i ++) {
      str += Math.floor(Math.random() * 10);
    }
    return str;
  }

  return {
    ajax: function (opt: ICommonObject) {
      doAjax(opt);
    },

    post: function (url: string, data: ICommonObject, success: Function) {
      doAjax({
        url: url,
        data: data,
        success: success
      })
    },

    get: function (url: string, success: Function) {
      doAjax({
        url: url,
        success: success
      })
    }
  }
})(globalThis.document, globalThis.window);
