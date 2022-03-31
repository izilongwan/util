// 获取文档的总大小
export function getScrollSize () {
	if (document.body.scrollHeight) {
		return {
			w: document.body.scrollWidth,
			h: document.body.scrollHeight
		}
	} else {
		return {
			w: document.documentElement.scrollWidth,
			h: document.documentElement.scrollHeight
		}
	}
}
