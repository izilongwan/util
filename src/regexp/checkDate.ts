/**
 * 匹配日期
 * @param {String} str
 */
export function checkDate (str: string) {
  var reg = /^(19|20)\d{2}([./-])(0[1-9]|1[0-2])\2([0-2][1-9]|([1-3]0|31))$/;
  return reg.test(str);
}
