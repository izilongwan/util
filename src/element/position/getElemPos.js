// 获取元素相对于文档的位置
export function getElemPos (el) {
	var pos = {
    left: 0,
    top: 0
  }

	while (el) {
		pos.left += el.offsetLeft;
		pos.top += el.offsetTop;
		el = el.offsetParent;
	}

	return pos;
}
