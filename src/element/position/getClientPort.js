// 封装可视区窗口大小
export function getClientPort () {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else if (document.compatMode == "BackCompat") {
		return {
			w: document.body.clientWidth,
			h: document.body.clientHeight
		}
	} else {
		return {
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		}
	}
}
