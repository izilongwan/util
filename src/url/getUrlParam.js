/**
 * 获取URL键名的值
 * @param {String} key 提取的属性值
 * @param {String} url 提取的字符串
 * @returns {Number|String|null}
 */
export function getUrlParam(key = '', url = '') {
  url = url
    ? url
    : window.location.search.substr(1);

  const reg = new RegExp('(?:^|&)' + key + '=([^&]+)(?:&|$)');
  const values = url.match(reg);

  if (values && values.length) {
    let value = decodeURIComponent(values[1]);

    return isNaN(parseFloat(value))
      ? value
      : parseFloat(value);
  }

  return null;
}