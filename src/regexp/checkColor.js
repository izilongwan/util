/**
 * 匹配进制颜色
 * @param {String} str
 */
export function checkColor (str) {
  var reg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return reg.test(str);
}