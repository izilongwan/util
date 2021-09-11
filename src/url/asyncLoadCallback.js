/**
 * 异步加载并执行回调函数
 * @param {String} url 资源
 * @param {Function} callback 回调函数
 */
export function asyncLoadCallback (url, callback) {
	var oS = document.createElement('script'),
      isFunction = typeof callback === 'function'

	oS.type = 'text/javascript';
	oS.async = true;

  if (oS.readyState) {
    oS.onreadystatechange = function () {
      if (oS.readyState == 'complete' || oS.readyState == 'loaded') {
        return isFunction
          ? callback()
          : null
      }
    }
  } else {
    oS.onload = function () {
      return isFunction
        ? callback()
        : null
		}
	}
	oS.src = url;
	document.head.appendChild(oS);
}
