import { getElemPos } from '../element/position';

/**
 * 图片懒加载
 * HTMLCollection} images
 */
export const imgLazyLoad = (function (win, doc) {
	var imageItem = null,
			imagesLen = 0,
			cHeight = 0,
			sTop = 0,
			imageTop = 0,
			src = null,
			n = 0;

	return function (images) {
		imagesLen = images.length,
			cHeight = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight,
			sTop = win.pageYOffset || doc.body.scrollTop || doc.documentElement.scrollTop;

		for (var i = n; i < imagesLen; i++) {
			imageItem = images[i];
			imageTop = getElemPos(imageItem).top;
			if (imageTop < cHeight + sTop) {
				src = imageItem.getAttribute('data-src');
				if (src) {
					imageItem.src = src;
					imageItem.removeAttribute('data-src');
					n++;
				}
			}
		}
	}
})(window, document);
