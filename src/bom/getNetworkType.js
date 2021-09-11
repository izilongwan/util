/**
 * 判断网络状况4G/3G/2G/2G-
 */
export function getNetworkType () {
	var type = navigator.connection.effectiveType;
	switch (type) {
		case 'slow-2g':
			return '2G-';
		case '2g':
			return '2G';
		case '3g':
			return '3G';
		case '4g':
			return '4G';
		default:
			break;
	}
}
