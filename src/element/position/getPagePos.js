// 获取元素相对于文档的位置
export function getPagePos (e) {
	var e = e || window.event,
			sTop = window.pageYOffset || document.body.scrollTop + document.documentElement.scrollTop,
			sLeft = window.pageXOffset || document.body.scrollLeft + document.documentElement.scrollLeft,
			cTop = document.documentElement.clientTop || 0,
			cLeft = document.documentElement.clientLeft || 0;

	return {
		x: e.clientX + sLeft - cLeft,
		y: e.clientY + sTop - cTop
	}
}
