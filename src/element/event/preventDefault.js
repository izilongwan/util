/**
 * 封装阻止元素的默认行为函数
 * IE：returnValue
 * DOM：preventDefault
 */
export function preventDefault (e) {
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}
