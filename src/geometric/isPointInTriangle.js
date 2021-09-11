// interface VecType {
//   x: number;
//   y: number;
// }

/**
 * 判断该点是否在△内
 * @param {VecType} opt.curPoint
 * @param {VecType} opt.lastPoint
 * @param {VecType} opt.topRightPoint
 * @param {VecType} opt.bottomRightPoint
 */
export const isPointInTriangle = (function () {
	function vec (a, b) {
		return {
			x: b.x - a.x,
			y: b.y - a.y
		}
	}

	function vecProduct (v1, v2) {
		return v1.x * v2.y - v1.y * v2.x;
	}

	function sameSymbols (a, b) {
		return (a ^ b) >= 0;
	}

	return function (opt) {
		var PA = vec(opt.curPoint, opt.lastPoint),
			PB = vec(opt.curPoint, opt.topRightPoint),
			PC = vec(opt.curPoint, opt.bottomRightPoint),
			R1 = vecProduct(PA, PB),
			R2 = vecProduct(PB, PC),
			R3 = vecProduct(PC, PA);

		return sameSymbols(R1, R2) && sameSymbols(R2, R3);
	}
})();
