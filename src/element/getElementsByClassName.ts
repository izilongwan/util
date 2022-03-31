// 封装getElementsByClassName
export function getElementsByClassName () {
	document.getElementsByClassName || function (className) {
		var allDoms = document.getElementsByTagName('*'),
				allDomsLen = allDoms.length,
				allDomItem = null,
				finalArr = [];

		for (var i = 0; i < allDomsLen; i++) {
			allDomItem = allDoms[i];
			var temp = trimSpace(allDomItem.className).trim().split(' '),
					tempLen = temp.length,
					tempItem = null;

			for (var j = 0; j < tempLen; j++) {
				tempItem = temp[j];
				if (tempItem === className) {
					finalArr.push(allDomItem);
					break;
				}
			}
		}
		return finalArr;

		function trimSpace (tar: string) {
			return tar.replace(/\s+/g, ' ');
		}
	}
}
