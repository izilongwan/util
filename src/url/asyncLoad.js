/**
 * 异步加载脚本
 * @param {地址} url
 */
export function asyncLoad (url) {
	var oS = document.createElement('script');

	oS.type = 'text/javascript';
	oS.async = true;
	oS.src = url;
	document.head.appendChild(oS);
}